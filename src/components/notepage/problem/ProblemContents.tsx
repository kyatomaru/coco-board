"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import type { ProblemContentsType } from '@/types/problem/ProblemContents';
import { contentsCheckModel } from '@/types/problem/ProblemContents';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, ButtonBase } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ProblemContentsMenu from '../ProblemContentsMenu';
import dayjs from 'dayjs';
import Rating from '@mui/material/Rating';
import DeleteModal from '../DeleteModal';
import { useDeleteProblem } from '@/hooks/problem/useDeleteProblem';
import { useDateFormat } from '@/hooks/useDateFormat';
// import { ProblemCategoryType } from '@/types/SolutionCategory';
import WatchIcon from '@mui/icons-material/WatchLater';
import { deleteProblemMs } from '@/const/modalMessage';

type PageProps = {
    problemContents: ProblemContentsType,
    DeleteProblemContents: any
}

const DataFormat = (date: String) => {
    return useDateFormat(date)
}

export default function ProblemproblemContents({ problemContents, DeleteProblemContents }: PageProps) {
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
    const [menuModalOpen, setMenuModalOpen] = React.useState<boolean>(false)

    const router = useRouter()

    const menuHandleClick = () => {
        setMenuModalOpen(true)
    }

    const ViewButtonClick = () => {
        router.replace(`/problem/${problemContents.contentsId}`)
    }

    const EditButtonClick = () => {
        router.replace(`/problem/edit/${problemContents.contentsId}`)
    }

    const DeleteButtonClick = () => {
        setMenuModalOpen(false)
        setDeleteModalOpen(true)
    }

    const DeleteProblemproblemContents = async () => {
        const res = await useDeleteProblem(problemContents.contentsId)
        if (res.ok) {
            DeleteProblemContents(problemContents.contentsId)
            setDeleteModalOpen(false)
            setMenuModalOpen(false)
        }
    }

    // console.log(problemContents.solutionsCategory)

    return (
        <>
            <DeleteModal open={deleteModalOpen} setOpen={setDeleteModalOpen} title="課題" message={deleteProblemMs} DeleteContents={DeleteProblemproblemContents} />
            <ProblemContentsMenu open={menuModalOpen} setOpen={setMenuModalOpen} Delete={DeleteButtonClick} Edit={EditButtonClick} View={ViewButtonClick} />
            <Card sx={{ minWidth: 250, my: 2 }} >
                <Box sx={{ position: "relative" }}>
                    <IconButton
                        onClick={menuHandleClick}
                        sx={{
                            right: "10px", top: "7px",
                            position: "absolute",
                            zIndex: 1000, width: "35px", height: "35px", m: "auto"
                        }}
                    >
                        <MoreHorizIcon />
                    </IconButton>
                    <CardActionArea onClick={() => ViewButtonClick()}>
                        <Stack direction="row" sx={{ py: 1, mx: 2, alignItems: "center" }} >
                            <Box sx={{ width: "100%", alignItems: "center" }} >
                                <Typography variant="h6" sx={{ fontSize: 16 }} component="div">
                                    {String(problemContents.problem)}
                                </Typography>
                                <Stack direction="row" alignItems="center">
                                    {dayjs(String(problemContents.completionDate)).isBefore(dayjs(String(new Date))) ?
                                        <Typography variant="h6" color="error" sx={{ fontSize: 16 }} component="div">
                                            {DataFormat(String(problemContents.completionDate))}
                                        </Typography>
                                        :
                                        <Typography variant="h6" sx={{ fontSize: 16 }} component="div">
                                            {DataFormat(String(problemContents.completionDate))}
                                        </Typography>
                                    }

                                    {dayjs(String(problemContents.completionDate)).isBefore(dayjs(String(new Date))) &&
                                        <WatchIcon fontSize='small' color="error" sx={{ ml: 1 }} />
                                    }
                                </Stack>
                                <Stack direction="row" spacing={1} >
                                    {
                                        problemContents.importance == 3 &&
                                        <Chip label="重要" size="small" sx={{ fontSize: 9 }} />
                                    }
                                </Stack>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
                                    <Chip label={String(problemContents.category[problemContents.categoryId].title)} size="small" sx={{ fontSize: 9, backgroundColor: problemContents.category[problemContents.categoryId].bgColor, color: problemContents.category[problemContents.categoryId].color, }} />
                                    <Box>
                                        <Typography variant="h6" sx={{ fontSize: 12 }} component="div">
                                            登録日:{dayjs(String(problemContents.createDate)).format('YYYY/M/D')}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Box>
                        </Stack>

                        {/* <Divider />
                        <Box sx={{ px: 2, my: 1 }}>
                            <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                克服度
                            </Typography>
                            <Rating size="large" name="half-rating" defaultValue={Number(problemContents.overcome)} precision={0.5} readOnly />
                        </Box> */}

                        {/* <Divider />
                        {problemContents.solutions[0] != null &&
                            <>
                                <Divider />
                                <Box sx={{ px: 2, my: 1 }}>
                                    <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                        取り組むこと
                                    </Typography>

                                    {problemContents.solutions.map((solution, index) => (
                                        <Box key={index} >
                                            {
                                                solution.context != "" &&
                                                <Stack direction="row"  >
                                                    <Typography variant="body2" sx={{ p: 1, width: "100px" }}>
                                                        {problemContents.solutionsCategory[Number(solution.type)].title}
                                                    </Typography>
                                                    <Divider orientation="vertical" variant="middle" flexItem />
                                                    <Typography variant="body2" sx={{ p: 1 }}>
                                                        {solution.context}
                                                    </Typography>
                                                </Stack>
                                            }
                                        </Box>
                                    ))}
                                </Box>
                            </>
                        } */}
                    </CardActionArea>
                </Box>
            </Card >
        </>
    );
}