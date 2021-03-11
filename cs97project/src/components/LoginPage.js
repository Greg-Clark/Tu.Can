import React, { useRef, useState } from 'react';
import axios from './axios';
import { useUserContext } from '../contexts/UserProvider';
import { Link, useHistory } from 'react-router-dom';
import '../styles/LoginPage.css';
import tucanInFront from '../images/tucanInFront2.png';

export default function LoginPage() {

    const emailRef = useRef();
    const passwordRef = useRef();
    // const { login, SignInWithGoogle } = useAuth();
    const { login } = useUserContext();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();


    async function handleFormSubmit(e) {
        e.preventDefault()



        setError("");
        setLoading(true);
        e.preventDefault();
        // console.log(searchQuery);
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
            <div className="box1">
                <div className="Logo"><img src={tucanInFront} alt={"tucanInFront"} /></div>
            </div>
            <div class="box2">
                <div className="VerticalBlackLine"></div>
            </div>
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
                            <div className="buttons">
                                <Link to="/about">
                                    About
                    </Link>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}


// function SignInWithGoogle () {
//     //creates google sign in popup window
//     const signInWithGoogle = () => {
//       const provider = new firebase.auth.GoogleAuthProvider();
//       auth.signInWithPopup(provider);
//     }

//     return (
//       <button onClick={signInWithGoogle}>Sign In With Google</button>
//     )
//   }


  // //If there is a current user, this function will sign them out
  // function SignOut () {
  //   return auth.currentUser && (
  //     <button onClick={() => auth.signOut()}>Sign Out</button>
  //   )
  // }

