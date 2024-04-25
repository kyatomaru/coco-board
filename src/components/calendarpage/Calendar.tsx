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

const Calendar = () => {
    const router = useRouter()
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [user, setUser] = React.useState<User | null>(null);
    const [token, setToken] = React.useState<string | null>(null);
    const [openPicker, setOpenPicker] = useState(false);
    const [contents, setContents] = React.useState([undefined]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true)

    const GetContents = async (uid: string | undefined) => {
        if (uid) {
            const getParams = { uid: uid };
            const query = new URLSearchParams(getParams);

            fetch(`/api/note/?${query}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.length > 0) {
                        setContents(data)
                    }
                })
        }
    }

    React.useEffect(() => {
        setIsLoading(true)
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(auth.currentUser);
                user.getIdToken().then((token) => {
                    setToken(token);
                });
                GetContents(auth.currentUser?.uid)
                setIsLoading(false)
            } else {
                setUser(null);
                setToken(null);
            }
        });

    }, [])

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
            <Grid container>
                <Grid item xs={12} sx={{ my: 1 }} >
                    <Grid container columnSpacing={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <IconButton onClick={previousMonth} sx={{ width: 30, height: 30 }}>
                                <ArrowLeftIcon />
                            </IconButton>
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

                            <IconButton onClick={nextMonth} sx={{ width: 30, height: 30 }}>
                                <ArrowRightIcon />
                            </IconButton>
                        </Stack>
                    </Grid>
                </Grid>
                {weekDays.map((day, index) => (
                    <Grid item xs={12 / 7} key={index} sx={{ textAlign: 'center', border: '1px solid rgba(0, 0, 0, 0.12)' }}>
                        <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", minHeight: 30, fontSize: 13 }}>{day}</Box>
                    </Grid>
                ))}
                {days.map((day, index) => (
                    <Grid item xs={12 / 7} key={index} sx={{ textAlign: 'center', border: '1px solid rgba(0, 0, 0, 0.12)' }}>
                        <Box
                            onClick={(event) => { router.push(`/calendar/${dayjs(String(day)).format('YYYY-MM-DD')}`) }}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start', // 左上に数字を配置
                                justifyContent: 'flex-start',
                                borderColor: 'divider',
                                bgcolor: isToday(day) && 'lightsteelblue',
                                color: isSameMonth(day, selectedDate) ? 'text.primary' : 'text.disabled',
                                minHeight: 100, // マスを長方形にする（高さを指定）
                                px: '2px',
                                cursor: "pointer",
                                '&:hover': {
                                    bgcolor: isToday(day) ? "silver" : 'action.hover',
                                },
                            }}
                        >
                            <Typography fontSize={13}>
                                {day.getDate()}
                            </Typography>
                            {contents[0] != undefined && (
                                contents.map((content, index) => (
                                    content.date == dayjs(String(day)).format('YYYY-MM-DD') &&
                                    <Chip key={index} size="small" sx={{ justifyContent: "flex-start", mt: "2px", width: "100%", fontSize: 10, height: 20, borderRadius: "5px" }} color={content.collection == "game" ? "success" : "primary"} variant="filled" label={content.title} />
                                ))
                            )}
                        </Box>
                    </Grid>
                ))}
            </Grid>
            {/* </Paper> */}
        </LocalizationProvider >
    );
};

export default Calendar;