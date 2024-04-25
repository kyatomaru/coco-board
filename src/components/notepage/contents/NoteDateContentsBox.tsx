"use client"

import * as React from 'react';
import { useRouter, useParams } from 'next/navigation'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import NoteContents from './NoteDateContents';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import { useGetProblem } from '@/hooks/problem/useGetProblem';
import { useGetAllGame } from '@/hooks/game/useGetGame';
import { useGetAllPractice } from '@/hooks/practice/useGetPractice';
import DeleteModal from '../DeleteModal';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import CircularProgress from '@mui/material/CircularProgress';
import { auth } from '@/app/firebase';
import ArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import dayjs from 'dayjs';
import { useDateFormat } from '@/hooks/useDateFormat';
import Grid from '@mui/material/Grid';

const DateFormat = (date) => {
    return useDateFormat(String(date))
}

export default function NoteDateContentsBox() {
    const router = useRouter()
    const params = useParams()
    const [user, setUser] = React.useState<User | null>(null);
    const [token, setToken] = React.useState<string | null>(null);
    const [contents, setContents] = React.useState([undefined]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    // const [gameContents, setGameContents] = React.useState<Array<GameContentsType | null>>([null]);
    // const [practiceContents, setPracticeContents] = React.useState<Array<PracticeContentsType | null>>([null]);

    console.log(contents)

    const GetContents = async (uid: string | undefined) => {
        if (uid) {
            const getParams = { uid: uid, date: dayjs(String(params.date)).format('YYYY-MM-DD') };
            const query = new URLSearchParams(getParams);

            fetch(`/api/note/?${query}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.length > 0) {
                        setContents(data)
                    }
                })
        }
    }

    React.useEffect(() => {
        setIsLoading(true)
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
        GetContents(auth.currentUser?.uid)
        setIsLoading(false)
    }

    const clickBackButton = () => {
        router.push(`/calendar`)
    }

    const clickLeftButton = () => {
        const beforeDay = dayjs(String(new Date(new Date(String(params.date)).setDate(new Date(String(params.date)).getDate() - 1)))).format('YYYY-MM-DD')
        router.push(`/calendar/${beforeDay}`)
    }

    const clickRightButton = () => {
        const afterDay = dayjs(String(new Date(new Date(String(params.date)).setDate(new Date(String(params.date)).getDate() + 1)))).format('YYYY-MM-DD')
        router.push(`/calendar/${afterDay}`)
    }

    return (
        <Container >
            {isLoading ?
                <Container fixed sx={{ height: "100vh", position: "relative", textAlign: "center" }} >
                    <CircularProgress sx={{ position: "absolute", top: "50%", bottom: "50%", my: "auto" }} />
                </Container>
                :
                <Box sx={{ my: 3 }}>
                    <Grid container alignItems="center" >
                        <Grid item xs="auto">
                            <IconButton onClick={clickBackButton} ><ArrowLeftIcon /></IconButton>
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h6" sx={{ fontSize: 14, textAlign: "center" }} component="div">
                                {DateFormat(params.date)}
                            </Typography>
                        </Grid>
                    </Grid>
                    {/* {
                        contents.map((value, index) => { */}
                    {/* return ( */}
                    <NoteContents contents={contents} DeleteContents={DeleteContents} />
                    {/* ) */}
                    {/* })
                    } */}
                </Box >
            }
        </Container >
    )
}