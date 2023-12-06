"use client"

import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import type { GameContentsType } from '@/types/GameContents';
import GameContents from "./GameContents"

type PageProps = {
    contents: Array<GameContentsType | null>
}

export default function GameContentsBox({ contents }: PageProps) {
    const [docId, setDocId] = React.useState(0);

    const clickLeftButton = () => {
        setDocId(docId - 1)
    }

    const clickRightButton = () => {
        setDocId(docId + 1)
    }
    return (
        <Container maxWidth="sm" sx={{ marginTop: "15px" }}>
            <Box>
                <Stack spacing={2} direction="row">
                    <Button onClick={clickLeftButton} disabled={docId == 0}>《</Button>
                    <GameContents contents={contents[docId]} />
                    <Button onClick={clickRightButton} disabled={docId == contents.length - 1 || contents.length == 0}>》</Button>
                </Stack >
            </Box>
        </Container>
    )
}