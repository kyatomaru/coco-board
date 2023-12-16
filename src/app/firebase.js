import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAMuTnEQE6oD67cVhgyaZ2Ffdqf3mOQrxI",
    // authDomain: "soccer-note-714d1.firebaseapp.com",
    authDomain: "https://soccer-note.vercel.app/",
    projectId: "soccer-note-714d1",
    storageBucket: "soccer-note-714d1.appspot.com",
    messagingSenderId: "789270839877",
    appId: "1:789270839877:web:0db557eda811f4f148592c",
    measurementId: "G-1GMQJRB5TM"
};

// typeof window !== 'undefined' && getApps().length === 0 ?
//     initializeApp(firebaseConfig)
//     : getApp();
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);


export { auth, db }