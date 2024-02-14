"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material-next/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import GameForm from './game/GameForm';
import PracticeForm from './practice/PracticeForm';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import ja from 'date-fns/locale/ja'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { GameContentsModel } from '@/types/GameContents';
import { PracticeContentsModel } from '@/types/PracticeContents';
import { auth } from '@/app/firebase';
import { redirect } from 'next/navigation';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar } from '@mui/material';

const containterStyle = {
    // height: "auto",
    // position: "absolute",
    // zIndex: 90,
    // top: "0",
    borderRight: "solid 0.5px #b2b2b2",
    borderLeft: "solid 0.5px #b2b2b2",
    bgcolor: "white",
    pb: "60px",
    minHeight: "100vh"
}


export default function NoteCreateForm() {
    const [menu, setMenu] = React.useState(0);
    const [dateValue, setDateValue] = React.useState<Date | null>(new Date());
    const [isLoading, setIsLoading] = React.useState(false);
    const [gameContents, setGameContents] = React.useState(new GameContentsModel());
    const [practiceContents, setPracticeContents] = React.useState(new PracticeContentsModel());
    const [titleError, setTitleError] = React.useState(false);

    const router = useRouter()

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setMenu(newValue);
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true)
        if (menu == 0) {
            insertGameData(event, gameContents, dateValue)
        }
        if (menu == 1) {
            insertPracticeData(event, insertPracticeData, dateValue)
        }
        router.push('/notes')
    }

    return (
        <Box maxWidth="sm" sx={containterStyle}>
            <Box
                component="form"
                onSubmit={onSubmit}
                sx={{
                    '& .MuiTextField-root': { m: 1 },
                }}
                noValidate
                autoComplete="off"
                method='POST'

            >
                <Box sx={{ position: 'sticky', top: 0, backgroundColor: "white", zIndex: 100 }} >
                    <Grid sx={{ px: 1, height: "50px" }} container direction="row" alignItems="center" justifyContent="space-between">
                        <Grid >
                            <Button size="small" sx={{ color: 'black' }} variant='text' onClick={(event) => router.back()}>キャンセル</Button>
                        </Grid>
                        <Grid >
                            <Button size="small" sx={{ backgroundColor: "#1976d2 !important" }} variant='filled' type='submit'>記録する</Button>
                        </Grid>
                    </Grid>
                    <Divider />
                </Box>

                <Container maxWidth="sm" sx={{ mt: 1 }}>
                    <Box sx={{ maxWidth: "300px", mx: "auto", mb: 1 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker sx={{ width: "auto !important" }} format='yyyy年MM月dd日' value={dateValue} disableFuture onChange={(newValue) => setDateValue(newValue)} />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Box>
                    <Box sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={menu} onChange={handleChange} centered>
                            <Tab label="試合" sx={{ width: "100px", m: "auto" }} />
                            <Tab label="練習" sx={{ width: "100px", m: "auto" }} />
                        </Tabs>
                    </Box>

                    {menu == 0 &&
                        // <Box sx={{ pb: "65px", height: "105vh" }}>
                        <GameForm contents={gameContents} titleError={titleError} />
                        // </Box>
                    }
                    {menu == 1 &&
                        <PracticeForm contents={practiceContents} titleError={titleError} />
                    }
                </Container>
            </Box>
        </Box >
    )
}

async function insertGameData(event: React.FormEvent<HTMLFormElement>, contents, dateValue) {
    event.preventDefault()
    // const formData = new FormData(event.currentTarget)
    const data = contents
    // const data = Object.fromEntries(formData)

    // if (!data.title) {
    //   setTitleError(true)
    // }
    if (false) {
    }
    else {
        const uid = await auth.currentUser?.uid;
        if (uid) {
            data.uid = uid;

            // if (dateValue) data.date = dayjs(String(dateValue)).format('YYYY-MM-DD');
            if (dateValue) data.date = dayjs(String(dateValue));

            const date = new Date();
            data.createDate = date;
            data.updateDate = date;

            fetch('/api/game/', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'content-type': 'application/json'
                }
            })
        }
    }
}

async function insertPracticeData(event: React.FormEvent<HTMLFormElement>, contents, dateValue) {
    event.preventDefault()
    // const formData = new FormData(event.currentTarget)
    const data = contents
    // const data = Object.fromEntries(formData)



    const uid = await auth.currentUser?.uid;
    if (uid) {
        data.uid = uid;

        // if (dateValue) data.date = dayjs(String(dateValue)).format('YYYY-MM-DD');
        if (dateValue) data.date = dayjs(String(dateValue));

        const date = new Date();
        data.createDate = date;
        data.updateDate = date;

        fetch('/api/practice/', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            }
        })
    }
}