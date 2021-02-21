import React from "react";
import Contact from './Contact';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from "@material-ui/icons/Chat";
import  MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import '../styles/Sidebar.css';

const Sidebar = () => (
    <div className="sidebar">
        <div className="sidebar__header">
            <div className="sidebar__headerRight">
                <IconButton onClick={() => { alert('clicked') }}>
                    <ChatIcon/>
                </IconButton>
                <IconButton onClick={() => { alert('clicked') }}>
                    <MoreVertIcon/>
                </IconButton>
            </div>
        </div>

        <div className="sidebar__search">
            <div className="sidebar__searchContainer">
                <SearchOutlined />
                <form>
                    <input 
                        placeholder="Find chat"
                        type="text" 
                    />
                </form>
            </div>
        </div>

        <div className="sidebar__chats">
            <Contact />
            <Contact />
        </div>
    </div>
);

export default Sidebar;