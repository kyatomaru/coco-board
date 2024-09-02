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
import SignupBox from './SignupBox';
import Stack from '@mui/material/Stack';
import CardMedia from '@mui/material/CardMedia';

export default function SignupPage() {
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
                        fontWeight: "bold", color: "black"
                    }}>
                        coco-board
                    </Typography>
                </Stack>
                <Box>
                    <SignupBox />
                </Box>
                <Divider>
                    <Typography variant="body1" sx={{ fontSize: 13, color: "black" }}>
                        または
                    </Typography>
                </Divider>
                <GoogleSignInButton />
                {/* <LineSignInButton /> */}
                {/* <XSignInButton /> */}
            </Box>
            <Box sx={{ mt: "12px", p: "20px 20px 10px", textAlign: "center", border: "solid 0.5px #b2b2b2" }}>
                <Typography variant="h5" sx={{ fontSize: 13, color: "black" }}>
                    アカウントをお持ちの場合
                </Typography>
                <Typography  >
                    <Button type="submit" href='/accounts/login' size="medium" sx={{ height: "30px", fontSize: 13, }} >
                        ログインする
                    </Button>
                </Typography>
            </Box>
        </Container>
    );
}