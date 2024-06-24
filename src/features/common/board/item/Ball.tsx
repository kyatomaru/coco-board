"use client"

import * as React from 'react';
import Draggable from "react-draggable";
import Avatar from '@mui/material/Avatar';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { FrameModel, FrameType } from '@/types/board/Frame';

type PageProps = {
    courtRef: React.MutableRefObject<any>,
    frame: Array<FrameType>,
    setFrame: Function,
    currentFrame: number
    diameter: number,
}

const ballStyle = (ballSize, x, y) => {
    return {
        backgroundColor: "white !important",
        color: "black",
        width: ballSize,
        height: ballSize,
        position: "absolute",
        pointerEvent: "none",
        display: (x < 0 || y < 0) && "none"
    }
}

export default function Ball({ courtRef, frame, setFrame, currentFrame, diameter }: PageProps) {
    const [isDrag, setIsDrag] = React.useState(false);
    const [ballSize, setBallSize] = React.useState(diameter);

    const onDragStart = (e) => {
        setIsDrag(true)
        setBallSize(Number(diameter) + 10)
    }

    const onDragEnd = (e, dragElement) => {
        setIsDrag(false)
        setBallSize(Number(diameter))

        const frameArray = Array()
        frame.forEach((item) => {
            frameArray.push(item)
        })
        frameArray[currentFrame].ball.x = dragElement.x
        frameArray[currentFrame].ball.y = dragElement.y

        setFrame(frameArray)
    }

    return (
        <Draggable
            nodeRef={courtRef}
            bounds={{ left: 0, top: 0, right: courtRef.current.clientWidth - diameter, bottom: courtRef.current.clientHeight - diameter }}
            position={{ x: isDrag ? frame[currentFrame].ball.x : frame[currentFrame].ball.x, y: isDrag ? frame[currentFrame].ball.y : frame[currentFrame].ball.y }}
            onStart={onDragStart} onStop={onDragEnd} >
            <Avatar sx={ballStyle(ballSize, frame[currentFrame].ball.x, frame[currentFrame].ball.y)} >
                <SportsSoccerIcon sx={{ width: ballSize + "px", height: ballSize + "px" }} />
            </Avatar >
        </Draggable >

    )
}