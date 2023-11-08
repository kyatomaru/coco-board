"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { green } from "@mui/material/colors"
import { createTheme } from '@mui/material/styles'

export default function Footer() {
    const [value, setValue] = React.useState(0);

    return (
        <Box sx={{ width: "100%", backgroundColor: "#FFFFFF" }}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}>
                <BottomNavigationAction label="Make" />
                <BottomNavigationAction label="View" />
            </BottomNavigation >
        </Box>
    );
}