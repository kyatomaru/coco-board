"use client"

import * as React from 'react';
import GoogleSignInButton from '../../../common/auth/google/GoogleSignInButton';
import SignOutButton from '../signout/SignOutButton';
import { useRouter } from 'next/navigation'
import { auth } from '@/app/firebase';
import { onAuthStateChanged, getAuth, sendEmailVerification, createUserWithEmailAndPassword } from "firebase/auth"
import type { User } from "firebase/auth"
import { Router } from 'next/router';
import { Box, TextField, FormControl, InputLabel, OutlinedInput, Button, InputAdornment, IconButton, FormHelperText } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { actionCodeSettings } from '@/constants/Auth';

const REGEX_NUMBER = /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i;


export default function SignupBox() {
    const router = useRouter()
    const [email, setEmail] = React.useState(undefined)
    const [password, setPassword] = React.useState(undefined)
    const [confirmPassword, setConfirmPassword] = React.useState(undefined)

    const [emailError, setEmailError] = React.useState(false)
    const [passwordError, setPasswordError] = React.useState(false)
    const [confirmPasswordError, setConfirmPasswordError] = React.useState(false)

    const [credentialsError, setCredentialsError] = React.useState(false);

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        validateEmail()
        validatePassword()
        validateConfirmPassword()

        if (!emailError && !passwordError && !confirmPasswordError) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    sendEmailVerification(userCredential.user, actionCodeSettings)
                        .then(() => {
                            router.push('/accounts/signup/emailsend')
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                        });
                })
                .catch((error) => {
                    if (error.code == "auth/email-already-in-use") {
                        setCredentialsError(true)
                    }

                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        }
    }

    const validateEmail = () => {
        if (email == undefined) {
            setEmailError(true)
        } else if (String(email).length < 8) {
            setEmailError(true)
        } else {
            setEmailError(false)
        }
    }

    const validatePassword = () => {
        if (password == undefined) {
            setPasswordError(true)
        } else if (String(password).length == 0) {
            setPasswordError(true)
        } else if (!password.match(REGEX_NUMBER)) {
            setPasswordError(true)
        } else {
            setPasswordError(false)
        }
    }

    const validateConfirmPassword = () => {
        if (password !== confirmPassword) {
            setConfirmPasswordError(true)
        } else {
            setConfirmPasswordError(false)
        }
    }

    return (
        <Box
            component="form"
            onSubmit={onSubmit}
            sx={{
                '& .MuiTextField-root': { m: 1 },
                marginBottom: "30px",
            }
            }
            noValidate
            autoComplete="off"
            method='POST' >
            <Box sx={{ fontSize: "13px !important", mt: "15px" }}>
                <FormControl fullWidth size='small' variant="outlined">
                    <InputLabel sx={{ fontSize: 13 }} shrink={email != undefined} htmlFor="email">メールアドレス</InputLabel>
                    <OutlinedInput
                        sx={{ fontSize: 13, backgroundColor: "background.paper" }}
                        id="email"
                        name="email"
                        label="メールアドレス"
                        value={email}
                        onChange={newValue => {
                            setEmail(newValue.target.value)
                        }}
                        notched={email != undefined}
                    />
                    {emailError &&
                        <FormHelperText error={emailError}>
                            正しく入力してください
                        </FormHelperText>
                    }
                </FormControl>
            </Box>
            <Box sx={{ fontSize: "13px !important", mt: "15px" }}>
                <FormControl fullWidth size='small' variant="outlined">
                    <InputLabel sx={{ fontSize: 13 }} shrink={password != undefined} htmlFor="password">パスワード  ※英数字混在 8 桁以上</InputLabel>
                    <OutlinedInput
                        sx={{ fontSize: 13, backgroundColor: "background.paper" }}
                        id="password"
                        name="password"
                        label="パスワード  ※英数字混在 8 桁以上"
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
                    {passwordError &&
                        <FormHelperText error={passwordError}>
                            英数字混在 8 桁以上で作成してください
                        </FormHelperText>
                    }
                </FormControl>
            </Box>
            <Box sx={{ fontSize: "13px !important", mt: "15px" }}>

                <FormControl fullWidth size='small' variant="outlined">
                    <InputLabel sx={{ fontSize: 13 }} shrink={confirmPassword != undefined} htmlFor="confirmPassword">確認用パスワード</InputLabel>
                    <OutlinedInput
                        sx={{ fontSize: 13, backgroundColor: "background.paper" }}
                        id="confirmPassword"
                        name="confirmPassword"
                        label="確認用パスワード"
                        value={confirmPassword}
                        onChange={newValue => {
                            setConfirmPassword(newValue.target.value)
                        }}
                        notched={confirmPassword != undefined}
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

                    {confirmPasswordError &&
                        <FormHelperText error={confirmPasswordError}>
                            パスワードが一致していません
                        </FormHelperText>
                    }
                </FormControl>
            </Box>
            <Button fullWidth type="submit" variant="contained" size="medium" sx={{ mt: 2, borderRadius: 3, backgroundColor: "#1976d2 !important" }} >
                登録
            </Button>
            {credentialsError &&
                <FormHelperText error={credentialsError}>
                    すでにメールアドレスが登録されています。
                </FormHelperText>
            }
        </Box >
    );
}