"use client"

import * as React from 'react';
import type { User } from 'firebase/auth';
import dayjs from 'dayjs';
import { useGetNote } from '@/hooks/note/useGetDateNote';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import GameCard from '@/features/common/contents/card/GameCard';
import PracticeCard from '@/features/common/contents/card/PracticeCard';
import BoardCard from '@/features/common/contents/card/BoardCard';

type PageProps = {
    user: User,
    date: String | Date
}

export default function NoteCardBox({ user, date }: PageProps) {
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
                            <Card sx={{ minWidth: 250, mb: 2 }} elevation={2}>
                                <Stack direction="column" sx={{ mx: 1, p: 1, height: 131 }} alignContent="center" justifyContent="center" >
                                    <Typography sx={{ fontSize: 13, textAlign: "center" }} variant="h6" component="div">
                                        記録がありません
                                    </Typography>
                                </Stack>
                            </Card>
                        }
                    </Box>
                }
            </Box>
        </Box>
    )
}