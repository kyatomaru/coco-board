"use client"

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import AppBar from '@mui/material/AppBar';
import dayjs from 'dayjs'
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import EventIcon from '@mui/icons-material/Event';
import IconButton from '@mui/material/IconButton';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Container, Typography, Button, Divider, CardMedia, Stack } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';

export default function Footer() {
    const router = useRouter()

    const ClickHelpButton = () => {
        router.prefetch('/help')
    };

    const ClickPrivacyButton = () => {
        router.push("/privacy")
    };

    const ClickTermsButton = () => {
        router.push('/terms')
    };

    return (
        <Box sx={{ background: "#14171a", color: "#f5f8fa" }}>
            <Stack
                direction="row"
                justifyContent="center"
                sx={{ pt: 1 }}
                spacing={2}
            >
                <IconButton href='https://www.instagram.com/coco_board/'><InstagramIcon sx={{ color: "gray", width: { sm: "35px" }, height: { sm: "35px" } }} /></IconButton>
                <IconButton href='https://x.com/coco_board'><XIcon sx={{ color: "gray", width: { sm: "35px" }, height: { sm: "35px" } }} /></IconButton>
            </Stack>
            <Stack
                direction="row"
                justifyContent="center"
                alignContent="center"
                sx={{ height: 45, px: 2, display: { xs: 'none', sm: 'flex' } }}>
                <Typography sx={{ fontSize: 12, color: "gray", display: "inline-flex", alignItems: "center", letterSpacing: 0.8 }}>© 2024 coco-board</Typography>
                <Stack
                    direction="row"
                    justifyContent="center"
                    sx={{ px: 2 }}
                >
                    {/* <Button size='small' sx={{ fontSize: 12, color: "gray" }} onClick={ClickHelpButton}>ヘルプ</Button> */}
                    <Button size='small' target='_blank' href='/privacy' sx={{ fontSize: 12, color: "gray" }}>プライバシー</Button>
                    <Button size='small' target='_blank' href='/terms' sx={{ fontSize: 12, color: "gray" }}>利用規約</Button>
                    <Button size='small' target='_blank' href='/contact' sx={{ fontSize: 12, color: "gray" }}>お問い合わせ</Button>
                </Stack>
            </Stack>
            <Box sx={{ display: { xs: 'block', sm: 'none' }, py: 1 }}>
                <Stack
                    direction="row"
                    justifyContent="center"
                    sx={{ height: 30 }}
                >
                    {/* <Button size='small' sx={{ fontSize: 11, color: "gray" }} onClick={ClickHelpButton}>ヘルプ</Button> */}
                    <Button size='small' target='_blank' href='/privacy' sx={{ fontSize: 11, color: "gray" }}>プライバシー</Button>
                    <Button size='small' target='_blank' href='/terms' sx={{ fontSize: 11, color: "gray" }}>利用規約</Button>
                    <Button size='small' target='_blank' href='/contact' sx={{ fontSize: 11, color: "gray" }}>お問い合わせ</Button>
                </Stack>
                <Box sx={{ width: "100%", height: 30, display: "inline-flex", alignItems: "center" }}>
                    <Typography sx={{ fontSize: 11, color: "gray", mx: "auto", alignItems: "center", letterSpacing: 0.8 }}>© 2024 coco-board</Typography>
                </Box>
            </Box>
        </Box>
    );
}