"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import type { ProblemContentsType } from '@/types/problem/ProblemContents';
import { contentsCheckModel } from '@/types/problem/ProblemContents';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, ButtonBase } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ProblemContentsMenu from './ProblemContentsMenu';
import dayjs from 'dayjs';
import Rating from '@mui/material/Rating';
import DeleteModal from '../DeleteModal';
import { useDeleteProblem } from '@/hooks/problem/useDeleteProblem';
import { useDateFormat } from '@/hooks/useDateFormat';
// import { ProblemCategoryType } from '@/types/SolutionCategory';
import WatchIcon from '@mui/icons-material/WatchLater';
import { deleteProblemMs } from '@/const/modalMessage';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { ProblemGrowthType } from '@/types/problem/ProblemGrowth';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

type PageProps = {
    problemContents: ProblemContentsType,
    DeleteProblemContents: any,
    growthContents: ProblemGrowthType
}

const DataFormat = (date: String) => {
    return useDateFormat(date)
}

export default function ProblemproblemContents({ problemContents, DeleteProblemContents, growthContents }: PageProps) {
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
    const [menuModalOpen, setMenuModalOpen] = React.useState<boolean>(false)

    const router = useRouter()

    const menuHandleClick = () => {
        setMenuModalOpen(true)
    }

    const ViewButtonClick = () => {
        router.replace(`/problem/${problemContents.contentsId}`)
    }

    const EditButtonClick = () => {
        router.replace(`/problem/edit/${problemContents.contentsId}`)
    }

    const DeleteButtonClick = () => {
        setMenuModalOpen(false)
        setDeleteModalOpen(true)
    }

    const DeleteProblemproblemContents = async () => {
        const res = await useDeleteProblem(problemContents.contentsId)
        if (res.ok) {
            DeleteProblemContents(problemContents.contentsId)
            setDeleteModalOpen(false)
            setMenuModalOpen(false)
        }
    }

    // const ReturnGrowthOvercome = () => {
    //     for (let index = 0; index < growthContents.length; index++) {
    //         if (problemContents.contentsId == growthContents[index].problemId) {
    //             return growthContents[index].overcome
    //         }

    //     }
    // }

    // const ReturnGrowthComment = () => {
    //     for (let index = 0; index < growthContents.length; index++) {
    //         if (problemContents.contentsId == growthContents[index].problemId) {
    //             return growthContents[index].comment
    //         }
    //     }
    //     return ""
    // }

    // console.log(problemContents.solutionsCategory)

    return (
        <>
            <DeleteModal open={deleteModalOpen} setOpen={setDeleteModalOpen} title="課題" message={deleteProblemMs} DeleteContents={DeleteProblemproblemContents} />
            <ProblemContentsMenu open={menuModalOpen} setOpen={setMenuModalOpen} Delete={DeleteButtonClick} Edit={EditButtonClick} View={ViewButtonClick} />
            <Card sx={{ minWidth: 250, my: 1 }} >
                <Box sx={{ position: "relative" }}>
                    {/* <CardActionArea onClick={() => ViewButtonClick()}> */}
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"

                        >
                            <Typography variant="h6" sx={{ fontSize: 14 }} component="div">
                                {String(problemContents.problem)}
                            </Typography>
                            <Chip label={String(problemContents.category[problemContents.categoryId].title)} size="small" sx={{ fontSize: 9, backgroundColor: problemContents.category[problemContents.categoryId].bgColor, color: problemContents.category[problemContents.categoryId].color, }} />
                        </AccordionSummary>

                        <AccordionDetails>
                            {growthContents != undefined &&
                                <Card sx={{
                                    pt: 1, px: 1,
                                    borderTop: '0.5px solid rgba(0, 0, 0, .125)',
                                    borderBottom: '0.5px solid rgba(0, 0, 0, .125)'
                                }}>

                                    <Stack direction="row" alignItems="center">
                                        <span>{customIcons[Number(growthContents.overcome)].icon}</span>
                                        <Typography variant="h6" sx={{ px: 1, fontSize: 14 }}>
                                            {customIcons[Number(growthContents.overcome)].label}
                                        </Typography>

                                    </Stack>
                                    <Box sx={{ my: 1 }}>
                                        {growthContents != undefined &&
                                            <Typography variant="body1" sx={{ fontSize: 14 }}>
                                                {growthContents.comment}
                                            </Typography>
                                        }
                                    </Box>
                                </Card>
                            }
                        </AccordionDetails>

                    </Accordion>
                    {/* </CardActionArea> */}
                </Box>
            </Card >
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