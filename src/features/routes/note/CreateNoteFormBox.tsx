"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import LoadingPage from '@/components/AuthLoadingPage';
import { useIsAuth } from '@/hooks/auth/useIsAuth';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import MenuSelectBox from '@/features/common/create/MenuSelectBox';
import type { User } from 'firebase/auth';
import { auth } from '@/app/firebase';
import { onAuthStateChanged, getAuth } from "firebase/auth"
import LoginPage from '@/features/routes/accounts/login/LoginPage';
import BoardViewForm from '@/features/common/forms/board/BoardViewForm';
import { BoardModel } from '@/types/board/Board';
import { useInsertBoard } from '@/hooks/board/useInsertBoard';
import GameForm from '@/features/common/forms/game/GameForm';
import { GameContentsModel } from '@/types/game/GameContents';
import { useInsertGame } from '@/hooks/game/useInsertGame';
import PracticeForm from '@/features/common/forms/practice/PracticeForm';
import { PracticeContentsModel } from '@/types/practice/PracticeContents';
import { useInsertPractice } from '@/hooks/practice/useInsertPractice'
import TaskForm from '@/features/common/forms/task/TaskForm';
import { TaskModel } from '@/types/task/Task';
import { useInsertTask } from '@/hooks/task/useInsertTask';
import LeftBar from '@/components/LeftBar';
import dayjs from 'dayjs';
import { Stack, Typography } from '@mui/material';
import { Card } from '@mui/material';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';

type PageProps = {
    allContents: any,
    setContents: any,
    boards: any[],
    isLoading: boolean,
    setIsLoading: Function,
    menu: number,
    setMenu: Function,
    date: Date | String,
    setTabValue: any
}

export default function CreateNoteFormBox({ allContents, setContents, boards, isLoading, setIsLoading, menu, setMenu, date, setTabValue }: PageProps) {
    const params = useParams()
    const router = useRouter()
    const [gameContents, setGameContents] = React.useState(new GameContentsModel(dayjs(String(date)).format('YYYY-MM-DD')));
    const [practiceContents, setPracticeContents] = React.useState(new PracticeContentsModel(dayjs(String(date)).format('YYYY-MM-DD')));

    const InsertGameContents = async (contents, selectedFiles: File[]) => {
        setIsLoading(true)
        useInsertGame(contents, selectedFiles).then( async (data) => {
            const resultContents = allContents.slice()
            resultContents.unshift(data)
            setContents([...resultContents])
            setTabValue(1)
            setIsLoading(false)
        })
    }

    const InsertPracticeContents = async (contents, selectedFiles: File[]) => {
        setIsLoading(true)
        await useInsertPractice(contents, selectedFiles).then((data) => {
            const resultContents = allContents.slice()
            resultContents.unshift(data)
            setContents([...resultContents])
            setTabValue(1)
            setIsLoading(false)
        })
    }

    return (
        <>
            {!isLoading && menu === 0 && (
                <GameForm 
                    contents={gameContents} 
                    postData={InsertGameContents} 
                    boards={boards} 
                    onClose={() => setMenu(-1)} 
                    isCreate={true} 
                    menu={menu} 
                    setMenu={setMenu} 
                />
            )}

            {!isLoading && menu === 1 && (
                <PracticeForm 
                    contents={practiceContents} 
                    postData={InsertPracticeContents} 
                    boards={boards} 
                    onClose={() => setMenu(-1)} 
                    isCreate={true} 
                    menu={menu} 
                    setMenu={setMenu} 
                />
            )}

            {isLoading && (
                <Stack direction="row" justifyContent="center" alignItems="center" sx={{backgroundColor: "#fbfbfb", borderRight: "solid 0.5px #b2b2b2", borderLeft: "solid 0.5px #b2b2b2", height: "100vh", overflowY: "hidden" }}>
                    <Box sx={{ textAlign: "center" }}>
                    <Typography sx={{ fontSize: 13, textAlign: "center", mb: 2, color: "black" }} component="h2">
                        ノートを保存しています
                    </Typography>
                        <CircularProgress />
                    </Box>
                </Stack>
            )}
        </>
    )
}