import React from 'react';
import tucanOnEgg from '../images/tucanlogoonegg.png';
import { Link, useHistory } from 'react-router-dom';
import '../styles/About.css';

class About extends React.Component {
	render() {
		return (
            <div class="grid">

                <div class = "box1">
                    <div className="About">
                    <h2>About Tu.can</h2>
                    <br></br>
                        <p>Tu.Can is a simple messaging application built for UCLA CS 97. We were inspired to create a messaging application due to the circumstances of COVID-19. Due to the lack of in-person interaction, 
                            we believed a messaging application would help others connect in a remote setting.
                        </p>
                        <br></br>
                        <p>The name is inspired by the traditional use 
                            of birds as messengers, and that "Tu.Can" talk with the application.
                        </p>
                        <br></br>
                        <p>Created by Terry Chen, Gregory Clark, 
                            Roye Fang, Karim Saraipour, and Michelle Xie.
                        </p>
                    </div>
                </div>

                <div class = "box2">
                    <div className="VerticalBlackLine"></div>
                </div>

                <div class = "box3">
                    <div className="logo"><img src={tucanOnEgg} alt={"tucanOnEgg"} /></div>
                </div>

                <div className="loginButton">
                            <Link to="/">
                                Back to Login
                            </Link>  
                </div> 
                
            </div>
		);
	}
}

export default About;