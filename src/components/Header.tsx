"use client"

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import LoginBox from '@/components/auths/LoginBox';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';


const barStyle = {
    bgcolor: 'background.paper',
    color: "black"
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
    return (
        <React.Fragment>
            <CssBaseline />
            <Box position='fixed' zIndex="1100" sx={{ width: "100%", flexGrow: 1 }} >
                <HideOnScroll {...props}>
                    <AppBar sx={barStyle} position="static">
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Soccer Note
                            </Typography>
                        </Toolbar>
                        {/* <Box sx={{ borderBottom: 1, borderColor: 'divider', width: "100%" }}>
                            <Tabs value={menu} onChange={handleChange} centered>
                                <Tab label="記録" sx={{ width: "100px", m: "auto" }} />
                                <Tab label="課題" sx={{ width: "100px", m: "auto" }} />
                            </Tabs>
                        </Box> */}
                    </AppBar>
                </HideOnScroll>
            </Box>
        </React.Fragment>
    );
}