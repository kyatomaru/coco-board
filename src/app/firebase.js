import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBl1jvE4K7DtNSZyetpwjYDlFYZaYUnq24",
    // authDomain: "coco-board-app.firebaseapp.com",
    authDomain: "cocoboard.jp",
    projectId: "coco-board-app",
    storageBucket: "coco-board-app.appspot.com",
    messagingSenderId: "49261316257",
    appId: "1:49261316257:web:dfaef996b2c1a7509d48e0",
    measurementId: "G-6SLDJVH50X",
    storageBucket: 'gs://coco-board-app.appspot.com'
};

// typeof window !== 'undefined' && getApps().length === 0 ?
//     initializeApp(firebaseConfig)
//     : getApp();
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage }