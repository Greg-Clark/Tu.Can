import React, { useRef, useState } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

//config
firebase.initializeApp({

})

const auth = firebase.auth();
const firestore = firebase.firestore();



// Lets us know if user is signed in or not (defined or null)
function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        <h1>TU.Can</h1>
        <SignOut />
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
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

function ChatRoom() {
  const dummy = useRef()
  //reference firestore collection
  const messagesReference = firestore.collection('messages');

  //query documents into collection
  //orders message by creation date
  const query = messagesReference.orderBy('createdAt').limit(25);

  //track updates realtime
  const [messages] = useCollectionData(query, {idField: 'id'});
  const [formValue, setFormValue] = useState('');
  
  const sendMessage = async(e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;

    //create a new document with firestore
    await messagesReference.add({
      text:formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });

    setFormValue('');
    dummy.current.scrollIntoView({behavior : 'smooth'})
  }

  return (
    <>
      <main>
        {/* if there is a message:
                    create ChatMessage
                    with key being the message id
                    and
                    message eing the actually contents of the message
        */}
        {messages && messages.map(msg => <ChatMessage key ={msg.id} message={msg}/> )}
        <div ref={dummy}></div>
      </main>
      {/* write to firestore */}
      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
        <button type="submit">YUH</button>
      </form>
    </>
  )


}

//props are things mapped from the ChatRoom return statement
function ChatMessage(props) {
  const {text, uid, photoURL} = props.message;

  const messageClass = uid === auth.currentUser.uid;
  //returns paragraph tag with contents of message
  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} />
      <p>{text}</p>
    </div>
  ) 
}

export default App;
