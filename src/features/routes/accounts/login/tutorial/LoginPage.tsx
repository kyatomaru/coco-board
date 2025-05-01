"use client"

import * as React from 'react';
import LoadingPage from '@/components/AuthLoadingPage';
import GoogleSignInButton from '@/features/common/auth/google/GoogleSignInButton';
import AppleSignInButton from '@/features/common/auth/apple/AppleSignInButton';
import LineSignInButton from '@/features/common/auth/line/LineSignInButton';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import CardMedia from '@mui/material/CardMedia';
import DefaultBrowserModal from '@/features/common/auth/DefaultBrowserModal';
import CloseIcon from '@mui/icons-material/Close';
import { useGetUser } from '@/hooks/auth/useGetUser';

type PageProps = {
    tutorialStep: number,
    setTutorialStep: (step: number) => void
}

export default function LoginPage({ tutorialStep, setTutorialStep }: PageProps) {
    const [isInstagramWebBrowser, setIsInstagramWebBrowser] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState(false)
    const [user, setUser, isSubscriptionValid, isUserLoading] = useGetUser()

    React.useEffect(() => {
        setIsInstagramWebBrowser(checkInstagramWebBrowser())
    }, [])

    React.useEffect(() => {
        console.log(isUserLoading)
    }, [isUserLoading])

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
            {isLoading || isUserLoading ?
                <LoadingPage />
                : 
                <Box  sx={{
                    width: '100%', zIndex: 2500, backgroundColor: "white"
                }}>
                    <Box maxWidth="sm" sx={{ mx: "auto" }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end'
                        }}>
                            <IconButton 
                                onClick={() => {
                                    console.log("close")
                                    setTutorialStep(1)
                                }}
                                sx={{ 
                                    color: 'black',
                                    width: 40,
                                    height: 40,
                                    borderRadius: 0,
                                }}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>

                        <Container maxWidth="xs" fixed sx={{ px:0,position: "relative", height: "100vh" }}>
                            <Box sx={{ px: 3, alignItems: "center", pt: "30px", pb: "15px", textAlign: "center" }}>
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
                                            <Typography variant="h5" sx={{ textAlign: "center", fontSize: "20px", fontWeight: 400, color: "black" }}>
                                                coco-boardでサッカーの記録を始めましょう。
                                            </Typography>
                                        </Box>
                                        <GoogleSignInButton setIsLoading={setIsLoading} setError={setError} />
                                        <AppleSignInButton setIsLoading={setIsLoading} setError={setError} />
                                        <LineSignInButton setIsLoading={setIsLoading} setError={setError} /> 

                                        <Button sx={{ mt: "10px" }} onClick={() => {
                                            setTutorialStep(1)
                                        }}>
                                            <Typography variant="body1" sx={{ fontSize: 14, color: "#555" }}>
                                                ログインせずにゲストとしてはじめる
                                            </Typography>
                                        </Button>

                                        {error &&
                                            <Box sx={{ mb: "5px" }}>
                                                <Typography variant="body1" sx={{ fontSize: 12, color: "red" }}>
                                                    ログインに失敗しました。
                                                </Typography>
                                                <Typography variant="body1" sx={{ fontSize: 12, color: "red" }}>
                                                    ブラウザをリロードして再度ログインしてください。
                                                </Typography>
                                            </Box>
                                        }

                                        <Box sx={{ mt: "30px" }}>
                                            <Typography variant="body1" sx={{ fontSize: 12, color: "#555" }}>
                                                続行すると、利用規約とプライバシーポリシーに同意したことになります。
                                            </Typography>
                                        </Box>
                                    </Box>
                                }
                            </Box>
                        </Container >
                    </Box>
                </Box>
            }
        </>
    );
}