"use client"

import * as React from 'react';
import GoogleSignInButton from '../../../common/auth/google/GoogleSignInButton';
import SignOutButton from '../signout/SignOutButton';
import { useRouter } from 'next/navigation'
import { onAuthStateChanged, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth"
import type { User } from "firebase/auth"
import { Router } from 'next/router';
import { Box, Typography, FormControl, InputLabel, OutlinedInput, Button, InputAdornment, IconButton, FormHelperText } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { auth } from '@/app/firebase';
import { actionCodeSettings } from '@/constants/Auth';

export default function LoginBox() {
    const router = useRouter()
    const [email, setEmail] = React.useState(undefined)
    const [password, setPassword] = React.useState(undefined)

    const [credentialsError, setCredentialsError] = React.useState(false);

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const signin = (event) => {
        event.preventDefault()

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                if (userCredential.user.emailVerified) {
                    router.replace("/home")
                } else {
                    sendEmailVerification(userCredential.user, actionCodeSettings)
                        .then((res) => {
                            router.push('/accounts/signup/emailsend')
                        })
                        .catch((error) => {
                            console.log(error)
                        });
                }
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
        <Box
            sx={{
                '& .MuiTextField-root': { m: 1 },
                marginBottom: "30px",
            }}
        >
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
            <Box sx={{ fontSize: "13px !important", mt: "15px" }}>
                <FormControl fullWidth size='small' variant="outlined">
                    <InputLabel sx={{ fontSize: 13 }} shrink={password != undefined} htmlFor="password">パスワード</InputLabel>
                    <OutlinedInput
                        sx={{ fontSize: 13, backgroundColor: "background.paper" }}
                        id="password"
                        name="password"
                        label="パスワード"
                        value={password}
                        onChange={newValue => {
                            setPassword(newValue.target.value)
                        }}
                        notched={password != undefined}
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff sx={{ fontSize: 18 }} /> : <Visibility sx={{ fontSize: 18 }} />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </Box>
            <Button fullWidth onClick={signin} variant="contained" size="medium" sx={{ mt: 2, borderRadius: 3, backgroundColor: "#1976d2 !important" }} >
                ログイン
            </Button>
            <Typography sx={{ mt: "5px" }}>
                <Button href='/accounts/password/reset/emailsend' size="medium" sx={{ height: "30px", fontSize: 13, color: "#4F4F4F" }} >
                    パスワードを忘れた場合
                </Button>
            </Typography>
            {credentialsError &&
                <FormHelperText error={credentialsError}>
                    メールアドレスもしくはパスワードが違います。
                </FormHelperText>
            }
        </Box >
    );
}