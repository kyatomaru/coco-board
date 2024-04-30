"use client"

import * as React from 'react';
import GoogleSignInButton from './google/GoogleSignInButton';
import LineSignInButton from './line/LineSignInButton';
import XSignInButton from './x/XSignInButton';
import GoogleSignOutButton from './google/GoogleSignOutButton';
import { useRouter } from 'next/navigation'
import { onAuthStateChanged, getAuth } from "firebase/auth"
import type { User } from "firebase/auth"
import { Router } from 'next/router';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';



export default function LoginPage() {
    const router = useRouter()
    const [user, setUser] = React.useState<User | undefined>()

    React.useEffect(() => {
        const auth = getAuth();

        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(auth.currentUser)
                //router.push('/notes/2023-06-27')
            }
        })
    });

    return (
        <Container maxWidth="sm" fixed sx={{ mt: "30px", textAlign: "center" }}>
            <Box sx={{ mb: "20px" }}>
                <Typography variant="h5">
                    サッカーノート
                </Typography>
                <Typography variant="body1">
                    ログインしてください
                </Typography>
            </Box>
            <GoogleSignInButton />
            {/* <LineSignInButton /> */}
            {/* <XSignInButton /> */}
        </Container>
    );
}