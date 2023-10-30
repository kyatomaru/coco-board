import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAMuTnEQE6oD67cVhgyaZ2Ffdqf3mOQrxI",
    authDomain: "soccer-note-714d1.firebaseapp.com",
    projectId: "soccer-note-714d1",
    storageBucket: "soccer-note-714d1.appspot.com",
    messagingSenderId: "789270839877",
    appId: "1:789270839877:web:0db557eda811f4f148592c",
    measurementId: "G-1GMQJRB5TM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db