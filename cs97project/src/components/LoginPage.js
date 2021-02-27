import React, { useRef, useState } from 'react';
import { useAuth } from '../services/Auth';
import { Link, useHistory } from 'react-router-dom';

export default function LoginPage() {
    
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login, SignInWithGoogle } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleFormSubmit(e) {
        e.preventDefault()

        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push("/messaging");
        } 
        catch {
            setError("Failed to log in");
        }

        setLoading(false);
    }


    return (
      <div>
        <h1>Tu.can</h1>
        <h2>Log in</h2>
        <div>
          <form onSubmit={handleFormSubmit}>
            {error && <p>{error}</p>}
            <label>User Name</label><br />
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
            <button
              disabled={loading}
              type="submit"
            >
              Log In
            </button>
          </form>
        </div>
        <SignInWithGoogle />
        <div>
          Need an account?
            <Link to="/register">Register Here</Link>
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

