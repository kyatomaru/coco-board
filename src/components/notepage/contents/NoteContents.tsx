"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import type { GameContentsType } from '@/types/GameContents';
import { useDeleteGame } from '@/hooks/game/useDeleteGame';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Divider from '@mui/material/Divider';
import NotDataCaption from '../NotDataCaption';
import DeleteModal from '../DeleteModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import GameContents from "./GameContents"
import PracticeContents from './PracticeContents';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import dayjs from 'dayjs';
import { confirmPasswordReset } from 'firebase/auth';

type PageProps = {
    contents: any,
    DeleteContents: any
}

const day = ['日', '月', '火', '水', '木', '金', '土']

const DataFormat = (date) => {
    const thisYear = dayjs(String(new Date)).format('YYYY');
    const recordYear = dayjs(String(date)).format('YYYY');
    const recordDay = `(${day[Number(dayjs(String(date)).format('d'))]})`

    if (thisYear == recordYear) {
        return dayjs(String(date)).format('M/DD ') + recordDay;
    }
    else {
        return dayjs(String(date)).format('YYYY/M/DD ') + recordDay;
    }

}

export default function NoteContents({ contents, DeleteContents }: PageProps) {
    const [contentsId, setcontentsId] = React.useState(0);

    const clickLeftButton = () => {
        setcontentsId(contentsId - 1)
    }

    const clickRightButton = () => {
        setcontentsId(contentsId + 1)
    }

    return (
        <Card sx={{ minWidth: 250, my: 5 }}>
            <Stack sx={{ width: "100%" }} justifyContent="center" alignItems="center" direction="row">
                <Box sx={{ width: "100%", textAlign: "center" }}>
                    <IconButton onClick={clickLeftButton} disabled={contentsId == 0}><ArrowBackIosIcon /></IconButton>
                </Box>
                <Typography sx={{ width: "100%", minWidth: "130px", px: 2, textAlign: "center", fontSize: 17 }} variant="h6" component="div">
                    {DataFormat(contents.date)}
                </Typography>
                <Box sx={{ width: "100%", textAlign: "center" }}>
                    <IconButton onClick={clickRightButton} disabled={contentsId == contents.contents.length - 1 || contents.contents.length == 0}><ArrowForwardIosIcon /></IconButton>
                </Box>
            </Stack>
            {contents.contents.map((value, index) => {
                return (
                    <Box key={index}>
                        {contentsId == index &&
                            <>
                                {
                                    value.type == "game" &&
                                    <GameContents contents={value} DeleteContents={DeleteContents} />
                                }
                                {
                                    value.type == "practice" &&
                                    <PracticeContents contents={value} DeleteContents={DeleteContents} />
                                }
                            </>
                        }
                    </Box>
                )
            })}
        </Card>
    )
}