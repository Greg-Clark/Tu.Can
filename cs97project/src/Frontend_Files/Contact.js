import React from 'react';
import { Avatar } from '@material-ui/core';
import '../styles/Contact.css';
 
// Should probably pass props to this and get props.userName 
const Contact = () => (
    <div className="contact">
        <Avatar src="https://i.stack.imgur.com/34AD2.jpg"/>
        <div className="contact__info">
            <h2>Username</h2>
            <p>This is the last message</p>
        </div>
    </div>
);

export default Contact;
