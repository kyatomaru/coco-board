"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import type { GameContentsType } from '@/types/game/GameContents';
import { useDeleteGame } from '@/hooks/game/useDeleteGame';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Rating from '@mui/material/Rating';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Divider from '@mui/material/Divider';
import NotDataCaption from '@/components/notepage/NotDataCaption';
import DeleteModal from '@/components/notepage/DeleteModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useGetAllGame } from '@/hooks/game/useGetGame';
import { useGetAllPractice } from '@/hooks/practice/useGetPractice';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CardActionArea from '@mui/material/CardActionArea';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ContentsMenu from '@/components/notepage/NoteContentsMenu';
import { ProblemContentsType } from '@/types/problem/ProblemContents';


type PageProps = {
    contents: ProblemContentsType,
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


export default function ProblemGrowthBox({ contents, DeleteContents }: PageProps) {
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(true)

    const [contentsModalOpen, setContentsModalOpen] = React.useState<boolean>(false)

    const menuHandleClick = () => {
        setContentsModalOpen(true)
    }


    const router = useRouter()

    const ViewButtonClick = () => {
        router.replace(`/problem/${contents.contentsId}`)
    }

    const EditButtonClick = () => {
        router.replace(`/problem/edit/${contents.contentsId}`)
    }

    const DeleteButtonClick = () => {
        setDeleteModalOpen(true)
    }

    const DeleteProblemContents = () => {
        useDeleteGame(contents.contentsId)
        DeleteContents(contents.contentsId)
        setDeleteModalOpen(false)
    }

    return (
        <>
            <DeleteModal open={deleteModalOpen} setOpen={setDeleteModalOpen} DeleteContents={DeleteProblemContents} />
            <ContentsMenu open={contentsModalOpen} setOpen={setContentsModalOpen} Delete={DeleteButtonClick} Edit={EditButtonClick} View={ViewButtonClick} />

            <Card sx={{ minWidth: 250 }} >
                <Box sx={{ position: "relative" }}>
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        // aria-controls={open ? 'long-menu' : undefined}
                        // aria-expanded={open ? 'true' : undefined}
                        // aria-haspopup="true"
                        onClick={menuHandleClick}
                        sx={{
                            right: "10px", top: "7px",
                            position: "absolute",
                            zIndex: 1000, width: "35px", height: "35px", m: "auto"
                        }}
                    >
                        <MoreHorizIcon />
                    </IconButton>
                    <Stack direction="row" sx={{ p: 1, mx: 1, alignItems: "center" }} >
                        <Box sx={{ width: "100%", alignItems: "center" }} >
                            <Typography variant="h6" sx={{ fontSize: 16 }} component="div">
                                {String(contents.problem)}
                            </Typography>

                            <Chip label={String(contents.category[contents.categoryId].title)} size="small" sx={{ fontSize: 9, backgroundColor: contents.category[contents.categoryId].bgColor, color: contents.category[contents.categoryId].color, }} />
                        </Box>
                    </Stack>

                    <Divider />
                    <Box sx={{ px: 2, my: 1 }}>
                        <Stack>
                            <Box >
                                <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                    克服度
                                </Typography>
                                <Rating size="large" name="half-rating" defaultValue={Number(contents.overcome)} precision={0.5} readOnly />
                            </Box>
                            <Box>
                                <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                    達成日
                                </Typography>
                                <Typography variant="h6" sx={{ fontSize: 16 }} component="div">
                                    {DataFormat(String(contents.createDate))}
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>

                    <Divider />
                    {contents.solutions[0] != null &&
                        <>
                            <Divider />
                            <Box sx={{ px: 2, my: 1 }}>
                                <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                    取り組むこと
                                </Typography>

                                {contents.solutions.map((solution, index) => (
                                    <Typography key={index} variant="body2" sx={{ px: 1, pb: 1 }}>
                                        {solution.context}
                                    </Typography>
                                ))}
                            </Box>
                        </>
                    }
                </Box>
            </Card >
        </>
    )
}

const DotsContentsStepper = () => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <MobileStepper
            variant="dots"
            steps={6}
            position="static"
            activeStep={activeStep}
            sx={{ maxWidth: 400, flexGrow: 1 }}
            nextButton={
                <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
                    Next
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
                    Back
                </Button>
            }
        />
    );
}

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
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    // padding: theme.spacing(2),
    padding: 0,
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));