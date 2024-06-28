"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation'
import { onAuthStateChanged, sendSignInLinkToEmail } from "firebase/auth"
import { auth } from '@/app/firebase';
import type { User } from "firebase/auth"
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { actionCodeSettings } from '@/constants/Auth';
import Stack from '@mui/material/Stack';
import CardMedia from '@mui/material/CardMedia';

export default function EmailsendPage() {
    const router = useRouter()
    const [user, setUser] = React.useState(null)

    React.useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user.emailVerified) {
                router.replace('/home')
            } else {
                setUser(user)
            }
        })
    })

    const sendEmail = () => {
        sendSignInLinkToEmail(auth, user.email, actionCodeSettings)
            .then(() => {
                console.log(user.email)
            })
            .catch((error) => {
                console.log(error)
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    return (
        <>
            {user == undefined ?
                <Alert
                    severity="error"
                    action={
                        <Button size="small" onClick={() => { router.push('/accounts/login/') }}>
                            OK
                        </Button>
                    }>
                    メールの送信に失敗しました。ログインし直してください。
                </Alert>
                :

                <Container maxWidth="xs" fixed sx={{ my: "20px" }}>
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
                        <Typography variant="h5" sx={{ fontSize: 13, }}>
                            {user.email}に送信されたメールから認証してください。
                        </Typography>
                        <Typography>
                            <Button onClick={sendEmail} size="medium" sx={{ height: "30px", fontSize: 13, }} >
                                再送信する
                            </Button>
                        </Typography>
                        <Button fullWidth href='/accounts/signup' size="medium" sx={{ mt: 2, borderRadius: 3, fontWeight: "bold" }} >
                            戻る
                        </Button>
                    </Box>

                </Container>
            }
        </>
    );
}