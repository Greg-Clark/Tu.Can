import React, { useState, useEffect } from 'react';
import Chat from './Chat';
import Sidebar from './Sidebar';
import '../styles/App.css';
import Pusher from 'pusher-js';
import axios from './axios';
import { useAuth } from '../services/Auth';
import { useHistory } from 'react-router-dom';

// import { render } from '@testing-library/react';


function App() {
	const [messages, setMessages] = useState([]);
	const [error, setError] = useState("");
	const history = useHistory();
	const { signOut, currentUser } = useAuth();
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




	async function handleSignOut() {
		setError("");

		try {
			await signOut();
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
				<Sidebar />
				<Chat
					messages={messages}
				/>

				{currentUser && <button onClick={handleSignOut}>SignOut</button>}
			</div>
		</div>
	);
}



export default App;

