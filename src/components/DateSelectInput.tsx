"use client"

import * as React from 'react';
import { onAuthStateChanged, getAuth } from "firebase/auth"
import { usePathname } from 'next/navigation';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import ja from 'date-fns/locale/ja';
import { format } from 'date-fns';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import GameForm from "@/components/form/game/GameForm_solution";
import { useParams } from 'next/navigation';

type PageProps = {
    dateValue: any,
    setDateValue: Function,
}

export default function DateSelectInput({ dateValue, setDateValue }: PageProps) {
    // const setDateValue = (value: Date | null) => {
    //     console.log(value)
    // }
    // const initDateValue = () => {
    //     setDateValue(new Date(1990, 0, 1));
    // }

    const params = useParams()
    console.log(dayjs(String(params.date)))

    return (
        <div>
            {/* <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker format='yyyy年MM月dd日' value={dayjs(String(params.date))} disableFuture onChange={(newValue) => setDateValue(newValue)} />
                </DemoContainer>
            </LocalizationProvider> */}
        </div>
    );
}