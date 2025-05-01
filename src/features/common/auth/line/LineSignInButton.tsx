import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Image from 'next/image';
import { Typography } from '@mui/material';
import { getAdditionalUserInfo, signInWithRedirect } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider, OAuthProvider } from 'firebase/auth';
import { auth } from '@/app/firebase';
import { color } from 'html2canvas/dist/types/css/types/color';
import router from 'next/router';

type PageProps = {
    setIsLoading: any,
    setError: any
}

const loginBtnStyle = {
    background: "#06C755",
    color: "white",
    display: "flex",
    height: "42px",
    fontSize: "14px",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    border: "1.5px solid #06C755",
    borderRadius: "10px",
    margin: "8px 0",
    cursor: "pointer"
}

export default function LineSignInButton({ setIsLoading, setError }: PageProps) {

    const LineSignIn = async () => {
        const provider = new OAuthProvider('oidc.line');

        try {
            const res = await signInWithPopup(auth, provider);
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
        <Button onClick={() => { LineSignIn() }} style={loginBtnStyle}>
            <span className="icon" style={{ marginRight: "10px", marginBottom: 2 }}><Icon /></span>
            <Typography variant="body1" sx={{ fontSize: 14, fontWeight: 600, color: "white", textTransform: "capitalize" }}>
                LINEではじめる
            </Typography>
        </Button>
    );
} 

function Icon() {
    return (
        <Image src="/images/auth/line-icon.png" width={25} height={25} alt="line_img" />
    );
}