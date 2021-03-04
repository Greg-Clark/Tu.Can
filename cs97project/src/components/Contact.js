import React from 'react';
import { Avatar } from '@material-ui/core';
import '../styles/Contact.css';

 
// Should probably pass props to this and get props.userName 
function Contact (props) {
    const handleClick = () => {
        // console.log(props.roomID);
        props.switchRoom(props.roomID);
    }
    
    return (
        <div className="contact" onClick={handleClick}>
            <Avatar src="https://i.stack.imgur.com/34AD2.jpg"/>
            <div className="contact__info">
                <h2>
                    {props.users.join(", ")}
                </h2>
            </div>
        </div>
    );
}

export default Contact;
