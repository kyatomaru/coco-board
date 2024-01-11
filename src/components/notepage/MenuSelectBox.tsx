"use client"

import * as React from 'react';
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

type PageProps = {
    menu: Number
    handleMenuChange: Function
}


export default function MenuSelectBox({ menu, handleMenuChange }: PageProps) {
    const pathName = usePathname().split('/')
    const [alignment, setAlignment] = React.useState(menu)

    const handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: number,
    ) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
            handleMenuChange(newAlignment);
        }
    }

    return (
        <Box sx={{ textAlign: "center" }}>
            <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
            >
                {/* <ToggleButton value={0} >
                    課題
                </ToggleButton> */}
                <ToggleButton value={1} >
                    試合
                </ToggleButton>
                <ToggleButton value={2} >
                    練習
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
}