"use client"

import * as React from 'react';
import { useRouter, useParams } from 'next/navigation'
import { usePathname } from 'next/navigation';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Typography } from '@mui/material';

type PageProps = {
    alignment: Number,
    setAlignment: Function
}

export default function MenuSelectBox({ alignment, setAlignment }: PageProps) {
    const params = useParams()
    const router = useRouter()
    const pathName = usePathname().split('/')
    // const [alignment, setAlignment] = React.useState(0)

    const handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: number,
    ) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    }

    React.useEffect(() => {
        if (pathName[3] == "board") {
            setAlignment(0);
        } else if (pathName[3] == "game") {
            setAlignment(1);
        } else if (pathName[3] == "practice") {
            setAlignment(2);
        }
    }, [])

    const ClickGameButton = () => {
        // router.replace(`/create/${dayjs(String(params.date)).format('YYYY-MM-DD')}/game/`)
    }

    const ClickPracticeButton = () => {
        // router.replace(`/create/${dayjs(String(params.date)).format('YYYY-MM-DD')}/practice/`)
    }

    const ClickBoardButton = () => {
        // router.replace(`/create/${dayjs(String(params.date)).format('YYYY-MM-DD')}/board/`)
    }

    return (
        <Box sx={{ textAlign: "center", position: 'sticky', mt: 10, bottom: 10, zIndex: 100 }}>
            <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
                sx={{ backgroundColor: "#9a9a9a", height: "40px", color: "white" }}
            >
                <ToggleButton onClick={ClickBoardButton} sx={{ minWidth: "60px" }} value={0} >
                    <Typography fontSize="small" sx={{ color: alignment == 0 && "white" }}>ボード</Typography>
                </ToggleButton>
                <ToggleButton onClick={ClickGameButton} sx={{ minWidth: "60px" }} value={1} >
                    <Typography fontSize="small" sx={{ color: alignment == 1 && "white" }}>試合</Typography>
                </ToggleButton>
                <ToggleButton onClick={ClickPracticeButton} sx={{ minWidth: "60px" }} value={2} >
                    <Typography fontSize="small" sx={{ color: alignment == 2 && "white" }}>練習</Typography>
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
}