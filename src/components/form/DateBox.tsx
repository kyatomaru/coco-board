"use client"

import * as React from 'react';
import { useRouter, useParams } from 'next/navigation'
import dayjs from 'dayjs';
import ja from 'date-fns/locale/ja'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { PickersActionBar } from '@mui/x-date-pickers';

type PageProps = {
    date: string
}

export default function DateBox({ date }: PageProps) {
    const router = useRouter()
    const params = useParams()

    const [dateValue, setDateValue] = React.useState(new Date(String(params.date)));

    const clickLeftButton = () => {
        if (params.date != null) {
            setDateValue(new Date(String(params.date)))
            router.push('/notes/' + (dayjs(String(params.date)).subtract(1, 'd').format('YYYY-MM-DD')));
        }
    }

    const clickRightButton = () => {
        if (params.date != null) {
            setDateValue(new Date(String(params.date)))
            router.push('/notes/' + (dayjs(String(params.date)).add(1, 'd').format('YYYY-MM-DD')));
        }
    }

    const setDate = (value: Date | null) => {
        if (String(value) != "Invalid Date") {
            router.push('/notes/' + dayjs(value).format('YYYY-MM-DD'))
        }
    }

    const disableFuture = () => {
        return dayjs(dateValue).format('YYYY-MM-DD') == dayjs(new Date()).format('YYYY-MM-DD')
    }

    return (
        <Box sx={{ justifyContent: "center", mx: 1, lineHeight: "30px" }}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}
                localeText={{
                    previousMonth: "前月を表示",
                    nextMonth: "次月を表示",
                    cancelButtonLabel: "キャンセル",
                    okButtonLabel: "選択",
                }} >
                <DemoContainer components={['DatePicker']} sx={{ justifyContent: "center" }}>
                    <DatePicker format='yyyy年MM月dd日'
                        slotProps={{
                            actionBar: {
                                actions: ['cancel', "accept"],
                            },
                        }}
                        sx={{
                            fontSize: 10
                        }}
                        closeOnSelect={false}
                        value={dateValue}
                        disableFuture
                        onAccept={(newValue) => setDate(newValue)}
                    />
                </DemoContainer>
            </LocalizationProvider>
        </Box >
    );
}