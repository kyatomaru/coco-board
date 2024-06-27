"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import { auth } from '@/app/firebase';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material-next/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import ja from 'date-fns/locale/ja'
import { PracticeDetailsModel } from '@/types/practice/PracticeDetails';
import { elementsCategories } from '@/types/Category';
import Divider from '@mui/material/Divider'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

type pageProps = {
    contents: any,
    postData: any
}

export default function PracticeForm({ contents, postData }: pageProps) {
    const router = useRouter()
    const params = useParams()
    const [waitFlag, setWaitFlag] = React.useState(false);
    const [titleError, setTitleError] = React.useState(false);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const uid = await auth.currentUser?.uid;
        if (uid) {
            contents.uid = uid
            const res = await postData(contents)
            if (res.ok) {
                router.replace(`/calendar/${dayjs(String(contents.date)).format('YYYY-MM-DD')}`)
            }
        }
    }

    const [title, setTitle] = React.useState(contents.title);
    const [place, setPlace] = React.useState(contents.place);
    const [weather, setWeather] = React.useState(contents.weather);
    const [details, setDetails] = React.useState(contents.details);
    const [comment, setComment] = React.useState(contents.comment);

    const AddDetails = () => {
        const input = []
        details.forEach((item) => {
            input.push(item)
        })
        input.push(new PracticeDetailsModel())
        setDetails(input)
        contents.details = input
    }

    const ChangeDetailsContext = (newValue: String, index) => {
        const input = []
        details.forEach((item) => {
            input.push(item)
        })
        input[index].context = newValue
        setDetails(input)
        contents.details = input
    }

    const ChangeDetailsType = (newValue: Number, index) => {
        const input = []
        details.forEach((item) => {
            input.push(item)
        })
        input[index].type = newValue
        setDetails(input)
        contents.details = input
    }


    return (
        <Box
            component="form"
            onSubmit={onSubmit}
            sx={{
                '& .MuiTextField-root': { m: 1 },
                marginBottom: "30px",
                minHeight: "100vh"
            }}
            noValidate
            autoComplete="off"
            method='POST'
        >
            <Box sx={{ position: 'sticky', top: 0, backgroundColor: "white", zIndex: 100 }} >
                <Grid sx={{ px: 1, height: "50px" }} container direction="row" alignItems="center" justifyContent="space-between">
                    <Grid >
                        <Button size="small" sx={{ color: 'black' }} variant='text' onClick={(event) => router.back()}>
                            <Typography fontSize={13} component="p">
                                キャンセル
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid >
                        <Button size="small" sx={{ backgroundColor: "#1976d2 !important" }} variant='filled' type='submit'>
                            <Typography fontSize={13} component="p">
                                記録する
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>

                <Divider />
            </Box>

            <Box>
                <Box sx={{ mx: "auto", px: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker sx={{ mx: "0 !important", width: "auto !important", backgroundColor: "background.paper" }} format='yyyy年MM月dd日'
                                value={new Date(String(contents.date))}
                                disableFuture
                                onChange={(newValue) => { contents.date = dayjs(String(newValue)).format('YYYY-MM-DD') }} />
                        </DemoContainer>
                    </LocalizationProvider>
                </Box>

                <Box >
                    <Box sx={{ my: 1, px: 2 }}>
                        <Typography variant="h6" sx={{ fontSize: 14, mb: 2 }} component="div">
                            基本情報
                        </Typography>
                        <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                            <InputLabel sx={{ fontSize: 14 }} shrink={contents.title != ""} htmlFor="outlined-adornment-title">タイトル</InputLabel>
                            <Select
                                labelId="outlined-adornment-title-label"
                                name="title"
                                id="outlined-adornment-title"
                                value={contents.title}
                                label="タイトル"
                                onChange={newValue => {
                                    setTitle(newValue.target.value)
                                    contents.title = newValue.target.value
                                }}
                                sx={{ fontSize: 14, backgroundColor: "background.paper" }}
                                notched={contents.title != ""}
                            >
                                <MenuItem sx={{ fontSize: 14 }} value="自主練習">自主練習</MenuItem>
                                <MenuItem sx={{ fontSize: 14 }} value="チーム練習">チーム練習</MenuItem>
                            </Select>
                        </FormControl>

                        <Stack spacing={2} sx={{ mb: 2 }} direction="row" alignItems="center">
                            <FormControl fullWidth variant="outlined">
                                <InputLabel sx={{ fontSize: 14 }} shrink={contents.place != undefined} htmlFor="outlined-adornment-place">場所</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-place"
                                    name="place"
                                    aria-describedby="outlined-place-helper-text"
                                    label="場所"
                                    value={contents.place}
                                    onChange={newValue => {
                                        setPlace(newValue.target.value)
                                        contents.place = newValue.target.value
                                    }}
                                    sx={{ fontSize: 14, backgroundColor: "background.paper" }}
                                    notched={contents.place != undefined}
                                />
                            </FormControl>


                            <FormControl fullWidth variant="outlined">
                                <InputLabel sx={{ fontSize: 14 }} shrink={contents.weather != ""} htmlFor="outlined-adornment-weather">天気</InputLabel>
                                <Select
                                    labelId="outlined-adornment-weather-label"
                                    name="weather"
                                    id="outlined-adornment-weather"
                                    value={contents.weather}
                                    label="天気"
                                    onChange={newValue => {
                                        setWeather(newValue.target.value)
                                        contents.weather = newValue.target.value
                                    }}
                                    sx={{ fontSize: 14, backgroundColor: "background.paper" }}
                                    notched={contents.weather != ""}
                                >
                                    <MenuItem sx={{ fontSize: 14 }} value="晴れ">晴れ</MenuItem>
                                    <MenuItem sx={{ fontSize: 14 }} value="曇り">曇り</MenuItem>
                                    <MenuItem sx={{ fontSize: 14 }} value="雨">雨</MenuItem>
                                    <MenuItem sx={{ fontSize: 14 }} value="雪">雪</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                    </Box>

                    <Divider />

                    <Box sx={{ my: 1, px: 2 }}>
                        <Box sx={{ mb: 1 }}>
                            <Stack sx={{ mb: 1 }} spacing={2} direction="row" justifyContent="space-between" alignItems="center">
                                <Typography variant="h6" sx={{ fontSize: 14 }} component="div">
                                    練習内容
                                </Typography>
                                <Button sx={{ fontSize: 13, minWidth: 85 }} onClick={AddDetails}>追加</Button>
                            </Stack>
                            {contents.details.map((input, index) => (
                                <Stack spacing={1} key={index} direction="row" sx={{ alignItems: "center", mb: 2 }}>
                                    <Select sx={{ fontSize: 14, minWidth: "120px" }}
                                        labelId="outlined-adornment-weather-label"
                                        name="weather"
                                        id="outlined-adornment-weather"
                                        value={contents.details[index].type}
                                        onChange={newValue => {
                                            ChangeDetailsType(Number(newValue.target.value), index)
                                        }}
                                    >
                                        {elementsCategories.map((type, index2) => (
                                            <MenuItem sx={{ fontSize: 14 }} key={index2} value={index2}>{type.title}</MenuItem>
                                        ))}
                                    </Select>
                                    <FormControl fullWidth sx={{ mb: 1 }}>
                                        <OutlinedInput
                                            id="outlined-adornment-input"
                                            value={contents.details[index].context}
                                            onChange={newValue => ChangeDetailsContext(newValue.target.value, index)}
                                            sx={{ fontSize: 14 }}
                                        />
                                    </FormControl>
                                </Stack>
                            ))}
                        </Box>

                        {/* <AddInputBox title="取り組んだこと" contents={contents.details} ChangeInput={ChangeDetails} AddInput={AddDetails} /> */}
                    </Box>

                    <Divider />

                    <Box sx={{ my: 1, px: 2 }}>
                        <Typography variant="h6" sx={{ fontSize: 14, mb: 2 }} component="div">
                            コメント
                        </Typography>
                        <FormControl fullWidth sx={{ fontSize: 14 }} variant="outlined">
                            <OutlinedInput
                                sx={{ m: "0 !important", fontSize: 14, backgroundColor: "background.paper" }}
                                multiline
                                value={contents.comment}
                                onChange={newValue => {
                                    setComment(newValue.target.value)
                                    contents.comment = newValue.target.value
                                }}
                                notched={contents.comment != ""}
                            />
                        </FormControl>
                    </Box>
                </Box >
                {/* <MenuSelectBox date={dayjs(String(dateValue)).format('YYYY-MM-DD')} /> */}
            </Box >
        </Box >

    )
}