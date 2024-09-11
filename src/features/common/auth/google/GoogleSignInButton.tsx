"use client"

import * as React from 'react';
import { createButton } from "react-social-login-buttons";
import { signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "@/app/firebase"
import Box from '@mui/material/Box';
import Image from "next/image"
import { useRouter } from 'next/navigation'

type PageProps = {
    setIsLoading: any
}

// const config = {
//     activeStyle: { background: "#EFF0EE" },
//     icon: Icon,
//     style: { background: "white", color: "black", height: "40px", fontSize: "13px", justifyContent: "center" },
//     text: "Googleでログイン",
//     onclick: { GoogleSignIn },
//     align: "center",
//     size: "50px"
// };

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

export default function GoogleSignInButton({ setIsLoading }: PageProps) {
    const router = useRouter()
    const [error, setError] = React.useState(undefined)

    const GoogleSignIn = async () => {

        const GoogleProvider = new GoogleAuthProvider();
        GoogleProvider.setCustomParameters({
            prompt: "select_account"
        });

        await signInWithPopup(auth, GoogleProvider)
            .then((res) => {
                setIsLoading(true)
                router.replace("/home")
            }).catch((error) => {
                setError(error)
                console.log(error)
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    return (
        <button onClick={() => { GoogleSignIn() }} style={loginBtnStyle}>
            <span className="icon" style={{ marginRight: "10px" }}><Icon /></span>
            <span className="buttonText" style={{ color: "black", fontWeight: "600" }}>Googleでログイン</span>
            {error}
        </button >
    );
}

function Icon() {
    return (
        <Image src="/images/auth/google-icon.svg" width={20} height={20} alt="google_img" />
    );
}
