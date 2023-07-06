import { useNavigate } from "react-router-dom";
import Add from "../assets/addAvatar.png";
import { useState } from "react";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if(email && password){
      try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Successfully Logged In");
        navigate("/");
      } catch (err) {
        const authCode = {err}.err.code
        console.log(authCode)
        switch (authCode) {
          case "auth/wrong-password":
            toast.error("Invalid Password");
            break;
      
          case "auth/user-not-found":
            toast.error("Invalid Email");
      
          default:
             "";
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
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
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

          <button>Sign In</button>
        </form>
        <p>Don't have have an account?<Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
