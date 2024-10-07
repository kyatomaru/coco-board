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
    courtWidth: number,
    courtHeight: number
}


const circleStyle = (diameter, x, y, maxX, maxY, isSelect, isPlay) => {
    return {
        borderRadius: "50%",
        width: diameter + 12,
        height: diameter + 12,
        position: "absolute",
        pointerEvent: "none",
        border: isSelect && !isPlay ? "1px #66FFFF solid" : "none",
        display: (x < -diameter - 5 || maxX + diameter + 5 < x || y < -diameter - 5 || maxY + diameter + 5 < y) ? "none" : "flex",
        alignItems: "center",
        justifyContent: "center",
    }
}


const playerStyle = (diameter, x, y, maxX, maxY, color) => {
    return {
        borderRadius: "50%",
        backgroundColor: "blue !important",
        color: "white",
        width: diameter,
        height: diameter,
        position: "absolute",
        pointerEvent: "none",
        display: (x < -diameter - 5 || maxX + diameter + 5 < x || y < -diameter - 5 || maxY + diameter + 5 < y) ? "none" : "flex",
        alignItems: "center",
        justifyContent: "center",
    }
}

const playerNameStyle = (diameter, color) => {
    return {
        top: diameter,
        fontSize: 8,
        color: "black",
        fontWeight: "bold",
        position: "absolute",
        zIndex: 100,
        display: "block",
        width: "max-content"
    }
}

const style = {
    "animation-iteration-count": "infinite",
    animation: `playerFadeOut3 8s infinite`
}

export default function Player3({ courtWidth, courtHeight }: PageProps) {

    return (
        <>
            <style>
                {`@keyframes playerFadeOut3 {
                    0% {
                        opacity: 0;
                    }
                    88% {
                        opacity: 0;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        opacity: 1;
                    }
                }`}
            </style>

            <Box sx={{ transform: `translate(${courtWidth / 3 + 5}px, ${courtHeight / 4 * 3}px)`, position: "relative", zIndex: 3100, ...style }}>
                <Box sx={circleStyle(20, 10, 10, courtWidth - 20, courtHeight - 20, false, false)}>
                    <Box sx={playerStyle(20, 10, 10, courtWidth - 20, courtHeight - 20, "blue")} >
                        <Typography sx={{ display: "block", fontSize: 10, fontWeight: "bold", lineHeight: 0 }}>
                            1
                        </Typography>
                        <Typography sx={playerNameStyle(20, "blue")}>
                            player1
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}