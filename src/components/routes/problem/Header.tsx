"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation';
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
import CardMedia from '@mui/material/CardMedia';

const barStyle = {
    bgcolor: 'background.paper',
    color: "black",
    position: 'fixed',
    zIndex: "1100",
    width: "100%",
    boxShadow: "none",
    borderBottom: "solid 1px rgb(219, 219, 219)",
    display: { sm: "block", md: "none" },
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
    const router = useRouter()
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
            <HideOnScroll {...props}>
                <AppBar sx={barStyle} position="static">
                    <Toolbar>
                        <Stack
                            direction="row"
                            alignItems="center"
                            sx={{ height: { xs: 50, sm: 64 }, background: "white", width: "100%" }}>
                            <IconButton sx={{ p: "0" }} onClick={(event) => { router.push('/home') }}>
                                <CardMedia
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
                    <StyledTabs value={headerMenu} sx={{ height: 30, mx: "auto" }} onChange={(event, newValue) => { handleChange(event, newValue) }}>
                        <StyledTab label="未達成" sx={{ height: 30, mx: "auto", fontSize: ".8rem" }} />
                        <StyledTab label="達成" sx={{ height: 30, mx: "auto", fontSize: ".8rem" }} />
                    </StyledTabs>
                </AppBar>
            </HideOnScroll>
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