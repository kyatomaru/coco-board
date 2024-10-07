"use client"

import * as React from 'react';
import { Box } from '@mui/material';
import ForwardIcon from '@mui/icons-material/Forward';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';

type PageProps = {
    courtWidth: number,
    courtHeight: number
}
const style = () => {
    return {
        "animation-iteration-count": "infinite",
        animation: `toTop 8s infinite, cursorFadeOut1 8s infinite`
    }
}

export default function Cursor1({ courtWidth, courtHeight }: PageProps) {

    return (
        <>
            <style>
                {`@keyframes toTop {
                    0% {
                        transform: translate(10px, ${courtHeight / 4}px);
                    }
                    25% {
                        transform: translate(10px, 24px);
                    }
                }`}
                {`@keyframes cursorFadeOut1 {
                    0% {
                        opacity: 1;
                    }
                    31% {
                        opacity: 1;
                    }
                    33% {
                        opacity: 0;
                    }
                    100% {
                        opacity: 0;
                    }
                }`}
            </style>

            <Box sx={{ position: "absolute", zIndex: 3100, ...style() }}>
                <PanToolAltIcon sx={{ width: 50, height: 50, color: "#7fffd4" }} />
            </Box>
        </>
    )
}