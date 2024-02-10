"use client"

import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import type { SolutionType } from '@/types/Problem';
import ProblemContents from './ProblemContents';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type PageProps = {
    contents: Array<SolutionType | null>
}

export default function ProblemContentsBox({ contents }: PageProps) {
    const [contentsId, setcontentsId] = React.useState(0);

    const clickLeftButton = () => {
        setcontentsId(contentsId - 1)
    }

    const clickRightButton = () => {
        setcontentsId(contentsId + 1)
    }

    return (
        <Box>
            <Stack sx={{ width: "100%" }} justifyContent="center" alignItems="center" direction="row">
                <Button sx={{ width: "100%" }} onClick={clickLeftButton} disabled><ArrowBackIosIcon /></Button>
                <Button sx={{ width: "100%" }} onClick={clickRightButton} disabled><ArrowForwardIosIcon /></Button>
            </Stack >
            <ProblemContents contents={contents} />
            <Stack sx={{ width: "100%" }} justifyContent="center" alignItems="center" direction="row">
                <Button sx={{ width: "100%" }} onClick={clickLeftButton} disabled><ArrowBackIosIcon /></Button>
                <Button sx={{ width: "100%" }} onClick={clickRightButton} disabled><ArrowForwardIosIcon /></Button>
            </Stack >
        </Box >
    )
}