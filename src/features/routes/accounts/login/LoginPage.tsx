"use client"

import * as React from 'react';
import GoogleSignInButton from '../../../common/auth/google/GoogleSignInButton';
// import LineSignInButton from '../../../components/auths/line/LineSignInButton';
// import XSignInButton from '../../../components/auths/x/XSignInButton';
import GoogleSignOutButton from '../../../common/auth/google/GoogleSignOutButton';
import { useRouter } from 'next/navigation'
import { onAuthStateChanged, getAuth } from "firebase/auth"
import { auth } from '@/app/firebase';
import type { User } from "firebase/auth"
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import CardMedia from '@mui/material/CardMedia';
import LoginBox from './LoginBox';


export default function LoginPage() {
    const router = useRouter()
    const [user, setUser] = React.useState<User | undefined>()

    React.useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (user.emailVerified) {
                    router.replace('/home')
                }
            }
        })
    });

    return (
        <Container maxWidth="xs" fixed sx={{ mt: "70px", mb: "30px" }}>
            <Box sx={{ alignItems: "center", px: "25px", pt: "30px", pb: "15px", textAlign: "center", border: "solid 0.5px #b2b2b2" }}>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={2}
                    sx={{ mb: "40px" }}>
                    < CardMedia
                        component="img"
                        sx={{ width: 50, height: 50 }}
                        image="/images/icon.png"
                    />
                    <Typography sx={{
                        fontSize: { xs: 25, md: 30 },
                        fontWeight: "bold"
                    }}>
                        coco-board
                    </Typography>
                </Stack>
                <Box sx={{ mb: 3 }}>
                    <p style={{ textAlign: "center", fontSize: "1em", fontWeight: 400, color: "black" }}>
                        ようこそ。coco-boardを使用するにはGoogleアカウントでのログインが必要となります。
                    </p>
                </Box>
                <GoogleSignInButton />
                {/* <LineSignInButton /> */}
                {/* <XSignInButton /> */}
            </Box>
        </Container>
    );
}