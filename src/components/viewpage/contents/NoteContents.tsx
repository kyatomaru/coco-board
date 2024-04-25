"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import type { GameContentsType } from '@/types/game/GameContents';
import { useDeleteGame } from '@/hooks/game/useDeleteGame';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import GameContents from "./game/GameContents"
import PracticeContents from './practice/PracticeContents';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import dayjs from 'dayjs';
import { confirmPasswordReset } from 'firebase/auth';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

type PageProps = {
    contents: any,
    DeleteContents: any
}

const day = ['日', '月', '火', '水', '木', '金', '土']

const DataFormat = (date) => {
    const thisYear = dayjs(String(new Date)).format('YYYY');
    const recordYear = dayjs(String(date)).format('YYYY');
    const recordDay = `(${day[Number(dayjs(String(date)).format('d'))]})`

    if (thisYear == recordYear) {
        return dayjs(String(date)).format('M/DD ') + recordDay;
    }
    else {
        return dayjs(String(date)).format('YYYY/M/DD ') + recordDay;
    }
}

export default function NoteContents({ contents, DeleteContents }: PageProps) {
    // const [contentsId, setcontentsId] = React.useState(0);
    const [activeStep, setActiveStep] = React.useState(0);

    const clickLeftButton = () => {
        setActiveStep(activeStep - 1)
    }

    const clickRightButton = () => {
        setActiveStep(activeStep + 1)
    }

    return (
        <Card sx={{ minWidth: 250, my: 5 }} elevation={2}>
            <Stack sx={{ width: "100%" }} justifyContent="center" alignItems="center" direction="row">
                <Box sx={{ width: "100%", textAlign: "center" }}>
                    <IconButton onClick={clickLeftButton} disabled={activeStep == 0}><ArrowBackIosIcon /></IconButton>
                </Box>
                <Typography sx={{ width: "100%", minWidth: "130px", px: 2, textAlign: "center", fontSize: 17 }} variant="h6" component="div">
                    {DataFormat(contents.date)}
                </Typography>
                <Box sx={{ width: "100%", textAlign: "center" }}>
                    <IconButton onClick={clickRightButton} disabled={activeStep == contents.contents.length - 1 || contents.contents.length == 0}><ArrowForwardIosIcon /></IconButton>
                </Box>
            </Stack>
            {/* <Typography sx={{ px: 2, fontSize: 17 }} variant="h6" component="div">
                {DataFormat(contents.date)}
            </Typography> */}
            {contents.contents.map((value, index) => {
                return (
                    <Box key={index}>
                        {activeStep == index &&
                            <>
                                {
                                    value.type == "game" &&
                                    <GameContents contents={value} DeleteContents={DeleteContents} />
                                }
                                {
                                    value.type == "practice" &&
                                    <PracticeContents contents={value} DeleteContents={DeleteContents} />
                                }
                            </>
                        }
                    </Box>
                )
            })}
            <DotsContentsStepper activeStep={activeStep} stepLength={contents.contents.length} handleNext={clickRightButton} handleBack={clickLeftButton} />
        </Card>
    )
}

type StepperProps = {
    activeStep: number,
    stepLength: number,
    handleNext: React.MouseEventHandler<HTMLButtonElement>,
    handleBack: React.MouseEventHandler<HTMLButtonElement>
}

const DotsContentsStepper = ({ activeStep, stepLength, handleNext, handleBack }: StepperProps) => {
    const theme = useTheme();
    // const [activeStep, setActiveStep] = React.useState(0);

    // const handleNext = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // };

    // const handleBack = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // };

    return (
        <MobileStepper
            variant="dots"
            steps={stepLength}
            position="static"
            activeStep={activeStep}
            sx={{ width: "100%", flexGrow: 1, borderTop: '1px solid rgba(0, 0, 0, .125)' }}
            nextButton={
                <Button size="small" onClick={handleNext} disabled={activeStep === stepLength - 1}>
                    次
                    {theme.direction === 'rtl' ? (
                        <KeyboardArrowLeft />
                    ) : (
                        <KeyboardArrowRight />
                    )}
                </Button>
            }
            backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                    {theme.direction === 'rtl' ? (
                        <KeyboardArrowRight />
                    ) : (
                        <KeyboardArrowLeft />
                    )}
                    戻る
                </Button>
            }
        />
    );
}