"use client"

import * as React from 'react';
import { Box } from '@mui/material';
import ForwardIcon from '@mui/icons-material/Forward';

type PageProps = {
    x: number,
    y: number
}

const style = () => {
    return {
        "animation-iteration-count": "infinite",
        animation: `toTop 1.5s infinite`
    }
}

export default function DownButtonArrow({ x, y }: PageProps) {

    return (
        <>
            <style>
                {`@keyframes toTop {
                0% {
                    transform: translateY(-200%);
                }
                100% {
                     transform: translateY(-100%);
                }
            }`}
            </style>

            <Box sx={{ position: "absolute", left: x, zIndex: 3100, ...style() }}>
                <ForwardIcon sx={{ transform: `rotate(90deg)`, width: 50, height: 50, color: "#7fffd4" }} />
            </Box>
        </>
    )
}