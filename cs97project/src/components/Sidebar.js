import React, { useRef, useState, useEffect } from 'react';
import axios from './axios';
import Contact from './Contact';
import ChatIcon from "@material-ui/icons/Chat";
import  MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import '../styles/Sidebar.css';
import { useUserContext } from '../contexts/UserProvider';
export default function Sidebar(props) {
    const roomRef = useRef();
    const { currentUser } = useUserContext();
    const [searchQuery, setSearchQuery] = useState("");
    // const [currentRoom, switchRoom] = useState("");
    const [foundUser, setFoundUser] = useState("");
    const url = "http://localhost:9000";

    const onSearchUsers = (e) => {
        e.preventDefault();
        // console.log(searchQuery);
        axios.get(`/users/search?target=${searchQuery}`)
            .then(response => {
                if(response.data.username == null)
                {
                    setFoundUser(null);
                    alert('User does not exist');
                }
                else
                {
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
                        roomID = {room.chatroomID}
                        users={room.users.filter((user) => user !== currentUser)}
                    />
                ))}
            </div>

            {foundUser && <p>{foundUser}</p>}
        </div>
    );
}