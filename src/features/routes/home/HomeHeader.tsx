"use client"

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import dayjs from 'dayjs';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import HeaderMenus from '@/components/HeaderMenus';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { useDateFormat } from '@/utils/useDateFormat';
import { useIsToday } from '@/utils/useIsToday';
import ArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import EventIcon from '@mui/icons-material/Event';
import ClearIcon from '@mui/icons-material/Clear'
import CardMedia from '@mui/material/CardMedia';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, subMonths, addMonths, isSameDay, isSameMonth, isToday, format } from 'date-fns';

const barStyle = {
    bgcolor: 'background.paper',
    color: "black",
    mx: "auto",
    position: 'fixed',
    zIndex: "1010",
    width: "100%",
    // height: { sx: 30, md: 50 },
    boxShadow: "none",
    borderBottom: "solid 1px rgb(219, 219, 219)",
    // display: { sm: "none", md: "block" },
    pl: { md: "120px", lg: "250px" },
    touchAction: "none"
}

const IsToday = (date) => {
    return useIsToday(date)
}


export default function HomeHeader() {
    return (
        <AppBar sx={barStyle} position="static">
            <Toolbar sx={{ borderBottom: "solid 1px rgb(219, 219, 219)", display: { md: "none" }, minHeight: "46px !important" }}>
                <Stack
                    direction="row"
                    alignItems="center"
                    sx={{ height: { xs: 46, sm: 52 }, background: "white", width: "100%" }}>
                    <IconButton sx={{ p: "0" }} >
                        <CardMedia
                            component="img"
                            sx={{ width: 38, height: 38 }}
                            image="/images/icon.png"
                        />
                    </IconButton>
                    <Typography variant="h6" component="h2" sx={{ display: { xs: "none", sm: "block" }, pl: 2 }}>
                        coco-board
                    </Typography>
                </Stack>
                <HeaderMenus />
            </Toolbar>
        </AppBar >
    );
}