"use client"

import * as React from 'react';
import type { User } from 'firebase/auth';
import dayjs from 'dayjs';
import { useGetAllProblem } from '@/hooks/problem/useGetAllProblem';
import Skeleton from '@mui/material/Skeleton';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ProblemCard from './ProblemCard';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { useGetDateGrowth } from '@/hooks/problem/growth/useGetDateGrowth';

type PageProps = {
    user: User,
    achieveMenu: boolean
}

export default function ProblemCardBox({ user, achieveMenu }: PageProps) {
    const [problemContents, getProblemContents] = useGetAllProblem(user)
    const [growthContents, getGrowthContents] = useGetDateGrowth(user, dayjs(String(new Date())).format('YYYY-MM-DD'))
    const [newGrowthContents, setNewGrowthContents] = React.useState(undefined)

    const getNewGrowthContents = async () => {
        const growthArray = Array()
        for (let index1 = 0; index1 < problemContents.length; index1++) {
            growthArray.push(undefined)
            for (let index2 = 0; index2 < growthContents.length; index2++) {
                if (problemContents[index1].contentsId == growthContents[index2].problemId) {
                    growthArray[index1] = growthContents[index2]
                }
            }
        }
        setNewGrowthContents(growthArray)
    }

    React.useEffect(() => {
        if (problemContents != undefined && growthContents != undefined) {
            getNewGrowthContents()
        }
    }, [problemContents, growthContents]);

    return (
        <Box sx={{ my: 1 }}>
            {problemContents == undefined ?
                <Skeleton variant="rounded" height={48} />
                :
                <Box>
                    {problemContents[0] != undefined && newGrowthContents != undefined ?
                        problemContents.map((value, index) => {
                            return (
                                achieveMenu == value.achieve &&
                                <ProblemCard key={index} problemContents={value} growthContents={newGrowthContents[index]} getProblemContents={getProblemContents} getGrowthContents={getGrowthContents} />
                            )
                        })
                        :
                        <Card sx={{ minWidth: 250, height: "115px", my: 3 }} elevation={2}>
                            <Stack direction="column" sx={{ p: 1, mx: 1, height: 120 }} alignContent="center" justifyContent="center" >
                                <Typography sx={{ fontSize: 13, textAlign: "center" }} variant="h6" component="div">
                                    記録がありません
                                </Typography>
                            </Stack>
                        </Card>
                    }
                </Box>
            }
        </Box>
    )
}