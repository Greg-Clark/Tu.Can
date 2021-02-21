import React from 'react';
import '../styles/Message.css';

// To be used to break up components
export default class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sender: this.props.sender,
            text: this.props.text,
            time: this.props.time,
        }
    }

    render() {
        return (
            <div>
                <p className="message_text">
                    <span className="message__name">{this.state.sender}</span>
                    {this.state.text}
                    <span className="message__timestamp">
                        {this.state.time}
                    </span>
                </p>
            </div>
        );
    }
}
