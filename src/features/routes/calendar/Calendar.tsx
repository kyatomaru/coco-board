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
    selectedMonth: any
    setSelectedMonth: any
    contents: any
}

export default function Calendar({ user, selectedMonth, setSelectedMonth, contents }: PageProps) {
    const router = useRouter()
    const [boards, setBoards] = React.useState([undefined]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true)

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
                    {contents != undefined ?
                        <>
                            {
                                weekDays.map((day, index) => (
                                    <Grid item xs={12 / 7} key={index} sx={{ textAlign: 'center', border: '1px solid rgba(0, 0, 0, 0.12)' }}>
                                        <Box sx={{
                                            borderTop: '1.5px solid rgba(0, 0, 0, 0.12)',
                                            borderLeft: (index + 7) % 7 == 0 && '1.5px solid rgba(0, 0, 0, 0.12)',
                                            borderRight: (index + 1) % 7 == 0 && '1.5px solid rgba(0, 0, 0, 0.12)',
                                            borderBottom: days.length - 7 <= index && '1.5px solid rgba(0, 0, 0, 0.12)',
                                            display: 'flex', justifyContent: "center", alignItems: "center", minHeight: 30, fontSize: 13, fontWeight: 400
                                        }}>{day}</Box>
                                    </Grid>
                                ))
                            }
                            {days.map((day, index) => (
                                <Grid item xs={12 / 7} key={index} sx={{
                                    textAlign: 'center',
                                    border: '1px solid rgba(0, 0, 0, 0.12)',
                                    overflow: "hidden",
                                    backgroundColor: isToday(day) && mainLightColor,
                                }}>
                                    <Box
                                        onClick={(event) => { isAfter(new Date(), day) && router.push(`/home/${dayjs(String(day)).format('YYYY-MM-DD')}`) }}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'flex-start',
                                            justifyContent: 'flex-start',
                                            color: isSameMonth(day, selectedMonth) ? 'text.primary' : 'text.disabled',
                                            height: { xs: 70, md: 110 },
                                            px: '2px',
                                            cursor: isAfter(new Date(), day) && "pointer",
                                            '&:hover': {
                                                bgcolor: isAfter(new Date(), day) && 'action.hover',
                                            },
                                            borderLeft: (index + 7) % 7 == 0 && '1.5px solid rgba(0, 0, 0, 0.12)',
                                            borderRight: (index + 1) % 7 == 0 && '1.5px solid rgba(0, 0, 0, 0.12)',
                                            borderBottom: days.length - 7 <= index && '1.5px solid rgba(0, 0, 0, 0.12)',
                                        }}
                                    >
                                        <Box sx={{ width: "22px", height: "15px", display: "flex", borderRadius: "20px", mt: "1px" }}>
                                            <Typography fontSize={13} sx={{ m: "auto", fontWeight: isSameMonth(day, selectedMonth) && 600 }}  >
                                                {day.getDate()}
                                            </Typography>
                                        </Box>
                                        {contents != undefined && contents[0] != undefined && (
                                            contents.map((content, index) => (
                                                content.date == dayjs(String(day)).format('YYYY-MM-DD') &&
                                                <>
                                                    <Chip key={index} size="small" sx={{ display: { sm: "block", xs: "block" }, justifyContent: "flex-start", mt: "2px", width: "100%", fontSize: 10, height: 15, borderRadius: "5px", '& .MuiChip-label': { px: "2px" } }}
                                                        color={content.collection == "game" ? "success" : content.collection == "practice" ? "primary" : "warning"}
                                                        variant="filled"
                                                        label={content.title}
                                                    />
                                                    {/* <Chip key={index} size="small" sx={{ display: { sm: "none", xs: "block" }, mt: "2px", width: 10, height: 10, borderRadius: "5px" }}
                                                        color={content.collection == "game" ? "success" : content.collection == "practice" ? "primary" : "warning"}
                                                        variant="filled"
                                                    /> */}
                                                </>
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