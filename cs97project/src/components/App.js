import React, { useState, useEffect } from 'react';
import Chat from './Chat';
import Sidebar from './Sidebar';
import '../styles/App.css';
import Pusher from 'pusher-js';
import axios from './axios'
// import { render } from '@testing-library/react';


function App() {
  const [messages, setMessages] = useState([]);

  useEffect (() => {
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
    channel.bind('inserted', function(newMessage) {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);
  return (
    <div className="app">
      <div className="app_body">
        <Sidebar />
        <Chat 
          messages= {messages}
          // handleSendMessage={this.handleSendMessage}
        />
      </div>
    </div>
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


