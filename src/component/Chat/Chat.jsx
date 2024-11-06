import React, { useEffect, useState } from 'react';
import {user} from "../Join/Join";
import "./Chat.css";
import socketIo from "socket.io-client"
import send from "../../images/send.png";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../images/closeIcon.png";
import { IoLogoWechat } from "react-icons/io5";


let socket;
const ENDPOINT = "https://livechat-back.onrender.com";

const Chat = () => {
    const [id, setid] = useState("");
    const [messages, setMessages] = useState([]);

    const sender =()=>{
        const message = document.getElementById('chatInput').value;
        socket.emit('message', {message, id});
        document.getElementById('chatInput').value= "";
    }
    console.log(messages);
    useEffect(()=>{
        socket = socketIo(ENDPOINT, {transports: ["websocket"]});
        socket.on('connect',()=>{
            alert("connected");
            setid(socket.id);
        })
        console.log(socket);
        socket.emit('joined', {user})
        socket.on('welcome',(data)=>{
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        })
        socket.on('userJoined',(data)=>{
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        })
        socket.on('leave', (data)=>{
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        })

        return() =>{
            socket.emit('userDisconnect');
            socket.off();
        }
    },[])

    useEffect(()=>{
        socket.on('sendMessage', (data)=>{
            setMessages([...messages, data]);
            console.log(data.user, data.message, data.id);
        })
        return()=>{
            socket.off();
        }

    },[messages])

  return (
    <div className='chatPage'>
        <div className='chatContainer'>
            <div className='header'>
                <h2> <IoLogoWechat /> C-ChatRoom </h2>
                <a href='/live_realtime_chatapp_f'> <img src={closeIcon} alt='crosspic'/></a>
            </div>
            <ReactScrollToBottom className='chatBox'> 
                { messages.map((item, i) => <Message user={item.id===id ? '' : item.user} message={item.message} classs={item.id===id? 'right': 'left'}/>) }
            </ReactScrollToBottom>
            <div className='inputBox'>
                <input onKeyPress={(event)=>event.key === 'Enter' ? sender() : null}
                placeholder='Type a message' type='text' id='chatInput'/>
                <button onClick={sender} className='chatBtn'><img src={send} alt='send'/></button>
            </div>
        </div>
    </div>
  )
}

export default Chat;