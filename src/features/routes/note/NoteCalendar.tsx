import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation'
import { Paper, Grid, Typography, IconButton, Button, Box, Stack } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, subMonths, addMonths, isSameDay, isSameMonth, isToday, isAfter, format } from 'date-fns';
import dayjs from 'dayjs';
import { Chip } from '@mui/material';
import ja from 'date-fns/locale/ja'
import type { User } from 'firebase/auth';
import Skeleton from '@mui/material/Skeleton';
import { mainLightColor } from '@/constants/Color';

type PageProps = {
    user: User,
    selectedDate: any,
    setSelectedDate: any,
    contents: any,
    setShowCalendar: any
}

export default function Calendar({ user, selectedDate, setSelectedDate, contents, setShowCalendar }: PageProps) {
    const router = useRouter()
    const [boards, setBoards] = React.useState([undefined]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true)

    const startDay = startOfWeek(startOfMonth(selectedDate));
    const endDay = endOfWeek(endOfMonth(selectedDate));
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
                    {contents != undefined ?
                        <>
                            {
                                weekDays.map((day, index) => (
                                    <Grid item xs={12 / 7} key={index} sx={{ textAlign: 'center' }}>
                                        <Box sx={{
                                            display: 'flex', justifyContent: "center", alignItems: "center", minHeight: 30, fontSize: 13, fontWeight: 400
                                        }}>{day}</Box>
                                    </Grid>
                                ))
                            }
                            {days.map((day, index) => (
                                <Grid item xs={12 / 7} key={index} sx={{
                                    textAlign: 'center',
                                    overflow: "hidden",
                                }}>
                                    <Box
                                        onClick={(event) => {
                                            !isAfter(day, new Date()) && (setSelectedDate(day), setShowCalendar(false))
                                        }}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'flex-start',
                                            color: isSameMonth(day, selectedDate) && !isAfter(day, new Date()) ? 'text.primary' : 'text.disabled',
                                            height: { xs: 70, md: 110 },
                                            px: '2px',
                                            cursor: !isAfter(day, new Date()) ? "pointer" : "default",
                                            '&:hover': {
                                                bgcolor: !isAfter(day, new Date()) && 'action.hover',
                                            },
                                        }}
                                    >
                                        <Box sx={{ width: "22px", height: "22px", display: "flex", borderRadius: "20px", mt: "1px", justifyContent: "center",
                                            backgroundColor: isToday(day) && mainLightColor, }}>
                                            <Typography fontSize={13} sx={{ display: "block", m: "auto", fontWeight: isSameMonth(day, selectedDate) && 600 }}  >
                                                {day.getDate()}
                                            </Typography>
                                        </Box>
                                        {contents != undefined && contents[0] != undefined && (
                                            contents.map((content, index) => (
                                                content.date == dayjs(String(day)).format('YYYY-MM-DD') &&
                                                    <Chip key={index} size="small" sx={{ display: { sm: "block", xs: "block" }, justifyContent: "flex-start", mt: "2px", width: "100%", fontSize: 9, height: 12, borderRadius: "5px", '& .MuiChip-label': { px: "2px" } }}
                                                        color={content.collection == "game" ? "success" : content.collection == "practice" ? "primary" : "warning"}
                                                        variant="filled"
                                                        label={content.title || (content.collection === "board" ? "無題のボード" : "無題のノート")}
                                                    />
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