"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import type { PracticeContentsType } from '@/types/PracticeContents';
import { useDeletePractice } from '@/hooks/practice/useDeletePractice';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Divider from '@mui/material/Divider';
import NotDataCaption from './NotDataCaption';
import DeleteModal from './DeleteModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


type PageProps = {
    contents: PracticeContentsType
}

export default function PracticeContents({ contents }: PageProps) {
    const [open, setOpen] = React.useState(false);
    const router = useRouter()

    const EditButtonClick = () => {
        console.log(contents.contentsId)
        router.replace(`/practice/edit/${contents.contentsId}`)
    }

    const DeleteButtonClick = () => {
        setOpen(true)
    }

    const DeleteContents = () => {
        useDeletePractice(contents.contentsId)
        router.replace('/notes/' + (dayjs(String(new Date())).format('YYYY-MM-DD')));
    }

    return (
        <Box sx={{ width: '100%', my: "10px", bgcolor: 'background.paper' }}>
            <DeleteModal open={open} setOpen={setOpen} DeleteContents={DeleteContents} />
            {contents
                ?
                <Box sx={{ minHeight: '70vh', py: 1 }} >
                    <Stack direction="row" sx={{ p: 1 }} >
                        <Box sx={{ width: "100%", px: 2 }}>
                            <Typography variant="h6" component="div">
                                {String(contents.title)}
                            </Typography>
                        </Box>
                        <Button sx={{ minWidth: "20px" }} onClick={EditButtonClick}><EditIcon /></Button>
                        <Button sx={{ minWidth: "20px" }} onClick={DeleteButtonClick}><DeleteIcon /></Button>
                    </Stack>

                    <Divider />

                    <Stack direction="row" sx={{ p: 2 }} >
                        <Box sx={{ width: "100%", px: 2 }}>
                            {String(contents.place)}
                        </Box>
                        <Box sx={{ width: "100%", px: 2 }}>
                            {String(contents.weather)}
                        </Box>
                    </Stack>

                    <Divider />

                    <Box sx={{ px: 2 }}>
                        <List subheader={
                            <ListSubheader component="div" >
                                練習メニュー
                            </ListSubheader>
                        }>
                            {contents.details.map((detail, index) => (
                                <ListItem key={index} sx={{ pl: 4 }}>
                                    <ListItemText>
                                        {detail}
                                    </ListItemText>
                                </ListItem>
                            ))}
                        </List>
                    </Box>

                    <Divider />

                    <Box sx={{ px: 2 }}>
                        <List subheader={
                            <ListSubheader component="div">
                                課題と解決策
                            </ListSubheader>
                        }>
                            {contents.problems.map((problem, index1) => (
                                <List key={index1} subheader={
                                    <ListSubheader component="div">
                                        課題{index1 + 1}と解決策
                                    </ListSubheader>}>
                                    <ListItem sx={{ pl: 4 }}>
                                        <ListItemText>
                                            {problem.problem}
                                            <List>
                                                {problem.solution.map((solution, index2) => (
                                                    <ListItem key={index2} sx={{ px: 2 }}>
                                                        <ListItemText>
                                                            {solution}
                                                        </ListItemText>
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </ListItemText>
                                    </ListItem>
                                </List>
                            ))}
                        </List>
                    </Box>
                </Box >
                :
                <NotDataCaption url='/practice/create' />
            }
        </Box >
    )
}