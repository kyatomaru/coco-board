"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation'
import { onAuthStateChanged, getAuth } from "firebase/auth"
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function MenuSelectBox() {
    const pathName = usePathname().split('/')
    const [alignment, setAlignment] = pathName[1] === "game" ? React.useState(0) : React.useState(1)

    const handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: number,
    ) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
            if (newAlignment == 0) {
                clickGameButton()
            } else if (newAlignment == 1) {
                clickPracticeButton()
            }
        }
    }
    const router = useRouter()

    const auth = getAuth();
    const user = auth.currentUser

    const clickGameButton = () => {
        router.push('/game/create')
    }

    const clickPracticeButton = () => {
        router.push('/practice/create')
    }

    return (
        <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
        >
            <ToggleButton value={0} >
                Game
            </ToggleButton>
            <ToggleButton value={1} >
                Practice
            </ToggleButton>
        </ToggleButtonGroup>
    );
}