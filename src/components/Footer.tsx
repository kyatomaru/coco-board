"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathName = usePathname().split('/')

    const setLabel = () => {
        if (pathName[2] === "create") {
            return 0
        }
        else if (pathName[1] === "notes") {
            return 1
        }
        else if (pathName[1] === "calendar") {
            return 2
        }
    }

    const [value, setValue] = React.useState(setLabel())

    const router = useRouter()

    const clickMakeButton = () => {
        router.push("/game/create")
    };

    const clickViewButton = () => {
        router.push('/notes/' + dayjs().format('YYYY-MM-DD'))
    };

    return (
        <Box sx={{ width: "100%", backgroundColor: "#FFFFFF" }}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}>
                <BottomNavigationAction label="Make" onClick={clickMakeButton} />
                <BottomNavigationAction label="View" onClick={clickViewButton} />
                <BottomNavigationAction label="Calendar" onClick={clickViewButton} />
            </BottomNavigation >
        </Box>
    );
}