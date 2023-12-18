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
import AddBoxIcon from '@mui/icons-material/AddBox';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';

export default function Footer() {
    const pathName = usePathname().split('/')

    const setLabel = () => {
        // if (pathName[1] === "target") {
        //     return 0
        // }
        if (pathName[1] === "notes") {
            return 0
        }
        else if (pathName[2] === "create") {
            return 1
        }

        else if (pathName[1] === "board") {
            return 2
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
                    {/* <BottomNavigationAction label="Target" onClick={ClickTargetButton} /> */}
                    <BottomNavigationAction label="閲覧" icon={<StickyNote2Icon />} onClick={ClickViewButton} />
                    <BottomNavigationAction label="作成" icon={<AddBoxIcon />} onClick={ClickMakeButton} ></BottomNavigationAction>
                    {/* <BottomNavigationAction label="Board" onClick={ClickCalendarButton} /> */}
                </BottomNavigation >
            </AppBar>
        </Box>
    );
}