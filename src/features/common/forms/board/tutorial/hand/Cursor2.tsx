"use client"

import * as React from 'react';
import { Box } from '@mui/material';
import ForwardIcon from '@mui/icons-material/Forward';
import TouchAppIcon from '@mui/icons-material/TouchApp';

type PageProps = {
    courtWidth: number,
    courtHeight: number
}

const style = () => {
    return {
        "animation-iteration-count": "infinite",
        animation: `diagonal 8s infinite, cursorFadeOut2 8s infinite`
    }
}

export default function Cursor2({ courtWidth, courtHeight }: PageProps) {

    return (
        <>
            <style>
                {`@keyframes diagonal {
                    30% {
                        transform: translate(10px, 20px);
                    }
                    40% {
                        transform: translate(10px, 20px);
                    }
                    88% {
                        transform: translate(${courtWidth / 3}px, ${courtHeight / 4 * 3 + 10}px);
                    }
                    100% {
                        transform: translate(${courtWidth / 3}px, ${courtHeight / 4 * 3 + 10}px);
                    }
                }`}
                {`@keyframes cursorFadeOut2 {
                    0% {
                        opacity: 0;
                    }
                    31% {
                        opacity: 0;
                    }
                    33% {
                        opacity: 1;
                    }
                    88% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 0;
                    }
                    100% {
                        opacity: 0;
                    }
                }`}
            </style>

            <Box sx={{ position: "absolute", zIndex: 3100, ...style() }}>
                <TouchAppIcon sx={{ width: 50, height: 50, color: "#7fffd4" }} />
            </Box>
        </>
    )
}