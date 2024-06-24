"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import type { ProblemContentsType } from '@/types/problem/ProblemContents';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { useDeleteProblem } from '@/hooks/problem/useDeleteProblem';
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
import DeleteConfirmModal from '@/features/common/contents/modal/ConfirmModal';
import ContentsMenuModal from '@/features/common/contents/modal/NoteMenuModal';
import { problemModalTitle } from '@/constants/modalMessage';
import { deleteProblemMs } from '@/constants/modalMessage';
import { skillsCategories } from '@/types/Category';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Button from '@mui/material/Button';

type PageProps = {
    problemContents: any,
    growthContents: any,
    getProblemContents: any,
    getGrowthContents: any,
}

const DataFormat = (date: String) => {
    return useDateFormat(date)
}

export default function ProblemCard({ problemContents, growthContents, getProblemContents, getGrowthContents }: PageProps) {
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
    const [menuModalOpen, setMenuModalOpen] = React.useState<boolean>(false)

    const [activeStep, setActiveStep] = React.useState(0);

    const clickLeftButton = () => {
        setActiveStep(activeStep - 1)
    }

    const clickRightButton = () => {
        setActiveStep(activeStep + 1)
    }

    const router = useRouter()

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

    const DeleteProblemContents = async () => {
        const res = await useDeleteProblem(problemContents.contentsId)
        if (res.ok) {
            getProblemContents()
            getGrowthContents()
            setDeleteModalOpen(false)
            setMenuModalOpen(false)
        }
    }

    return (
        <>
            <DeleteConfirmModal open={deleteModalOpen} setOpen={setDeleteModalOpen} title={problemModalTitle} message={deleteProblemMs} confirmText="削除" onSubmit={DeleteProblemContents} />
            <ContentsMenuModal open={menuModalOpen} setOpen={setMenuModalOpen} Delete={DeleteButtonClick} Edit={EditButtonClick} View={ViewButtonClick} />

            <Card sx={{ minWidth: 250, my: 1 }} >
                <Box sx={{ position: "relative" }}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography variant="h6" sx={{ fontSize: 14 }} component="div">
                                {String(problemContents.problem)}
                            </Typography>
                            <Chip label={String(skillsCategories[problemContents.categoryId].title)} size="small" sx={{ fontSize: 9, backgroundColor: skillsCategories[problemContents.categoryId].bgColor, color: skillsCategories[problemContents.categoryId].color, }} />
                        </AccordionSummary>

                        <AccordionDetails>
                            {growthContents != undefined ?
                                <Card sx={{
                                    pt: 1, px: 1,
                                    borderTop: '0.5px solid rgba(0, 0, 0, .125)',
                                    borderBottom: '0.5px solid rgba(0, 0, 0, .125)'
                                }}>
                                    {/* <MoreHorizButton menuHandleClick={GrowthMenuHandleClick} /> */}
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
                                :
                                <Card sx={{
                                    p: 1,
                                    borderTop: '0.5px solid rgba(0, 0, 0, .125)',
                                    borderBottom: '0.5px solid rgba(0, 0, 0, .125)'
                                }}>
                                    <Box sx={{ my: 1 }}>
                                        <Typography variant="body1" sx={{ fontSize: 14 }}>
                                            今日の振り返りがありません。
                                        </Typography>
                                    </Box>
                                </Card>
                            }
                        </AccordionDetails>
                    </Accordion>
                </Box >
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