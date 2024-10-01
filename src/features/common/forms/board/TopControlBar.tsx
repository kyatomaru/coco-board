"use client"

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import NearMeIcon from '@mui/icons-material/NearMe';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import SyncIcon from '@mui/icons-material/Sync';
import SaveIcon from '@mui/icons-material/Save';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { FrameModel, FrameType } from '@/types/board/Frame';
import { BallModel } from '@/types/board/Ball';
import ConfirmCloseModal from '../../contents/modal/ConfirmModal';
import ResetBoardModal from '../../contents/modal/ConfirmModal';
import { backTitle, resetTitle, backMs } from '@/constants/board/ModalMessage'
import BoardCreateForm from './BoardInfoForm';
import { BoardType } from '@/types/board/Board';
import Divider from '@mui/material/Divider';

type PageProps = {
    onClose: any,
    frame: Array<FrameType>,
    setFrame: Function,
    setCurrentFrame: Function,
    board: BoardType,
    onSubmit: Function,
    menu: Number,
    setMenu: Function,
    isPlay: boolean
}

const stackStyle = {
    height: "25px", position: "relative", zIndex: 2000,
    overflowY: "auto", backgroundColor: "white", borderTop: "solid 0.5px #b2b2b2", borderRight: "solid 0.5px #b2b2b2", borderLeft: "solid 0.5px #b2b2b2",
    "-ms-overflow-style": "none", "scrollbar-width": "none", "&::-webkit-scrollbar": { display: "none" }
}

const buttonStyle = (menu, index) => {
    return {
        minWidth: "50px",
        borderRadius: 0,
        color: menu == index ? "white" : "#444",
        backgroundColor: menu == index && "#444 !important"
    }
}

export default function TopControlBar({ onClose, frame, setFrame, setCurrentFrame, board, onSubmit, menu, setMenu, isPlay }: PageProps) {
    const [isOpenResetBoardModal, setIsOpenResetBoardModal] = React.useState<boolean>(false)
    const [isOpenSaveModal, setIsOpenSaveModal] = React.useState<boolean>(false)
    const [isConfirmCloseModal, setIsConfirmCloseModal] = React.useState<boolean>(false)

    const [windowWidth, setWindowWidth] = React.useState(0)
    const [scrollX, setScrollX] = React.useState(0)

    React.useEffect(() => {
        setWindowWidth(window.innerWidth)
    }, [])

    React.useEffect(() => {
        window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
    })

    const resetBoard = () => {
        const frameArray = Array()
        frameArray.push(new FrameModel([], new BallModel()))
        setFrame(frameArray)
        setCurrentFrame(0)

        setIsOpenResetBoardModal(false)
    }

    return (
        <>
            <ConfirmCloseModal open={isConfirmCloseModal} setOpen={setIsConfirmCloseModal} title={backTitle} message={backMs} confirmText="中止する" onSubmit={onClose} />
            <ResetBoardModal open={isOpenResetBoardModal} setOpen={setIsOpenResetBoardModal} title={resetTitle} message="" confirmText="リセットする" onSubmit={resetBoard} />
            {isOpenSaveModal &&
                <BoardCreateForm setOpen={setIsOpenSaveModal} board={board} onSubmit={onSubmit} />
            }

            {isPlay ?
                <Box sx={{ height: 25, width: "100%", backgroundColor: "white", position: "relative", zIndex: 2000 }}></Box>
                :
                <>
                    <Stack direction="row" justifyContent="flex-start" sx={stackStyle} id="top-controlbar" >
                        <IconButton onClick={() => !isPlay && setIsConfirmCloseModal(true)} sx={buttonStyle(menu, -1)}>
                            <ClearIcon />
                        </IconButton>

                        <Divider orientation="vertical" flexItem />

                        <IconButton onClick={() => { !isPlay && setIsOpenSaveModal(true) }} sx={buttonStyle(menu, -1)}>
                            <SaveIcon sx={{ width: "20px", height: "20px" }} />
                        </IconButton>

                        <Divider orientation="vertical" flexItem />

                        <IconButton onClick={() => { !isPlay && setMenu(0) }} sx={buttonStyle(menu, 0)}>
                            <NearMeIcon sx={{ transform: "rotate(270deg)", width: "20px", height: "20px" }} />
                        </IconButton>

                        <Divider orientation="vertical" flexItem />

                        <IconButton onClick={() => { !isPlay && setMenu(1) }} sx={buttonStyle(menu, 1)}>
                            <PersonAddAlt1Icon sx={{ width: "20px", height: "20px" }} />
                        </IconButton>

                        <Divider orientation="vertical" flexItem />

                        <IconButton onClick={() => { !isPlay && setMenu(2) }} sx={buttonStyle(menu, 2)}>
                            <PeopleIcon sx={{ width: "20px", height: "20px" }} />
                        </IconButton>

                        <Divider orientation="vertical" flexItem />

                        <IconButton onClick={() => { !isPlay && setMenu(3) }} sx={buttonStyle(menu, 3)}>
                            <img src={menu == 3 ? "/images/board/stadiumIcon_white.svg" : "/images/board/stadiumIcon_gray.svg"} style={{ width: "20px", height: "20px", color: "#444" }} />
                        </IconButton>

                        <Divider orientation="vertical" flexItem />

                        <IconButton onClick={() => { !isPlay && setMenu(4) }} sx={buttonStyle(menu, 4)}>
                            <SettingsIcon sx={{ width: "20px", height: "20px" }} />
                        </IconButton>

                        <Divider orientation="vertical" flexItem />

                        <IconButton onClick={() => { !isPlay && setIsOpenResetBoardModal(true) }} sx={buttonStyle(menu, -1)}>
                            <SyncIcon sx={{ width: "20px", height: "20px" }} />
                        </IconButton>

                        <Divider orientation="vertical" flexItem />
                    </Stack >
                    {408 > windowWidth && scrollX <= 0 &&
                        <IconButton onClick={() => { const el = document.getElementById("top-controlbar"); el.scroll({ left: 408 }); setScrollX(el.scrollLeft) }} sx={{ position: "absolute", zIndex: 2010, right: 0, top: 0, width: "25px", height: "25px", backgroundColor: "white !important", ":hover": { backgroundColor: "#eee" }, borderRadius: 0, border: "solid 0.5px #b2b2b2" }}>
                            <ArrowForwardIosIcon sx={{ width: "12px", height: "12px" }} />
                        </IconButton>
                    }
                    {408 > windowWidth && scrollX > 0 &&
                        <IconButton onClick={() => { const el = document.getElementById("top-controlbar"); el.scroll({ left: 0 }); setScrollX(el.scrollLeft) }} sx={{ position: "absolute", zIndex: 2010, left: 0, top: 0, width: "25px", height: "25px", backgroundColor: "white !important", ":hover": { backgroundColor: "#eee" }, borderRadius: 0, border: "solid 0.5px #b2b2b2" }}>
                            <ArrowBackIosNewIcon sx={{ width: "12px", height: "12px" }} />
                            {/* {scrollX} */}
                        </IconButton>
                    }
                </>
            }
        </>
    )
}
