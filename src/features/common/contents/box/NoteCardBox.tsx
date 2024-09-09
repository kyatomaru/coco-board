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
import CreateNoteFormBox from '@/features/routes/home/CreateNoteFormBox';
import LinearProgress from '@mui/material/LinearProgress';

type PageProps = {
    user: User,
    contents: any,
    setContents: any,
    date: String | Date,
    menu: Number,
    setMenu: any
}

export default function NoteCardBox({ user, contents, setContents, date, menu, setMenu }: PageProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState(false);
    const [isDateLoding, setIsDateLoding] = React.useState(false);

    React.useEffect(() => {
        setIsDateLoding(true)
    }, [date]);

    React.useEffect(() => {
        setIsDateLoding(false)
    }, [contents]);

    return (
        <Box>
            {menu != -1 &&
                <Modal
                    open={menu != -1}
                    onClose={(event) => { }}
                    sx={{ overflowY: "auto", scrollbarWidth: "none" }}
                >
                    <CreateNoteFormBox allContents={contents} setContents={setContents} setIsLoading={setIsLoading} menu={menu} setMenu={setMenu} date={date} />
                </Modal>
            }
            <Box sx={{ my: 1 }}>
                {contents == undefined || isDateLoding ?
                    <Skeleton variant="rounded" height={131} />
                    :
                    <>
                        {isLoading &&
                            <Card sx={{ minWidth: 250, mb: 2 }} elevation={2}>
                                <Typography sx={{ fontSize: 13, textAlign: "center", my: 1, color: "black" }} component="h2">
                                    ボードを保存しています。
                                </Typography>
                                <LinearProgress />
                            </Card>
                        }
                        {contents[0] != undefined ?
                            (contents.map((value, index) => {
                                return (
                                    <Card key={index} sx={{ minWidth: 250, mb: 2 }} elevation={2}>
                                        {value.collection == "game" &&
                                            <GameCard allContents={contents} contents={value} setContents={setContents} />
                                        }
                                        {value.collection == "practice" &&
                                            <PracticeCard allContents={contents} contents={value} setContents={setContents} />
                                        }
                                    </Card>
                                )
                            }))
                            :
                            <Stack direction="column" sx={{ mx: 1, p: 1, textAlign: "center" }} alignContent="center" justifyContent="center">
                                <Typography sx={{ fontSize: 15, textAlign: "center", fontWeight: "bold", mb: 1, color: "black" }} component="h2">
                                    試合・練習を記録しよう。
                                </Typography>
                                <Typography sx={{ fontSize: 14, textAlign: "center", color: "black" }} component="h2">
                                    まだ記録がありません。次の勝利のために、今すぐ記録を残しましょう。
                                </Typography>
                                <Box sx={{ mt: 2 }}>
                                    <Button onClick={(event) => setMenu(1)}>記録する</Button>
                                </Box>
                            </Stack>
                        }
                    </>
                }
            </Box>
        </Box>
    )
}