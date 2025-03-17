"use client"

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import EventIcon from '@mui/icons-material/Event';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, subMonths, addMonths, isSameDay, isSameMonth, isToday, format } from 'date-fns';
import dayjs from 'dayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Chip } from '@mui/material';
import MuiTextField, { TextFieldProps } from '@mui/material/TextField';
import HomeIcon from '@mui/icons-material/Home';
// import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import CardMedia from '@mui/material/CardMedia';
import HeaderMenus from '@/components/common/HeaderMenus';

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
    pl: { md: "120px", lg: "250px" }
}

type PageProps = {
    date: any
    selectedMonth: any
    setSelectedMonth: any
    displayMenu: any
    setDisplayMenu: any
}


export default function CalendarHeader({ date, selectedMonth, setSelectedMonth, displayMenu, setDisplayMenu }: PageProps) {
    const [openPicker, setOpenPicker] = React.useState(false);
    // 現在の月の初日を取得
    const currentMonth = startOfMonth(new Date());

    const previousMonth = () => {
        setSelectedMonth(subMonths(selectedMonth, 1));
    };

    const nextMonth = () => {
        // 選択された月の初日を取得
        const nextMonthDate = startOfMonth(addMonths(selectedMonth, 1));
        // 現在の月以降には進めないようにチェック
        if (nextMonthDate <= currentMonth) {
            setSelectedMonth(addMonths(selectedMonth, 1));
        }
    };

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
                <IconButton size='large' onClick={previousMonth} sx={{ width: 30, height: 30 }}>
                    <ArrowLeftIcon />
                </IconButton>

                <Stack direction="row" alignItems="center">
                    <IconButton href={`/home/${dayjs(String(date)).format('YYYY-MM-DD')}`}>
                        <HomeIcon />
                    </IconButton>
                    <Typography component="h2" fontSize={15}>
                        {format(selectedMonth, 'yyyy年 M月')}
                    </Typography>
                </Stack>

                <IconButton
                    size='large'
                    onClick={nextMonth}
                    sx={{
                        width: 30,
                        height: 30,
                        // 現在の月以降の場合はボタンを無効化
                        opacity: startOfMonth(addMonths(selectedMonth, 1)) > currentMonth ? 0.5 : 1,
                        pointerEvents: startOfMonth(addMonths(selectedMonth, 1)) > currentMonth ? 'none' : 'auto'
                    }}
                >
                    <ArrowRightIcon />
                </IconButton>
            </Stack>
            <StyledTabs value={displayMenu} sx={{ mx: "auto" }} onChange={(event, newValue) => { setDisplayMenu(newValue) }}>
                <StyledTab label="ボード" sx={{ height: 32, m: "auto", fontSize: 12, fontWeight: 600 }} />
                <StyledTab label="ノート" sx={{ height: 32, m: "auto", fontSize: 12, fontWeight: 600 }} />
            </StyledTabs>
        </AppBar>
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

const CustomTextField = styled((props: TextFieldProps) => (
    <MuiTextField {...props} />
))(({ theme }) => ({
    width: 0,
    '& input': {
        display: "none"
    },
    '& .MuiInputAdornment-root': {
        display: 'none',
    },
    '& fieldset': {
        display: "none"
    },
}));