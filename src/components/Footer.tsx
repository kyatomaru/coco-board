"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AppBar from '@mui/material/AppBar';
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import EditNoteIcon from '@mui/icons-material/EditNote';
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import TaskIcon from '@mui/icons-material/Task';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import EventIcon from '@mui/icons-material/Event';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';

export default function Footer() {
    const pathName = usePathname().split('/')

    const setLabel = () => {

        if (pathName[1] === "") {
            return 0
        }
        else if (pathName[1] === "problem") {
            return 2
        }
        else if (pathName[1] === "calendar") {
            return 1
        }

        else if (pathName[1] === "board") {
            return 3
        }
    }

    const [value, setValue] = React.useState(setLabel())

    const router = useRouter()

    const ClickHomeButton = () => {
        router.push("/")
    };

    const ClickProblemButton = () => {
        router.push('/problem')
    };

    const ClickViewButton = () => {
        router.push('/notes')
    };

    const ClickCalendarButton = () => {
        router.push('/calendar')
    };

    const ClickMessageButton = () => {
        router.push('/message')
    };

    const ClickAccountButton = () => {
        router.push('/account')
    };

    return (
        <Box  >
            <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, backgroundColor: 'background.paper' }}>
                <BottomNavigation
                    value={value}
                    sx={{ height: "45px", px: 1, width: "100%", maxWidth: "500px", mx: "auto", justifyContent: "center" }}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}>
                    {/* <IconButton sx={{ m: "auto" }} onClick={ClickHomeButton}><HomeIcon /></IconButton>
                    <IconButton sx={{ m: "auto" }} onClick={ClickViewButton} ><TextSnippetIcon /></IconButton>
                    <IconButton sx={{ m: "auto" }} onClick={ClickViewButton} ><EventIcon /></IconButton>
                    <IconButton sx={{ m: "auto" }} onClick={ClickViewButton}><EmailIcon /></IconButton>
                    <IconButton sx={{ m: "auto" }} onClick={ClickViewButton} ><AccountCircle /></IconButton> */}

                    <BottomNavigationAction icon={<HomeIcon />} onClick={ClickHomeButton} />
                    <BottomNavigationAction icon={<EventIcon />} onClick={ClickCalendarButton} />
                    <BottomNavigationAction icon={<TextSnippetIcon />} onClick={ClickProblemButton} />
                    {/* <BottomNavigationAction icon={<EmailIcon />} onClick={ClickMessageButton} />
                    <BottomNavigationAction icon={<AccountCircle />} onClick={ClickAccountButton} /> */}

                </BottomNavigation >
            </AppBar>
        </Box>
    );
}