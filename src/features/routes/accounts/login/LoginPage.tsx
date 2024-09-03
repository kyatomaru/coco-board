"use client"

import * as React from 'react';
import LoadingPage from '@/components/LoadingPage';
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

    return (
        <Container maxWidth="xs" fixed sx={{ mt: { xs: "30px", md: "70px" }, mb: "30px" }}>
            <Box sx={{ alignItems: "center", px: "25px", pt: "30px", pb: "15px", textAlign: "center", border: "solid 0.5px #b2b2b2" }}>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={2}
                    sx={{ mb: "40px" }}>
                    <CardMedia
                        component="img"
                        sx={{ width: 50, height: 50 }}
                        image="/images/icon.png"
                    />
                    <Typography sx={{
                        fontSize: { xs: 25, md: 30 },
                        fontWeight: "bold",
                        color: "black"
                    }}>
                        coco-board
                    </Typography>
                </Stack>
                <LoginBox />
                <Divider>
                    <Typography variant="body1" sx={{ fontSize: 13 }}>
                        または
                    </Typography>
                </Divider>
                <GoogleSignInButton />
                <Typography variant="body1" sx={{ fontSize: 12, color: "#555" }}>
                    ※ Googleでログインする場合はSafariもしくはChromeからアプリをご利用ください。
                </Typography>
                {/* <LineSignInButton /> */}
                {/* <XSignInButton /> */}
            </Box>
            <Box sx={{ mt: "12px", p: "20px 20px 10px", textAlign: "center", border: "solid 0.5px #b2b2b2" }}>
                <Typography variant="h5" sx={{ fontSize: 13, color: "black" }}>
                    アカウントをお持ちでない場合
                </Typography>
                <Typography>
                    <Button href='/accounts/signup' size="medium" sx={{ height: "30px", fontSize: 13 }} >
                        登録する
                    </Button>
                </Typography>
            </Box>
        </Container >
    );
}