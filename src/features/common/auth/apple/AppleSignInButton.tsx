"use client"

import * as React from 'react';
import { createButton } from "react-social-login-buttons";
import { signInWithRedirect, signInWithPopup, OAuthProvider, getAdditionalUserInfo } from "firebase/auth"
import { auth } from "@/app/firebase"
import Box from '@mui/material/Box';
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { Button, Typography } from '@mui/material';


const loginBtnStyle = {
    background: "black",
    display: "flex",
    color: "white",
    height: "42px",
    fontSize: "14px",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    border: "1.5px solid black",
    borderRadius: "10px",
    margin: "8px 0",
    cursor: "pointer"
}

type PageProps = {
    setIsLoading: (isLoading: boolean) => void,
    setError: any
}

export default function AppleSignInButton({ setError, setIsLoading }: PageProps) {
    const router = useRouter()

    const AppleSignIn = async (router) => {
        const AppleProvider = new OAuthProvider('apple.com');
    
        await signInWithPopup(auth, AppleProvider)
            .then((res) => {
                if (getAdditionalUserInfo(res)?.isNewUser) {
                    localStorage.setItem('isNewUser', "true");
                    localStorage.setItem('isNewCreateBoard', "true");
                }
            }).catch((error) => {
                console.log(error)
                setError(true)
            });
    }

    return (
        <Button onClick={() => { AppleSignIn(router) }} style={loginBtnStyle}>
            <span className="icon" style={{ marginRight: "10px", marginBottom: 2 }}><Icon /></span>
            <Typography variant="body1" sx={{ fontSize: 14, fontWeight: 600, color: "white", textTransform: "capitalize" }}>
                Appleではじめる
            </Typography>
        </Button>
    );
}

function Icon() {
    return (
        <Image src="/images/auth/apple-icon.png" width={20} height={20} alt="apple_img" />
    );
}
