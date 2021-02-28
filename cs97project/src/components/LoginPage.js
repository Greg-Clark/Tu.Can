import React, { useRef, useState } from 'react';
import { useAuth } from '../services/Auth';
import { Link, useHistory } from 'react-router-dom';
import '../styles/LoginPage.css';
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
    <div class="grid">
      <div class = "box1">
        <div className="Logo">um put image here</div>
      </div>
      <div class = "box2">
        <div className="VerticalBlackLine"></div>
      </div>
      <div class = "box3">
        <div className="LoginBox">
          
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
                type="text"
                data-test="password"
                ref={passwordRef}
              /><br />
              <button
                className="buttons"
                disabled={loading}
                type="submit"
              >
                Log In
              </button>
              <SignInWithGoogle />
              <button className = "buttons">
                <Link to="/register">Register </Link>
              </button>
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

