import React, { useRef, useState, useEffect } from 'react';
import useStateRef from 'react-usestateref';
import axios from './axios';
import Contact from './Contact';
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
    const [ error, setError] = useState("");
    const [foundUser, setFoundUser] = useState("");
    // form dialog
    const [open, setOpen] = useState(false);
    const [roomName, setRoomName] = useState("");
    
    //const [roomUsers, setRoomUsers] = useState([]);
    const[roomUsers, setRoomUsers, currentRoomUsers] = useStateRef("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCreatingRoom = async (event) => {
        event.preventDefault();
        console.log(roomName);
        console.log(currentRoomUsers.current);
        axios.post("rooms/new", {
            chatroomID: roomName,
            users: currentRoomUsers.current,
        }).then(response => {
            if (response.data == "1") {
                alert("Could Not Create Room");
            }
        });
        setOpen(false);
    };

    const handleRoomName = () => {
        // setRoomName(roomUsers.sort((a, b) => (a.localeCompare(b))).map((name) => name).join(""));
        setRoomName(currentRoomUsers.current.sort((a, b) => (a.localeCompare(b))).map((name) => name).join(""));
    }

    // const handleTextFieldInput = (event) => {
    //     event.preventDefault();
    //     setRoomUsers(event.target.value.split(" ").concat(currentUser).sort((a, b) => (a < b)));
    //     handleRoomName();
    // }
    const handleTextFieldInput = (e) => {
        e.preventDefault();
        setRoomUsers(e.target.value.split(" ").concat(currentUser).sort((a, b) => (a < b)));
        handleRoomName();
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
                    alert(response.data.username + ' is registered! Feel free to create a chatroom with ' + response.data.username + '.')
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
                    <Tooltip title="Add a User or Group">
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
                                To create a room, simply give a room name and specify what users (excluding yourself) you want include in this chat room
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="roomusers"
                                label="Users"
                                onChange={e => handleTextFieldInput(e)}
                                fullWidth
                            />
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>

                            <Button onClick={e => handleCreatingRoom(e)} color="primary">
                                Create Room
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>

                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <form onSubmit={onSearchUsers}>
                        <input
                            placeholder="Find user"
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
                        key={room.chatroomID}
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