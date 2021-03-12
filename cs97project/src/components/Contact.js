import React from 'react';
import { Avatar } from '@material-ui/core';
import '../styles/Contact.css';

// chat names
function Contact (props) {
    const handleClick = () => {
        props.switchRoom(props.roomID, props.users.join(", "));
    }
    
    return (
        <div className="contact" onClick={handleClick}>
            <Avatar>{props.users.join("").charAt(0).toUpperCase()}</Avatar>
            <div className="contact__info">
                <h2> {props.users.join(", ")} </h2>
            </div>
        </div>
    );
}

export default Contact;