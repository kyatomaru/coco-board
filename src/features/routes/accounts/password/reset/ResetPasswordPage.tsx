"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import { onAuthStateChanged, sendPasswordResetEmail, confirmPasswordReset } from "firebase/auth"
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

const REGEX_NUMBER = /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i;

export default function ResetPasswordPage() {
    const router = useRouter()
    const params = useParams()
    const [password, setPassword] = React.useState(undefined)
    const [confirmPassword, setConfirmPassword] = React.useState(undefined)

    const [passwordError, setPasswordError] = React.useState(false)
    const [confirmPasswordError, setConfirmPasswordError] = React.useState(false)

    const [credentialsError, setCredentialsError] = React.useState(false);

    const [showPassword, setShowPassword] = React.useState(false);
    const [isReset, setIsReset] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
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

    const register = (event) => {
        event.preventDefault()

        validatePassword()
        validateConfirmPassword()

        confirmPasswordReset(auth, String(params.actionCode), password)
            .then(async () => {
                // router.replace('/accounts/login')
                setIsReset(true)
            })
            .catch((error) => {
                if (error.code == "auth/invalid-login-credentials") {
                    setCredentialsError(true)
                }

                const errorCode = error.code;
                const errorMessage = error.message;
            });
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
        <Container maxWidth="xs" fixed sx={{ mt: { xs: "30px", md: "70px" }, mb: "30px" }}>
            {isSendLink &&
                <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
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
                        fontWeight: "bold", color: "black"
                    }}>
                        coco-board
                    </Typography>
                </Stack>

                {isReset ?
                    <Box>
                        <Box >
                            <Typography variant="h5" sx={{ fontSize: 13, color: "black" }}>
                                新しいパスワードを設定しました。
                            </Typography>
                        </Box>
                        <Button fullWidth href='/accounts/login' variant="contained" size="medium" sx={{ mt: 2, borderRadius: 3, backgroundColor: "#1976d2 !important" }} >
                            確認した
                        </Button>
                    </Box>
                    :
                    <Box
                        sx={{
                            '& .MuiTextField-root': { m: 1 },
                            marginBottom: "5px",
                        }}>
                        <Box sx={{ mb: "10px" }}>
                            <Typography variant="h5" sx={{ fontSize: 13, color: "black" }}>
                                新しいパスワードを設定してください。
                            </Typography>
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
                        <Button fullWidth onClick={register} variant="contained" size="medium" sx={{ mt: 2, borderRadius: 3, backgroundColor: "#1976d2 !important" }} >
                            再設定
                        </Button>
                    </Box >
                }
            </Box>

        </Container >
    );
}

const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));