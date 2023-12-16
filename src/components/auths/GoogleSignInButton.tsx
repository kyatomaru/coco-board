"use client"

import * as React from 'react';
// import "./GoogleButton.module.scss"
import { useRouter } from 'next/navigation'
import { signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "@/app/firebase"

export default function GoogleSignInButton() {
    const router = useRouter()
    const GoogleProvider = new GoogleAuthProvider();
    GoogleProvider.setCustomParameters({
        prompt: "select_account"
    });
    const GoogleSignIn = async () => {
        const user = await signInWithPopup(auth, GoogleProvider)
    }

    return (
        <div id="gSignInWrapper" onClick={GoogleSignIn}>
            {/* <span className="label">Sign in with:</span>
            <div id="customBtn" className="customGPlusSignIn">
                <span className="icon"></span>
                <span className="buttonText">Google</span>
            </div> */}
            <p>Sign In</p>
        </div>
    );
}