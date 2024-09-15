"use client"

import * as React from 'react';
import LoadingPage from '@/components/AuthLoadingPage';
import GoogleSignInButton from '../../../common/auth/google/GoogleSignInButton';
import AppleSignInButton from '@/features/common/auth/apple/AppleSignInButton';
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
import DefaultBrowserModal from '@/features/common/auth/DefaultBrowserModal';

export default function LoginPage() {
    const [isInstagramWebBrowser, setIsInstagramWebBrowser] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

    React.useEffect(() => {
        setIsInstagramWebBrowser(checkInstagramWebBrowser())
    }, [])

    const checkInstagramWebBrowser = () => {
        /** User Agent 文字列 */
        const userAgent = window.navigator.userAgent
        /** Instagram という文字列が含まれているかどうか? を判定する */
        const isInstagramWebOpen = /Instagram/i.test(userAgent)
        // console.log('Insta 判定', isInstagramWebOpen)
        return isInstagramWebOpen
    };

    return (
        <>
            {isLoading ?
                <LoadingPage />
                :
                <Container maxWidth="xs" fixed sx={{ m: "auto" }}>
                    <Box sx={{ alignItems: "center", px: "25px", pt: "30px", pb: "15px", textAlign: "center" }}>
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
                        {isInstagramWebBrowser
                            ? <DefaultBrowserModal />
                            : <Box>
                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="body1" sx={{ textAlign: "center", fontSize: "1em", fontWeight: 400, color: "black" }}>
                                        ようこそ。coco-boardを使用するにはGoogleアカウントでのログインが必要となります。
                                    </Typography>
                                </Box>
                                <GoogleSignInButton setIsLoading={setIsLoading} />
                                <Typography variant="body1" sx={{ fontSize: 12, color: "#555" }}>
                                    ※ Googleでログインする場合はSafariもしくはChromeからアプリをご利用ください。
                                </Typography>
                                {/* <AppleSignInButton /> */}
                                {/* <LineSignInButton /> */}
                                {/* <XSignInButton /> */}
                            </Box>
                        }
                    </Box>
                </Container >
            }
        </>
    );
}