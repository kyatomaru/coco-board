"use client"

import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import type { PracticeContentsType } from '@/types/PracticeContents';
import PracticeContents from "./PracticeContents"

type PageProps = {
    contents: Array<PracticeContentsType | null>
}

export default function PracticeContentsBox({ contents }: PageProps) {
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
                <Button sx={{ width: "100%" }} onClick={clickLeftButton} disabled={contentsId == 0}>《</Button>
                <Button sx={{ width: "100%" }} onClick={clickRightButton} disabled={contentsId == contents.length - 1 || contents.length == 0}>》</Button>
            </Stack >
            <PracticeContents contents={contents[contentsId]} />
            <Stack sx={{ width: "100%" }} justifyContent="center" alignItems="center" direction="row">
                <Button sx={{ width: "100%" }} onClick={clickLeftButton} disabled={contentsId == 0}>《</Button>
                <Button sx={{ width: "100%" }} onClick={clickRightButton} disabled={contentsId == contents.length - 1 || contents.length == 0}>》</Button>
            </Stack >
        </Box>
    )
}