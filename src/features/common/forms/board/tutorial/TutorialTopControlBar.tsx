"use client"

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
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
import ConfirmCloseModal from '@/features/common/contents/modal/ConfirmModal';
import ResetBoardModal from '@/features/common/contents/modal/ConfirmModal';
import { backTitle, resetTitle, backMs } from '@/constants/board/ModalMessage'
import BoardCreateForm from '../BoardInfoForm';
import { BoardType } from '@/types/board/Board';
import Divider from '@mui/material/Divider';
import zIndex from '@mui/material/styles/zIndex';

type PageProps = {
    windowWidth: number,
}

const stackStyle = {
    height: "25px", position: "relative", zIndex: 3000,
    overflowY: "auto", backgroundColor: "white", borderTop: "solid 0.5px #b2b2b2", borderRight: "solid 0.5px #b2b2b2", borderLeft: "solid 0.5px #b2b2b2",
    "-ms-overflow-style": "none", "scrollbar-width": "none", "&::-webkit-scrollbar": { display: "none" }
}

const buttonStyle = (menu, index) => {
    return {
        minWidth: "50px",
        borderRadius: 0,
        color: menu == index ? "white" : "#444",
        backgroundColor: menu == index && "#444 !important",
        position: "relative",
        zIndex: 3100
    }
}

export default function TutorialTopControlBar({ windowWidth }: PageProps) {
    const [menu, setMenu] = React.useState(0)

    return (
        <>

            <Stack direction="row" justifyContent="flex-start" sx={stackStyle} id="top-controlbar" >
                <IconButton sx={buttonStyle(menu, -1)}>
                    <ClearIcon sx={{ width: "20px", height: "20px" }} />
                </IconButton>

                <Divider orientation="vertical" flexItem />

                <IconButton sx={buttonStyle(menu, -1)}>
                    <SaveIcon sx={{ width: "20px", height: "20px" }} />
                </IconButton>

                <Divider orientation="vertical" flexItem />

                <IconButton sx={buttonStyle(menu, 0)}>
                    <NearMeIcon sx={{ transform: "rotate(270deg)", width: "20px", height: "20px" }} />
                </IconButton>

                <Divider orientation="vertical" flexItem />
                <IconButton onClick={() => { setMenu(1), localStorage.removeItem("isNewCreateBoard"), localStorage.setItem("isNewCreateBoard", "0") }} sx={buttonStyle(menu, 1)} id="tutorial-button1">
                    <PersonAddAlt1Icon sx={{ width: "20px", height: "20px" }} />
                </IconButton>

                <Divider orientation="vertical" flexItem />

                <IconButton sx={buttonStyle(menu, 2)}>
                    <PeopleIcon sx={{ width: "20px", height: "20px" }} />
                </IconButton>

                <Divider orientation="vertical" flexItem />

                <IconButton sx={buttonStyle(menu, 3)}>
                    <img src={menu == 3 ? "/images/board/stadiumIcon_white.svg" : "/images/board/stadiumIcon_gray.svg"} style={{ width: "20px", height: "20px", color: "#444" }} />
                </IconButton>

                <Divider orientation="vertical" flexItem />

                <IconButton sx={buttonStyle(menu, 4)}>
                    <SettingsIcon sx={{ width: "20px", height: "20px" }} />
                </IconButton>

                <Divider orientation="vertical" flexItem />

                <IconButton sx={buttonStyle(menu, -1)}>
                    <SyncIcon sx={{ width: "20px", height: "20px" }} />
                </IconButton>

                <Divider orientation="vertical" flexItem />
            </Stack >
            {
                408 > windowWidth && scrollX <= 0 &&
                <IconButton onClick={() => { const el = document.getElementById("top-controlbar"); el.scroll({ left: 408 }); }} sx={{ position: "absolute", zIndex: 2010, right: 0, top: 0, width: "25px", height: "25px", backgroundColor: "white !important", ":hover": { backgroundColor: "#eee" }, borderRadius: 0, border: "solid 0.5px #b2b2b2" }}>
                    <ArrowForwardIosIcon sx={{ width: "12px", height: "12px" }} />
                </IconButton>
            }
            {
                408 > windowWidth && scrollX > 0 &&
                <IconButton onClick={() => { const el = document.getElementById("top-controlbar"); el.scroll({ left: 0 }); }} sx={{ position: "absolute", zIndex: 2010, left: 0, top: 0, width: "25px", height: "25px", backgroundColor: "white !important", ":hover": { backgroundColor: "#eee" }, borderRadius: 0, border: "solid 0.5px #b2b2b2" }}>
                    <ArrowBackIosNewIcon sx={{ width: "12px", height: "12px" }} />
                    {/* {scrollX} */}
                </IconButton>
            }
        </>
    )
}
