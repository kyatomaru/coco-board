"use client"

import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { PracticeContentsType } from '@/types/practice/PracticeContents';
import { theme } from '@/components/style/Thema'
import AddInputBox from '../inputBox/AddInputBox';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { PracticeDetailsModel } from '@/types/practice/PracticeDetails';


type PageProps = {
    contents: PracticeContentsType,
    titleError: boolean,
}

export default function PracticeForm({ contents, titleError }: PageProps) {
    const [title, setTitle] = React.useState(contents.title);
    const [place, setPlace] = React.useState(contents.place);
    const [weather, setWeather] = React.useState(contents.weather);
    const [details, setDetails] = React.useState(contents.details);
    const [comment, setComment] = React.useState(contents.comment);

    // const ChangeDetails = (newValue, index) => {
    //     const input = []
    //     details.forEach((item) => {
    //         input.push(item)
    //     })
    //     input[index] = newValue
    //     setDetails(input)
    //     contents.details = input
    // }

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
                        <Button sx={{ fontSize: 13 }} onClick={AddDetails}>追加</Button>
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
                                {contents.detailsCategory.map((type, index2) => (
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
    );
}