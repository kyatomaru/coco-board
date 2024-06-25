"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import HeaderMenus from './HeaderMenus';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import CardMedia from '@mui/material/CardMedia';

const barStyle = {
    bgcolor: 'background.paper',
    color: "black",
    position: 'fixed',
    zIndex: "1100",
    width: "100%",
    flexGrow: 1,
    display: { sm: "block", md: "none" }
}

function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        // target: window ? window() : undefined,
        target: window ? window() : undefined,
    });



    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

export default function Header(props) {
    const router = useRouter()

    return (
        <React.Fragment>
            <CssBaseline />
            {/* <Box position='fixed' zIndex="1100" sx={{ width: "100%", flexGrow: 1 }} > */}
            <HideOnScroll {...props}>
                <AppBar sx={barStyle} position="static">
                    <Toolbar>
                        <Stack
                            direction="row"
                            alignItems="center"
                            sx={{ height: { xs: 50, sm: 64 }, background: "white", width: "100%" }}>
                            <IconButton sx={{ p: "0" }} onClick={(event) => { router.push('/home') }}>
                                < CardMedia
                                    component="img"
                                    sx={{ width: 45, height: 45 }}
                                    image="/images/icon.png"
                                />
                            </IconButton>
                            <Typography variant="h6" component="h2" sx={{ display: { xs: "none", sm: "block" }, pl: 2 }}>
                                coco-board
                            </Typography>
                        </Stack>
                        <HeaderMenus />
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            {/* </Box> */}
        </React.Fragment >
    );
}