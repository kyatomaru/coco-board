"use client"

import * as React from 'react';
import { Box } from '@mui/material';
import ForwardIcon from '@mui/icons-material/Forward';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import Player1 from './item/Player1';
import Player2 from './item/Player2';
import Player3 from './item/Player3';
import Cursor1 from './hand/Cursor1';
import Cursor2 from './hand/Cursor2';
import Cursor3 from './hand/Cursor3';

type PageProps = {
    courtWidth: number,
    courtHeight: number,
    isEnd: any
}

export default function DragTutorial({ courtWidth, courtHeight, isEnd }: PageProps) {
    const [isStart, setIsStart] = React.useState(false)

    React.useEffect(() => {
        const animation = async () => {
            setIsStart(true)
            await _sleep(8000)
            setIsStart(false)
            isEnd()
        }
        animation()
    }, [])

    return (
        <>
            {isStart &&
                <>
                    <Player1 courtWidth={courtWidth} courtHeight={courtHeight} />
                    <Player2 courtWidth={courtWidth} courtHeight={courtHeight} />
                    <Player3 courtWidth={courtWidth} courtHeight={courtHeight} />
                    <Cursor1 courtWidth={courtWidth} courtHeight={courtHeight} />
                    <Cursor2 courtWidth={courtWidth} courtHeight={courtHeight} />
                    <Cursor3 courtWidth={courtWidth} courtHeight={courtHeight} />
                </>
            }
        </>
    )
}

const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));