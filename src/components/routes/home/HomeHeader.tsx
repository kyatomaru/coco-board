"use client"

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LoginBox from '@/features/routes/accounts/login/LoginBox';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import dayjs from 'dayjs';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import HeaderMenus from '@/components/common/HeaderMenus';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { addDays } from 'date-fns';
import { useDateFormat } from '@/utils/useDateFormat';
import { useIsToday } from '@/utils/useIsToday';
import ArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import EventIcon from '@mui/icons-material/Event';
import CardMedia from '@mui/material/CardMedia';

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

type PageProps = {
    date: Date | String
    setDate: any
    displayMenu: any
    setDisplayMenu: any
    isLoading: any
}

const IsToday = (date) => {
    return useIsToday(date)
}


export default function HomeHeader({ date, setDate, displayMenu, setDisplayMenu, isLoading }: PageProps) {
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
            <Stack sx={{ height: 45, px: 1, width: "100%", maxWidth: "550px", mx: "auto" }} direction="row" justifyContent="space-between" alignItems="center" >
                <IconButton size='large'
                    onClick={() => { setDate(addDays(new Date(String(date)), -1)) }}
                    sx={{ width: 40, height: 40 }}
                    disabled={isLoading}>
                    <ArrowLeftIcon />
                </IconButton>
                <Stack direction="row" alignItems="center">
                    <IconButton href={`/calendar/${dayjs(String(date)).format('YYYY-MM-DD')}`} sx={{ mr: 1 }}>
                        <EventIcon />
                    </IconButton>
                    <Typography component="h2" fontSize={17} letterSpacing={1} fontWeight={500} sx={{ mt: "2px" }}>
                        {useDateFormat(String(date))}
                    </Typography>
                </Stack>
                <IconButton size='large'
                    onClick={() => { setDate(addDays(new Date(String(date)), 1)) }}
                    sx={{ width: 40, height: 40 }}
                    disabled={isLoading || IsToday(date)}>
                    <ArrowRightIcon />
                </IconButton>
            </Stack>
            <StyledTabs value={displayMenu} sx={{ mx: "auto" }} onChange={(event, newValue) => { setDisplayMenu(newValue) }}>
                <StyledTab label="ボード" sx={{ height: 32, m: "auto", fontSize: 12, fontWeight: 600 }} />
                <StyledTab label="ノート" sx={{ height: 32, m: "auto", fontSize: 12, fontWeight: 600 }} />
            </StyledTabs>
        </AppBar >
    );
}

interface StyledTabsProps {
    children?: React.ReactNode;
    value: number;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

interface StyledTabProps {
    label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
    <Tab disableRipple {...props} />
))(({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),

}));

const StyledTabs = styled((props: StyledTabsProps) => (
    <Tabs
        {...props}
        TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
        variant="fullWidth"
        centered
    />
))(({ theme }) => ({
    maxWidth: 400,
    width: "100%",
    alignSelf: "center",
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
        maxWidth: 40,
        width: '100%',
        backgroundColor: '#635ee7',
    },
}));