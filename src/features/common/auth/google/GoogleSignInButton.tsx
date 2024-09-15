"use client"

import * as React from 'react';
import { createButton } from "react-social-login-buttons";
import { signInWithRedirect, signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo } from "firebase/auth"
import { auth } from "@/app/firebase"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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
                if (getAdditionalUserInfo(res)?.isNewUser) {
                    localStorage.setItem('isNewUser', "true")
                }
                router.push("/home")
            }).catch((error) => {
                console.log(error)
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    return (
        <Button onClick={() => { GoogleSignIn() }} style={loginBtnStyle}>
            <span className="icon" style={{ marginRight: "10px" }}><Icon /></span>
            <Typography variant="body1" sx={{ fontSize: 14, fontWeight: 600, color: "#7F7F7F", textTransform: "capitalize" }}>
                Googleでログイン
            </Typography>
        </Button>
    );
}

function Icon() {
    return (
        <Image src="/images/auth/google-icon.svg" width={20} height={20} alt="google_img" />
    );
}
