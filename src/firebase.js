import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'
import { FacebookAuthProvider, getAuth } from 'firebase/auth'
import { GoogleAuthProvider } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCtKBPs_cFKpWdwBSmSCOpd0guwsh1s0uE",
    authDomain: "clone-quora-6bddd.firebaseapp.com",
    projectId: "clone-quora-6bddd",
    storageBucket: "clone-quora-6bddd.appspot.com",
    messagingSenderId: "912431124883",
    appId: "1:912431124883:web:f9f175e27f33744f861866",
    measurementId: "G-XF9G0N89FY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider }

export default db;