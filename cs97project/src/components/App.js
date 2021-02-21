import React from 'react';
import Chat from './Chat';
import Sidebar from './Sidebar';
import '../styles/App.css';

class App extends React.Component {
  state = {
    contacts: [],
    messages: tempData,
  };

  handleSendMessage = (message) => {
    
  }; 

  componentDidMount() {
    
  }

  componentDidUpdate(prevProps, prevState) {
    
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }
  
  render() {
    return (
      <div className="app">
        <div className="app_body">
          <Sidebar />
          <Chat 
            messages={this.state.messages} 
            handleSendMessage={this.handleSendMessage}
          />
        </div>
      </div>
    );
  }
}

export default App;

const tempData =    
[
    {
        username: "",
        text: "hello",
        time: "12:03"
    },
    {
        username: "Eggert",
        text: "emacs",
        time: "1:00",
    },
    {
        username: "drink",
        text: "milk",
        time: "1:00",
    },
];
