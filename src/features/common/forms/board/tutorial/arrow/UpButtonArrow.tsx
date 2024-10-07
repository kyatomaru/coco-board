"use client"

import * as React from 'react';
import { Box, IconButton } from '@mui/material';
import ForwardRoundedIcon from '@mui/icons-material/ForwardRounded';

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

export default function UpButtonArrow({ x, y }: PageProps) {

    return (
        <>
            <style>
                {`@keyframes toTop {
                0% {
                    transform: translateY(150%);
                }
                100% {
                     transform: translateY(50%);
                }
            }`}
            </style>

            <Box sx={{ position: "absolute", left: x, zIndex: 3100, ...style() }}>
                <ForwardRoundedIcon sx={{ transform: `rotate(270deg)`, width: 50, height: 50, color: "#7fffd4" }} />
            </Box>
        </>
    )
}