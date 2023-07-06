import React, { useContext } from "react";
import Add from "../assets/add.png";
import Cam from "../assets/cam.png";
import More from "../assets/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);
  console.log(data);

  return (
    <div className="chat">
      <div className="chatInfo">
        {data.chatId !== "null" ? (
          <>
            <div className="chatUserInfo">
              <img src={data.user?.photoURL} className="user-img" alt="" />
              <span>{data.user?.displayName}</span>
            </div>
            <div className="chatIcons">
              <img src={Add} alt="" />
              <img src={Cam} alt="" />
              <img src={More} alt="" />
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      <Messages />
      {data.chatId !== "null" ? <Input /> : <Input disabled={"disabled"} />}
    </div>
  );
};

export default Chat;
