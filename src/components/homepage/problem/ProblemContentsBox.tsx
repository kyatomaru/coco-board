"use client"

import * as React from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useParams, useRouter } from 'next/navigation';
import type { User } from 'firebase/auth';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import type { GameContentsType } from '@/types/game/GameContents';
import type { ProblemContentsType } from '@/types/problem/ProblemContents';
import GameContents from "./ProblemContents"
import HomeContents from './ProblemContents';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ProblemContents from './ProblemContents';
import { useGetAllProblem } from '@/hooks/problem/useGetProblem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DatePickerDay from '../../form/DatePickerDay';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import { auth } from '@/app/firebase';
import dayjs from 'dayjs';

export default function ProblemContentsBox() {
    const [contentsId, setcontentsId] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(false);
    const [problem, setProblem] = React.useState([]);
    const [growth, setGrowth] = React.useState([]);

    const [user, setUser] = React.useState<User | null>(null);
    const [token, setToken] = React.useState<string | null>(null);

    const router = useRouter()

    const clickLeftButton = () => {
        setcontentsId(contentsId - 1)
    }

    const clickRightButton = () => {
        setcontentsId(contentsId + 1)
    }

    const GetProblemContents = async (uid: string | undefined) => {
        if (uid) {
            const getProblemParams = { uid: uid };
            const problemQuery = new URLSearchParams(getProblemParams);

            const getGrowthParams = { uid: uid, date: dayjs(String(new Date())).format('YYYY-MM-DD') };
            const growthQuery = new URLSearchParams(getGrowthParams);

            fetch(`/api/problem/?${problemQuery}`)
                .then((response) => response.json())
                .then((getProblemData) => {
                    const problemData = []
                    for (let index = 0; index < getProblemData.length; index++) {
                        if (getProblemData[index].achieve == false) problemData.push(getProblemData[index])
                    }
                    setProblem(problemData)

                    fetch(`/api/growth/list/?${growthQuery}`)
                        .then((response) => response.json())
                        .then((data) => {
                            const growthData = []
                            for (let index = 0; index < getProblemData.length; index++) {
                                for (let index2 = 0; index2 < data.length; index2++) {
                                    if (getProblemData[index].contentsId == data[index2].problemId) growthData.push(data[index2])
                                }
                            }
                            setGrowth(growthData)
                        })
                })
        }
    }

    React.useEffect(() => {
        setIsLoading(true)
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(auth.currentUser);
                user.getIdToken().then((token) => {
                    setToken(token);
                });
                await GetProblemContents(auth.currentUser?.uid)
                setIsLoading(false)
            } else {
                setUser(null);
                setToken(null);
            }
        });

    }, [])

    // const problemContents = useGetAllProblem(setIsLoading)

    const DeleteContents = () => {
        setIsLoading(true)
        GetProblemContents(auth.currentUser?.uid)
        setIsLoading(false)
    }

    return (
        <Container >
            {isLoading ?
                <Container fixed sx={{ height: "100vh", position: "relative", textAlign: "center" }} >
                    <CircularProgress sx={{ position: "absolute", top: "50%", bottom: "50%", my: "auto" }} />
                </Container>
                :
                <>
                    {
                        problem.length > 0 ?
                            problem.map((value, index) => {
                                return (
                                    <ProblemContents key={index} problemContents={value} growthContents={growth[index]} DeleteProblemContents={DeleteContents} />
                                )
                            })
                            :
                            <Card sx={{ minWidth: 250, height: "115px", my: 3 }} elevation={2}>
                                <Stack direction="column" sx={{ p: 1, mx: 1, height: 120 }} alignContent="center" justifyContent="center" >
                                    <Typography sx={{ fontSize: 13, textAlign: "center" }} variant="h6" component="div">
                                        記録がありません
                                    </Typography>
                                    <Box sx={{ textAlign: "center" }}>
                                        <Button onClick={() => { router.push("/notes/problem/create") }}>記録する</Button>
                                    </Box>
                                </Stack>
                            </Card>
                    }
                </>
            }
        </Container>
    )
}