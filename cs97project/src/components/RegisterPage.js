import React, { useRef, useState } from 'react';
import { useAuth } from '../services/Auth';
import { Link, useHistory } from 'react-router-dom';

export default function Signup() {
    
    const emailRef = useRef(); // ref for email captures form input
    const passwordRef = useRef(); // captures password form input
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const history = useHistory();

    async function handleFormSubmit(e) {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) // Checks if passwords and password confirmation matches
        {
            return setError('Passwords do not match');
        }

        try {
            setError('');
            setLoading(true); // If in loading state, register button cannot be pressed
            await signup(emailRef.current.value, passwordRef.current.value);
            history.push("/messaging"); // Redirect to messaging state
        }
        catch {
            setError('Failed to create an account');
        }
        setLoading(false);
    }

    return (
        <div>
            <h2>Register</h2>
            <div>
                <form onSubmit={handleFormSubmit}>
                    {error && <p>{error}</p>}
                    <label>Email</label><br />
                    <input
                        type="text"
                        data-test="username"
                        ref={emailRef}
                    /><br />
                    <label>Password</label><br />
                    <input
                        type="password"
                        data-test="password"
                        ref={passwordRef}
                    /><br />
                    <label>Confirm Password</label><br />
                    <input
                        type="password"
                        data-test="password"
                        ref={passwordConfirmRef}
                    />
                    <button
                        disabled={loading}
                        type="submit"
                    >
                        Register
                    </button>
                </form>
            </div>
            <div>
                Already have an account?
            <Link to="/">
                    Login Here
            </Link>
            </div>
        </div>
    );
}

