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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const barStyle = {
    bgcolor: 'background.paper',
    color: "black"
}

type PageProps = {
    props: any,
    setMenu: React.Dispatch<React.SetStateAction<boolean>>
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

export default function Header({ props, setMenu }: PageProps) {
    const [headerMenu, setHeaderMenu] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        if (newValue == 0) setMenu(false);
        else if (newValue == 1) setMenu(true);
        setHeaderMenu(newValue)
    };

    const [value, setValue] = React.useState(0);
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
                            <LoginBox />
                        </Toolbar>
                        <StyledTabs value={headerMenu} sx={{ height: 35 }} onChange={(event, newValue) => { handleChange(event, newValue) }}>
                            <StyledTab label="未達成" sx={{ height: 35, m: "auto", fontSize: 13 }} />
                            <StyledTab label="達成" sx={{ height: 35, m: "auto", fontSize: 13 }} />
                        </StyledTabs>
                    </AppBar>
                </HideOnScroll>
            </Box>
        </React.Fragment >
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