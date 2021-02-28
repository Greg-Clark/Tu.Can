import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../Backend_Files/firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import '../styles/LoginPage.css';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    };

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    };

    function SignInWithGoogle() {
        //creates google sign in popup window
        const signInWithGoogle = () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            auth.signInWithPopup(provider);
        }

        return (
            <button className="buttons" onClick={signInWithGoogle}>Sign In With Google</button>
        )
    }

    function signOut () {
        return auth.signOut();
        // return auth.currentUser && (
        //     <button onClick={() => auth.signOut()}>Sign Out</button>
        // )
    }


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          setCurrentUser(user);
          setLoading(false);
        })
    
        return unsubscribe;
    }, []);


    const value = {
        currentUser, 
        signup,
        login,
        SignInWithGoogle,
        signOut,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}