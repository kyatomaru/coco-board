"use client"

import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import type { PracticeContentsType } from '@/types/PracticeContents';

type PageProps = {
    contents: PracticeContentsType
}

export default function PracticeContents({ contents }: PageProps) {
    const editContents = () => {

    }

    const deleteContents = () => {

    }

    return (
        <Container maxWidth="sm" sx={{ marginTop: "15px" }}>
            {contents
                ?
                <Box sx={{ bgcolor: '#eee', height: '70vh' }} >
                    <Button onClick={editContents}>編集</Button>
                    <Button onClick={deleteContents}>削除</Button>
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