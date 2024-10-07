"use client"

import * as React from 'react';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import UpButtonArrow from './UpButtonArrow';

export default function TutorialArrow2() {
    const [x, setX] = React.useState(-1)
    const [y, setY] = React.useState(-1)

    React.useEffect(() => {
        const el = document.getElementById('tutorial-button2')

        setX(el?.offsetLeft)
        setY(el?.offsetTop)

        console.log(el)
    }, [])

    return (
        <>
            {x >= 0 && y >= 0 &&
                <UpButtonArrow x={x - 8} y={y} />
            }
        </>
    )
}