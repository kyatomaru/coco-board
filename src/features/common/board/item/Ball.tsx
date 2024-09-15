"use client"

import * as React from 'react';
import Draggable from "react-draggable";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Icon from '@mui/material/Icon';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { FrameModel, FrameType } from '@/types/board/Frame';
import { setVerticaCoordinate, setBesideCoordinate } from '@/hooks/board/courtSetting/CourtSetting';

type PageProps = {
    board: any,
    beforeCourtId: number,
    courtWidth: number,
    courtHeight: number,
    verticalWidth: number,
    verticalHeight: number,
    besideWidth: number,
    besideHeight: number,
    frame: Array<FrameType>,
    setFrame: Function,
    currentFrame: number,
    selectItem: any,
    setSelectItem: any,
    isPlay: boolean,
    setMenu: any
}

const circleStyle = (ballSize, x, y, maxX, maxY, isSelect, isPlay) => {
    return {
        borderRadius: "50%",
        width: ballSize + 12,
        height: ballSize + 12,
        position: "absolute",
        pointerEvent: "none",
        border: isSelect && !isPlay ? "1px #66FFFF solid" : "none",
        display: (x < 0 || maxX < x || y < 0 || maxY < y) ? "none" : "flex",
        alignItems: "center",
        justifyContent: "center",
    }
}

const ballStyle = (ballSize, x, y, maxX, maxY) => {
    return {
        backgroundColor: "white !important",
        color: "black",
        width: ballSize,
        height: ballSize,
        position: "absolute",
        pointerEvent: "none",
        display: (x < 0 || maxX < x || y < 0 || maxY < y) ? "none" : "flex",
        zIndex: 200
    }
}

export default function Ball({ board, beforeCourtId, courtWidth, courtHeight, verticalWidth, verticalHeight, besideWidth, besideHeight, isPlay, frame, setFrame, currentFrame, selectItem, setSelectItem, setMenu }: PageProps) {
    const [isDrag, setIsDrag] = React.useState(false);
    const [ballSize, setBallSize] = React.useState(frame[0].ball.diameter);

    const getX = (frameIndex) => { return frame[frameIndex].ball.x }
    const getY = (frameIndex) => { return frame[frameIndex].ball.y }
    const getDiameter = () => { return frame[currentFrame].ball.diameter }

    const getNewX = (x, y, frameIndex) => {
        if (board.courtId == 0 && beforeCourtId != 0)
            return setVerticaCoordinate(beforeCourtId, verticalWidth, verticalHeight, besideWidth, besideHeight, x, y, getDiameter())[0]
        else if (board.courtId == 1 && beforeCourtId != 1)
            return setBesideCoordinate(board.courtId, beforeCourtId, verticalWidth, verticalHeight, besideWidth, besideHeight, x, y, getDiameter())[0]
        else if (board.courtId == 2 && beforeCourtId != 2)
            return setBesideCoordinate(board.courtId, beforeCourtId, verticalWidth, verticalHeight, besideWidth, besideHeight, x, y, getDiameter())[0]
        else
            return getX(frameIndex)
    }

    const getNewY = (x, y, frameIndex) => {
        if (board.courtId == 0 && beforeCourtId != 0)
            return setVerticaCoordinate(beforeCourtId, verticalWidth, verticalHeight, besideWidth, besideHeight, x, y, getDiameter())[1]
        else if (board.courtId == 1 && beforeCourtId != 1)
            return setBesideCoordinate(board.courtId, beforeCourtId, verticalWidth, verticalHeight, besideWidth, besideHeight, x, y, getDiameter())[1]
        else if (board.courtId == 2 && beforeCourtId != 2)
            return setBesideCoordinate(board.courtId, beforeCourtId, verticalWidth, verticalHeight, besideWidth, besideHeight, x, y, getDiameter())[1]
        else
            return getY(frameIndex)
    }

    const onDragStart = (e, dragElement) => {
        setIsDrag(true)
        onSelect()
        setMenu(0)
    }

    const onDragEnd = (e, dragElement) => {
        setIsDrag(false)

        const frameArray = Array()
        frame.forEach((item) => {
            frameArray.push(item)
        })
        frameArray[currentFrame].ball.x = dragElement.x
        frameArray[currentFrame].ball.y = dragElement.y

        setFrame(frameArray)
    }

    const onSelect = () => {
        const selectItem = { target: "ball", item: 0 }
        setSelectItem(selectItem)
    }

    const isSelect = () => {
        if (selectItem.target == "ball") {
            return true
        }
        return false
    }

    const setWindow = () => {
        const frameArray = Array()
        frame.map((item, frameIndex) => {
            frameArray.push(item)

            const x = frameArray[frameIndex].ball.x
            const y = frameArray[frameIndex].ball.y

            frameArray[frameIndex].ball.x = getNewX(x, y, frameIndex)
            frameArray[frameIndex].ball.y = getNewY(x, y, frameIndex)
        })
        setFrame(frameArray)
    }

    React.useEffect(() => {
        setWindow()
    }, [board.courtId])

    return (
        <Draggable
            handle='.ball'
            bounds={{ left: 0, top: 0, right: courtWidth - (2 * getDiameter()), bottom: courtHeight - (2 * getDiameter()) }}
            position={{ x: isDrag ? getX(currentFrame) : getX(currentFrame) + ballSize / 4, y: isDrag ? getY(currentFrame) : getY(currentFrame) + ballSize / 4 }}
            onStart={onDragStart} onStop={onDragEnd} >
            <Box sx={{ position: "relative", zIndex: 200 }} className={`ball`}>
                <Box sx={circleStyle(isDrag ? ballSize + 10 : ballSize, getX(currentFrame), getY(currentFrame), courtWidth - getDiameter(), courtHeight - getDiameter(), isSelect(), isPlay)}>
                    <Avatar
                        className='ball'
                        sx={ballStyle(isDrag ? ballSize + 10 : ballSize, getX(currentFrame), getY(currentFrame), courtWidth - getDiameter(), courtHeight - getDiameter())}
                    >
                        <SportsSoccerIcon
                            id="ball"
                            sx={{ width: isDrag ? ballSize + 10 : ballSize + "px", height: isDrag ? ballSize + 10 : ballSize + "px" }}
                        />
                    </Avatar >
                </Box>
            </Box>
        </Draggable >

    )
}