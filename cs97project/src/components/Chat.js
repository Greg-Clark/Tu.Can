import React, { useState } from 'react';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SendIcon from '@material-ui/icons/Send';
import { SearchOutlined } from '@material-ui/icons';
import { Avatar, IconButton } from '@material-ui/core';
import '../styles/Chat.css';
import axios from './axios'
import ScrollableFeed from 'react-scrollable-feed'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from 'react-router-dom';
import { useUserContext } from '../contexts/UserProvider';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PaletteIcon from '@material-ui/icons/Palette';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";


function Chat(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [emojiPickerState, SetEmojiPicker] = useState(false);
    const { signout, currentUser } = useUserContext();
    const currentDate = new Date().toLocaleString();
    const [input, setInput] = useState("");
    const [searchMessage, setSearchMessage] = useState("");
    const [deleteOpen, deleteSetOpen] = useState(false);
    const [messageFound, setMessageFound] = useState("");
    const [open, setOpen] = useState(false);

    /* event handlers for delete acct icon */
    const handleClickOpen = () => {
        deleteSetOpen(true);
    };

    const deleteAccount = (event) => {
        event.preventDefault();
        axios.get(`/users/delete?target=${currentUser}`)
            .then(response => {
                if(response) {
                    window.alert("Your account has been deleted");
                    signout();
                }
            });
        deleteSetOpen(false);
    };

    /* event handlers for theme setting */
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        deleteSetOpen(false);
    };

    const setTheme = (event, themeName) => {
        setAnchorEl(event.currentTarget);
        localStorage.setItem('theme', themeName);
        props.parent.setAttribute('class', themeName);
        setAnchorEl(null);
    };

    /* event handlers for emojis button */
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

    /* event handler for searching message dialogue */
    const handleCloseMessage = () => {
        setOpen(false);
        setMessageFound("");
    };

    const searchMessages = (event) => {
        event.preventDefault();
        axios.get(`/messages/search?currentContent=${searchMessage}&currentRoom=${props.currentRoom}`)
            .then(response => {
                if(response.status == "201")
                {
                    setMessageFound("Message not found");
                }
                else
                {
                    setMessageFound(`Message sent on ${response.data.timestamp} by ${response.data.sender}`);
                }
                setOpen(true);
            });
    };

    /* event handlers for logging out */
    const history = useHistory();

    const handleLogout = () => {
        history.push('/');
        signout();
        window.alert("You have been successfully logged out")
    };

    /* sending messages */
    const sendMessage = async (e) => {
        e.preventDefault(); //without calling this the page will refresh
        if(props.currentRoom == "")
        {
            alert("You cannot send messages in this room")
        }
        else
        {
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
        }
        setInput('');
    };

    /* layout */
    return (
        <div className="chat">
            <div className="chat__header">
            <Avatar>{props.currentUsers.charAt(0).toUpperCase()}</Avatar>
                <div className="chat__headerInfo">
                    <h3>&nbsp; {props.currentUsers} </h3> {/* chat name header */}
                </div>
                <div className="chat__headerRight">
                    <div className="sidebar__searchContainer">
                        <SearchOutlined />
                        <form onSubmit={searchMessages}>
                            <input
                                placeholder="Search Messages"
                                type="text"
                                onChange={e => setSearchMessage(e.target.value)}
                                className="sidebar_searchContainerInput"
                            />
                        </form>

                    {/* dialog pop-up for message searching */}
                    </div>
                        <Dialog onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Message Found</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {messageFound}
                            </DialogContentText>
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Okay
                            </Button>
                        </DialogActions>
                    </Dialog>

                    {/* themes */}
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
                            <MenuItem onClick={e => setTheme(e, 'theme-ks')}>Midnight</MenuItem>
                            <MenuItem onClick={e => setTheme(e, 'theme-mx')}>Cotton Candy</MenuItem>
                            <MenuItem onClick={e => setTheme(e, 'theme-rf')}>Pastel</MenuItem>
                            <MenuItem onClick={e => setTheme(e, 'theme-tc')}>Minty Green</MenuItem>
                            <MenuItem onClick={e => setTheme(e, 'theme-ks2')}>Sunset</MenuItem>
                        </Menu>
                    </div>

                    {/* delete acct icon */}
                    <div>
                        {/* button */}
                        <Tooltip title="Delete Account">
                            <IconButton
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={handleClickOpen}
                            >
                                <DeleteIcon className='chat_trashIcon' />
                            </IconButton>
                        </Tooltip>

                        {/* dialog */}
                        <Dialog open={deleteOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Delete Account</DialogTitle>
                            <DialogContent >

                                <DialogContentText>
                                    WARNING: You are about to delete your account on Tu.Can. If you delete your account by accident, we can recover your messages if you recreate your account with the exact same username. 
                                    Note that you do not need to use the same password if you recreate your account
                            </DialogContentText>
                            </DialogContent>

                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Cancel
                            </Button>

                                <Button onClick={e => deleteAccount(e)} color="primary">
                                    Delete Account
                            </Button>
                            </DialogActions>
                        </Dialog>
                    </div>

                    {/* logout button */}
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

            {/* individual messages */}
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

                <form onSubmit={sendMessage}>
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Type a message"
                        type="text"
                        className="chat_footerInput"

                    />
                    <Tooltip title="Send Message">
                        <IconButton disabled={props.currentRoom == ""}>
                            <SendIcon type="submit" onClick={sendMessage}
                                className='chat_footerSendIcon'
                            />
                        </IconButton>
                    </Tooltip>
                </form>

            </div>

            <div>
                <Dialog
                    open={open}
                    onClose={handleCloseMessage}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {messageFound}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseMessage} color="primary" autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

        </div>
    );
}

export default Chat;