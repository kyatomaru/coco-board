"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import type { GameContentsType } from '@/types/game/GameContents';
import type { PracticeContentsType } from '@/types/practice/PracticeContents';
import NoteContents from './NoteContents';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useGetProblem } from '@/hooks/problem/useGetProblem';
import { useGetAllGame } from '@/hooks/game/useGetGame';
import { useGetAllPractice } from '@/hooks/practice/useGetPractice';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import CircularProgress from '@mui/material/CircularProgress';


export default function NoteContentsBox() {
    const router = useRouter()
    const [user, setUser] = React.useState<User | null>(null);
    const [token, setToken] = React.useState<string | null>(null);
    const [contents, setContents] = React.useState([null]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    // const [gameContents, setGameContents] = React.useState<Array<GameContentsType | null>>([null]);
    // const [practiceContents, setPracticeContents] = React.useState<Array<PracticeContentsType | null>>([null]);

    // console.log(gameContents)

    const GetContents = async (uid: string | undefined) => {
        if (uid) {
            const getParams = { uid: uid };
            const query = new URLSearchParams(getParams);

            fetch(`/api/note/?${query}`)
                .then((response) => response.json())
                .then((data) => {
                    setContents(data)
                })
        }
    }

    React.useEffect(() => {

        setIsLoading(true)
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(auth.currentUser);
                user.getIdToken().then((token) => {
                    setToken(token);
                });
                GetContents(auth.currentUser?.uid)
                setIsLoading(false)
            } else {
                setUser(null);
                setToken(null);
            }
        });

    }, [])

    const DeleteContents = () => {
        setIsLoading(true)
        const auth = getAuth();
        GetContents(auth.currentUser?.uid)
        setIsLoading(false)
    }

    console.log(contents)

    return (
        <Box>
            {isLoading ?
                <Container fixed sx={{ height: "100vh", position: "relative", textAlign: "center" }} >
                    <CircularProgress sx={{ position: "absolute", top: "50%", bottom: "50%", my: "auto" }} />
                </Container>
                :
                <>
                    {
                        contents[0] != null &&
                        contents.map((value, index) => {
                            return (
                                <NoteContents key={index} contents={value} DeleteContents={DeleteContents} />
                            )
                        })
                    }
                </>
            }
        </Box >
    )
}