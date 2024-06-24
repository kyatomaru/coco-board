"use client"

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

const barStyle = {
    bgcolor: 'background.paper',
    color: "black"
}


type PageProps = {
    title: string
}


export default function Header({ title }: PageProps) {
    return (
        <Box position='fixed' zIndex="1100" sx={{ width: "100%", flexGrow: 1 }} >
            <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{ height: { xs: 50, sm: 64 }, px: { xs: 2, sm: 4 }, background: "white" }}>
                <IconButton sx={{ p: "0" }}>
                    <Box sx={{ width: 45, height: 45, backgroundImage: "url(icon.png)", backgroundSize: "cover" }} />
                </IconButton>
                <Typography variant="h6" component="h6" sx={{ fontWeight: 700 }}>
                    {title}
                </Typography>
            </Stack>
        </Box>
    );
}
