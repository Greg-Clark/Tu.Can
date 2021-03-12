import React, { useRef, useState } from 'react';
import axios from './axios';
import { useUserContext } from '../contexts/UserProvider';
import { Link, useHistory } from 'react-router-dom';
import '../styles/LoginPage.css';
import tucanInFront from '../images/tucanlogoonegg.png';

export default function LoginPage() {

    // Hooks
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useUserContext();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    // Submit handler for login
    async function handleFormSubmit(e) {

        e.preventDefault();
        setError("");
        setLoading(true);
        e.preventDefault();
        axios.get(`/login?username=${emailRef.current.value}&password=${passwordRef.current.value}`)
            .then(response => {
                // console.log(response.data);
                if (response.data === 0) {
                    login(emailRef.current.value);
                    history.push("/messaging");
                }
                else if (response.data === 1) {
                    login("");
                    setError("Failed to login");
                }
            });
        setLoading(false);
    }

    return (
        <div className="grid">
            {/* Logo */}
            <div className="box1">
                <div className="Logo"><img src={tucanInFront} alt={"tucanInFront"} /></div>
            </div>
            {/* Black line */}
            <div class="box2">
                <div className="VerticalBlackLine"></div>
            </div>
            {/* Login box */}
            <div class="box3">
                <div className="LoginBox">
                    <h2>Login</h2>
                    <br></br>
                    <div>
                        <form onSubmit={handleFormSubmit}>
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
                            <br></br>
                            <button
                                className="buttons"
                                disabled={loading}
                                type="submit"
                            >
                                Log In
                            </button>
                            <button className="buttons">
                                <Link to="/register">Register </Link>
                            </button>
                            <button className="buttons">
                                <Link to="/about">
                                    About
                                </Link>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}