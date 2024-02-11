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
        <Card sx={{ minWidth: 275 }}>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <DeleteModal open={open} setOpen={setOpen} DeleteContents={DeleteContents} />
                {contents
                    ?
                    <Box sx={{ py: 1 }} >
                        <Stack direction="row" sx={{ p: 1 }} >
                            <Box sx={{ width: "100%", px: 2 }}>
                                <Typography variant="h6" component="div">
                                    {String(contents.title)}
                                </Typography>
                            </Box>
                            <IconButton sx={{ minWidth: "20px" }} onClick={EditButtonClick}><EditIcon /></IconButton>
                            <IconButton sx={{ minWidth: "20px" }} onClick={DeleteButtonClick}><DeleteIcon /></IconButton>
                        </Stack>

                        {contents.place &&
                            <>
                                <Divider />
                                <Box sx={{ px: 2, my: 1 }}>
                                    <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                        場所
                                    </Typography>
                                    <Typography variant="body2" sx={{ px: 1 }}>
                                        {String(contents.place)}
                                    </Typography>
                                </Box>
                            </>
                        }

                        {contents.weather &&
                            <>
                                <Divider />
                                <Box sx={{ px: 2, my: 1 }}>
                                    <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                        天気
                                    </Typography>
                                    <Typography variant="body2" sx={{ px: 1 }}>
                                        {String(contents.weather)}
                                    </Typography>
                                </Box>
                            </>
                        }

                        {contents.details.length > 0 &&
                            <>
                                <Divider />
                                <Box sx={{ px: 2, my: 1 }}>
                                    <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                        練習メニュー
                                    </Typography>

                                    {contents.details.map((detail, index) => (
                                        <Typography key={index} variant="body2" sx={{ px: 1, pb: 1 }}>
                                            {detail}
                                        </Typography>
                                    ))}
                                </Box>
                            </>
                        }
                    </Box >
                    :
                    <NotDataCaption url='/practice/create' />
                }
            </Box >
        </Card>
    )
}