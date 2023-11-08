import { cert, initializeApp, getApps, getApp } from 'firebase-admin/app';
import { getFirestore } from "firebase-admin/firestore";
const serviceAccount = require('@/app/firebase-serviceAccount.json');

const firebaseApp = getApps().length === 0 ?
    initializeApp({
        credential: cert(serviceAccount),
    })
    : getApp();


const db = getFirestore();

export { db } 
