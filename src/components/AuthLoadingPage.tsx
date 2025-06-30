"use client"

import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function AuthLoadingPage() {
    return (
        <Box sx={{ overflow: "hidden", position: "fixed", top: 0, display: 'flex', zIndex: 2200, width: "100%", height: "100vh", alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
            <CircularProgress sx={{ zIndex: 2000 }} color="success" />
        </Box>
    );
}