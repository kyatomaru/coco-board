"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import type { PracticeContentsType } from '@/types/PracticeContents';
import { useDeletePractice } from '@/hooks/practice/useDeletePractice';

type PageProps = {
    contents: PracticeContentsType
}

export default function PracticeContents({ contents }: PageProps) {
    const router = useRouter()

    const EditButtonClick = () => {
        console.log(contents.contentsId)
        router.replace(`/practice/edit/${contents.contentsId}`)
    }

    const DeleteButtonClick = () => {
        console.log(contents.contentsId)
        useDeletePractice(contents.contentsId)
        router.replace(`/notes/practice/2023-12-02`)
    }

    return (
        <Box sx={{ width: '100%', m: "10px", bgcolor: 'background.paper' }}>
            {contents
                ?
                <Box sx={{ height: '70vh' }} >
                    <Button onClick={EditButtonClick}>編集</Button>
                    <Button onClick={DeleteButtonClick}>削除</Button>
                    <div>{String(contents.title)}</div>
                </Box>
                :
                <Box sx={{ height: '70vh' }} >
                    <div>データがありません</div>
                </Box>
            }
        </Box>
    )
}