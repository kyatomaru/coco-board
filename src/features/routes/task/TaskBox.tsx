"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useDeleteTask } from '@/hooks/task/useDeleteTask';
import { useUpdateTask } from '@/hooks/task/useUpdateTask';
import Typography from '@mui/material/Typography';
import MuiListItemText, { ListItemTextProps } from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
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
import { useDateFormat } from '@/utils/useDateFormat';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import DeleteConfirmModal from '@/features/common/contents/modal/ConfirmModal';
import { taskModalTitle } from '@/constants/ModalMessage';
import { deleteTaskMs } from '@/constants/ModalMessage';
import TaskBar from '@/features/common/contents/bar/TaskBar';
import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';
import TaskCalendar from './TaskCalendar';
import TaskForm from '@/features/common/forms/task/TaskForm';

type PageProps = {
    task: any,
    getTask: any
    achieve: any,
    getAchieve: any
}

const DataFormat = (date: String) => {
    return useDateFormat(date)
}


export default function TaskBox({ task, achieve, getTask, getAchieve }: PageProps) {
    const [taskDeleteModalOpen, setTaskDeleteModalOpen] = React.useState(false);
    const [editModalOpen, setEditModalOpen] = React.useState<boolean>(false)

    const router = useRouter()

    const taskEditButtonClick = () => {
        setEditModalOpen(true)
    }

    const taskDeleteButtonClick = () => {
        setTaskDeleteModalOpen(true)
    }

    const DeleteTask = async () => {
        const res = await useDeleteTask(task.taskId)
        if (res.ok) {
            router.replace('/home')
        }
    }


    return (
        <>
            <DeleteConfirmModal open={taskDeleteModalOpen} setOpen={setTaskDeleteModalOpen} title={taskModalTitle} message={deleteTaskMs} confirmText="削除" onSubmit={DeleteTask} />

            {editModalOpen ?
                <TaskForm task={task} getTask={getTask} postData={useUpdateTask} onClose={() => { setEditModalOpen(false) }} />
                :
                <Box>
                    <TaskBar task={task} EditButtonClick={taskEditButtonClick} DeleteButtonClick={taskDeleteButtonClick} />

                    <Box sx={{ minWidth: 250, mb: "80px" }} >
                        <Box sx={{ position: "relative" }}>

                            {task != undefined ?
                                <Box sx={{ width: "100%", alignItems: "center", px: 2, py: 1 }} >
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="h6" sx={{ fontSize: 16 }} component="div">
                                            {String(task.title)}
                                        </Typography>
                                    </Stack>
                                </Box>
                                :
                                <Skeleton variant="rectangular" height={77} />
                            }

                            <Divider />

                            {task != undefined ?
                                <Box sx={{ width: "100%", px: 2, py: 1 }} >
                                    <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                        ゴール
                                    </Typography>
                                    <Typography sx={{ px: 1, fontSize: 15 }}>
                                        {task.goal}
                                    </Typography>
                                </Box>
                                :
                                <Skeleton variant="rectangular" height={45} />
                            }

                            <Divider />

                            {task != undefined ?
                                <Box sx={{ width: "100%", px: 2, my: 1 }}>
                                    <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                        取り組む曜日
                                    </Typography>

                                    <Stack justifyContent="space-between" direction="row" sx={{ px: 1, maxWidth: "300px" }}>
                                        {days.map((day, index) => {
                                            return <Avatar key={index} sx={{
                                                width: "32px", height: "32px", fontSize: 13, fontWeight: "bold",
                                                bgcolor: "#eee", color: task.doday[index] ? "#e57f3a" : "#444",
                                                border: task.doday[index] && "0.5px #e57f3a solid"
                                            }}>{day}</Avatar>
                                        })}
                                    </Stack>
                                </Box>
                                :
                                <Skeleton variant="rectangular" height={54} />
                            }


                            <Divider />

                            {task != undefined ?
                                <Box sx={{ px: 2, my: 1 }}>
                                    <TaskCalendar task={task} achieve={achieve} />
                                </Box>

                                :
                                <Skeleton variant="rectangular" height={62} />
                            }

                            <Divider />
                        </Box >
                    </Box >
                </Box >
            }
        </>
    )
}

const days = [
    "日", "月", "火", "水", "木", "金", "土",
];

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
