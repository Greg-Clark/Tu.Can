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
import Tooltip from '@material-ui/core/Tooltip';

import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";


function Chat(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [emojiPickerState, SetEmojiPicker] = useState(false);
    const { signout, currentUser } = useUserContext();
    const currentDate = new Date().toLocaleString();
    const [input, setInput] = useState("");

    const handleEmojis = (event) => {
        event.preventDefault();
        SetEmojiPicker(!emojiPickerState);
    }

    let emojis;
    if (emojiPickerState) {
        emojis = (
            <Picker
                emoji="100"
                title="Pick Emojis"
                onSelect={emoji => setInput(input + emoji.native)}
            />
        );
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const setTheme = (event, themeName) => {
        setAnchorEl(event.currentTarget);
        localStorage.setItem('theme', themeName);
        props.parent.setAttribute('class', themeName);
        setAnchorEl(null);
    };



    const history = useHistory();

    const handleLogout = () => {
        history.push('/');
        signout();
        window.alert("You have been successfully logged out")
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        await axios.post("/messages/new", {
            content: input,
            // get current user
            sender: currentUser,
            // get timestamp
            timestamp: currentDate,
            received: false,
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
                    <h3>&nbsp; {props.currentUsers} </h3> {/*place chat name here? */}
                </div>
                <div className="chat__headerRight">
                    <Tooltip title="Search Messages">
                        <IconButton>
                            <SearchOutlined className='chat_headerSearchOutlined' />
                        </IconButton>
                    </Tooltip>


                    <div>
                        <Tooltip title="Theme">
                            <IconButton
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={handleClick}
                            >
                                <PaletteIcon className='chat_headerPalete' />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={e => setTheme(e, 'theme-default')}>Default</MenuItem>
                            <MenuItem onClick={e => setTheme(e, 'theme-gc')}>Dark Mode</MenuItem>
                            <MenuItem onClick={e => setTheme(e, 'theme-ks')}>Karim</MenuItem>
                            <MenuItem onClick={e => setTheme(e, 'theme-mx')}>Michelle</MenuItem>
                            <MenuItem onClick={e => setTheme(e, 'theme-rf')}>Pastel Pink</MenuItem>
                            <MenuItem onClick={e => setTheme(e, 'theme-tc')}>Terry</MenuItem>
                        </Menu>
                    </div>



                    <div>
                        <Tooltip title="Logout">
                            <IconButton
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={handleLogout}
                            >
                                <ExitToAppIcon className='chat_headerExitToApp' />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>

            </div>

            <div className="chat__full">
                <ScrollableFeed>
                    <div className="chat__body">
                        {props.messages.map((message) => (
                            <p className={`chat__message ${message.sender === currentUser && "chat__receiver"}`}>
                                <span className="chat__name">{message.sender}</span>
                                {message.content}
                                <span className="chat__timestamp">{message.timestamp}</span>
                            </p>
                        ))}
                    </div>
                </ScrollableFeed>
            </div>

            {/* chat footer includes text input form, emoji icon, and media icon for sending media */}
            <div className="chat_emoji">
                {emojis}
            </div>
            
            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticonIcon
                        onClick={handleEmojis}
                        className='chat_footerInsertEmojiIcon'
                    />
                </IconButton>

                <IconButton>
                    <AttachFile className='chat_footerAttachFile' />
                </IconButton>
                <form onSubmit={sendMessage}>
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Type a message"
                        type="text"
                        className="chat_footerInput"
                    />
                    {/* <button type="submit" onClick={sendMessage}>
                        Send a message
                    </button> */}
                    <IconButton>
                        <SendIcon type="submit" onClick={sendMessage}
                            className='chat_footerSendIcon'
                        />
                    </IconButton>
                </form>

            </div>

        </div>
    );
}

export default Chat;
