"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation';
import LeftBar from './LeftBar';
import Header from './Header';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

export default function NotPage() {
    const router = useRouter()
    return (
        <>
            <LeftBar />
            <Header />
            <Box sx={{
                position: "relative", pl: { md: "90px", lg: "250px" }, width: "100%", height: "90vh", alignItems: "center", justifyContent: "center"
            }}>
                <Stack
                    direction="row"
                    sx={{
                        position: "fixed",
                        backgroundColor: "white", zIndex: 1900, width: "100%",
                        borderBottom: "solid 0.5px #b2b2b2",
                    }} >

                    <IconButton onClick={(event) => { router.push("/home") }} ><ArrowLeftIcon /></IconButton>
                </Stack>
                <Typography sx={{
                    textAlign: "center",
                    lineHeight: "100vh"
                }}>
                    ページが見つかりません。
                </Typography>
            </Box >
        </>
    );
}