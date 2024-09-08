"use client"

import * as React from 'react';
import type { User } from 'firebase/auth';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation'
import { useGetNote } from '@/hooks/note/useGetDateNote';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import GameCard from '@/features/common/contents/card/GameCard';
import PracticeCard from '@/features/common/contents/card/PracticeCard';
import BoardCard from '@/features/common/contents/card/BoardCard';
import Modal from '@mui/material/Modal';
import CreateBoardFormBox from '@/features/routes/home/CreateBoardFormBox';

type PageProps = {
    user: User,
    contents: any,
    setContents: any,
    date: String | Date,
    menu: Number,
    setMenu: any
}

export default function BoardCardBox({ user, contents, setContents, date, menu, setMenu }: PageProps) {
    const router = useRouter()
    const [isDateLoding, setIsDateLoding] = React.useState(false);
    const [data, setData] = React.useState([])

    React.useEffect(() => {
        setIsDateLoding(true)
    }, [date]);

    React.useEffect(() => {
        setIsDateLoding(false)
    }, [contents]);

    return (
        <Box>
            {menu != -1 ?
                <Modal
                    open={menu != -1}
                    onClose={() => { }}
                    sx={{ "-webkit-overflow-scrolling": "none", overflowY: "hidden", scrollbarWidth: "none" }}
                >
                    <CreateBoardFormBox allContents={contents} setContents={setContents} menu={menu} setMenu={setMenu} date={date} />
                </Modal>
                :
                <Box sx={{ my: 1 }}>
                    {contents == undefined || isDateLoding ?
                        <Skeleton variant="rounded" height={131} />
                        :
                        <>
                            {contents[0] != undefined ?
                                contents.map((value, index) => {
                                    return (
                                        <Card key={index} sx={{ minWidth: 250, mb: 2 }} elevation={2}>
                                            <BoardCard allContents={contents} contents={value} setContents={setContents} />
                                        </Card>)
                                })
                                :
                                <Stack direction="column" sx={{ mx: 1, p: 1, textAlign: "center" }} alignContent="center" justifyContent="center">
                                    <Typography sx={{ fontSize: 15, textAlign: "center", fontWeight: "bold", mb: 1, color: "black" }} component="h2">
                                        戦術・フォーメーションを記録しよう。
                                    </Typography>
                                    <Typography sx={{ fontSize: 14, textAlign: "center", color: "black" }} component="h2">
                                        まだ記録がありません。次の勝利のために、今すぐ記録を残しましょう。
                                    </Typography>
                                    <Box sx={{ mt: 2 }}>
                                        <Button onClick={(event) => setMenu(0)}>記録する</Button>
                                    </Box>
                                </Stack>
                            }
                        </>
                    }
                </Box>
            }
        </Box>
    )
}