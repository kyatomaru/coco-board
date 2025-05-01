"use client"

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
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
import { mainColor } from '@/constants/Color';

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
    displayMenu: number
    setDisplayMenu: any
    showCalendar: boolean
    setShowCalendar: any
}

const IsToday = (date) => {
    return useIsToday(date)
}


export default function NoteHeader({ date, setDate, displayMenu, setDisplayMenu, showCalendar, setShowCalendar }: PageProps) {
    const currentMonth = startOfMonth(new Date());
    
    const previousDate = () => {
        setDate(addDays(new Date(String(date)), -1))
    }

    const nextDate = () => {
        const nextDate = addDays(new Date(String(date)), 1);
        // 現在の月以降には進めないようにチェック
        if (nextDate <= new Date()) {
            setDate(addDays(new Date(String(date)), 1))
        }
    }   
    
    const previousMonth = () => {
        setDate(subMonths(new Date(String(date)), 1));
    };

    const nextMonth = () => {
        // 選択された月の初日を取得
        const nextMonthDate = startOfMonth(addMonths(new Date(String(date)), 1));
        // 現在の月以降には進めないようにチェック
        if (nextMonthDate <= currentMonth) {
            setDate(addMonths(new Date(String(date)), 1));
        }
    };
    
    return (
        <AppBar sx={barStyle} position="static">
            <Stack sx={{ height: 45, px: 1, width: "100%", maxWidth: "550px", mx: "auto" }} direction="row" justifyContent="space-between" alignItems="center" >
                <IconButton size='large'
                    onClick={() => { showCalendar ? previousMonth() : previousDate() }}
                    sx={{ width: 40, height: 40 }}>
                    <ArrowLeftIcon />
                </IconButton>
                <Stack direction="row" alignItems="center">
                    {showCalendar ?
                        <IconButton onClick={() => { setShowCalendar(false) }} sx={{ mr: 1 }}>
                            <ClearIcon/>
                        </IconButton>
                        :
                        <IconButton onClick={() => { setShowCalendar(true) }} sx={{ mr: 1 }}>
                            <EventIcon />
                        </IconButton>
                    }
                    {showCalendar ?
                        <Typography component="h2" fontSize={15}>
                            {format(new Date(String(date)), 'yyyy年 M月')}
                        </Typography>
                        :
                        <Typography component="h2" fontSize={15}>
                            {useDateFormat(String(date))}
                        </Typography>
                    }
                </Stack>
                <IconButton size='large'
                    onClick={() => { showCalendar ? nextMonth() : nextDate() }}
                    sx={{ width: 40, height: 40 }}
                    disabled={!showCalendar && IsToday(date) || showCalendar && startOfMonth(addMonths(new Date(String(date)), 1)) > currentMonth}>
                    <ArrowRightIcon />
                </IconButton>
            </Stack>
            <StyledTabs value={displayMenu} sx={{ mx: "auto" }} onChange={(event, newValue) => { setDisplayMenu(newValue) }}>
                <StyledTab label="ノート" sx={{ height: 25, m: "auto", fontSize: 12, fontWeight: 600, color: mainColor }} />
                <StyledTab label="ボード" sx={{ height: 25, m: "auto", fontSize: 12, fontWeight: 600, color: mainColor }} />
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
    height: 32,
    minHeight: 32,
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
        maxWidth: 40,
        width: '100%',
        backgroundColor: mainColor,
    },
    '& .MuiTabs-flexContainer': {
        height: 32,
        minHeight: 32,
    },
    '& .MuiButtonBase-root': {
        height: 32,
        minHeight: 32,
    },
}));
