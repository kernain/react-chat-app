import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { UserContext } from "../context/userContext";
import { toast } from "react-toastify";
import { ChatContext } from "../context/ChatContext";

const Navbar = () => {
  const { currentUser } = useContext(UserContext);
  const {dispatch} = useContext(ChatContext)

  const logout = async () => {
    await signOut(auth);
    dispatch({ type: "DESTROY_USER"});
    toast.success("Successfully Logged Out");
  };

  return (
    <div className="navbar">
      <span className="logo">Dazai Chat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
