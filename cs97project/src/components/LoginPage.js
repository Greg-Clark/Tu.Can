import React, { useRef, useState } from 'react';
// import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

//config
firebase.initializeApp({
    apiKey: "AIzaSyCwAH05rOuy7BstqOV-owyNwFrp3W8fmfU",
    authDomain: "cs97project-968d0.firebaseapp.com",
    projectId: "cs97project-968d0",
    storageBucket: "cs97project-968d0.appspot.com",
    messagingSenderId: "932880062417",
    appId: "1:932880062417:web:dc00eb9252e7dee95f32f0"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

  
function LoginPage() {
    const [user] = useAuthState(auth);
    return (
        <div>        
        <h1>In progress : Login Page</h1>
        <form>
            {/*username*/}
            <p>username:</p>
            <input type="text" name="username"/>
            {/*password*/}
            <p>password:</p>
            <input type="text" name="password"/>
            <br></br>
            {/*input*/}
            <Link to="/messaging">
            <SignIn />
            </Link>
            <Link to="/register">
            <input type="submit" value="Register"/>
            </Link>
            </form>
        </div>
    );
}

function SignIn () {
    //creates google sign in popup window
    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }
  
    return (
      <button onClick={signInWithGoogle}>Sign In With Google</button>
    )
  }
  
  //If there is a current user, this function will sign them out
  function SignOut () {
    return auth.currentUser && (
      <button onClick={() => auth.signOut()}>Sign Out</button>
    )
  }

export default LoginPage;