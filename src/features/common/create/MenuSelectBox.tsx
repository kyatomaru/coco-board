"use client"

import * as React from 'react';
import { useRouter, useParams } from 'next/navigation'
import { usePathname } from 'next/navigation';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { mainColor } from '@/constants/Color';

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

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "40px" }}>
            <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="note type"
                sx={{
                    height: "35px",
                    '& .MuiToggleButton-root': {
                        px: 2,
                        border: '1px solid #ddd',
                        borderRadius: "10px",
                        '&.Mui-selected': {
                            backgroundColor: mainColor,
                            color: 'white',
                            '&:hover': {
                                backgroundColor: mainColor,
                            }
                        }
                    }
                }}
            >
                <ToggleButton value={0} aria-label="game" size="small" sx={{ fontSize: 12, mx: 2 }}>
                    {/* <SportsEsportsIcon sx={{ mr: 1 }} /> */}
                    試合
                </ToggleButton>
                <ToggleButton value={1} aria-label="practice" size="small" sx={{ fontSize: 12, mx: 2 }}>
                    {/* <FitnessCenterIcon sx={{ mr: 1 }} /> */}
                    練習
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
}