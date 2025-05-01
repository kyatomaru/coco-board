"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation'
import { onAuthStateChanged, getAuth } from "firebase/auth"
import { auth } from '@/app/firebase';
import type { User } from "firebase/auth"
import { Router } from 'next/router';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function AuthLoadingPage() {
    const router = useRouter()
    const [user, setUser] = React.useState<User | undefined>(null)

    React.useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            }
        })
    });

    return (
        <>
            {user == null &&
                <Box sx={{ overflow: "hidden", position: "fixed", zIndex: 2200, display: 'flex', width: "100%", height: "100vh", maxWidth: "550px", alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
                    <CircularProgress sx={{ zIndex: 2000 }} color="success" />
                </Box>
            }
        </>
    );
}