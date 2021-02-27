import 'firebase/firestore';
import 'firebase/auth';
import firebase from 'firebase/app';

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

export { auth, firestore };