"use client"

import * as React from 'react';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import UpButtonArrow from './UpButtonArrow';

export default function TutorialArrow1() {
    const [x, setX] = React.useState(-1)
    const [y, setY] = React.useState(-1)

    React.useEffect(() => {
        const el = document.getElementById('tutorial-button1')

        setX(el?.offsetLeft)
        setY(el?.offsetTop)
    }, [])

    return (
        <>
            {x >= 0 && y >= 0 &&
                <UpButtonArrow x={x} y={y} />
            }
        </>
    )
}