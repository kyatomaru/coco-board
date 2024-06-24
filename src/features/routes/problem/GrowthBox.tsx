"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { useDeleteProblem } from '@/hooks/problem/useDeleteProblem';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import MuiListItemText, { ListItemTextProps } from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { ProblemContentsType } from '@/types/problem/ProblemContents';
import { useDateFormat } from '@/utils/useDateFormat';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import MoreHorizButton from '@/features/common/contents/button/MoreHorizButton';

type PageProps = {
    growthContents: any
    getGrowthContents: any
}

const DataFormat = (date: String) => {
    return useDateFormat(date)
}


export default function ProblemContentsBox({ growthContents, getGrowthContents }: PageProps) {
    const [problemDeleteModalOpen, setProblemDeleteModalOpen] = React.useState(false);
    const [problemAchieveModalOpen, setProblemAchieveModalOpen] = React.useState(false);
    const [contentsModalOpen, setContentsModalOpen] = React.useState<boolean>(false)

    const [growthCreateModalOpen, setGrowthCreateModalOpen] = React.useState(false)
    const [growthEditModalOpen, setGrowthEditModalOpen] = React.useState(false)
    const [growthDeleteModalOpen, setGrowthDeleteModalOpen] = React.useState(false);
    const [growthMenuModalOpen, setGrowthMenuModalOpen] = React.useState(false)
    // const [growthSelectContents, setGrowthSelectContents] = React.useState(new ProblemGrowthModel())

    const router = useRouter()

    const [activeStep, setActiveStep] = React.useState(0);

    const clickLeftButton = () => {
        setActiveStep(activeStep - 1)
    }

    const clickRightButton = () => {
        setActiveStep(activeStep + 1)
    }

    const GrowthMenuHandleClick = () => {
        setGrowthMenuModalOpen(true)
    }

    return (
        <Box sx={{ px: 2, my: 1 }}>
            <Stack direction="row" sx={{ alignItems: "center" }} justifyContent="space-between"  >
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    成長日記
                </Typography>
                <Button sx={{ fontSize: 14, ml: 2 }} onClick={(event) => setGrowthCreateModalOpen(true)} >
                    記録する
                </Button>
            </Stack>
            {growthContents.length > 0 ?
                <Box>
                    {growthContents.map((value, index) => {
                        return (
                            <Box key={index} >
                                {activeStep == index &&

                                    <Card sx={{
                                        pt: 1, px: 2, pb: 2,
                                        borderTop: '0.5px solid rgba(0, 0, 0, .125)',
                                        borderBottom: '0.5px solid rgba(0, 0, 0, .125)'
                                    }}>
                                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                                            <Typography variant="h6" sx={{ fontSize: 15 }} component="div">
                                                {DataFormat(String(value.date))}
                                            </Typography>
                                            <MoreHorizButton menuHandleClick={GrowthMenuHandleClick} />
                                            {/* <IconButton
                                                onClick={GrowthMenuHandleClick}
                                                sx={{
                                                    // right: "10px", top: "5px",
                                                    // position: "absolute",
                                                    // zIndex: 1000, width: "35px", height: "35px", m: "auto"
                                                }}
                                            >
                                                <MoreHorizIcon />
                                            </IconButton> */}
                                        </Stack>
                                        <Stack direction="row" alignItems="center">
                                            <span>{customIcons[Number(value.overcome)].icon}</span>
                                            <Typography variant="h6" sx={{ px: 1, fontSize: 14 }}>
                                                {customIcons[Number(value.overcome)].label}
                                            </Typography>

                                        </Stack>
                                        <Box sx={{ my: 1 }}>
                                            <Typography variant="body1" sx={{ fontSize: 14 }}>
                                                {value.comment}
                                            </Typography>
                                        </Box>
                                    </Card>
                                }
                            </Box>
                        )
                    })}
                    <DotsContentsStepper activeStep={activeStep} stepLength={growthContents.length} handleNext={clickRightButton} handleBack={clickLeftButton} />
                </Box>
                :
                <Box>
                    <Typography variant="h6" sx={{ fontSize: 14 }} component="div">
                        記録がありません
                    </Typography>
                </Box>
            }
        </Box>
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
            sx={{
                width: "100%", flexGrow: 1, borderTop: '0px solid rgba(0, 0, 0, .125)'
            }}
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

const ListText = styled((props: ListItemTextProps) => (
    <MuiListItemText
        {...props}
    />
))(({ theme }) => ({
    '& span': {
        fontSize: 13
    },
    '& p': {
        fontSize: 10,
    },
}));

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    '&:not(:last-child)': {
        borderBottom: 0
    },
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        {...props}
    />
))(({ theme }) => ({
    // backgroundColor:
    //     theme.palette.mode === 'dark'
    //         ? 'rgba(255, 255, 255, .05)'
    //         : 'rgba(0, 0, 0, .03)',
    minHeight: 35,
    // flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(180deg)',
    }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    // padding: theme.spacing(2),
    padding: 0,
    // borderTop: '1px solid rgba(0, 0, 0, .125)',
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));


const customIcons: {
    [index: string]: {
        icon: React.ReactElement;
        label: string;
    };
} = {
    // 1: {
    //     icon: <SentimentVeryDissatisfiedIcon color="error" />,
    //     label: 'Very Dissatisfied',
    // },
    1: {
        icon: <SentimentDissatisfiedIcon color="error" />,
        label: '退化・改悪した',
    },
    2: {
        icon: <SentimentSatisfiedIcon color="warning" />,
        label: '成長が見られない',
    },
    3: {
        icon: <SentimentSatisfiedAltIcon color="success" />,
        label: 'やや成長・改善した',
    },
    4: {
        icon: <SentimentVerySatisfiedIcon sx={{ color: "#00ff00" }} />,
        label: '成長・改善した',
    },
};
