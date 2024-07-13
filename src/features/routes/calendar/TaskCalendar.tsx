import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation'
import { Paper, Grid, Typography, IconButton, Button, Box, Stack } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, subMonths, addMonths, isSameDay, isSameMonth, isToday, format } from 'date-fns';
import dayjs from 'dayjs';
import ja from 'date-fns/locale/ja'
import type { User } from 'firebase/auth';
import Skeleton from '@mui/material/Skeleton';
import { useGetAllAchieve } from '@/hooks/task/achieve/useGetAllAchieve';
import DoneIcon from '@mui/icons-material/Done';

type PageProps = {
    user: User,
    selectedMonth: any
    setSelectedMonth: any
    task: any
}

export default function TaskCalendar({ user, selectedMonth, setSelectedMonth, task }: PageProps) {
    const router = useRouter()
    const [boards, setBoards] = React.useState([undefined]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true)

    const [achieve, getAchieve] = useGetAllAchieve(user, task.taskId)

    const startDay = startOfWeek(startOfMonth(selectedMonth));
    const endDay = endOfWeek(endOfMonth(selectedMonth));
    let days = [];
    let day = startDay;

    while (day <= endDay) {
        days.push(day);
        day = addDays(day, 1);
    }

    // カレンダーのマスを42マスにするために、必要に応じて前後の日を追加
    while (days.length < 42) {
        days.push(day);
        day = addDays(day, 1);
    }

    const weekDays = ['日', '月', '火', '水', '木', '金', '土'];

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
            <Box>
                <Grid container>
                    {task != undefined && achieve != undefined ?
                        <>
                            {weekDays.map((day, index) => (
                                <Grid item xs={12 / 7} key={index} sx={{ textAlign: 'center', border: '1px solid rgba(0, 0, 0, 0.12)', backgroundColor: task.doday[index] && "#f58f4a15" }}>
                                    <Box sx={{
                                        borderLeft: (index + 7) % 7 == 0 && '1.5px solid rgba(0, 0, 0, 0.12)',
                                        borderRight: (index + 1) % 7 == 0 && '1.5px solid rgba(0, 0, 0, 0.12)',
                                        borderBottom: days.length - 7 <= index && '1.5px solid rgba(0, 0, 0, 0.12)',
                                        display: 'flex', justifyContent: "center", alignItems: "center", minHeight: 30, fontSize: 13,
                                        color: task.doday[index] && "#e57f3a", fontWeight: task.doday[index] && "bold"
                                    }}>{day}</Box>
                                </Grid>
                            ))}
                            {days.map((day, index) => (
                                <Grid item xs={12 / 7} key={index} sx={{
                                    textAlign: 'center',
                                    border: '0.5px solid rgba(0, 0, 0, 0.12)',
                                    backgroundColor: task.doday[index % 7] && "#f58f4a15"
                                }}>
                                    <Box
                                        onClick={(event) => { router.push(`/home/${dayjs(String(day)).format('YYYY-MM-DD')}`) }}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'flex-start',
                                            justifyContent: 'flex-start',
                                            color: isSameMonth(day, selectedMonth) ? 'text.primary' : 'text.disabled',
                                            height: { xs: 70, md: 110 },
                                            px: '2px',
                                            cursor: "pointer",
                                            '&:hover': {
                                                bgcolor: 'action.hover',
                                            },
                                            borderLeft: (index + 7) % 7 == 0 && '1.5px solid rgba(0, 0, 0, 0.12)',
                                            borderRight: (index + 1) % 7 == 0 && '1.5px solid rgba(0, 0, 0, 0.12)',
                                            borderBottom: days.length - 7 <= index && '1.5px solid rgba(0, 0, 0, 0.12)',
                                        }}
                                    >
                                        <Box sx={{ width: "22px", height: "22px", display: "flex", borderRadius: "20px", backgroundColor: isToday(day) && 'lightsteelblue', mt: "3px" }}>
                                            <Typography fontSize={13} sx={{ m: "auto" }} >
                                                {day.getDate()}
                                            </Typography>
                                        </Box>
                                        {achieve != undefined && achieve[0] != undefined && (
                                            achieve.map((data, index) => (
                                                data.date == dayjs(String(day)).format('YYYY-MM-DD') && data.achieve &&
                                                <Box key={index} sx={{ display: "flex", my: "auto", width: "100%" }}>
                                                    < DoneIcon sx={{ borderRadius: "20px", fontSize: { xs: "20px", md: "40px" }, m: "auto", color: "#20603d", backgroundColor: "#baf5ba" }} />
                                                </Box>
                                            ))
                                        )}
                                    </Box>
                                </Grid>
                            ))}
                        </>
                        :
                        <Skeleton variant="rectangular" height={600} sx={{ width: "100%" }} />
                    }
                </Grid>
            </Box>
        </LocalizationProvider >
    );
};