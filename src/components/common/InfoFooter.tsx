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
import { Container, Typography, Button, Divider, CardMedia, Stack, Grid } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';

export default function InfoFooter() {
    return (
        <Box>
            <Stack
                direction="row"
                justifyContent="center"
                sx={{ background: "white", pt: 1 }}
                spacing={2}
            >
                <IconButton target='_blank' href='https://www.instagram.com/coco_board/'><InstagramIcon sx={{ color: "gray", width: { sm: "35px" }, height: { sm: "35px" } }} /></IconButton>
                <IconButton target='_blank' href='https://x.com/coco_board'><XIcon sx={{ color: "gray", width: { sm: "35px" }, height: { sm: "35px" } }} /></IconButton>
            </Stack>
            <Stack
                direction="row"
                justifyContent="center"
                alignContent="center"
                sx={{ height: 45, background: "white", px: 2, display: { xs: 'none', sm: 'flex' } }}>
                <Stack
                    direction="row"
                    justifyContent="center"
                    sx={{ px: 2 }}
                    spacing={2}
                >
                    <Button size='small' href='/' sx={{ fontSize: 12, color: "gray", textTransform: "lowercase" }}>coco-boardについて</Button>
                    <Button size='small' target='_blank' href='/privacy' sx={{ fontSize: 12, color: "gray" }}>プライバシー</Button>
                    <Button size='small' target='_blank' href='/terms' sx={{ fontSize: 12, color: "gray" }}>利用規約</Button>
                    <Button size='small' target='_blank' href='/contact' sx={{ fontSize: 12, color: "gray" }}>お問い合わせ</Button>
                </Stack>
                <Typography sx={{ fontSize: 12, color: "gray", display: "inline-flex", alignItems: "center", letterSpacing: 0.8 }}>© 2024 coco-board</Typography>
            </Stack>
            <Box sx={{ background: "white", display: { xs: 'block', sm: 'none' }, pb: 1 }}>
                <Grid container spacing={2} sx={{ textAlign: "center", pt: 2, background: "white", justifyContent: "center", }}>
                    <Grid xs={5}>
                        <Button size='small' href='/' sx={{ fontSize: 12, color: "gray", textTransform: "lowercase" }}>coco-boardについて</Button>
                    </Grid>
                    <Grid xs={5}>
                        <Button size='small' target='_blank' href='/privacy' sx={{ fontSize: 11, color: "gray" }}>プライバシー</Button>
                    </Grid>
                    <Grid xs={5}>
                        <Button size='small' target='_blank' href='/terms' sx={{ fontSize: 11, color: "gray" }}>利用規約</Button>
                    </Grid>
                    <Grid xs={5}>
                        <Button size='small' target='_blank' href='/contact' sx={{ fontSize: 11, color: "gray" }}>お問い合わせ</Button>
                    </Grid>
                </Grid>
                <Box sx={{ width: "100%", height: 30, display: "inline-flex", alignItems: "center" }}>
                    <Typography sx={{ fontSize: 11, color: "gray", mx: "auto", alignItems: "center", letterSpacing: 0.8 }}>© 2024 coco-board</Typography>
                </Box>
            </Box >
        </Box>
    );
}