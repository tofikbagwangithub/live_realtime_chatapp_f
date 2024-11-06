import React, { useState } from "react";
import "./Join.css";
import chat from "../../images/chat.jpg";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";

let user;

const sendUser = () => {
    user = document.getElementById("joinInput").Value;
    document.getElementById("joinInput").Value = "";
  };  

const Join = () => {

    const [name, setname] = useState("");
     
  
  return (
    <div className="JoinPage">
      <div className="JoinContainer">
        <img src={chat} alt="logo" />
        <h1> C-ChatRoom </h1>
        <input onChange={(e)=>setname(e.target.value)} placeholder="Enter Your Name" type="text" id="joinInput" />
        <Link onClick={(event)=> !name ? event.preventDefault() : null} to="/chat">
          <button onClick={sendUser} className="joinbtn">Login In</button>
        </Link>
        <Footer/>
      </div>
      
    </div>
  );
};

export default Join;
export { user };
