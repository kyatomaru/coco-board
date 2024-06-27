"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import { FrameType } from '@/types/board/Frame';
import Ball from './item/Ball';
import Player from './item/Player';

type PageProps = {
    courtWidth: number
    courtHeight: number
    frame: Array<FrameType>,
    setFrame: Function,
    currentFrame: number,
    setCurrentFrame: Function,
    isPlay: boolean,
    isView: boolean,
    setIsPlay: Function,
    playFrame: Array<FrameType>
}

const courtStyle = (courtWidth, courtHeight) => {
    return {
        backgroundSize: "cover",
        width: courtWidth + "px",
        height: courtHeight + "px",
        backgroundImage: 'url(/images/board/court1.jpg)',
        margin: "auto",
        userSelect: "none",
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 100
    }
}

const courtFilterStyle = (courtWidth, courtHeight) => {
    return {
        backgroundSize: "cover",
        width: courtWidth + "px",
        height: courtHeight + "px",
        margin: "auto",
        userSelect: "none",
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 1000
    }
}

export default function CourtView({ courtWidth, courtHeight, frame, setFrame, currentFrame, setCurrentFrame, isPlay, isView, setIsPlay, playFrame }: PageProps) {
    const courtRef = React.useRef(null)
    const [playCurrentFrame, setPlayCurrentFrame] = React.useState(0)
    const [frameRate, setFrameRate] = React.useState(10);
    const [frameDig, setFrameDig] = React.useState(100);
    const [isPlayView, setIsPlayView] = React.useState<boolean>(false)
    const [frameIndex, setFrameIndex] = React.useState(0)

    React.useEffect(() => {
        if (isPlay) {
            const playView = async () => {
                setPlayCurrentFrame(frameIndex)
                setCurrentFrame(Math.floor((frameIndex + 1) / frameDig))

                await _sleep(frameRate)

                if (frameIndex == playFrame.length - 1) {
                    setIsPlayView(false)
                    setIsPlay(false)
                } else {
                    setFrameIndex(frameIndex + 1)
                }
            }

            if (!isPlayView) {
                setIsPlayView(true)
                if (currentFrame == frame.length - 1) {
                    setFrameIndex(0)
                } else {
                    setFrameIndex(currentFrame * frameDig)
                }
            } else {
                playView()
            }
        }
    })

    const Players = () => {
        const players = []
        frame[currentFrame].players.map((value, index) => {
            players.push(<Player courtRef={courtRef} key={index} index={index} frame={isPlay ? playFrame : frame} setFrame={setFrame} currentFrame={isPlay ? playCurrentFrame : currentFrame} diameter={25} />
            )
        })
        return players
    }

    return (
        <Box sx={{ backgroundColor: "#009900", position: "relative", height: courtHeight + "px", width: "100%" }}>
            <Box sx={courtFilterStyle(courtWidth, courtHeight)} display={(isPlay || isView) ? "block" : "none"} />
            <Box ref={courtRef} sx={courtStyle(courtWidth, courtHeight)} id="board">
                {courtRef.current != null && frame[currentFrame] != undefined &&
                    <>
                        {Players()}
                        <Ball courtRef={courtRef} frame={isPlay ? playFrame : frame} setFrame={setFrame} currentFrame={isPlay ? playCurrentFrame : currentFrame} diameter={20} />
                    </>
                }
            </Box>
        </Box>
    )
}

const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
