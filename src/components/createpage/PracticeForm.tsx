"use client"

import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import type { PracticeContentsType } from '@/types/PracticeContents';


type PageProps = {
    contents: PracticeContentsType,
}

export default function PracticeForm({ contents }: PageProps) {
    const [title, setTitle] = React.useState(contents.title);
    const [place, setPlace] = React.useState(contents.place);
    const [weather, setWeather] = React.useState(contents.weather);
    const [detail, setDetail] = React.useState(contents.detail);
    const [problem, setProblem] = React.useState(contents.problem);

    return (
        <div>
            <div>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-title">Title</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-title"
                        name="title"
                        aria-describedby="outlined-title-helper-text"
                        label="title"
                        defaultValue={title}
                    />
                </FormControl>

                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-place">Place</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-place"
                        name="place"
                        aria-describedby="outlined-place-helper-text"
                        label="place"
                        defaultValue={place}
                    />
                </FormControl>

                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-weather">Weather</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-weather"
                        name="weather"
                        aria-describedby="outlined-weather-helper-text"
                        label="weather"
                        defaultValue={weather}
                    />
                </FormControl>
            </div>

            <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-detail">Detail</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-detail"
                    name="detail"
                    label="detail"
                    defaultValue={detail}
                />
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-problem">Problem</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-problem"
                    name="problem"
                    label="problem"
                    defaultValue={problem}
                />
            </FormControl>
        </div>
    );
}