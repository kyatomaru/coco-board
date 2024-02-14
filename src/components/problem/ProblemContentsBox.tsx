"use client"

import * as React from 'react';
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
import DatePickerDay from '../form/DatePickerDay';


export default function ProblemContentsBox() {
    const [contentsId, setcontentsId] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(false);

    const clickLeftButton = () => {
        setcontentsId(contentsId - 1)
    }

    const clickRightButton = () => {
        setcontentsId(contentsId + 1)
    }

    const problemContents = useGetAllProblem(setIsLoading)

    return (
        <Container sx={{}}>
            {/* <Stack sx={{ width: "100%" }} justifyContent="center" alignItems="center" direction="row">
                <Box sx={{ width: "100%", textAlign: "center" }}>
                    <IconButton onClick={clickLeftButton} disabled={contentsId == 0}><ArrowBackIosIcon /></IconButton>
                </Box>
                <Typography sx={{ width: "100%", minWidth: "130px", px: 2, textAlign: "center", fontSize: 17 }} variant="h6" component="div">
                    {DataFormat(contents.date)}
                </Typography>
                <Box sx={{ width: "100%", textAlign: "center" }}>
                    <IconButton onClick={clickRightButton} disabled={contentsId == contents.contents.length - 1 || contents.contents.length == 0}><ArrowForwardIosIcon /></IconButton>
                </Box>
            </Stack> */}
            {/* <DatePickerDay /> */}
            <ProblemContents problemContents={problemContents} />
        </Container>
    )
}