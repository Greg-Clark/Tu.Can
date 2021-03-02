import React, { useRef, useState, useEffect } from 'react';
import axios from './axios';
import Contact from './Contact';
import ChatIcon from "@material-ui/icons/Chat";
import  MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import '../styles/Sidebar.css';

export default function Sidebar( {rooms} ) {
    const [searchQuery, setSearchQuery] = useState("");
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
            })
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
                        />
                    </form>
                </div>
            </div>

            <div className="sidebar__chats">
                {/* <Contact />
                <Contact /> */}
                
                {rooms.map((room) => (
                    // room.users.splice(room.users.indexOf(foundUser),1)
                    <Contact users={room.users} />
                ))}
            </div>

            {foundUser && <p>{foundUser}</p>}
        </div>
    );
}