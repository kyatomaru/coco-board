"use client"

import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import type { GameContentsType } from '@/types/GameContents';

type PageProps = {
    contents: GameContentsType,
}

export default function GameForm({ contents }: PageProps) {
    const [title, setTitle] = React.useState(contents.title);
    const [place, setPlace] = React.useState(contents.place);
    const [weather, setWeather] = React.useState(contents.weather);
    const [name1, setName1] = React.useState(contents.name1);
    const [score1, setScore1] = React.useState(contents.score1);
    const [name2, setName2] = React.useState(contents.name2);
    const [score2, setScore2] = React.useState(contents.score2);
    const [position, setPosition] = React.useState(contents.position);
    const [goodPoint, setGoodPoint] = React.useState(contents.goodPoint);
    const [badPoint, setBadPoint] = React.useState(contents.badPoint);
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
                        value={title}
                        onChange={newValue => setTitle(newValue.target.value)}
                    />
                </FormControl>

                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-place">Place</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-place"
                        name="place"
                        aria-describedby="outlined-place-helper-text"
                        label="place"
                        value={place}
                        onChange={newValue => setPlace(newValue.target.value)}
                    />
                </FormControl>

                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-weather">Weather</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-weather"
                        name="weather"
                        aria-describedby="outlined-weather-helper-text"
                        label="weather"
                        value={weather}
                        onChange={newValue => setWeather(newValue.target.value)}
                    />
                </FormControl>
            </div>

            <div>
                <InputLabel >team1</InputLabel>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-name1">Name</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-name1"
                        name="name1"
                        aria-describedby="outlined-name1-helper-text"
                        label="name"
                        value={name1}
                        onChange={newValue => setName1(newValue.target.value)}

                    />
                </FormControl>

                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-score2">Score</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-score2"
                        name="score1"
                        aria-describedby="outlined-score2-helper-text"
                        label="score"
                        value={score1}
                        onChange={newValue => setScore1(Number(newValue.target.value))}
                    />
                </FormControl>
            </div>

            <div>
                <InputLabel >team2</InputLabel>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-name2">Name</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-name2"
                        name="name2"
                        aria-describedby="outlined-name2-helper-text"
                        label="name"
                        value={name2}
                        onChange={newValue => setName2(newValue.target.value)}
                    />
                </FormControl>

                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-score2">Score</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-score2"
                        name="score2"
                        aria-describedby="outlined-score2-helper-text"
                        label="score"
                        value={score2}
                        onChange={newValue => setScore2(Number(newValue.target.value))}
                    />
                </FormControl>
            </div>

            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-position">Position</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-position"
                    name="position"
                    aria-describedby="outlined-weight-helper-text"
                    label="position"
                    value={position}
                    onChange={newValue => setPosition(newValue.target.value)}
                />
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-goodpoint">Good point</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-goodpoint"
                    name="goodPoint"
                    label="good point"
                    value={goodPoint}
                    onChange={newValue => setGoodPoint(newValue.target.value)}
                />
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-badpoint">Bad point</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-badpoint"
                    name="badPoint"
                    label="bood point"
                    value={badPoint}
                    onChange={newValue => setBadPoint(newValue.target.value)}
                />
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-problem">Problem</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-problem"
                    name="problem"
                    label="problem"
                    value={problem}
                    onChange={newValue => setProblem(newValue.target.value)}
                />
            </FormControl>
        </div>
    );
}