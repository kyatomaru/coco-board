"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AppBar from '@mui/material/AppBar';
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathName = usePathname().split('/')

    const setLabel = () => {
        if (pathName[1] === "target") {
            return 0
        }
        else if (pathName[1] === "notes") {
            return 1
        }
        else if (pathName[2] === "create") {
            return 2
        }

        else if (pathName[1] === "calendar") {
            return 3
        }
    }

    const [value, setValue] = React.useState(setLabel())

    const router = useRouter()

    const ClickTargetButton = () => {
        router.push("/target")
    };

    const ClickMakeButton = () => {
        router.push("/game/create")
    };

    const ClickViewButton = () => {
        router.push('/notes/' + dayjs().format('YYYY-MM-DD'))
    };

    const ClickCalendarButton = () => {
        router.push('/calendar/' + dayjs().format('YYYY-MM-DD'))
    };

    return (
        <Box  >
            <AppBar position="fixed" sx={{ top: 'auto', bottom: 0 }}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}>
                    <BottomNavigationAction label="Target" onClick={ClickTargetButton} />
                    <BottomNavigationAction label="Note" onClick={ClickViewButton} />
                    <BottomNavigationAction label="Make" onClick={ClickMakeButton} />
                    <BottomNavigationAction label="Board" onClick={ClickCalendarButton} />
                </BottomNavigation >
            </AppBar>
        </Box>
    );
}