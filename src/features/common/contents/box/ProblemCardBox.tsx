"use client"

import * as React from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useParams, useRouter } from 'next/navigation';
import type { User } from 'firebase/auth';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton'
import Card from '@mui/material/Card'
import { useGetAllProblem } from '@/hooks/problem/useGetAllProblem';
import ProblemCard from '../card/ProblemCard';


type PageProps = {
    user: User,
    achieveMenu: boolean
}

export default function ProblemCardBox({ user, achieveMenu }: PageProps) {
    const [contents, getContents] = useGetAllProblem(user)

    const router = useRouter()


    return (
        <Box sx={{ mt: 5 }}>
            {contents == undefined ?
                <Skeleton variant="rounded" height={131} />
                :
                <>
                    {contents[0] != undefined ?
                        contents.map((value, index) => {
                            return (
                                achieveMenu == value.achieve &&
                                <ProblemCard key={index} contents={value} getContents={getContents} />
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
        </Box>
    )
}