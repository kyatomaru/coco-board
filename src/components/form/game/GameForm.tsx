"use client"

import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import type { GameContentsType } from '@/types/GameContents';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import AddInputBox from '../inputBox/AddInputBox';
import Divider from '@mui/material/Divider';

type PageProps = {
    contents: GameContentsType,
    titleError: boolean,
}

export default function GameForm({ contents, titleError }: PageProps) {
    const [title, setTitle] = React.useState(contents.title);
    const [place, setPlace] = React.useState(contents.place);
    const [weather, setWeather] = React.useState(contents.weather);
    const [name1, setName1] = React.useState(contents.name1);
    const [score1, setScore1] = React.useState(contents.score1);
    const [name2, setName2] = React.useState(contents.name2);
    const [score2, setScore2] = React.useState(contents.score2);
    const [position, setPosition] = React.useState(contents.position);
    const [goodPoints, setGoodPoints] = React.useState(contents.goodPoints);
    const [badPoints, setBadPoints] = React.useState(contents.badPoints);

    const ChangeGoodPoints = (newValue, index) => {
        const input = []
        goodPoints.forEach((item) => {
            input.push(item)
        })
        input[index] = newValue
        setGoodPoints(input)
        contents.goodPoints = input
    }

    const AddGoodPoints = () => {
        const input = []
        goodPoints.forEach((item) => {
            input.push(item)
        })
        input.push([undefined])
        setGoodPoints(input)
        contents.goodPoints = input
    }

    const ChangeBadPoints = (newValue, index) => {
        const input = []
        badPoints.forEach((item) => {
            input.push(item)
        })
        input[index] = newValue
        setBadPoints(input)
        contents.badPoints = input
    }

    const AddBadPoints = () => {
        const input = []
        badPoints.forEach((item) => {
            input.push(item)
        })
        input.push([undefined])
        setBadPoints(input)
        contents.badPoints = input
    }

    return (
        <Box >
            <Box sx={{ mb: 3 }}>
                <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                    <InputLabel sx={{ fontSize: 14 }} error={titleError} htmlFor="outlined-adornment-title">タイトル</InputLabel>
                    <OutlinedInput
                        required
                        id="outlined-adornment-title"
                        name="title"
                        aria-describedby="outlined-title-helper-text"
                        label="タイトル"
                        value={title}
                        error={titleError}
                        // helperText="入力してください。"
                        onSelect={() => { titleError = false }}
                        onChange={newValue => {
                            setTitle(newValue.target.value)
                            contents.title = newValue.target.value
                        }}
                        sx={{ fontSize: 14 }}
                    />
                    {!!titleError && (
                        <FormHelperText error id="accountId-error">
                            {"入力してください。"}
                        </FormHelperText>
                    )}
                </FormControl>

                <Stack spacing={2} direction="row" sx={{ alignItems: "center" }}>
                    <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                        <InputLabel sx={{ fontSize: 14 }} htmlFor="outlined-adornment-place">場所</InputLabel>
                        <OutlinedInput sx={{ fontSize: 14 }}
                            id="outlined-adornment-place"
                            name="place"
                            aria-describedby="outlined-place-helper-text"
                            label="場所"
                            value={place}
                            onChange={newValue => {
                                setPlace(newValue.target.value)
                                contents.place = newValue.target.value
                            }}
                        />
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                        <InputLabel sx={{ fontSize: 14 }} htmlFor="outlined-adornment-weather">天気</InputLabel>
                        <Select sx={{ fontSize: 14 }}
                            labelId="outlined-adornment-weather-label"
                            name="weather"
                            id="outlined-adornment-weather"
                            value={weather}
                            label="天気"
                            onChange={newValue => {
                                setWeather(newValue.target.value)
                                contents.weather = newValue.target.value
                            }}
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

            <Box sx={{ my: 3 }}>
                <InputLabel sx={{ mb: 1, fontSize: 14 }} >チーム1</InputLabel>
                <Stack sx={{ mb: 1, alignItems: "center" }} spacing={2} direction="row" >
                    <FormControl fullWidth sx={{ mb: 1, }} variant="outlined">
                        {/* <InputLabel sx={{ fontSize: 14 }} htmlFor="outlined-adornment-name1">チーム名</InputLabel> */}
                        <OutlinedInput sx={{ fontSize: 14 }}
                            id="outlined-adornment-name1"
                            name="name1"
                            placeholder="チーム名"
                            value={name1}
                            onChange={newValue => {
                                setName1(newValue.target.value)
                                contents.name1 = newValue.target.value
                            }}

                        />
                    </FormControl>

                    <FormControl sx={{ mb: 1, width: "100px" }} variant="outlined">
                        {/* <InputLabel sx={{ fontSize: 14 }} htmlFor="outlined-adornment-score1">点数</InputLabel> */}
                        <OutlinedInput sx={{ fontSize: 14 }}
                            id="outlined-adornment-score1"
                            name="score1"
                            aria-describedby="outlined-score1-helper-text"
                            placeholder="点数"
                            value={score1}
                            onChange={newValue => {
                                setScore1(newValue.target.value)
                                contents.score1 = newValue.target.value
                            }}
                        />
                    </FormControl>
                </Stack>


                <InputLabel sx={{ mb: 1, fontSize: 14 }} >チーム2</InputLabel>
                <Stack sx={{ mb: 2, alignItems: "center" }} spacing={2} direction="row">
                    <FormControl fullWidth sx={{ mb: 1, }} variant="outlined">
                        {/* <InputLabel sx={{ fontSize: 14 }} htmlFor="outlined-adornment-name2">チーム名</InputLabel> */}
                        <OutlinedInput
                            sx={{ fontSize: 14 }}
                            id="outlined-adornment-name2"
                            name="name2"
                            aria-describedby="outlined-name2-helper-text"
                            placeholder="チーム名"
                            value={name2}
                            onChange={newValue => {
                                setName2(newValue.target.value)
                                contents.name2 = newValue.target.value
                            }}
                        />
                    </FormControl>

                    <FormControl sx={{ mb: 1, width: "100px" }} variant="outlined">
                        {/* <InputLabel sx={{ fontSize: 14 }} htmlFor="outlined-adornment-score2">点数</InputLabel> */}
                        <OutlinedInput
                            sx={{ fontSize: 14 }}
                            id="outlined-adornment-score2"
                            name="score2"
                            aria-describedby="outlined-score2-helper-text"
                            placeholder="点数"
                            value={score2}
                            onChange={newValue => {
                                setScore2(newValue.target.value)
                                contents.score2 = newValue.target.value
                            }}
                        />
                    </FormControl>
                </Stack>

                <FormControl fullWidth sx={{ my: 1 }} variant="outlined">
                    <InputLabel sx={{ fontSize: 14 }} htmlFor="outlined-adornment-position">ポジション</InputLabel>
                    <OutlinedInput sx={{ fontSize: 14 }}
                        id="outlined-adornment-position"
                        name="position"
                        aria-describedby="outlined-weight-helper-text"
                        label="ポジション"
                        value={position}
                        onChange={newValue => {
                            setPosition(newValue.target.value)
                            contents.position = newValue.target.value
                        }}
                    />
                </FormControl>
            </Box>

            <Divider />

            <Box sx={{ my: 3 }}>
                <AddInputBox title="良かった点" contents={contents.goodPoints} ChangeInput={ChangeGoodPoints} AddInput={AddGoodPoints} />
                <AddInputBox title="悪かった点" contents={contents.badPoints} ChangeInput={ChangeBadPoints} AddInput={AddBadPoints} />
            </Box>
        </Box >
    );
}