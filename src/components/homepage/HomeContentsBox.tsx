"use client"

import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import type { GameContentsType } from '@/types/GameContents';
import type { ProblemContentsType } from '@/types/ProblemContents';
import GameContents from "./HomeContents"
import HomeContents from './HomeContents';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type PageProps = {
    problemContents: Array<ProblemContentsType | null>
}

export default function HomeContentsBox({ problemContents }: PageProps) {
    const [contentsId, setcontentsId] = React.useState(0);

    const clickLeftButton = () => {
        setcontentsId(contentsId - 1)
    }

    const clickRightButton = () => {
        setcontentsId(contentsId + 1)
    }

    return (
        <Container sx={{}}>
            <HomeContents problemContents={problemContents} />
        </Container>
    )
}