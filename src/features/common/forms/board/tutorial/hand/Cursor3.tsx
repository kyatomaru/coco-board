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
        animation: `cursorFadeOut3 8s infinite`
    }
}

export default function Cursor3({ courtWidth, courtHeight }: PageProps) {

    return (
        <>
            <style>
                {`@keyframes cursorFadeOut3 {
                    0% {
                        opacity: 0;
                    }
                    88% {
                        opacity: 0;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        opacity: 1;
                    }
                }`}
            </style>

            <Box sx={{ transform: `translate(${courtWidth / 3}px, ${courtHeight / 4 * 3 + 10}px)`, position: "absolute", zIndex: 3100, ...style() }}>
                <PanToolAltIcon sx={{ width: 50, height: 50, color: "#7fffd4" }} />
            </Box>
        </>
    )
}