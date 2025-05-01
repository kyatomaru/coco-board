"use client"

import * as React from 'react';
import { createButton } from "react-social-login-buttons";
import { signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo } from "firebase/auth"
import { auth } from "@/app/firebase"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from "next/image"
import { useRouter } from 'next/navigation'

type PageProps = {
    setIsLoading: any,
    setError: any
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

export default function GoogleSignInButton({ setIsLoading, setError }: PageProps) {
    const router = useRouter()

    const GoogleSignIn = async () => {
        const GoogleProvider = new GoogleAuthProvider();
        GoogleProvider.setCustomParameters({
            prompt: "select_account"
        });

        try {
            const res = await signInWithPopup(auth, GoogleProvider);
            setIsLoading(true);
            if (getAdditionalUserInfo(res)?.isNewUser) {
                localStorage.setItem('isNewUser', "true");
                localStorage.setItem('isNewCreateBoard', "true");
            }
        } catch (error) {
            console.error(error);
            setError(true);
        }
    }

    return (
        <Button onClick={() => { GoogleSignIn() }} style={loginBtnStyle}>
            <span className="icon" style={{ marginRight: "10px", marginBottom: 2 }}><Icon /></span>
            <Typography variant="body1" sx={{ fontSize: 14, fontWeight: 600, color: "#7F7F7F", textTransform: "capitalize" }}>
                Googleではじめる
            </Typography>
        </Button>
    );
}

function Icon() {
    return (
        <Image src="/images/auth/google-icon.svg" width={20} height={20} alt="google_img" />
    );
}
