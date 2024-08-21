"use client"

import * as React from 'react';
import Draggable from "react-draggable";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FrameModel, FrameType } from '@/types/board/Frame';
import { Margin } from '@mui/icons-material';
import zIndex from '@mui/material/styles/zIndex';
import { setRatio } from '@/constants/board/CourtRatio';
import { setVerticaCoordinate, setBesideCoordinate } from '@/hooks/board/courtSetting/CourtSetting';

type PageProps = {
    // courtWidth: React.MutableRefObject<any>,
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
    currentFrame: number
    index: number,
    selectItem: any,
    setSelectItem: any,
    isPlay: boolean
}


const circleStyle = (diameter, x, y, maxX, maxY, isSelect, isPlay) => {
    return {
        borderRadius: "50%",
        width: diameter + 12,
        height: diameter + 12,
        position: "absolute",
        pointerEvent: "none",
        border: isSelect && !isPlay ? "1px #66FFFF solid" : "none",
        display: (x < -diameter || maxX + diameter < x || y < -diameter || maxY + diameter < y) ? "none" : "flex",
        alignItems: "center",
        justifyContent: "center",
    }
}


const playerStyle = (diameter, x, y, maxX, maxY, color) => {
    return {
        borderRadius: "50%",
        backgroundColor: color.background + " !important",
        color: color.number,
        width: diameter,
        height: diameter,
        position: "absolute",
        pointerEvent: "none",
        display: (x < -diameter || maxX + diameter < x || y < -diameter || maxY + diameter < y) ? "none" : "flex",
        alignItems: "center",
        justifyContent: "center",
    }
}

const playerNameStyle = (diameter, color) => {
    return {
        top: diameter,
        fontSize: 8,
        color: color.name,
        fontWeight: "bold",
        position: "absolute",
        zIndex: 100,
        display: "block"
    }
}

export default function Player({ board, beforeCourtId, courtWidth, courtHeight, verticalWidth, verticalHeight, besideWidth, besideHeight, isPlay, frame, setFrame, currentFrame, index, selectItem, setSelectItem }: PageProps) {
    const [isDrag, setIsDrag] = React.useState(false);

    const getX = (frameIndex) => { return frame[frameIndex].players[index].x }
    const getY = (frameIndex) => { return frame[frameIndex].players[index].y }
    const getDiameter = () => { return frame[currentFrame].players[index].diameter }

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
    }

    const onDragEnd = (e, dragElement) => {
        setIsDrag(false)

        const frameArray = Array()
        frame.forEach((item) => {
            frameArray.push(item)
        })
        frameArray[currentFrame].players[index].x = dragElement.x
        frameArray[currentFrame].players[index].y = dragElement.y

        setFrame(frameArray)
    }

    const onSelect = () => {
        const selectItem = { target: "player", item: index }
        setSelectItem(selectItem)
    }

    const isSelect = () => {
        if (selectItem.target == "player") {
            if (selectItem.item == index) {
                return true
            }
        }
        return false
    }

    const setWindow = () => {
        const frameArray = Array()
        frame.map((item, frameIndex) => {
            frameArray.push(item)

            const x = frameArray[frameIndex].players[index].x
            const y = frameArray[frameIndex].players[index].y

            frameArray[frameIndex].players[index].x = getNewX(x, y, frameIndex)
            frameArray[frameIndex].players[index].y = getNewY(x, y, frameIndex)
        })
        setFrame(frameArray)
    }

    React.useEffect(() => {
        setWindow()
    }, [board.courtId])

    return (
        <Draggable
            // nodeRef={courtRef}
            // bounds="parent"
            handle={`.player${index}`}
            bounds={{ left: -getDiameter(), top: -getDiameter(), right: courtWidth - getDiameter(), bottom: courtHeight - getDiameter() }}
            position={{ x: isDrag ? getX(currentFrame) : getX(currentFrame) + getDiameter() / 4, y: isDrag ? getY(currentFrame) : getY(currentFrame) + getDiameter() / 4 }}
            onStart={onDragStart} onStop={onDragEnd}>
            <Box sx={{ position: "relative", zIndex: 200 }} className={`player${index}`}>
                <Box sx={circleStyle(isDrag ? getDiameter() + 10 : getDiameter(), getX(currentFrame), getY(currentFrame), courtWidth - getDiameter(), courtHeight - getDiameter(), isSelect(), isPlay)}>
                    <Box sx={playerStyle(isDrag ? getDiameter() + 10 : getDiameter(), getX(currentFrame), getY(currentFrame), courtWidth - getDiameter(), courtHeight - getDiameter(), frame[currentFrame].players[index].color)} >
                        <Typography sx={{ display: "block", fontSize: board.setting.isSeeNumber ? 10 : 8, fontWeight: "bold", lineHeight: 0 }}>
                            {board.setting.isSeeNumber ? frame[currentFrame].players[index].backNumber : frame[currentFrame].players[index].position}
                        </Typography>
                        <Typography sx={playerNameStyle(isDrag ? getDiameter() + 5 : getDiameter(), frame[currentFrame].players[index].color)}>
                            {board.setting.isSeeName && frame[currentFrame].players[index].name}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Draggable>
    )
}