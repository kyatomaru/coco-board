"use client"

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Container, Box, Typography, Button, Divider, CardMedia, Stack } from '@mui/material';
import Header from '../Header';
import Footer from '../Footer';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';


export default function ContactPage() {
    return (
        <Box sx={{ width: "100%", background: "white", height: "100vh", position: "relative" }}>
            <Header title="お問い合わせ" />
            <Container sx={{ mt: "90px" }}>
                <Box sx={{ my: 8 }}>
                    <Box sx={{ py: 2 }}>
                        <Typography variant="body1" sx={{ fontSize: "1rem", color: "#555" }}>
                            ご質問やご意見がございましたら、InstagramもしくはX（旧Twitter）のDMまでお問い合わせください。
                        </Typography>
                    </Box>
                    <Box sx={{ py: 2 }}>
                        <Typography variant="body1" sx={{ fontSize: "1rem", color: "#555", pt: 1 }}>
                            <Button size="small" target='_blank' href='https://www.instagram.com/coco_board/' sx={{ borderRadius: 4, px: 2, color: "white", background: "linear-gradient(to right,#FFD600 ,#FF7A00,#FF0069 ,#FF0069,#D300C5 ,#7638FA )" }}>
                                <InstagramIcon sx={{ mr: 1 }} />@coco_board
                            </Button>
                        </Typography>
                    </Box>
                </Box>
            </Container >
        </Box >
    );
}
