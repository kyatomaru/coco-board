"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import LoadingPage from '@/components/LoadingPage';
import { useIsAuth } from '@/hooks/auth/useIsAuth';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import GameForm from '@/features/common/forms/game/GameForm';
import MenuSelectBox from '@/features/common/create/MenuSelectBox';
import type { User } from 'firebase/auth';
import { auth } from '@/app/firebase';
import { onAuthStateChanged, getAuth } from "firebase/auth"
import LoginPage from '@/features/routes/accounts/login/LoginPage';
import { GameContentsModel } from '@/types/game/GameContents';
import { useInsertGame } from '@/hooks/game/useInsertGame';
import LeftBar from '@/components/LeftBar';
import dayjs from 'dayjs';

export default function Home() {
    const params = useParams()
    const router = useRouter()
    const [contents, setContents] = React.useState(new GameContentsModel(dayjs(String(params.date)).format('YYYY-MM-DD')));
    const [user, setUser] = React.useState<User | undefined>(null);

    useIsAuth(router)

    React.useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(auth.currentUser)
            }
        })
    });

    return (
        <main className="flex min-h-screen flex-col items-center justify-between, bg-white">
            <LoadingPage />
            {user !== null &&
                <>
                    <LeftBar />
                    <Container maxWidth="sm" sx={{ px: 0, position: "relative" }}>
                        <Box sx={{ borderRight: "solid 0.5px #b2b2b2", borderLeft: "solid 0.5px #b2b2b2", backgroundColor: "#fbfbfb" }}>
                            <GameForm contents={contents} postData={useInsertGame} />
                            <MenuSelectBox />
                        </Box>
                    </Container>
                </>
            }
        </main >
    )
}
