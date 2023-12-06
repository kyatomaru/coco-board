"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation'
import { onAuthStateChanged, getAuth } from "firebase/auth"
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function MenuSelectBox() {
    const [alignment, setAlignment] = React.useState(0)

    const handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: number,
    ) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
            if (newAlignment == 0) {
                ClickGameButton()
            } else if (newAlignment == 1) {
                ClickPracticeButton()
            }
        }
    }
    const router = useRouter()

    const auth = getAuth();
    const user = auth.currentUser

    const pathName = usePathname().split('/')

    React.useEffect(() => {
        if (pathName[0] == "game") {
            setAlignment(0);
        } else {
            setAlignment(1);
        }
    }, [pathName])

    const ClickGameButton = () => {
        router.push('/game/create')
    }

    const ClickPracticeButton = () => {
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