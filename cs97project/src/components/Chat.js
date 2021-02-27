import React, { useState } from 'react';
import Message from './Message';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import SendIcon from '@material-ui/icons/Send';
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons';
import { Avatar, IconButton } from '@material-ui/core';
import '../styles/Chat.css';
import axios from './axios'

function Chat({ messages }) {
    const [input, setInput] = useState("");
    const sendMessage = async (e) => {
        e.preventDefault();
        await axios.post("/messages/new", {
            message : input,
            name: "FILL WITH AUTH",
            timestamp: "JUST NOW",
            received : false
        });

        setInput('');
    };
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar />
                <div className="chat__headerInfo">
                    <h3>Username</h3>
                    <p>Last seen at ...</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat__full">
                {/* first three messages uses Message component */}
                {/* {this.props.messages.map(message => {
                    return (
                        <div className="chat__body">
                            <Message sender={message.username} text={message.text} time={message.time} />
                        </div>
                    );
                })} */}


                <div className="chat__body">
                    {messages.map((message) =>
                        // think about updating this with authentication
                        <p className={`chat_message ${message.received && "chat__receiver"}`}>
                            <span className="chat__name">{message.name}</span>
                            {message.message}
                            <span className="chat__timestamp">{message.timestamp}</span>
                        </p>
                    )}
                </div>

                {/*last three messages do not use Message component */}
                <div className="chat__body">
                    <p className="chat__message">
                        <span className="chat__name">Username</span>
                    This is a message
                    <span className="chat__timestamp">
                            {new Date().toUTCString()}
                        </span>
                    </p>
                </div>

                <div className="chat__body">
                    <p className="chat__message chat__reciever">
                        <span className="chat__name">Username</span>
                    This is a message
                    <span className="chat__timestamp">
                            {new Date().toUTCString()}
                        </span>
                    </p>
                </div>

                <div className="chat__body">
                    <p className="chat__message chat__reciever">
                        <span className="chat__name">Username</span>
                    This is a message
                    <span className="chat__timestamp">
                            {new Date().toUTCString()}
                        </span>
                    </p>
                </div>
            </div>

            {/* chat footer includes text input form, emoji icon, and media icon for sending media */}
            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticonIcon />
                </IconButton>
                <IconButton>
                    <CameraAltIcon />
                </IconButton>
                <form>
                    <input
                        value = {input}
                        onChange={e =>setInput(e.target.value)}
                        placeholder="Type a message"
                        type="text"
                    />
                    <button type="submit" onClick={sendMessage}>
                        Send a message
                    </button>
                    <IconButton>
                        <SendIcon />
                    </IconButton>
                </form>

            </div>

        </div>
    );
}

export default Chat;
// export default class Chat extends React.Component{
//     handleSendMessage = (e) => {
//         e.preventDefault();
//         const message = e.target.value;

//         // handle adding message to DB and adding message to messageList here
//     }

//     render() {

//     }
// }