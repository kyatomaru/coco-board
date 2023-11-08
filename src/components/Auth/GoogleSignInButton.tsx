"use client"

import * as React from 'react';
// import "./GoogleButton.module.scss"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "@/app/firebase"

export default function GoogleSignInButton() {
    const GoogleProvider = new GoogleAuthProvider();
    const GoogleSignIn = () => {
        signInWithPopup(auth, GoogleProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential !== null ? credential.accessToken : null;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
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