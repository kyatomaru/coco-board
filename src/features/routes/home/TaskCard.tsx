"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import dayjs from 'dayjs';
import Typography from '@mui/material/Typography';
import { useDateFormat } from '@/utils/useDateFormat';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import CardActionArea from '@mui/material/CardActionArea';
import MuiListItemText, { ListItemTextProps } from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';
import DoneIcon from '@mui/icons-material/Done';
import { useGetDateAchieve } from '@/hooks/task/achieve/useGetDateAchieve';
import { AchievementModel } from '@/types/task/Achievement';
import { useInsertAchieve } from '@/hooks/task/achieve/useInsertAchieve';
import { useUpdateAchieve } from '@/hooks/task/achieve/useUpdateAchieve';
import { useGetAllAchieve } from '@/hooks/task/achieve/useGetAllAchieve';

type PageProps = {
    user: any
    task: any,
    getTask: any,
    date: Date | String
}

const DataFormat = (date: String) => {
    return useDateFormat(date)
}

export default function TaskCard({ user, task, getTask, date }: PageProps) {
    // const [achieve, setAchieve, getAchieve] = useGetDateAchieve(user, task.taskId, dayjs(String(date)).format('YYYY-MM-DD'))
    const [achieves, setAchieves, getAchieves] = useGetAllAchieve(user, task.taskId)
    const [achieve, setAchieve] = React.useState(new AchievementModel())


    const router = useRouter()

    const ViewButtonClick = () => {
        router.push(`/task/${task.taskId}`)
    }

    const EditButtonClick = () => {
        router.replace(`/task/edit/${task.taskId}`)
    }

    React.useEffect(() => {
        setAchieve(new AchievementModel())
        if (achieves != undefined) {
            achieves.forEach(element => {
                if (element.date == dayjs(String(date)).format('YYYY-MM-DD')) {
                    if (element.achieve) {
                        setAchieve(element)
                    } else {
                        setAchieve(element)
                    }
                }
            });
        }
    }, [date, achieves])

    const AchieveButtonClick = async () => {
        const contents = new AchievementModel()
        contents.taskId = task.taskId
        contents.achievementId = achieve.achievementId
        contents.date = dayjs(String(date)).format('YYYY-MM-DD')
        contents.achieve = !achieve.achieve

        setAchieve(contents)

        if (!achieve.achievementId) {
            InsertAchieve(contents)
        } else {
            UpdateAchieve(contents)
        }
    }

    const InsertAchieve = async (contents) => {
        const res = await useInsertAchieve(contents)
        if (res.ok) {
            getAchieves()
        }
    }

    const UpdateAchieve = async (contents) => {
        const res = await useUpdateAchieve(contents)
        if (res.ok) {
            getAchieves()
        }
    }

    return (
        <>
            {achieves == undefined ?
                <Skeleton variant="rounded" height={48} />
                :
                <Card elevation={0} sx={{ minWidth: 250, backgroundColor: task.doday[new Date(String(date)).getDay()] && "#f58f4a15" }} >
                    <Box sx={{ position: "relative" }}>
                        <IconButton
                            onClick={AchieveButtonClick}
                            sx={{
                                right: "10px", top: "15px",
                                position: "absolute",
                                zIndex: 1000, width: "40px", height: "40px", m: "auto"
                            }}>
                            <DoneIcon
                                sx={{ backgroundColor: achieve.achieve && "#baf5ba", color: achieve.achieve && "#20603d" }}
                            />
                        </IconButton>
                        <CardActionArea onClick={() => ViewButtonClick()} >
                            <Box sx={{ p: 2 }}>
                                <Typography variant="h6" sx={{ fontSize: 14 }} component="div">
                                    {String(task.title)}
                                </Typography>
                                <Typography variant="h6" sx={{ fontSize: 11, color: "#777" }} component="div">
                                    {String(task.goal)}
                                </Typography>
                            </Box>
                        </CardActionArea>
                    </Box>
                </Card >
            }
        </>
    );
}

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
        expandIcon={<ExpandMoreIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    // backgroundColor:
    //     theme.palette.mode === 'dark'
    //         ? 'rgba(255, 255, 255, .05)'
    //         : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(180deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
        justifyContent: "space-between",
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    // padding: theme.spacing(2),
    padding: 0,
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

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
