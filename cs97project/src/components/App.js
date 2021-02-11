import React from 'react';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp({
    apiKey: "AIzaSyCwAH05rOuy7BstqOV-owyNwFrp3W8fmfU",
    authDomain: "cs97project-968d0.firebaseapp.com",
    projectId: "cs97project-968d0",
    storageBucket: "cs97project-968d0.appspot.com",
    messagingSenderId: "932880062417",
    appId: "1:932880062417:web:dc00eb9252e7dee95f32f0"
});

export default class App extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {
        return (
        <div>
            <MessageList messages={this.state.messages}/>
            <SendMessageForm />
         </div>
        );
    }
}

function signIn() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
  // https://firebase.google.com/docs/auth/web/google-signin

}
function signOut() {
  firebase.auth().signOut().then(() => {
    alert('Signed out');
  }).catch((error) => {
    alert('Problem when signing out')
  });

  //https://firebase.google.com/docs/auth/web/password-auth
}

