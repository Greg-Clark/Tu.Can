import React, { useRef, useState, useEffect } from 'react';
import axios from './axios';
import Contact from './Contact';
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import '../styles/Sidebar.css';
import { useUserContext } from '../contexts/UserProvider';
import AddIcon from '@material-ui/icons/Add';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';


export default function Sidebar(props) {
    const roomRef = useRef();
    const { currentUser } = useUserContext();
    const [searchQuery, setSearchQuery] = useState("");
    // const [currentRoom, switchRoom] = useState("");
    const [foundUser, setFoundUser] = useState("");
    // form dialog
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({
        roomname: '',
        roomusers: [],
    })
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleCreatingRoom = (event,values) => {
        event.preventDefault();
        // console.log(values.roomsusers.split(" "))
        axios.post("rooms/new", {
            chatroomID: values.roomname,
            users: values.roomusers,
        });
        setOpen(false);
    };

    const handleTextFieldInput = (event) => {
        event.preventDefault();
        setValues({...values, [event.target.id]:event.target.value});
    }

    const onSearchUsers = (e) => {
        e.preventDefault();
        // console.log(searchQuery);
        axios.get(`/users/search?target=${searchQuery}`)
            .then(response => {
                if (response.data.username == null) {
                    setFoundUser(null);
                    alert('User does not exist');
                }
                else {
                    setFoundUser(response.data.username);
                }
            }
            )
    };


    return (
        <div className="sidebar">
            {/* <div className="sidebar__header">
                <div className="sidebar__headerRight">
                    <IconButton onClick={() => { alert('clicked') }}>
                        <ChatIcon />
                    </IconButton>
                    <IconButton onClick={() => { alert('clicked') }}>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div> */}


            <div className="sidebar__search">
                <div>
                    <Tooltip title="Add a user">
                        <IconButton>
                            <AddIcon
                                onClick={handleClickOpen}
                                className="sidebar_addIcon"
                            />
                        </IconButton>
                    </Tooltip>

                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Create a new room</DialogTitle>
                        <DialogContent >
                        
                            <DialogContentText>
                                To create a room, simply give a room name and specify what users you want include in this chat room
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="roomname"
                                label="Room Name"
                                type="text"
                                value = {values.roomname}
                                onChange = {e=> handleTextFieldInput(e)}
                                fullWidth
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="roomusers"
                                label="Users"
                                value = {values.roomusers}
                                onChange = {e => handleTextFieldInput(e)}
                                fullWidth
                            />
                    </DialogContent>

                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>

                            <Button onClick={e => handleCreatingRoom(e,values)} color="primary">
                                Create Room
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>

                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <form onSubmit={onSearchUsers}>
                        <input
                            placeholder="Find chat"
                            type="text"
                            onChange={e => setSearchQuery(e.target.value)}
                            className="sidebar_searchContainerInput"
                        />
                    </form>
                </div>
            </div>

            <div className="sidebar__chats">

                {props.rooms.map((room) => (
                    <Contact
                        switchRoom={props.switchRoom}
                        roomID={room.chatroomID}
                        users={room.users.filter((user) => user !== currentUser)}
                    />
                ))}
            </div>

            {foundUser && <p>{foundUser}</p>}
        </div>
    );
}