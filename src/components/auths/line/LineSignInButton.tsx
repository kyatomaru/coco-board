"use client"

import * as React from 'react';
import { createButton } from "react-social-login-buttons";
import { signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "@/app/firebase"
import Image from "next/image"

const LineSignIn = async () => {
    const LineProvider = new GoogleAuthProvider();
    LineProvider.setCustomParameters({
        prompt: "select_account"
    });
    const user = await signInWithPopup(auth, LineProvider)
}

// const config = {
//     activeStyle: { background: "#EFF0EE" },
//     icon: Icon,
//     style: { background: "white", color: "black", height: "40px", fontSize: "13px", justifyContent: "center" },
//     text: "Lineでログイン",
//     onclick: { LineSignIn },
//     align: "center",
//     size: "50px"
// };

const loginBtnStyle = {
    background: "#06C755",
    display: "flex",
    color: "#FFFFFF",
    height: "42px",
    fontSize: "14px",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderRadius: "3px",
    margin: "8px 0"
}

// const LineSignInButton = createButton(config);

export default function LineSignInButton() {
    return (
        <button onClick={() => { LineSignIn() }} style={loginBtnStyle}>
            <span className="icon" style={{ marginRight: "10px" }}><Icon /></span>
            <span className="buttonText">LINEでログイン</span>
        </button >
    );
}

// export default LineSignInButton;

function Icon() {
    return (
        <Image src="/auth/line-icon.png" width={32} height={32} alt="line_img" />
    );
}