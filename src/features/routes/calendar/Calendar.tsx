import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation'
import { Paper, Grid, Typography, IconButton, Button, Box, Stack } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, subMonths, addMonths, isSameDay, isSameMonth, isToday, format } from 'date-fns';
import ArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MuiDatePicker, { DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { TextField, InputBase } from '@mui/material';
import { Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiTextField, { TextFieldProps } from '@mui/material/TextField';
import ja from 'date-fns/locale/ja'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '@/app/firebase';
import { useGetNote } from '@/hooks/note/useGetAllNote';
import Skeleton from '@mui/material/Skeleton';

const CustomTextField = styled((props: TextFieldProps) => (
    <MuiTextField {...props} />
))(({ theme }) => ({
    width: 0,
    '& input': {
        display: "none"
    },
    '& .MuiInputAdornment-root': {
        display: 'none',
    },
    '& fieldset': {
        display: "none"
    },
}));

type PageProps = {
    user: User
}

export default function Calendar({ user }: PageProps) {
    const router = useRouter()
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [openPicker, setOpenPicker] = useState(false);
    const [boards, setBoards] = React.useState([undefined]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true)

    const [contents, setContents] = useGetNote(user)

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

    const previousMonth = () => {
        setSelectedDate(subMonths(selectedDate, 1));
    };

    const nextMonth = () => {
        setSelectedDate(addMonths(selectedDate, 1));
    };

    const weekDays = ['日', '月', '火', '水', '木', '金', '土'];

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
            <Box sx={{ p: { md: 2 }, border: { md: '1px solid rgba(0, 0, 0, 0.12)' } }}>
                <Grid container>
                    <Grid item xs={12} sx={{}} >
                        <Stack direction="row" justifyContent="space-between" alignItems="center" >
                            <IconButton size='large' onClick={previousMonth} sx={{ width: 30, height: 30 }}>
                                <ArrowLeftIcon />
                            </IconButton>
                            <Box>
                                <DatePicker
                                    views={['year', 'month']}
                                    timezone="ja"
                                    open={openPicker}
                                    openTo="month"
                                    value={selectedDate}
                                    onMonthChange={(event) => setOpenPicker(false)}
                                    onChange={(newValue) => {
                                        setSelectedDate(newValue);
                                    }}
                                    slots={{ textField: CustomTextField }}
                                // slotProps={{ openPickerButton: { "", "", selectedDate, setOpenPicker } }}
                                />
                                <Button onClick={(event) => setOpenPicker(true)} >
                                    <Typography variant="h6" component="h2" fontSize={14}>
                                        {format(selectedDate, 'yyyy年 M月')}
                                    </Typography>
                                </Button>
                            </Box>

                            <IconButton size='large' onClick={nextMonth} sx={{ width: 30, height: 30 }}>
                                <ArrowRightIcon />
                            </IconButton>
                        </Stack>
                    </Grid>

                    {contents != undefined ?
                        <>
                            {
                                weekDays.map((day, index) => (
                                    <Grid item xs={12 / 7} key={index} sx={{ textAlign: 'center', border: '1px solid rgba(0, 0, 0, 0.12)' }}>
                                        <Box sx={{
                                            borderLeft: (index + 7) % 7 == 0 && '1.5px solid rgba(0, 0, 0, 0.12)',
                                            borderRight: (index + 1) % 7 == 0 && '1.5px solid rgba(0, 0, 0, 0.12)',
                                            borderBottom: days.length - 7 <= index && '1.5px solid rgba(0, 0, 0, 0.12)',
                                            display: 'flex', justifyContent: "center", alignItems: "center", minHeight: 30, fontSize: 13
                                        }}>{day}</Box>
                                    </Grid>
                                ))
                            }
                            {days.map((day, index) => (
                                <Grid item xs={12 / 7} key={index} sx={{
                                    textAlign: 'center',
                                    border: '0.5px solid rgba(0, 0, 0, 0.12)',
                                }}>
                                    <Box
                                        onClick={(event) => { router.push(`/calendar/${dayjs(String(day)).format('YYYY-MM-DD')}`) }}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'flex-start',
                                            justifyContent: 'flex-start',
                                            bgcolor: isToday(day) && 'lightsteelblue',
                                            color: isSameMonth(day, selectedDate) ? 'text.primary' : 'text.disabled',
                                            height: { xs: 70, md: 110 },
                                            px: '2px',
                                            cursor: "pointer",
                                            '&:hover': {
                                                bgcolor: isToday(day) ? "silver" : 'action.hover',
                                            },
                                            borderLeft: (index + 7) % 7 == 0 && '1.5px solid rgba(0, 0, 0, 0.12)',
                                            borderRight: (index + 1) % 7 == 0 && '1.5px solid rgba(0, 0, 0, 0.12)',
                                            borderBottom: days.length - 7 <= index && '1.5px solid rgba(0, 0, 0, 0.12)',
                                        }}
                                    >
                                        <Typography fontSize={13} sx={{ height: 16 }}>
                                            {day.getDate()}
                                        </Typography>
                                        {contents != undefined && contents[0] != undefined && (
                                            contents.map((content, index) => (
                                                content.date == dayjs(String(day)).format('YYYY-MM-DD') &&
                                                <>
                                                    <Chip key={index} size="small" sx={{ display: { sm: "block", xs: "none" }, justifyContent: "flex-start", mt: "2px", width: "100%", fontSize: 10, height: 15, borderRadius: "5px" }}
                                                        color={content.collection == "game" ? "success" : content.collection == "practice" ? "primary" : "warning"}
                                                        variant="filled"
                                                        label={content.title}
                                                    />
                                                    <Chip key={index} size="small" sx={{ display: { sm: "none", xs: "block" }, mt: "2px", width: 10, height: 10, borderRadius: "5px" }}
                                                        color={content.collection == "game" ? "success" : content.collection == "practice" ? "primary" : "warning"}
                                                        variant="filled"
                                                    />
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