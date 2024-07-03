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

type PageProps = {
    user: User,
    date: String | Date
}

export default function NoteCardBox({ user, date }: PageProps) {
    const router = useRouter()
    const [contents, getContents] = useGetNote(user, dayjs(String(date)).format('YYYY-MM-DD'))

    return (
        <Box>
            <Box sx={{ my: 1 }}>
                {contents == undefined ?
                    <Skeleton variant="rounded" height={131} />
                    :
                    <Box>
                        {contents[0] != undefined ?
                            (contents.map((value, index) => {
                                return (
                                    <Card key={index} sx={{ minWidth: 250, mb: 2 }} elevation={2}>
                                        {value.collection == "board" &&
                                            <BoardCard contents={value} getContents={getContents} />
                                        }
                                        {value.collection == "game" &&
                                            <GameCard contents={value} getContents={getContents} />
                                        }
                                        {value.collection == "practice" &&
                                            <PracticeCard contents={value} getContents={getContents} />
                                        }
                                    </Card>
                                )
                            }))
                            :
                            <Stack direction="column" sx={{ mx: 1, p: 1, textAlign: "center" }} alignContent="center" justifyContent="center" >
                                <Typography sx={{ fontSize: 15, textAlign: "center", fontWeight: "bold", my: 1 }} component="h2">
                                    今日の戦術・試合・練習を記録しよう。
                                </Typography>
                                <Typography sx={{ fontSize: 13, textAlign: "center" }} variant="h6" component="div">
                                    まだ記録がありません。次の勝利のために、今すぐ記録を始めましょう。
                                </Typography>
                                <Box sx={{ mt: 3 }}>
                                    <Button onClick={(event) => { router.push(`/create/${dayjs(String(new Date())).format('YYYY-MM-DD')}/board`) }}>記録する</Button>
                                </Box>
                            </Stack>
                        }
                    </Box>
                }
            </Box>
        </Box>
    )
}