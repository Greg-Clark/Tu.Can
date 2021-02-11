import React from 'react';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';

export default class App extends React.Component {
    constructor() {
        super()
        this.state = {
           messages: tempData
        }
    }

    render() {
        return (
        <div>
            <MessageList messages={this.state.messages}/>
            <SendMessageForm />
         </div>
        );
    }
}

