"use client"

import * as React from 'react';
import { createButton } from "react-social-login-buttons";
import { signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "@/app/firebase"
import Image from "next/image"

const XSignIn = async () => {
    const XProvider = new GoogleAuthProvider();
    XProvider.setCustomParameters({
        prompt: "select_account"
    });
    const user = await signInWithPopup(auth, XProvider)
}

// const config = {
//     activeStyle: { background: "#EFF0EE" },
//     icon: Icon,
//     style: { background: "white", color: "black", height: "40px", fontSize: "13px", justifyContent: "center" },
//     text: "Xでログイン",
//     onclick: { XSignIn },
//     align: "center",
//     size: "50px"
// };

const loginBtnStyle = {
    background: "#0f1419",
    display: "flex",
    color: "white",
    height: "42px",
    fontSize: "14px",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    border: "1px solid gray",
    borderRadius: "3px"
}

// const XSignInButton = createButton(config);

export default function XSignInButton() {
    return (
        <button onClick={() => { XSignIn() }} style={loginBtnStyle}>
            <span className="icon" style={{ marginRight: "10px" }}><Icon /></span>
            <span className="buttonText">Xでログイン</span>
        </button >
    );
}

function Icon() {
    return (
        <Image src="/auth/x-icon.png" width={20} height={20} alt="line_img" />
    );
}