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
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Divider from '@mui/material/Divider';
import NotDataCaption from './NotDataCaption';

type PageProps = {
    contents: GameContentsType
}

export default function GameContents({ contents }: PageProps) {
    const router = useRouter()

    const EditButtonClick = () => {
        console.log(contents.contentsId)
        router.replace(`/game/edit/${contents.contentsId}`)
    }

    const DeleteButtonClick = () => {
        console.log(contents.contentsId)
        useDeleteGame(contents.contentsId)
        router.replace(`/notes/game/2023-12-02`)
    }

    return (
        <Box sx={{ width: '100%', m: "10px", bgcolor: 'background.paper' }}>
            {contents
                ?
                <Box sx={{ minHeight: '70vh', py: 1 }} >
                    <Stack direction="row" sx={{ p: 1 }} >
                        <Box sx={{ width: "100%", px: 2 }}>
                            <Typography variant="h6" component="div">
                                {String(contents.title)}
                            </Typography>
                        </Box>
                        <Button onClick={EditButtonClick}>編集</Button>
                        <Button onClick={DeleteButtonClick}>削除</Button>
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
                <NotDataCaption url='/game/create' />
            }
        </Box>
    )
}