"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation'
import { auth } from '@/app/firebase';
import type { User } from "firebase/auth"
import Container from '@mui/material/Container';
import { Box, Button, Typography } from '@mui/material';

import Stack from '@mui/material/Stack';
import CardMedia from '@mui/material/CardMedia';

export default function SignOutPage() {
    const router = useRouter()

    return (
        <Container maxWidth="xs" fixed sx={{ m: "auto" }}>
            <Box sx={{ px: "20px", pt: "30px", pb: "15px", textAlign: "center" }}>
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
                <Box sx={{ mb: "10px" }}>
                    <Typography variant="body1" sx={{ color: "black" }}>
                        ログアウトしました。
                        <br />
                        再度ログインしてください。
                    </Typography>
                </Box>
                <Typography sx={{ mt: "5px" }}>
                    <Button href='/accounts/login' size="medium" sx={{ height: "30px", fontSize: 14 }} >
                        OK
                    </Button>
                </Typography>
            </Box>
        </Container >
    );
}