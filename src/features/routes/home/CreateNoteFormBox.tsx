"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import LoadingPage from '@/components/LoadingPage';
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

type PageProps = {
    allContents: any,
    setContents: any,
    menu: Number,
    setMenu: Function,
    date: Date | String
}

export default function CreateNoteFormBox({ allContents, setContents, menu, setMenu, date }: PageProps) {
    const params = useParams()
    const router = useRouter()
    const [gameContents, setGameContents] = React.useState(new GameContentsModel(dayjs(String(date)).format('YYYY-MM-DD')));
    const [practiceContents, setPracticeContents] = React.useState(new PracticeContentsModel(dayjs(String(date)).format('YYYY-MM-DD')));


    const InsertGameContents = async (contents) => {
        await useInsertGame(contents).then((data) => {
            const resultContents = allContents.slice()
            resultContents.unshift(data)
            console.log(resultContents)
            setContents([...resultContents])
            setMenu(-1)
        })
    }

    const InsertPracticeContents = async (contents) => {
        await useInsertPractice(contents).then((data) => {
            const resultContents = allContents.slice()
            resultContents.unshift(data)
            setContents([...resultContents])
            setMenu(-1)
        })
    }

    return (
        <>
            {menu == 1 &&
                <Container maxWidth="sm" sx={{ px: 0, position: "relative", zIndex: 1500, borderRadius: 4 }}>
                    <Box sx={{ borderRight: "solid 0.5px #b2b2b2", borderLeft: "solid 0.5px #b2b2b2", backgroundColor: "#fbfbfb" }}>
                        <GameForm contents={gameContents} postData={InsertGameContents} onClose={() => { setMenu(-1) }} />
                        <MenuSelectBox alignment={menu} setAlignment={setMenu} />
                    </Box>
                </Container>
            }

            {menu == 2 &&
                <Container maxWidth="sm" sx={{ px: 0, position: "relative", zIndex: 1500, borderRadius: 4 }}>
                    <Box sx={{ borderRight: "solid 0.5px #b2b2b2", borderLeft: "solid 0.5px #b2b2b2", backgroundColor: "#fbfbfb" }}>
                        <PracticeForm contents={practiceContents} postData={InsertPracticeContents} onClose={() => { setMenu(-1) }} />
                        <MenuSelectBox alignment={menu} setAlignment={setMenu} />
                    </Box>
                </Container >
            }
        </>
    )
}