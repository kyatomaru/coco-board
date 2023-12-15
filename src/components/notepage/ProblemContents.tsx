"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
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
import type { SolutionType } from '@/types/Problem';

type PageProps = {
    contents: Array<SolutionType>
}

export default function ProblemContents({ contents }: PageProps) {
    const router = useRouter()

    // const EditButtonClick = () => {
    //     console.log(contents.contentsId)
    //     router.replace(`/game/edit/${contents.contentsId}`)
    // }

    // const DeleteButtonClick = () => {
    //     console.log(contents.contentsId)
    //     useDeleteGame(contents.contentsId)
    //     router.replace(`/notes/game/2023-12-02`)
    // }

    console.log(contents)

    return (
        <Box sx={{ width: '100%', m: "10px", bgcolor: 'background.paper' }}>
            {contents
                ?
                <Box sx={{ px: 2 }}>
                    <List subheader={
                        <ListSubheader component="div">
                            課題と解決策
                        </ListSubheader>
                    }>
                        {contents.map((problem, index1) => (
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
                :
                <Box sx={{ height: '70vh' }} >
                    <div>データがありません</div>
                </Box>
            }
        </Box >
    )
}