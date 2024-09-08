"use client"

import * as React from 'react';
import { CourtRatio } from '@/constants/board/CourtRatio';
import Box from '@mui/material/Box';
import { FrameType } from '@/types/board/Frame';
import ItemSettingBar from '../forms/board/itemSetting/ItemSettingBox';
import Ball from './item/Ball';
import Player from './item/Player';
import { SelectItemModel } from '@/types/board/SelectItem';
import TopControlBar from '../forms/board/TopControlBar';
import TopSubControlBar from '../forms/board/TopSubControlBar';
import { setRatio } from '@/constants/board/CourtRatio';

type PageProps = {
    board: any,
    onClose: any,
    onSubmit: any,
    frame: Array<FrameType>,
    setFrame: Function,
    currentFrame: number,
    setCurrentFrame: Function,
    isPlay: boolean,
    isView: boolean,
    setIsPlay: Function,
    playFrame: Array<FrameType>
}

const courtStyle = (courtWidth, courtHeight, courtId) => {
    return {
        backgroundSize: "cover",
        width: courtWidth + "px",
        height: courtHeight + "px",
        backgroundImage: `url(/images/board/court${courtId + 1}.jpg)`,
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

const courtInnerStyle = (courtWidth, courtHeight) => {
    return {
        width: courtWidth + "px",
        height: courtHeight + "px",
        margin: "auto",
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

export default function CourtView({ board, onClose, onSubmit, frame, setFrame, currentFrame, setCurrentFrame, isPlay, isView, setIsPlay, playFrame }: PageProps) {
    const courtRef = React.useRef(null)

    const [playCurrentFrame, setPlayCurrentFrame] = React.useState(0)
    const [frameRate, setFrameRate] = React.useState(10);
    const [frameDig, setFrameDig] = React.useState(100);
    const [isPlayView, setIsPlayView] = React.useState<boolean>(false)
    const [frameIndex, setFrameIndex] = React.useState(0)

    const [beforeCourtId, setBeforeCourtId] = React.useState(0);

    const [courtHeight, setCourtHeight] = React.useState(0);
    const [courtWidth, setCourtWidth] = React.useState(0);
    const [verticalWidth, setVerticalWidth] = React.useState(0);
    const [verticalHeight, setVerticalHeight] = React.useState(0);
    const [besideWidth, setBesideWidth] = React.useState(0);
    const [besideHeight, setBesideHeight] = React.useState(0);

    const [menu, setMenu] = React.useState(0)

    const [selectItem, setSelectItem] = React.useState(new SelectItemModel());
    const [time1, setTime1] = React.useState(0)
    const [time2, setTime2] = React.useState(0)

    const setWindow = () => {
        const courtLength = setRatio(window.innerWidth, window.innerHeight)
        setVerticalWidth(courtLength[0])
        setVerticalHeight(courtLength[1])
        setBesideWidth(courtLength[2])
        setBesideHeight(courtLength[3]);

        if (board.courtId == 0) {
            setCourtWidth(courtLength[0])
            setCourtHeight(courtLength[1])
        } else {
            setCourtWidth(courtLength[2])
            setCourtHeight(courtLength[3])
        }
    }

    React.useEffect(() => {
        setWindow()
    }, [])

    React.useEffect(() => {
        setBeforeCourtId(board.courtId)
        setWindow()
    }, [board.courtId])

    // React.useEffect(() => {
    //     window.addEventListener("resize", setWindow);
    // })

    React.useEffect(() => {
        const playView = async () => {
            await _sleep(frameRate)

            setPlayCurrentFrame(frameIndex)
            setCurrentFrame(Math.floor((frameIndex + 1) / frameDig))

            if (frameIndex == playFrame.length - 1) {
                setIsPlayView(false)
                setIsPlay(false)
                setTime2(performance.now());
                console.log(time2);
                console.log(time1 - time2);
            } else {
                setFrameIndex(frameIndex + 1)
            }
        }

        if (isPlay) {
            if (!isPlayView) {
                setTime1(performance.now());
                console.log(time1);
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
            players.push(<Player board={board} beforeCourtId={beforeCourtId} courtWidth={courtWidth} courtHeight={courtHeight} verticalWidth={verticalWidth} verticalHeight={verticalHeight} besideWidth={besideWidth} besideHeight={besideHeight} isPlay={isPlay} key={index} index={index} frame={isPlay ? playFrame : frame} setFrame={setFrame} currentFrame={isPlay ? playCurrentFrame : currentFrame} selectItem={selectItem} setSelectItem={setSelectItem} />
            )
        })
        return players
    }

    const isItemSelect = () => {
        setMenu(0)
    }

    const cancelSelectItem = (event) => {
        setSelectItem(new SelectItemModel())
    }

    return (
        <Box sx={{ touchAction: "none" }} >
            {!isView &&
                <>
                    <TopControlBar onClose={onClose} frame={frame} setFrame={setFrame} setCurrentFrame={setCurrentFrame} board={board} onSubmit={onSubmit} menu={menu} setMenu={setMenu} isPlay={isPlay} />
                    <TopSubControlBar board={board} frame={frame} setFrame={setFrame} setSelectItem={setSelectItem} selectItem={selectItem} menu={menu} setMenu={setMenu} isPlay={isPlay} />
                </>
            }
            <Box onMouseDown={() => isItemSelect()} sx={{ backgroundColor: "grey", position: "relative", height: window.innerHeight - 85 + "px", width: "100%", display: "flex", justifyContent: "center", border: "solid 0.5px #b2b2b2" }}>
                <Box sx={{ backgroundColor: "white", flexGrow: 1, position: "relative", zIndex: 1900 }} />
                <Box sx={{ width: courtWidth }}>
                    <Box sx={{ backgroundColor: "white", position: "absolute", top: -1, left: 0, right: 0, zIndex: 1900, width: "100%", height: (window.innerHeight - courtHeight - 85) / 2 }} />
                    <Box sx={courtFilterStyle(courtWidth, courtHeight)} display={(isPlay || isView) ? "block" : "none"} />
                    <Box ref={courtRef} sx={courtStyle(courtWidth, courtHeight, board.courtId)} id="board">
                        {courtRef.current != null && frame[currentFrame] != undefined &&
                            <>
                                {Players()}
                                <Ball board={board} beforeCourtId={beforeCourtId} courtWidth={courtWidth} courtHeight={courtHeight} verticalWidth={verticalWidth} verticalHeight={verticalHeight} besideWidth={besideWidth} besideHeight={besideHeight} isPlay={isPlay} frame={isPlay ? playFrame : frame} setFrame={setFrame} currentFrame={isPlay ? playCurrentFrame : currentFrame} selectItem={selectItem} setSelectItem={setSelectItem} />
                                <Box sx={courtInnerStyle(courtWidth, courtHeight)} onMouseDown={cancelSelectItem}></Box>
                            </>
                        }
                    </Box>
                    <Box sx={{ backgroundColor: "white", position: "absolute", left: 0, right: 0, bottom: -1, zIndex: 1900, width: "100%", height: (window.innerHeight - courtHeight - 85) / 2 }} />
                </Box>
                <Box sx={{ backgroundColor: "white", flexGrow: 1, position: "relative", zIndex: 1900 }} />
            </Box>
        </Box >
    )
}

const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
