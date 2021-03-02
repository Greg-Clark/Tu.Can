import React from 'react';
import { Avatar } from '@material-ui/core';
import '../styles/Contact.css';
 
// Should probably pass props to this and get props.userName 
function Contact (props) {
    return (
        <div className="contact">
            <Avatar src="https://i.stack.imgur.com/34AD2.jpg"/>
            <div className="contact__info">
                <h2>{props.users}</h2>
            </div>
        </div>
    );
}

export default Contact;
