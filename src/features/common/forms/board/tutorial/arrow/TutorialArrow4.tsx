"use client"

import * as React from 'react';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import DownButtonArrow from './DownButtonArrow';

export default function TutorialArrow4() {
    const [x, setX] = React.useState(-1)
    const [y, setY] = React.useState(-1)

    React.useEffect(() => {
        const el = document.getElementById('tutorial-button4')

        setX(el?.offsetLeft)
        setY(el?.offsetTop)

        console.log(el)
    }, [])

    return (
        <>
            {x >= 0 && y >= 0 &&
                <DownButtonArrow x={x - 8} y={y} />
            }
        </>
    )
}