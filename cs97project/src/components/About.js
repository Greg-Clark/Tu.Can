import React from 'react';
import tucanOnEgg from '../images/tucanOnEgg.png';
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
                        <p>Tu.can is a simple messaging app designed to amplify communication. 
                            Built admist the COVID-19 pandemic, we recognized the lack of human contact 
                            and face-to-face interaction with remote learning. Therefore, we decided 
                            to help people settle for the next best thing: messaging.
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