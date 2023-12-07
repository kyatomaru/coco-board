"use client"

import * as React from 'react';
// import "./GoogleButton.module.scss"
import { useRouter } from 'next/navigation'
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase"

export default function GoogleSignInButton() {
    const router = useRouter()
    const GoogleSignOut = async () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            router.push('/')
        }).catch((error) => {
            // An error happened.
        });

    }

    return (
        <div id="gSignInWrapper" onClick={GoogleSignOut}>
            {/* <span className="label">Sign in with:</span>
            <div id="customBtn" className="customGPlusSignIn">
                <span className="icon"></span>
                <span className="buttonText">Google</span>
            </div> */}
            <p>Sign Out</p>
        </div>
    );
}