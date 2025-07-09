"use client"

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const barStyle = {
    bgcolor: 'background.paper',
    color: "black",
    mx: "auto",
    position: 'fixed',
    zIndex: "1010",
    width: "100%",
    boxShadow: "none",
    borderBottom: "solid 1px rgb(219, 219, 219)",
    pl: { md: "120px", lg: "250px" },
    touchAction: "none"
}


export default function SettingHeader() {
    
    return (
        <AppBar sx={barStyle} position="static">
            <Stack sx={{ height: 45, px: 1, width: "100%", maxWidth: "550px", mx: "auto" }} direction="row" justifyContent="center" alignItems="center" >
                <Typography component="h2" fontSize={15}>
                    設定
                </Typography>
            </Stack>
        </AppBar >
    );
}
