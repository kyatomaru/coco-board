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
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import HeaderMenus from '@/components/HeaderMenus';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

const barStyle = {
    bgcolor: 'background.paper',
    color: "black",
    mx: "auto",
    position: 'fixed',
    zIndex: "1000",
    width: "100%",
    flexGrow: 1,
    height: 50,
    display: { sm: "none", md: "block" },
}

type PageProps = {
    setMenu: React.Dispatch<React.SetStateAction<boolean>>
}


export default function AchieveSelectTabs({ setMenu }: PageProps) {
    const [headerMenu, setHeaderMenu] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        if (newValue == 0) setMenu(false);
        else if (newValue == 1) setMenu(true);
        setHeaderMenu(newValue)
    };

    const [value, setValue] = React.useState(0);

    return (
        <AppBar sx={barStyle} position="static">
            {/* <Toolbar> */}
            <StyledTabs value={headerMenu} sx={{ height: 50, mx: "auto" }} onChange={(event, newValue) => { handleChange(event, newValue) }}>
                <StyledTab label="未達成" sx={{ height: 32, m: "auto", fontSize: 13 }} />
                <StyledTab label="達成" sx={{ height: 32, m: "auto", fontSize: 13 }} />
            </StyledTabs>
            {/* </Toolbar> */}
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