"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation';
import type { User } from 'firebase/auth';
import dayjs from 'dayjs';
import { useGetAllTask } from '@/hooks/task/useGetAllTask';
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TaskCard from './TaskCard';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TaskForm from '@/features/common/forms/task/TaskForm';
import { TaskModel } from '@/types/task/Task';
import { useInsertTask } from '@/hooks/task/useInsertTask';
import Modal from '@mui/material/Modal';
import Container from '@mui/material/Container';
import { useGetDateAchieve } from '@/hooks/task/achieve/useGetDateAchieve';

type PageProps = {
    user: User,
    date: Date | String
    isAddModal: boolean
    setIsAddModal: any
}

export default function TaskCardBox({ user, date, isAddModal, setIsAddModal }: PageProps) {
    const router = useRouter()

    const [task, getTask] = useGetAllTask(user)
    const [newTask, setNewTask] = React.useState(new TaskModel());

    return (
        <Box sx={{ my: 1 }}>
            {isAddModal &&
                <Modal
                    open={isAddModal}
                    onClose={(event) => { setIsAddModal(-1) }}
                    sx={{ overflowY: "auto", scrollbarWidth: "none" }}
                >
                    <Container maxWidth="sm" sx={{ px: 0, position: "relative" }}>
                        <Box sx={{ pb: "30px", borderRight: "solid 0.5px #b2b2b2", borderLeft: "solid 0.5px #b2b2b2", backgroundColor: "#fbfbfb" }}>
                            <TaskForm task={newTask} getTask={getTask} postData={useInsertTask} onClose={() => { setIsAddModal(false) }} />
                        </Box>
                    </Container>
                </Modal>
            }

            {task == undefined ?
                <Skeleton variant="rounded" height={48} />
                :
                <Box>
                    {task[0] != undefined ?
                        task.map((value, index) => {
                            return (
                                <Box key={index}>
                                    <TaskCard user={user} task={value} getTask={getTask} date={date} />
                                    <Divider />
                                </Box>
                            )
                        })
                        :
                        <Stack direction="column" sx={{ mx: 1, p: 1, textAlign: "center" }} alignContent="center" justifyContent="center">
                            <Typography sx={{ fontSize: 15, textAlign: "center", fontWeight: "bold", my: 1, color: "black" }} component="h2">
                                毎日の取り組みを追加しよう。
                            </Typography>
                            <Typography sx={{ fontSize: 14, textAlign: "center", color: "black" }} component="h2">
                                自分に課題を与えよう。成長のための一歩を踏み出すために、取り組むことを追加しましょう。
                            </Typography>
                            <Box sx={{ mt: 2 }}>
                                <Button onClick={(event) => setIsAddModal(true)} >
                                    取り組みを追加する
                                </Button>
                            </Box>
                        </Stack>
                    }
                </Box>
            }
        </Box>
    )
}