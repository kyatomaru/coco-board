import { cert, initializeApp, getApps, getApp } from 'firebase-admin/app';
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";
const serviceAccount = require('@/app/firebase-serviceAccount.json');

const firebaseApp = getApps().length === 0 ?
    initializeApp({
        credential: cert(serviceAccount),
    })
    : getApp();


const db = getFirestore();
const auth = getAuth();

export { db, auth } 
