import React, { useRef, useState, useEffect } from 'react';
import { useUserContext } from '../contexts/UserProvider';
import { Link, useHistory } from 'react-router-dom';
import axios from './axios';
import Pusher from 'pusher-js';
import tucanOnEgg from '../images/tucanlogoonegg.png';

export default function Signup() {

    // Hooks
    const usernameRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { login, currentUser } = useUserContext();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [usernameDoesntExists, setUsernameDoesntExists] = useState(false);
    const history = useHistory();
    const [users, setUsers] = useState([]);
    const [input, setInput] = useState("");

    // Creating user account handler
    const createUser = (e) => {
        e.preventDefault();

        // Checks if username is under 25 characters
        if (usernameRef.current.value.length < 1 || usernameRef.current.value.length > 25) {
            return setError('Username must be under 25 characters');
        }
        // Checks if passwords and password confirmation matches
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match');
        }
        // Checks if passwords length is valid
        if (passwordRef.current.value.length < 4 || passwordRef.current.value.length > 20) {
            return setError('Password must between 4 and 20 characters');
        }
        setError('');
        setLoading(true);
        axios.get(`/users/search?target=${usernameRef.current.value}`)
            .then(response => {
                if (response.data.username == null) {
                    setUsernameDoesntExists(true);
                }
                else {
                    setUsernameDoesntExists(false);
                    setError("User already exists");
                }
            })
        setLoading(false);
        setInput('');
    };

    useEffect(() => {
        if (usernameDoesntExists) {
            axios.post("/users/new", {
                username: usernameRef.current.value,
                password: passwordRef.current.value,
            });
            login(usernameRef.current.value);
            history.push("/messaging");
        }
    }, [usernameDoesntExists]);

    // makes users real time
    useEffect(() => {
        axios.get('/users/sync')
            .then(response => {
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
    }, [users]);


    return (
        <div class="grid">
            {/* Logo */}
            <div class="box1">
                <div className="Logo"><img src={tucanOnEgg} alt={"tucanOnEgg"} /></div>
            </div>
            {/* Black line */}
            <div class="box2">
                <div className="VerticalBlackLine"></div>
            </div>
            {/* Register box */}
            <div class="box3">
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
                                ref={usernameRef}
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

                            <button className="buttons">
                                <Link to="/about">
                                    About
                                </Link>
                            </button>
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
