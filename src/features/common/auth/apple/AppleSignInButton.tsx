"use client"

import * as React from 'react';
import { createButton } from "react-social-login-buttons";
import { signInWithRedirect, signInWithPopup, OAuthProvider } from "firebase/auth"
import { auth } from "@/app/firebase"
import Box from '@mui/material/Box';
import Image from "next/image"
import { useRouter } from 'next/navigation'


const AppleSignIn = async (router) => {
    const AppleProvider = new OAuthProvider('apple.com');
    // AppleProvider.setCustomParameters({
    //     locale: 'ja'
    // });

    await signInWithPopup(auth, AppleProvider)
        .then((res) => {
            router.replace("/home")
        }).catch((error) => {
            console.log(error)
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

const loginBtnStyle = {
    background: "white",
    display: "flex",
    color: "#7F7F7F",
    height: "42px",
    fontSize: "14px",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    border: "1.5px solid #AFAFAF",
    borderRadius: "10px",
    margin: "8px 0",
    cursor: "pointer"
}

export default function AppleSignInButton() {
    const router = useRouter()
    return (
        <button onClick={() => { AppleSignIn(router) }} style={loginBtnStyle}>
            <span className="icon" style={{ marginRight: "10px" }}><Icon /></span>
            <span className="buttonText" style={{ color: "black", fontWeight: "600" }}>Appleのアカウントでログイン</span>
        </button >
    );
}

function Icon() {
    return (
        <Image src="/images/auth/apple-icon.svg" width={20} height={20} alt="apple_img" />
    );
}
