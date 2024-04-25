"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material-next/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import GameForm from './game/GameForm';
import GameProblemForm from './game/GameProblemForm';
import PracticeForm from './practice/PracticeForm';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import ja from 'date-fns/locale/ja'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { GameContentsModel } from '@/types/game/GameContents';
import { PracticeContentsModel } from '@/types/practice/PracticeContents';
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
    const router = useRouter()
    const params = useParams()
    const [menu, setMenu] = React.useState(0);
    const [gameMenu, setGameMenu] = React.useState(0);
    const [waitFlag, setWaitFlag] = React.useState(false);
    const [dateValue, setDateValue] = React.useState<Date>(new Date(String(params.date)));
    const [isLoading, setIsLoading] = React.useState(false);
    const [gameContents, setGameContents] = React.useState(new GameContentsModel());
    const [practiceContents, setPracticeContents] = React.useState(new PracticeContentsModel());
    const [titleError, setTitleError] = React.useState(false);



    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setMenu(newValue);
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true)
        if (menu == 0) {
            insertData("game", event, gameContents, dateValue)
        }
        if (menu == 1) {
            insertData("practice", event, practiceContents, dateValue)
        }
        router.replace(`/calendar/${dayjs(String(params.date)).format('YYYY-MM-DD')}`)
    }

    const nextGameMenuClick = (event) => {
        setTimeout(() => { setGameMenu(1) }, 400)
    }

    return (
        <Box maxWidth="sm" sx={containterStyle}>
            <Box
                component="form"
                onSubmit={onSubmit}
                sx={{
                    '& .MuiTextField-root': { m: 1 },
                    backgroundColor: "#fbfbfb",
                }}
                noValidate
                autoComplete="off"
                method='POST'
            >
                <Box sx={{ position: 'sticky', top: 0, backgroundColor: "white", zIndex: 100 }} >
                    <Grid sx={{ px: 1, height: "50px" }} container direction="row" alignItems="center" justifyContent="space-between">
                        <Grid >
                            <Button size="small" sx={{ color: 'black' }} variant='text' onClick={(event) => router.replace(`/calendar/${dayjs(String(new Date())).format('YYYY-MM-DD')}`)}>キャンセル</Button>
                        </Grid>
                        <Grid >
                            <Button size="small" sx={{ backgroundColor: "#1976d2 !important" }} variant='filled' type='submit'>記録する</Button>
                        </Grid>
                    </Grid>

                    <Divider />
                </Box>

                <Box sx={{ pt: 1 }}>
                    <Box sx={{ mx: "auto", px: 2 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker sx={{ mx: "0 !important", width: "auto !important", backgroundColor: "background.paper" }} format='yyyy年MM月dd日' value={dateValue} disableFuture onChange={(newValue) => setDateValue(newValue)} />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Box>

                    <Box sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={menu} onChange={handleChange} centered>
                            <Tab label="試合" sx={{ width: "100px", m: "auto", fontSize: 13 }} />
                            <Tab label="練習" sx={{ width: "100px", m: "auto", fontSize: 13 }} />
                        </Tabs>
                    </Box>

                    {menu == 0 &&
                        <GameForm contents={gameContents} titleError={titleError} />
                    }
                    {menu == 1 &&
                        <PracticeForm contents={practiceContents} titleError={titleError} />
                    }
                </Box>
            </Box>
        </Box >
    )
}

async function insertData(collection, event: React.FormEvent<HTMLFormElement>, contents, dateValue) {
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

            if (dateValue) data.date = dayjs(String(dateValue)).format('YYYY-MM-DD');
            // if (dateValue) data.date = dayjs(String(dateValue));

            const date = new Date();
            data.createDate = date;
            data.updateDate = date;

            fetch(`/api/${collection}/`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'content-type': 'application/json'
                }
            })
        }
    }
}