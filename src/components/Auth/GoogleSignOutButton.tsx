"use client"

import * as React from 'react';
// import "./GoogleButton.module.scss"
import { signOut, getAuth } from "firebase/auth";
import { auth } from "@/app/firebase"

export default function GoogleSignInButton() {
    const GoogleSignOut = async () => {
        const auth = getAuth();
        await signOut(auth).then(() => {
            // Sign-out successful.
            console.log('200')
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