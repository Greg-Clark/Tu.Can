import React, { useState } from 'react';
import Message from './Message';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import SendIcon from '@material-ui/icons/Send';
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons';
import { Avatar, IconButton } from '@material-ui/core';
import '../styles/Chat.css';
import axios from './axios'
import ScrollableFeed from 'react-scrollable-feed'

function Chat({ messages }) {
    const [input, setInput] = useState("");
    const sendMessage = async (e) => {
        e.preventDefault();
        await axios.post("/messages/new", {
            content: input,
            sender: "test",
            timestamp: "now",
            received: true,
            chatroomID: "test123"
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
                        <MoreVert />
                    </IconButton>
                </div>
            </div>



            <div className="chat__full">

                <div className="chat__body">
                    <ScollableFeed>
                        {messages.map((message) => (
                            <p className={`chat__message ${message.received && "chat__receiver"}`}>
                            {/* change to comparing who's logged in to who sent the message*/}
                                <span style={{color: "black"}}className="chat__name">{message.sender}</span>
                                {message.content}
                                <span className="chat__timestamp">{message.timestamp}</span>
                            </p>
                        ))}
                    </ScollableFeed>
                    {/* think about updating this with authentication */}
                </div>
            </div>

    



            {/* chat footer includes text input form, emoji icon, and media icon for sending media */}
            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticonIcon />
                </IconButton>
                <IconButton>
                    <AttachFile />
                </IconButton>
                <form onSubmit={sendMessage}>
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Type a message"
                        type="text"
                    />
                    {/* <button type="submit" onClick={sendMessage}>
                        Send a message
                    </button> */}
                    <IconButton>
                        <SendIcon type="submit" onClick={sendMessage}/>
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