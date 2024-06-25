"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation'
import { onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '@/app/firebase';
import type { User } from "firebase/auth"
import Container from '@mui/material/Container';
import { Box, TextField, FormControl, InputLabel, OutlinedInput, Button, InputAdornment, IconButton, FormHelperText, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoadingPage from '@/components/LoadingPage';
import Alert from '@mui/material/Alert';
import { actionCodeSettings } from '@/constants/Auth';
import CheckIcon from '@mui/icons-material/Check';
import Stack from '@mui/material/Stack';
import CardMedia from '@mui/material/CardMedia';

export default function ResetPasswordEmailsendPage() {
    const router = useRouter()
    const [user, setUser] = React.useState<User | undefined | null>(undefined)
    const [isAuth, setIsAuth] = React.useState(false);

    const [email, setEmail] = React.useState(undefined)
    const [password, setPassword] = React.useState(undefined)
    const [confirmPassword, setConfirmPassword] = React.useState(undefined)

    const [credentialsError, setCredentialsError] = React.useState(false);
    const [isSendLink, setIsSendLink] = React.useState(false);

    React.useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (user.emailVerified) {
                    router.replace('/home')
                }
            }
        })
    });

    const sendlink = (event) => {
        event.preventDefault()

        sendPasswordResetEmail(auth, email, actionCodeSettings)
            .then(async () => {
                setIsSendLink(true)
                await _sleep(30000)
                setIsSendLink(false)
            })
            .catch((error) => {
                if (error.code == "auth/invalid-login-credentials") {
                    setCredentialsError(true)
                }

                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    return (
        <Container maxWidth="xs" fixed sx={{ my: "20px" }}>
            {isSendLink &&
                <Alert sx={{ mb: 1 }} icon={<CheckIcon fontSize="inherit" />} severity="success">
                    リンクを送信しました。
                </Alert>
            }

            <Box sx={{ px: "20px", pt: "30px", pb: "15px", textAlign: "center", border: "solid 0.5px #b2b2b2" }}>
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
                <Box sx={{ mb: "10px" }}>
                    <Typography variant="h5" sx={{ fontSize: 13 }}>
                        パスワードをリセットするためのリンクを送信します。
                    </Typography>
                </Box>
                <Box
                    sx={{
                        '& .MuiTextField-root': { m: 1 },
                        marginBottom: "5px",
                    }}>
                    <Box sx={{ fontSize: "13px !important", mt: "15px" }}>
                        <FormControl fullWidth size='small' variant="outlined">
                            <InputLabel sx={{ fontSize: 13 }} shrink={email != undefined} htmlFor="outlined-adornment-place">メールアドレス</InputLabel>
                            <OutlinedInput
                                sx={{ fontSize: 13, backgroundColor: "background.paper" }}
                                id="outlined-adornment-place"
                                name="place"
                                aria-describedby="outlined-place-helper-text"
                                label="メールアドレス"
                                value={email}
                                onChange={newValue => {
                                    setEmail(newValue.target.value)
                                }}
                                notched={email != undefined}
                            />
                        </FormControl>
                    </Box>
                    <Button fullWidth onClick={sendlink} variant="contained" size="medium" sx={{ mt: 2, borderRadius: 3, backgroundColor: "#1976d2 !important" }} >
                        リンクを送信
                    </Button>
                    <Typography sx={{ mt: "5px" }}>
                        <Button href='/accounts/login' size="medium" sx={{ height: "30px", fontSize: 13, color: "#4F4F4F" }} >
                            ログインに戻る
                        </Button>
                    </Typography>
                    {credentialsError &&
                        <FormHelperText error={credentialsError}>
                            メールアドレスもしくはパスワードが違います。
                        </FormHelperText>
                    }
                </Box >
            </Box>
        </Container >
    );
}

const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));