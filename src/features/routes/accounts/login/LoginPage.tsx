"use client"

import * as React from 'react';
import LoadingPage from '@/components/AuthLoadingPage';
import GoogleSignInButton from '../../../common/auth/google/GoogleSignInButton';
import AppleSignInButton from '../../../common/auth/apple/AppleSignInButton';
import LineSignInButton from '@/features/common/auth/line/LineSignInButton';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CardMedia from '@mui/material/CardMedia';

export default function LoginPage() {
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState(false)

    return (
        <>
            {isLoading ?
                <LoadingPage />
                : 
                <Box  sx={{
                    width: '100%', zIndex: 2500, backgroundColor: "white"
                }}>
                    <Container maxWidth="xs" fixed sx={{ px: 0,position: "relative", height: "100vh" }}>
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
                                <Box>
                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="h5" sx={{ textAlign: "center", fontSize: "20px", fontWeight: 400, color: "black" }}>
                                            coco-boardでサッカーの記録を始めましょう。
                                        </Typography>
                                    </Box>
                                    <GoogleSignInButton setIsLoading={setIsLoading} setError={setError} />
                                    <AppleSignInButton setIsLoading={setIsLoading} setError={setError} />
                                    <LineSignInButton setIsLoading={setIsLoading} setError={setError} /> 

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
                                        <Box sx={{ mt: 3,display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 1 }}>
                                            <Button size='small' target='_blank' href='/privacy' sx={{ fontSize: 12, color: "gray", width: "150px" }}>プライバシー</Button>
                                        
                                            <Button size='small' target='_blank' href='/terms' sx={{ fontSize: 12, color: "gray", width: "150px" }}>利用規約</Button>
                                        </Box>
                                    </Box>
                                </Box>
                        </Box>
                    </Container >
                </Box>
            }
        </>
    );
}