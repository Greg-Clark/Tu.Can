import React, { useState, useEffect } from 'react';
import Chat from './Chat';
import Sidebar from './Sidebar';
import '../styles/App.css';
import Pusher from 'pusher-js';
import axios from './axios';
import { useAuth } from '../services/Auth';
import { useUserContext } from '../contexts/UserProvider';
import { useHistory } from 'react-router-dom';

// import { render } from '@testing-library/react';


function App() {
	const [messages, setMessages] = useState([]);
	const [rooms, setRooms] = useState([]);
	const [error, setError] = useState("");
	const history = useHistory();
	const { signout, currentUser } = useUserContext();
	// const { signOut, currentUser } = useAuth();
	// axios is just another way to handle get, post and so on
	useEffect(() => {
		axios.get('/messages/sync')
			.then(response => {
				console.log(response.data);
				setMessages(response.data);
			})
	}, []);

	// ==================makes messages in mongo real time======================
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

	// axios is just another way to handle get, post and so on
	useEffect(() => {
		axios.get('/rooms/sync')
			.then(response => {
				console.log(response.data);
				setRooms(response.data);
			})
	}, []);

	// ==================makes rooms in mongo real time======================
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

	async function handleSignOut() {
		setError("");

		try {
			await signout();
			history.push("/");
		} 
		catch {
			setError("Cannot log out");
		}
	}

	// console.log(messages);
	return (
	
		<div className="app">
			<div className="app_body">
				<Sidebar 
					rooms = {rooms}
				/>
				<Chat
					messages={messages}
				/>
				{currentUser && <button onClick={handleSignOut}>SignOut</button>}
			</div>
		</div>
	);
}



export default App;

