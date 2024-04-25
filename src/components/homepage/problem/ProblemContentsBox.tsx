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

export default function ProblemContentsBox() {
    const [contentsId, setcontentsId] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(false);
    const [problem, setProblem] = React.useState([]);
    const [user, setUser] = React.useState<User | null>(null);
    const [token, setToken] = React.useState<string | null>(null);

    const router = useRouter()

    const clickLeftButton = () => {
        setcontentsId(contentsId - 1)
    }

    const clickRightButton = () => {
        setcontentsId(contentsId + 1)
    }

    const GetContents = async (uid: string | undefined) => {
        if (uid) {
            const getParams = { uid: uid };
            const query = new URLSearchParams(getParams);

            fetch(`/api/problem/?${query}`)
                .then((response) => response.json())
                .then((data) => {
                    setProblem(data)
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

    // const problemContents = useGetAllProblem(setIsLoading)

    const DeleteContents = () => {
        setIsLoading(true)
        GetContents(auth.currentUser?.uid)
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
                                    <ProblemContents key={index} problemContents={value} DeleteProblemContents={DeleteContents} />
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