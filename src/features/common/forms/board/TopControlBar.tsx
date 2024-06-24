"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs';
import ClearIcon from '@mui/icons-material/Clear';
import PersonIcon from '@mui/icons-material/Person';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SyncIcon from '@mui/icons-material/Sync';
import SaveIcon from '@mui/icons-material/Save';
import { FrameModel, FrameType } from '@/types/board/Frame';
import { PlayerModel } from '@/types/board/Player';
import { BallModel } from '@/types/board/Ball';
import AddPlayerModal from './modal/AddPlayerModal';
import ResetBoardModal from './modal/ResetBoardModal';
import BoardCreateForm from './BoardInfoForm';
import { BoardType } from '@/types/board/Board';

type PageProps = {
    frame: Array<FrameType>,
    setFrame: Function,
    setCurrentFrame: Function,
    board: BoardType,
    onSubmit: Function
}


export default function TopControlBar({ frame, setFrame, setCurrentFrame, board, onSubmit }: PageProps) {
    const params = useParams()
    const router = useRouter()

    const [isOpenAddPlayerModal, setIsOpenAddPlayerModal] = React.useState<boolean>(false)
    const [isOpenResetBoardModal, setIsOpenResetBoardModal] = React.useState<boolean>(false)
    const [isOpenSaveModal, setIsOpenSaveModal] = React.useState<boolean>(false)

    const addBall = () => {
        const frameArray = []
        frame.forEach((item) => {
            frameArray.push(item)
        })

        if (frameArray[0].ball.x < 0) {
            frame.forEach((item) => {
                item.ball.x = 0
                item.ball.y = 0
            })
        }
        setFrame(frameArray)
    }

    const addPlayer = (team) => {
        const frameArray = []

        frame.forEach((item) => {
            frameArray.push(item)
        })

        let teamLength = 0
        for (let index = 0; index < frameArray[0].players.length; index++) {
            if (team == frameArray[0].players[index].teamNumber) teamLength++;
        }
        const name = "player" + String(frameArray[0].players.length + 1)

        frameArray.forEach((item) => {
            item.players.push(new PlayerModel(team, teamLength + 1, name))
        })

        setFrame(frameArray)
        setIsOpenAddPlayerModal(false)
    }

    const resetBoard = () => {
        const frameArray = Array()
        frameArray.push(new FrameModel([], new BallModel()))
        setFrame(frameArray)
        setCurrentFrame(0)
    }

    return (
        <>
            <AddPlayerModal open={isOpenAddPlayerModal} setOpen={setIsOpenAddPlayerModal} AddPlayer={addPlayer} />
            <ResetBoardModal open={isOpenResetBoardModal} setOpen={setIsOpenResetBoardModal} resetBoard={resetBoard} />
            {isOpenSaveModal &&
                <BoardCreateForm setOpen={setIsOpenSaveModal} board={board} onSubmit={onSubmit} />
            }

            <Stack direction="row" justifyContent="space-around" sx={{ margin: "auto", backgroundColor: "white", borderTop: "solid 0.5px #b2b2b2", borderRight: "solid 0.5px #b2b2b2", borderLeft: "solid 0.5px #b2b2b2", }}>
                <IconButton size='small' onClick={(event) => router.back()}>
                    <ClearIcon sx={{ width: { xs: "20px" }, height: { xs: "20px" } }} />
                </IconButton>

                <IconButton size='small' onClick={() => { setIsOpenAddPlayerModal(true) }}>
                    <PersonIcon sx={{ width: { xs: "20px" }, height: { xs: "20px" } }} />
                </IconButton>

                <IconButton size='small' onClick={addBall}>
                    <SportsSoccerIcon sx={{ width: { xs: "20px" }, height: { xs: "20px" } }} />
                </IconButton>

                <IconButton size='small' onClick={() => { setIsOpenResetBoardModal(true) }}>
                    <SyncIcon sx={{ width: { xs: "20px" }, height: { xs: "20px" } }} />
                </IconButton>

                <IconButton size='small' onClick={() => { setIsOpenSaveModal(true) }}>
                    <SaveIcon sx={{ width: { xs: "20px" }, height: { xs: "20px" } }} />
                </IconButton>
            </Stack >
        </>
    )
}
