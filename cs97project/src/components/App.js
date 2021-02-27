import React, { useState, useEffect } from 'react';
import Chat from './Chat';
import Sidebar from './Sidebar';
import '../styles/App.css';
import Pusher from 'pusher-js';
import axios from './axios'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import LoginPage from './LoginPage';
// import { render } from '@testing-library/react';


function App() {
	const [messages, setMessages] = useState([]);

	// axios is just another way to handle get, post and so on
	useEffect(() => {
		axios.get('/messages/sync')
			.then(response => {
				console.log(response.data);
				setMessages(response.data);
			})
	}, []);

	useEffect(() => {
		const pusher = new Pusher('8cdc3d1a07077d29caf4', {
			cluster: 'us3'
		});

		const channel = pusher.subscribe('messages');
		channel.bind('inserted', (newMessage) => {
			// just alerts the front end when a message is recieved
			// alert(JSON.stringify(newMessage));

			//append new messages to current message array
			setMessages([...messages, newMessage]);
		});

		// ensures there is only 1 subscriber(listener)
		return () => {
			channel.unbind_all();
			channel.unsubscribe();
		};
	}, [messages]); // captures messages since it is a dependency

	// console.log(messages);
	return (
			<div className="app">
				<div className="app_body">
					<Sidebar />
					<Chat
						messages={messages}
					// handleSendMessage={this.handleSendMessage}
					/>

					<Link to="/">Sign Out</Link>
				</div>
			</div>
	);
}



export default App;


////////////////////////

// function App() {
// 	return (
// 	  <Router>
// 		<div>
// 		  <nav>
// 			<ul>
// 			  <li>
// 				<Link to="/hub">Home</Link>
// 			  </li>
// 			  <li>
// 				<Link to="/loginpage">About</Link>
// 			  </li>
// 			  <li>
// 				<Link to="/users"><button>Users</button></Link>
// 			  </li>
// 			</ul>
// 		  </nav>
  
// 		  {/* A <Switch> looks through its children <Route>s and
// 			  renders the first one that matches the current URL. */}
// 		  <Switch>
// 			<Route path="/about">
// 			  <About />
// 			</Route>
// 			<Route path="/users">
// 			  <Users />
// 			</Route>
// 			<Route path="/">
// 			  <Home />
// 			</Route>
// 		  </Switch>
// 		</div>
// 	  </Router>
// 	);
//   }
  