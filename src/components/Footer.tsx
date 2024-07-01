"use client"

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import AppBar from '@mui/material/AppBar';
import dayjs from 'dayjs'
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import EventIcon from '@mui/icons-material/Event';
import IconButton from '@mui/material/IconButton';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Link from 'next/link'

export default function Footer() {
    const pathName = usePathname().split('/')

    const setLabel = () => {
        if (pathName[1] === "home") {
            return 0
        }
        else if (pathName[1] === "create") {
            return 1
        }
        else if (pathName[1] === "calendar") {
            return 2
        }
        else if (pathName[1] === "problem") {
            return 3
        }
    }

    const [value, setValue] = React.useState(setLabel())

    const router = useRouter()

    const ClickHomeButton = () => {
        router.push("/home")
    };

    const ClickProblemButton = () => {
        router.push('/problem')
    };

    const ClickCreateButton = () => {
        router.push(`/create/${dayjs(String(new Date())).format('YYYY-MM-DD')}/board`)
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
        <Box sx={{ width: "100%" }}>
            <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, backgroundColor: 'background.paper', height: 45, display: { sm: "block", md: "none" } }}>
                <BottomNavigation
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction href="/home" sx={{ maxWidth: 90, minHeight: 50 }} value={0}
                        icon={<HomeIcon />} />
                    <BottomNavigationAction href={`/create/${dayjs(String(new Date())).format('YYYY-MM-DD')}/board`} sx={{ maxWidth: 90, minHeight: 50 }} value={1}
                        icon={<AddBoxIcon />} />
                    <BottomNavigationAction href="/calendar" sx={{ maxWidth: 90, minHeight: 50 }} value={2}
                        icon={<EventIcon />} />
                    <BottomNavigationAction href="/problem" sx={{ maxWidth: 90, minHeight: 50 }} value={3}
                        icon={<TextSnippetIcon />} />
                </BottomNavigation>
            </AppBar>
        </Box >
    );
}