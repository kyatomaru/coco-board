"use client"

import * as React from 'react';
import { useRouter, useParams } from 'next/navigation'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material-next/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import GameForm from './GameForm';
import PracticeForm from '../practice/PracticeForm';
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
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';

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


export default function GameEditForm() {
    const [menu, setMenu] = React.useState(0);
    const [user, setUser] = React.useState<User | null>(null);
    const [token, setToken] = React.useState<string | null>(null);
    const [dateValue, setDateValue] = React.useState<Date | null>(new Date());
    const [isLoading, setIsLoading] = React.useState(false);
    const [gameContents, setGameContents] = React.useState(new GameContentsModel());
    const [titleError, setTitleError] = React.useState(false);

    const params = useParams()

    const GetContents = async (uid: string | undefined) => {
        if (uid) {
            const getParams = { uid: uid, contentsId: String(params.contentsId) };
            const query = new URLSearchParams(getParams);

            fetch(`/api/game/?${query}`)
                .then((response) => response.json())
                .then((data) => {
                    setGameContents(data)
                    setDateValue(new Date(data.date))
                })
        }
    }

    React.useEffect(() => {

        setIsLoading(true)
        const auth = getAuth();
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

    const router = useRouter()

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setMenu(newValue);
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)

        if (dateValue) gameContents.date = String(dayjs(String(dateValue)));
        gameContents.updateDate = new Date();

        const data = { updateData: gameContents, contentsId: String(params.contentsId) }
        editGameData(data)
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
                            <Button size="small" sx={{ color: 'black' }} variant='text' onClick={(event) => router.push('/notes')}>キャンセル</Button>
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

                    <GameForm contents={gameContents} titleError={titleError} />
                    {/* {menu == 1 &&
                        <PracticeForm contents={practiceContents} titleError={titleError} />
                    } */}
                </Container>
            </Box>
        </Box >
    )
}

async function editGameData(data) {
    // if (!data.title) {
    //   setTitleError(true)
    // }
    if (false) {
    }
    else {
        const uid = await auth.currentUser?.uid;
        if (uid) {
            fetch('/api/game/', {
                method: 'PATCH',
                body: JSON.stringify(data),
                headers: {
                    'content-type': 'application/json'
                }
            })
        }
    }
}