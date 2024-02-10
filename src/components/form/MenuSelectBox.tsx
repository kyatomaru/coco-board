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
            } else if (newAlignment == 2) {
                ClickBoardButton()
            }
        }
    }
    const router = useRouter()

    const auth = getAuth();
    const user = auth.currentUser

    const pathName = usePathname().split('/')

    React.useEffect(() => {
        console.log(pathName[1]);

        if (pathName[1] == "game") {
            setAlignment(0);
            ClickGameButton()
        } else if (pathName[1] == "practice") {
            setAlignment(1);
            ClickPracticeButton()
        } else if (pathName[1] == "board") {
            setAlignment(2);
            ClickBoardButton()
        }

    }, [])

    const ClickGameButton = () => {
        router.push('/game/create')
    }

    const ClickPracticeButton = () => {
        router.push('/practice/create')
    }

    const ClickBoardButton = () => {
        router.push('/board/create')
    }

    return (
        <Box sx={{ textAlign: "center", mx: 1 }}>
            <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
            >
                <ToggleButton value={0} >
                    試合
                </ToggleButton>
                <ToggleButton value={1} >
                    練習
                </ToggleButton>
                {/* <ToggleButton value={2} >
                ボード
            </ToggleButton> */}
            </ToggleButtonGroup>
        </Box>
    );
}