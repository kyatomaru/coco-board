"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import type { GameContentsType } from '@/types/GameContents';
import { useDeleteGame } from '@/hooks/game/useDeleteGame';

type PageProps = {
    contents: GameContentsType
}

export default function GameContents({ contents }: PageProps) {
    const router = useRouter()

    const EditButtonClick = () => {
        console.log(contents.docId)
        router.replace(`/game/edit/${contents.docId}`)
    }

    const DeleteButtonClick = () => {
        console.log(contents.docId)
        useDeleteGame(contents.docId)
        router.replace(`/notes/game/2023-12-02`)
    }
    return (
        <Container maxWidth="sm" sx={{ marginTop: "15px" }}>
            {contents
                ?
                <Box sx={{ bgcolor: '#eee', height: '70vh' }} >
                    <Button onClick={EditButtonClick}>編集</Button>
                    <Button onClick={DeleteButtonClick}>削除</Button>
                    <div>{String(contents.title)}</div>
                </Box>
                :
                <Box sx={{ bgcolor: '#eee', height: '70vh' }} >
                    <div>データがありません</div>
                </Box>
            }
        </Container>
    )
}