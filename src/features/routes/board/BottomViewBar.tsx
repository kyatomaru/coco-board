"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Slider from '@mui/material/Slider';
import { FrameType, FrameModel } from '@/types/board/Frame';
import { BallModel } from '@/types/board/Ball';
import { PlayerModel } from '@/types/board/Player';

type PageProps = {
    frame: Array<FrameType>,
    setFrame: Function,
    currentFrame: number
    setCurrentFrame: Function
    setPlayFrame: Function,
    isPlay: Boolean,
    setIsPlay: Function
}

export default function BottomViewBar({ frame, setFrame, currentFrame, setCurrentFrame, setPlayFrame, isPlay, setIsPlay }: PageProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const [frameDig, setframeDig] = React.useState(100);

    const frameHandleChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            setCurrentFrame(newValue);
        }
    };

    const toNextFrame = () => {
        if (currentFrame > 0) {
            setCurrentFrame(currentFrame - 1)
        }
    }

    const toPreviousFrame = () => {
        if (currentFrame < frame.length - 1) {
            setCurrentFrame(currentFrame + 1)
        }
    }

    const playFrame = () => {
        if (frame.length > 1) {
            setIsPlay(true)
            setPlayFrame(initPlayFrame(frame, frameDig))
        }
    }

    const stopFrame = () => {
        if (frame.length > 1) {
            setIsPlay(false)
        }
    }

    React.useEffect(() => {
        // const frameArray = Array()
        // frameArray.push(new FrameModel([], new BallModel()))
        // setFrame(frameArray)
    }, [])

    return (
        <Stack direction="row" justifyContent="space-between" sx={{
            position: "relative", zIndex: 2000, px: 2, margin: "auto", backgroundColor: "white", border: "solid 0.5px #b2b2b2"
        }}>
            <Stack sx={{ width: "30%" }} direction="row" justifyContent="space-between" alignItems="center">
                <Slider
                    size="small"
                    value={currentFrame}
                    max={frame.length - 1}
                    onChange={frameHandleChange}
                />
                <Typography sx={{ mx: 1, fontSize: 14, color: "black" }}>
                    {currentFrame + 1}/{frame.length}
                </Typography>
            </Stack>
            <Stack sx={{ width: "40%" }} direction="row" justifyContent="space-around">
                <IconButton size='small' onClick={toNextFrame}>
                    <SkipPreviousIcon />
                </IconButton>
                {isPlay
                    ? <IconButton size='small' onClick={stopFrame}>
                        <PauseIcon />
                    </IconButton>
                    : <IconButton size='small' onClick={playFrame}>
                        <PlayArrowIcon />
                    </IconButton>
                }

                <IconButton size='small' onClick={toPreviousFrame}>
                    <SkipNextIcon />
                </IconButton>
            </Stack>
            <Stack sx={{ width: "30%" }} direction="row" justifyContent="space-around">

            </Stack>
        </Stack >
    )
}

const initPlayFrame = (frame, frameDig) => {
    const playFrameArray = Array()
    const players = Array()

    frame[0].players.forEach(value => {
        players.push(new PlayerModel(value.teamNumber, value.backNumber, undefined, value.color))
    });

    for (let frameIndex = 0; frameIndex < frame.length - 1; frameIndex++) {
        for (let ratioIndex = 0; ratioIndex < frameDig; ratioIndex++) {
            playFrameArray.push(new FrameModel(JSON.parse(JSON.stringify(players)), new BallModel()))

            // ball
            playFrameArray[frameIndex * frameDig + ratioIndex].ball.x = getBetweenCdn(frameDig, ratioIndex, frame[frameIndex].ball.x, frame[frameIndex + 1].ball.x)
            playFrameArray[frameIndex * frameDig + ratioIndex].ball.y = getBetweenCdn(frameDig, ratioIndex, frame[frameIndex].ball.y, frame[frameIndex + 1].ball.y)

            // players
            frame[frameIndex].players.map((value, playerIndex) => {
                playFrameArray[frameIndex * frameDig + ratioIndex].players[playerIndex].x = getBetweenCdn(frameDig, ratioIndex, frame[frameIndex].players[playerIndex].x, frame[frameIndex + 1].players[playerIndex].x)
                playFrameArray[frameIndex * frameDig + ratioIndex].players[playerIndex].y = getBetweenCdn(frameDig, ratioIndex, frame[frameIndex].players[playerIndex].y, frame[frameIndex + 1].players[playerIndex].y)
            })
        }
    }

    return playFrameArray
}

const getBetweenCdn = (maxRatio, ratio, cdn1, cdn2) => {
    let cdn = cdn1 + ((cdn2 - cdn1) / maxRatio) * ratio;
    return cdn;
}
