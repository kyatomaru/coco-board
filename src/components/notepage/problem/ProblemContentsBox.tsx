"use client"

import * as React from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useParams } from 'next/navigation';
import type { User } from 'firebase/auth';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import type { GameContentsType } from '@/types/GameContents';
import type { ProblemContentsType } from '@/types/ProblemContents';
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


export default function ProblemContentsBox() {
    const [contentsId, setcontentsId] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(false);
    const [problem, setProblem] = React.useState([null]);
    const [user, setUser] = React.useState<User | null>(null);
    const [token, setToken] = React.useState<string | null>(null);

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

    // const problemContents = useGetAllProblem(setIsLoading)

    const DeleteContents = () => {
        setIsLoading(true)
        const auth = getAuth();
        GetContents(auth.currentUser?.uid)
        setIsLoading(false)
    }

    return (
        <Container sx={{}}>
            {isLoading ?
                <Container fixed sx={{ height: "100vh", position: "relative", textAlign: "center" }} >
                    <CircularProgress sx={{ position: "absolute", top: "50%", bottom: "50%", my: "auto" }} />
                </Container>
                :
                <>
                    {
                        problem[0] != null &&
                        problem.map((value, index) => {
                            return (
                                <ProblemContents key={index} contents={value} DeleteContents={DeleteContents} />
                            )
                        })
                    }
                </>
            }
        </Container>
    )
}