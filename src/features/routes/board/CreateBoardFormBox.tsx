"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import { useIsAuth } from '@/hooks/auth/useIsAuth';
import Container from '@mui/material/Container';
import BoardViewForm from '@/features/common/forms/board/BoardViewForm';
import { BoardModel } from '@/types/board/Board';
import { useInsertBoard } from '@/hooks/board/useInsertBoard';
import dayjs from 'dayjs';

type PageProps = {
    allContents: Array<any>,
    setContents: any,
    setIsLoading: Function,
    setMenu: Function,
    date: Date | String
}

export default function CreateBoardFormBox({ allContents, setContents, setIsLoading, setMenu, date }: PageProps) {
    const params = useParams()
    const router = useRouter()
    const [boardContents, setBoardContents] = React.useState(new BoardModel(dayjs(String(date)).format('YYYY-MM-DD')));


    const InsertBoardContents = async (contents, image) => {
        setIsLoading(true)
        setMenu(false)
        await useInsertBoard(contents, image).then((data) => {
            const resultContents = allContents.slice()
            resultContents.unshift(data)
            setContents([...resultContents])
            setIsLoading(false)
        })
    }

    return (
        <Container maxWidth="sm" sx={{ px: 0, minHeight: "100vh", overflowY: "hidden", position: "relative", zIndex: 1500 }}>
            <BoardViewForm contents={boardContents} postData={InsertBoardContents} onClose={() => { setMenu(false) }} />
        </Container>
    )
}