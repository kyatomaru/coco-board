"use client"

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { styled } from '@mui/material/styles';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
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
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
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
    borderTop: "solid 1px rgb(219, 219, 219)",
    pl: { md: "120px", lg: "250px" },
    bottom: 0,
}

type PageProps = {
    selectedMonth: any
    setSelectedMonth: any
    pageMenu: any,
    setPageMenu: any,
}


export default function CalendarFooter({ selectedMonth, setSelectedMonth, pageMenu, setPageMenu }: PageProps) {

    return (
        <AppBar sx={barStyle} position="static">
            <Tabs scrollButtons={false} value={pageMenu} onChange={(event, newValue) => { setPageMenu(Number(newValue)) }}
                variant="scrollable" sx={{ height: 40 }} >
                <Tab label="ボード" sx={{ fontSize: 13 }} />
                <Tab label="ノート" sx={{ fontSize: 13 }} />
            </Tabs>
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