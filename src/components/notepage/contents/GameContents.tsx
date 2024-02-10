"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
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


type PageProps = {
    contents: GameContentsType
}

export default function GameContents({ contents }: PageProps) {
    const [open, setOpen] = React.useState(false);
    const router = useRouter()

    const EditButtonClick = () => {
        router.replace(`/game/edit/${contents.contentsId}`)
    }

    const DeleteButtonClick = () => {
        setOpen(true)
    }

    const DeleteContents = () => {
        useDeleteGame(contents.contentsId)
        router.replace('/notes/' + (dayjs(String(new Date())).format('YYYY-MM-DD')));
    }

    return (
        <Card sx={{ minWidth: 275 }}>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
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
                                <Box component="p">
                                    {String(contents.name1)}
                                </Box>
                                <Box component="p">
                                    {String(contents.score1)}
                                </Box>
                            </Box>
                            <Box sx={{ width: "100%", px: 2 }}>
                                <Box component="p">
                                    {String(contents.name2)}
                                </Box>
                                <Box component="p">
                                    {String(contents.score2)}
                                </Box>
                            </Box>
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
                                    良かった点
                                </ListSubheader>
                            }>
                                {contents.goodPoints.map((goodPoint, index) => (
                                    <ListItem key={index} sx={{ pl: 4 }}>
                                        <ListItemText>
                                            {goodPoint}
                                        </ListItemText>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>

                        <Divider />

                        <Box sx={{ px: 2 }}>
                            <List subheader={
                                <ListSubheader component="div" >
                                    悪かった点
                                </ListSubheader>
                            }>
                                {contents.badPoints.map((badPoint, index) => (
                                    <ListItem key={index} sx={{ pl: 4 }}>
                                        <ListItemText>
                                            {badPoint}
                                        </ListItemText>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Box >
                    :
                    <NotDataCaption url='/game/create' />
                }
            </Box>
        </Card>
    )
}