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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { useUserContext } from '../contexts/UserProvider';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PaletteIcon from '@material-ui/icons/Palette';


function Chat(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { signout, currentUser } = useUserContext();
    const currentDate = new Date().toLocaleString();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const setTheme = (event, themeName) => {
        setAnchorEl(event.currentTarget);
        localStorage.setItem('theme',themeName);
        props.parent.setAttribute('class',themeName);
        setAnchorEl(null);
    };

    

    const history = useHistory();

    const handleLogout = () => {
        history.push('/');
        signout();
        window.alert("You have been successfully logged out")
    };

    const [input, setInput] = useState("");
    const sendMessage = async (e) => {
        e.preventDefault();
        await axios.post("/messages/new", {
            content: input,
            // get current user
            sender: currentUser,
            // get timestamp
            timestamp: currentDate,
            received: true,
            // get current room
            chatroomID: props.currentRoom
        });

        setInput('');
    };
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar />
                <div className="chat__headerInfo">
                    <h3>&nbsp; {props.currentRoom} </h3> {/*place chat name here? */}
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>


                    <div>
                        <IconButton
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <PaletteIcon />
                        </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={e => setTheme(e,'theme-default')}>Default Theme</MenuItem>
                            <MenuItem onClick={e => setTheme(e,'theme-gs')}>Greg's Theme</MenuItem>
                            <MenuItem onClick={e => setTheme(e,'theme-ks')}>Karim's Theme</MenuItem>
                            <MenuItem onClick={e => setTheme(e,'theme-mx')}>Michelle's Theme</MenuItem>
                            <MenuItem onClick={e => setTheme(e,'theme-rf')}>Roye's Theme</MenuItem>
                            <MenuItem onClick={e => setTheme(e,'theme-tc')}>Terry's Theme</MenuItem>
                        </Menu>
                    </div>



                    <div>
                        <IconButton
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            onClick={handleLogout}
                        >
                            <ExitToAppIcon /> 
                        </IconButton>
                    </div>
                </div>

            </div>

            <div className="chat__full">
                <ScrollableFeed>
                    <div className="chat__body">
                        {props.messages.map((message) => (
                            <p className={`chat__message ${message.received && "chat__receiver"}`}>
                                <span style={{ color: "black" }} className="chat__name">{message.sender}</span>
                                {message.content}
                                <span className="chat__timestamp">{message.timestamp}</span>
                            </p>
                        ))}
                    </div>
                </ScrollableFeed>
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
                        <SendIcon type="submit" onClick={sendMessage} />
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