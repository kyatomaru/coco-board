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
import Chip from '@mui/material/Chip';
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
                    <Box sx={{ pb: 1 }}>
                        <Stack direction="row" sx={{ p: 1, mx: 1 }} >
                            <Box sx={{ width: "100%", alignItems: "center" }} >
                                <Typography variant="h6" sx={{ fontSize: 16 }} component="div">
                                    {String(contents.title)}
                                </Typography>
                                <Chip label="試合" color="success" size="small" sx={{ fontSize: 9 }} />
                            </Box>
                            <IconButton sx={{ minWidth: "20px" }} onClick={EditButtonClick}><EditIcon /></IconButton>
                            <IconButton sx={{ minWidth: "20px" }} onClick={DeleteButtonClick}><DeleteIcon /></IconButton>
                        </Stack>

                        <Divider />

                        <Box sx={{ width: "100%", px: 2, my: 1 }}>
                            <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                チーム
                            </Typography>
                            <Stack direction="row" sx={{ px: 1 }} >
                                <Box sx={{ width: "100%" }}>
                                    <Typography variant="body2" sx={{ fontSize: 14, mb: 1 }}>
                                        {String(contents.name1)}
                                    </Typography>
                                    <Typography variant="body2" sx={{ px: 1 }}>
                                        {String(contents.score1)}
                                    </Typography>
                                </Box>
                                <Box sx={{ width: "100%" }}>
                                    <Typography variant="body2" sx={{ fontSize: 14, mb: 1 }}>
                                        {String(contents.name2)}
                                    </Typography>
                                    <Typography variant="body2" sx={{ px: 1 }}>
                                        {String(contents.score2)}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>

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

                        {contents.goodPoints[0] != null &&
                            <>
                                <Divider />
                                <Box sx={{ px: 2, my: 1 }}>
                                    <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                        良かったところ
                                    </Typography>

                                    {contents.goodPoints.map((goodPoint, index) => (
                                        <Typography key={index} variant="body2" sx={{ px: 1, pb: 1 }}>
                                            {goodPoint}
                                        </Typography>
                                    ))}
                                </Box>
                            </>
                        }

                        {contents.badPoints[0] != null &&
                            <>
                                <Divider />
                                <Box sx={{ px: 2, my: 1 }}>
                                    <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                        悪かったところ
                                    </Typography>

                                    {contents.badPoints.map((badPoint, index) => (
                                        <Typography key={index} variant="body2" sx={{ px: 1, pb: 1 }}>
                                            {badPoint}
                                        </Typography>
                                    ))}
                                </Box>
                            </>
                        }
                    </Box >
                    :
                    <NotDataCaption url='/game/create' />
                }
            </Box>
        </Card>
    )
}