"use client"

import * as React from 'react';
import Draggable from "react-draggable";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FrameModel, FrameType } from '@/types/board/Frame';
import { Margin } from '@mui/icons-material';
import zIndex from '@mui/material/styles/zIndex';

type PageProps = {
    courtRef: React.MutableRefObject<any>,
    frame: Array<FrameType>,
    setFrame: Function,
    currentFrame: number
    diameter: number,
    index: number
}

const playerStyle = (playerSize, x, y, color) => {
    return {
        borderRadius: "50%",
        backgroundColor: color.background + " !important",
        color: color.font,
        width: playerSize,
        height: playerSize,
        position: "absolute",
        pointerEvent: "none",
        display: (x < 0 || y < 0) ? "none" : "flex",
        alignItems: "center",
        justifyContent: "center",
    }
}

const playerNameStyle = () => {
    return {
        top: 25,
        fontSize: 12,
        fontWeight: "bold",
        position: "absolute",
        left: 15,
        // right: "50%",
        transform: "translateX(-50%)",
        "-webkit-transform": "translateX(-50%)",
        "-ms-transform": "translateX(-50%)",
    }
}

export default function Player({ courtRef, frame, setFrame, currentFrame, diameter, index }: PageProps) {
    const [isDrag, setIsDrag] = React.useState(false);
    const [playerSize, setPlayerSize] = React.useState(diameter);

    const onDragStart = (e, dragElement) => {
        console.log(dragElement)

        setIsDrag(true)
        setPlayerSize(Number(diameter) + 10)
    }

    const onDragEnd = (e, dragElement) => {
        setIsDrag(false)
        setPlayerSize(Number(diameter))

        const frameArray = Array()
        frame.forEach((item) => {
            frameArray.push(item)
        })
        frameArray[currentFrame].players[index].x = dragElement.x
        frameArray[currentFrame].players[index].y = dragElement.y

        setFrame(frameArray)
        console.log(frameArray)
    }

    const onDrag = (e, dragElement) => {
    }

    return (
        <Draggable nodeRef={courtRef}
            // bounds="parent"
            handle={`.player${index}`}
            bounds={{ left: 0, top: 0, right: courtRef.current.clientWidth - diameter, bottom: courtRef.current.clientHeight - diameter }}
            position={{ x: isDrag ? frame[currentFrame].players[index].x : frame[currentFrame].players[index].x, y: isDrag ? frame[currentFrame].players[index].y : frame[currentFrame].players[index].y }}
            onStart={onDragStart} onStop={onDragEnd} >
            <Box className={`player${index}`}>
                <Box sx={playerStyle(playerSize, frame[currentFrame].players[index].x, frame[currentFrame].players[index].y, frame[currentFrame].players[index].color)} >
                    {/* <Avatar sx={playerStyle(playerSize, frame[currentFrame].players[index].x, frame[currentFrame].players[index].y, frame[currentFrame].players[index].color)} > */}
                    <Typography sx={{ fontSize: 12, fontWeight: "bold", lineHeight: 0 }}>
                        {frame[currentFrame].players[index].backNumber}
                    </Typography>
                    {/* </Avatar > */}
                </Box >
                <Typography sx={playerNameStyle()}>
                    {frame[currentFrame].players[index].name}
                </Typography>
            </Box>
        </Draggable >

    )
}