"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import LoadingPage from '@/components/common/AuthLoadingPage';
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
import LeftBar from '@/components/common/LeftBar';
import dayjs from 'dayjs';

export default function CreateBoardFormBox() {
    const params = useParams()
    const router = useRouter()
    const [boardContents, setBoardContents] = React.useState(new BoardModel(dayjs(String(params.date)).format('YYYY-MM-DD')));

    const InsertBoardContents = async (contents, image) => {
        await useInsertBoard(contents, image).then((data) => {
            router.push(`/home/${params.date}`)
        })
    }

    return (
        <Container maxWidth="sm" sx={{ px: 0, minHeight: "100vh", overflowY: "hidden", position: "relative", zIndex: 1500 }}>
            <BoardViewForm contents={boardContents} postData={InsertBoardContents} onClose={() => { router.push(`/home/${params.date}`) }} />
        </Container>
    )
}