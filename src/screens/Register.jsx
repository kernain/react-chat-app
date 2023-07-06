import { useState } from "react";
import Add from "../assets/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, storage, db } from "../config/firebase";
import { useNavigate,Link } from "react-router-dom";
import { toast } from "react-toastify";



const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    if(name && email && password && file){
      try {
        //Create user
        const res = await createUserWithEmailAndPassword(auth, email, password);
  
        //Create a unique image name
        const date = new Date().getTime();
        const storageRef = ref(storage, `${name + date}`);
  
        await uploadBytesResumable(storageRef, file).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              //Update profile
              await updateProfile(res.user, {
                displayName: name,
                photoURL: downloadURL,
              });
              // console.log(res.user)
              //create user on firestore
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName: name,
                email,
                photoURL: downloadURL,
              });
  
              //create empty user chats on firestore
              await setDoc(doc(db, "userChats", res.user.uid), {});
              toast.success("Successfully Registered");
              navigate("/");
            } catch (err) {
              console.log(err);
              setErr(true);
              
            }
          });
        });
      } catch (err) {
        const authCode = {err}.err.code
        if(authCode == "auth/email-already-in-use"){
          toast.error("Email Already Exist")
        }
      }
    }else{
      toast.error("Please fill the required fields")
    }

    

  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Dazai Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Display Name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(ev) => setFile(ev.target.files[0])}
          />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an Avatar</span>
          </label>
          <button>Sign Up</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
