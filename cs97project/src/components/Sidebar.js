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
    const [roomName, setRoomName] = useState("");
    const [roomUsers, setRoomUsers] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCreatingRoom = (event) => {
        event.preventDefault();
        // console.log(roomUsers);

        // idea here is to test each room user against the array of 
        // all users in the data base. If all users in the room match
        // to a user in the users database then go ahead and create the room
        // for(let i = 0; i < roomUsers.length; i++)
        // {
        //     if(roomUsers[i] == some valid user)
        //     {
        //         axios.get(`/user/sync`).then()
        //     }
        // }

        // axios.get(`/rooms/search?target=${roomName}`)
        // .then(response => {
        //     if (response.data.chatroomID == null) {
        //         setFoundUser(null);
        //         setOpen(true);
        //         alert('User does not exist');
        //     }
        //     else{
        //         axios.post("rooms/new", {
        //             chatroomID: roomName,
        //             users: roomUsers,
        //         });
        //     }
        // }
        // )

        // let breakcondition = 0;
        // for (let i = 0; i < roomUsers.length; i++) {
        //     axios.get(`/rooms/userrooms?target=${roomUsers[i]}`)
        //         .then(response => {
        //             if (!response.data && !breakcondition) {
        //                 setFoundUser(null);
        //                 setOpen(true);
        //                 alert('User does not exist');
        //                 breakcondition = 1;
        //             }
        //         })
        // }

        // if (!breakcondition) {
        //     axios.post("rooms/new", {
        //         chatroomID: roomName,
        //         users: roomUsers,
        //     });
        // }

        axios.post("rooms/new", {
            chatroomID: roomName,
            users: roomUsers,
        });

        setOpen(false);
    };

    const handleRoomName = () => {
        setRoomName(roomUsers.sort((a, b) => (a.localeCompare(b))).map((name) => name).join(""));
    }

    const handleTextFieldInput = (event) => {
        event.preventDefault();
        setRoomUsers(event.target.value.split(" ").concat(currentUser).sort((a, b) => (a < b)));
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
                                To create a room, simply specify what users (excluding yourself)
                                you want include in this chat room each seperated by a space
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
                        switchRoom={props.switchRoom}
                        roomID={room.chatroomID}
                        users={room.users.filter((user) => user !== currentUser)}
                    />
                ))}
            </div>

            {/* {foundUser && <p>{foundUser}</p>} */}
        </div>
    );
}