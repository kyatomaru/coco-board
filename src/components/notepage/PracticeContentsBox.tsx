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
        <Container maxWidth="sm" sx={{ marginTop: "15px" }}>
            <Box  >
                <Stack spacing={2} direction="row">
                    <Button onClick={clickLeftButton} disabled={contentsId == 0}>《</Button>
                    <PracticeContents contents={contents[contentsId]} />
                    <Button onClick={clickRightButton} disabled={contentsId == contents.length - 1 || contents.length == 0}>》</Button>
                </Stack >
            </Box>
        </Container>
    )
}