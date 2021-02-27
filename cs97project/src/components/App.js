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
import Loginpage from './Loginpage';
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
		<Router>
			<div className="app">
				<div className="app_body">
					<Sidebar />
					<Chat
						messages={messages}
					// handleSendMessage={this.handleSendMessage}
					/>

					<Link to="/loginpage">Sign Out</Link>
					<Switch>
						<Route path="/loginpage">
							<Loginpage />
						</Route>
					</Switch>
				</div>
			</div>
		</Router>
	);
}

// class App extends React.Component {


//   state = {
//     contacts: [],

//     messages: tempData,
//   };







//   handleSendMessage = (message) => {

//   }; 

//   componentDidMount() {

//   };

//   componentDidUpdate(prevProps, prevState) {

//   };

//   componentWillUnmount() {
//     console.log('componentWillUnmount');
//   };


//   render() {
//     return (
//       <div className="app">
//         <div className="app_body">
//           <Sidebar />
//           <Chat 
//             messages={this.state.messages} 
//             handleSendMessage={this.handleSendMessage}
//           />
//         </div>
//       </div>
//     );
//   }
// }

export default App;

// const tempData =    
// [
//     {
//         username: "",
//         text: "hello",
//         time: "12:03"
//     },
//     {
//         username: "Eggert",
//         text: "emacs",
//         time: "1:00",
//     },
//     {
//         username: "drink",
//         text: "milk",
//         time: "1:00",
//     },
// ];


