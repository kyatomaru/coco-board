"use client"

import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import type { PracticeContentsType } from '@/types/PracticeContents';
import { theme } from '@/components/style/Thema'
import AddInputBox from '../inputBox/AddInputBox';


type PageProps = {
    contents: PracticeContentsType,
    titleError: boolean,
}

export default function PracticeForm({ contents, titleError }: PageProps) {
    const [title, setTitle] = React.useState(contents.title);
    const [place, setPlace] = React.useState(contents.place);
    const [weather, setWeather] = React.useState(contents.weather);
    const [details, setDetails] = React.useState(contents.details);

    const ChangeDetails = (newValue, index) => {
        const input = []
        details.forEach((item) => {
            input.push(item)
        })
        input[index] = newValue
        setDetails(input)
        contents.details = input
    }

    const AddDetails = () => {
        const input = []
        details.forEach((item) => {
            input.push(item)
        })
        input.push([undefined])
        setDetails(input)
        contents.details = input
    }

    return (
        <Box >
            <Box sx={{ mb: 3 }}>
                <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                    <InputLabel sx={{ fontSize: 14 }} htmlFor="outlined-adornment-title">タイトル</InputLabel>
                    <Select
                        labelId="outlined-adornment-title-label"
                        name="title"
                        id="outlined-adornment-title"
                        value={title}
                        label="タイトル"
                        onChange={newValue => {
                            setTitle(newValue.target.value)
                            contents.title = newValue.target.value
                        }}
                        sx={{ fontSize: 14 }}
                    >
                        <MenuItem sx={{ fontSize: 14 }} value="自主練習">自主練習</MenuItem>
                        <MenuItem sx={{ fontSize: 14 }} value="チーム練習">チーム練習</MenuItem>
                    </Select>
                </FormControl>

                <Stack spacing={2} direction="row" sx={{ alignItems: "center" }}>
                    <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                        <InputLabel sx={{ fontSize: 14 }} htmlFor="outlined-adornment-place">場所</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-place"
                            name="place"
                            aria-describedby="outlined-place-helper-text"
                            label="場所"
                            value={place}
                            onChange={newValue => {
                                setPlace(newValue.target.value)
                                contents.place = newValue.target.value
                            }}
                            sx={{ fontSize: 14 }}
                        />
                    </FormControl>


                    <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                        <InputLabel sx={{ fontSize: 14 }} htmlFor="outlined-adornment-weather">天気</InputLabel>
                        <Select
                            labelId="outlined-adornment-weather-label"
                            name="weather"
                            id="outlined-adornment-weather"
                            value={weather}
                            label="天気"
                            onChange={newValue => {
                                setWeather(newValue.target.value)
                                contents.weather = newValue.target.value
                            }}
                            sx={{ fontSize: 14 }}
                        >
                            <MenuItem sx={{ fontSize: 14 }} value="晴れ">晴れ</MenuItem>
                            <MenuItem sx={{ fontSize: 14 }} value="曇り">曇り</MenuItem>
                            <MenuItem sx={{ fontSize: 14 }} value="雨">雨</MenuItem>
                            <MenuItem sx={{ fontSize: 14 }} value="雪">雪</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
            </Box>

            <Box sx={{ my: 3 }}>
                <AddInputBox title="練習メニュー" contents={contents.details} ChangeInput={ChangeDetails} AddInput={AddDetails} />
            </Box>
        </Box >
    );
}