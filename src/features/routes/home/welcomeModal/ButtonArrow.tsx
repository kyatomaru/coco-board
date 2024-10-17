"use client"

import * as React from 'react';
import { Box } from '@mui/material';
import ForwardIcon from '@mui/icons-material/Forward';



const style = () => {
    return {
        "animation-iteration-count": "infinite",
        animation: `toRight 1.5s infinite`
    }
}

export default function ButtonArrow() {
    const [x, setX] = React.useState(-1)
    const [y, setY] = React.useState(-1)

    React.useEffect(() => {
        const el = document.getElementById('createTutorial-button')

        setX(el?.offsetLeft)
        setY(el?.offsetTop)

        console.log(el)
    }, [])

    return (
        <>
            <style>
                {`@keyframes toRight {
                0% {
                    transform: translateX(-200%);
                }
                100% {
                     transform: translateX(-100%);
                }
            }`}
            </style>

            <Box sx={{ position: "absolute", left: x, top: y + 4, zIndex: 3100, ...style() }}>
                <ForwardIcon sx={{ width: 50, height: 50, color: "#7fffd4" }} />
            </Box>
        </>
    )
}