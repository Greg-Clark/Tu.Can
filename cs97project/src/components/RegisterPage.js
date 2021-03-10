import React, { useRef, useState, useEffect } from 'react';
import { useAuth } from '../services/Auth';
import { useUserContext } from '../contexts/UserProvider';
import { Link, useHistory } from 'react-router-dom';
import axios from './axios';
import Pusher from 'pusher-js';
import tucanOnEgg from '../images/tucanOnEgg.png';

export default function Signup() {
    
    const emailRef = useRef(); // ref for email captures form input
    const passwordRef = useRef(); // captures password form input
    const passwordConfirmRef = useRef();
    const { login, currentUser } = useUserContext();
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const history = useHistory();
    const [users, setUsers] = useState([]);
    //const [searchQuery, setSearchQuery] = useState("");

    const [input, setInput] = useState("");

    const createUser = async (e) => {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) // Checks if passwords and password confirmation matches
        {
            return setError('Passwords do not match');
        }

        if (passwordRef.current.value.length < 4 || passwordRef.current.value.length > 50) // Checks if passwords and password confirmation matches
        {
            return setError('Password must between 4 and 50 characters');
        }  

        setError('');
        setLoading(true);
        // need to check if user already exists
        await axios.post("/users/new", {
            username: emailRef.current.value,
            password: passwordRef.current.value,
        }).then(response => {
            if(!response.data) {
                alert("you messed up");
            }

        }
        );
        login(emailRef.current.value);
        history.push("/messaging"); 

        setLoading(false);
        
        setInput('');
    };



	// ==================makes users in mongo real time========================
	useEffect(() => {
		axios.get('/users/sync')
			.then(response => {
				console.log(response.data);
				setUsers(response.data);
			})
	}, []);

	useEffect(() => {
		const pusher = new Pusher('8cdc3d1a07077d29caf4', {
			cluster: 'us3'
		});

		const channel = pusher.subscribe('users');
		channel.bind('inserted', (newUser) => {
			//append new messages to current message array
			setUsers([...users, newUser]);
		});

		// ensures there is only 1 subscriber(listener)
		return () => {
			channel.unbind_all();
			channel.unsubscribe();
		};
	}, [users]); // captures messages since it is a dependency

    
    return (
        <div class="grid">
            <div class = "box1">
                <div className="Logo"><img src={tucanOnEgg} alt={"tucanOnEgg"}/></div>
            </div>
            <div class = "box2">
                <div className="VerticalBlackLine"></div>
            </div>
            <div class = "box3">
                <div className="RegisterBox">
                    <h2>Register</h2>
                    <br></br>
                    <div>
                        <form onSubmit={createUser}>
                            {error && <p>{error}</p>}
                            <label>Username</label><br />
                            <input
                                className="input"
                                type="text"
                                data-test="username"
                                ref={emailRef}
                            /><br />
                            <label>Password</label><br />
                            <input
                                className="input"
                                type="password"
                                data-test="password"
                                ref={passwordRef}
                            /><br />
                            <label>Confirm Password</label><br />
                            <input
                                className="input"
                                type="password"
                                data-test="password"
                                ref={passwordConfirmRef}
                            />
                            <br></br>
                            <br></br>
                            <button
                                onClick={createUser}
                                className="buttons"
                                disabled={loading}
                                type="submit"
                            >
                                Register
                            </button>
                            
                            <div className="buttons">                  
                                <Link to="/about">
                                About
                                </Link> 
                            </div>
                        </form>
                    </div>
                    <br></br>
                    <div>
                        Already have an account?&nbsp;
                        <Link to="/">
                             Login Here
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

