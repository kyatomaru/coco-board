"use client"

import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import type { GameContentsType } from '@/types/game/GameContents';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import AddInputBox from '../inputBox/AddInputBox';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import MuiRating, { RatingProps, IconContainerProps } from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

type PageProps = {
    contents: GameContentsType,
    titleError: boolean,
}

export default function GameProblemForm({ contents, titleError }: PageProps) {
    const [title, setTitle] = React.useState(contents.title);
    const [place, setPlace] = React.useState(contents.place);
    const [weather, setWeather] = React.useState(contents.weather);
    const [injury, setInjury] = React.useState(contents.injury);
    const [condition, setCondition] = React.useState(contents.condition);
    const [fatigue, setFatigue] = React.useState(contents.fatigue);
    const [name1, setName1] = React.useState(contents.name1);
    const [score1, setScore1] = React.useState(contents.score1);
    const [name2, setName2] = React.useState(contents.name2);
    const [score2, setScore2] = React.useState(contents.score2);
    const [position, setPosition] = React.useState(contents.position);
    const [goodPoints, setGoodPoints] = React.useState(contents.goodPoints);
    const [badPoints, setBadPoints] = React.useState(contents.badPoints);

    console.log(contents.position)

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
        <Box>
            <Box sx={{ mb: 1, px: 2 }}>
                <Typography variant="h6" sx={{ fontSize: 14, mb: 2 }} component="div">
                    基本情報
                </Typography>
            </Box>
        </Box >
    );
}


const StyledRating = styled((props: RatingProps) => (
    <MuiRating
        // max={4}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
        color: theme.palette.action.disabled,
    },
}));

const customIcons: {
    [index: string]: {
        icon: React.ReactElement;
        label: string;
    };
} = {
    1: {
        icon: <SentimentVeryDissatisfiedIcon color="error" />,
        label: '不良',
    },
    2: {
        icon: <SentimentDissatisfiedIcon color="error" />,
        label: 'やや不良',
    },
    3: {
        icon: <SentimentSatisfiedIcon color="warning" />,
        label: '普通',
    },
    4: {
        icon: <SentimentSatisfiedAltIcon color="success" />,
        label: 'やや良好',
    },
    5: {
        icon: <SentimentVerySatisfiedIcon sx={{ color: "#00cc33" }} />,
        label: '良好',
    },
};

function IconContainer(props: IconContainerProps) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
}