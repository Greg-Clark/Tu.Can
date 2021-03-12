import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useUserContext } from '../contexts/UserProvider';
import axios from './axios';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js';
import '../styles/App.css';

function App() {

    // Hooks
    const [messages, setMessages] = useState([]);
    const [rooms, setRooms] = useState([]);
    // const [error, setError] = useState("");
    const [currentRoom, setCurrentRoom] = useState("");
    const [currentUsers, setCurrentUsers] = useState("");
    const history = useHistory();
    const { signout, currentUser } = useUserContext();

    // Default theme
    if (localStorage.getItem('theme') === null) {
        localStorage.setItem('theme', 'theme-default');
    }
    document.documentElement.setAttribute('class', localStorage.getItem('theme'));

    // makes messages real time
    useEffect(() => {
        axios.get(`/messages/room?target=${currentRoom}`)
            .then(response => {
                setMessages(response.data);
            })
    }, [messages]);

    useEffect(() => {
        const pusher = new Pusher('8cdc3d1a07077d29caf4', {
            cluster: 'us3'
        });

        const channel = pusher.subscribe('messages');
        channel.bind('inserted', (newMessage) => {
            //append new messages to current message array
            setMessages([...messages, newMessage]);
        });

        // ensures there is only 1 subscriber(listener)
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [messages]); // captures messages since it is a dependency

    useEffect(() => {
        axios.get(`/rooms/userrooms?target=${currentUser}`)
            .then(response => {
                // console.log(response.data);
                setRooms(response.data);
            })
    }, [rooms]);

    // makes rooms in mongo real time
    useEffect(() => {
        const pusher = new Pusher('8cdc3d1a07077d29caf4', {
            cluster: 'us3'
        });

        const channel = pusher.subscribe('rooms');
        channel.bind('inserted', (newRoom) => {
            //append new rooms to current message array
            setRooms([...rooms, newRoom]);
        });

        // ensures there is only 1 subscriber(listener)
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [rooms]); // captures rooms since it is a dependency

    // async function handleSignOut() {
    //     setError("");

    //     try {
    //         await signout();
    //         history.push("/");
    //     }
    //     catch {
    //         setError("Cannot log out");
    //     }
    // }

    const switchRoom = (newRoomID, newRoomUsers) => {
        setCurrentRoom(newRoomID);
        setCurrentUsers(newRoomUsers);
    }

    return (
        <div className="app">
            <div className="app_body">
                <Sidebar
                    rooms={rooms}
                    switchRoom={switchRoom}
                />
                <Chat
                    messages={messages}
                    currentRoom={currentRoom}
                    currentUsers={currentUsers}
                    parent={document.documentElement}
                />
            </div>
        </div>
    );
}

export default App;