"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import type { PracticeContentsType } from '@/types/practice/PracticeContents';
import { useDeletePractice } from '@/hooks/practice/useDeletePractice';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Divider from '@mui/material/Divider';
import NotDataCaption from '../../NotDataCaption';
import DeleteModal from '../../DeleteModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ContentsMenu from '../../NoteContentsMenu';
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
import { useDateFormat } from '@/hooks/useDateFormat';
import { deleteNoteMs } from '@/const/modalMessage';

type PageProps = {
    contents: PracticeContentsType,
    DeleteContents: any
}

const DataFormat = (date: String) => {
    return useDateFormat(date)
}

export default function PracticeContents({ contents, DeleteContents }: PageProps) {
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(true)

    const [menuModalOpen, setMenuModalOpen] = React.useState<boolean>(false)

    const router = useRouter()

    const menuHandleClick = () => {
        setMenuModalOpen(true)
    }

    const ViewButtonClick = () => {
        router.replace(`/practice/${contents.contentsId}`)
    }

    const EditButtonClick = () => {
        router.replace(`/practice/edit/${contents.contentsId}`)
    }

    const DeleteButtonClick = () => {
        setMenuModalOpen(false)
        setDeleteModalOpen(true)
    }

    const DeletePracticeContents = async () => {
        const res = await useDeletePractice(contents.contentsId)
        if (res.ok) {
            DeleteContents(contents.contentsId)
            setDeleteModalOpen(false)
            setMenuModalOpen(false)
        }
    }

    return (
        <>
            <DeleteModal open={deleteModalOpen} setOpen={setDeleteModalOpen} title='練習の記録' message={deleteNoteMs} DeleteContents={DeletePracticeContents} />
            <ContentsMenu open={menuModalOpen} setOpen={setMenuModalOpen} Delete={DeleteButtonClick} Edit={EditButtonClick} View={ViewButtonClick} />

            <Card sx={{ minWidth: 275 }}>
                <Box sx={{ width: '100%', bgcolor: 'background.paper', position: "relative" }}>
                    {/* <DeleteModal open={open} setOpen={setOpen} DeleteContents={DeletePracticeContents} /> */}
                    <Box sx={{ position: "relative" }}>
                        <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={menuHandleClick}
                            sx={{
                                right: "10px", top: "7px",
                                position: "absolute",
                                zIndex: 1000, width: "35px", height: "35px", m: "auto"
                            }}
                        >
                            <MoreHorizIcon />
                        </IconButton>
                        <CardActionArea onClick={() => ViewButtonClick()} >
                            <Stack direction="row" sx={{ p: 1, mx: 1 }} >
                                <Box sx={{ width: "100%", alignItems: "center" }} >
                                    <Typography sx={{ fontSize: 17 }} variant="h6" component="div">
                                        {DataFormat(contents.date)}
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontSize: 16 }} component="div">
                                        {String(contents.title)}
                                    </Typography>
                                    <Chip label="練習" color="primary" size="small" sx={{ fontSize: 9 }} />
                                </Box>
                                {/* <IconButton
                                    aria-label="more"
                                    id="long-button"
                                    aria-controls={open ? 'long-menu' : undefined}
                                    aria-expanded={open ? 'true' : undefined}
                                    aria-haspopup="true"
                                    onClick={menuHandleClick}
                                    sx={{ minWidth: "20px", m: "0 auto auto" }}
                                >
                                    <MoreHorizIcon />
                                </IconButton> */}
                            </Stack>
                        </CardActionArea>
                    </Box>

                    <Divider />
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography>詳細</Typography>
                        </AccordionSummary>
                        <AccordionDetails>

                            {contents.place &&
                                <>
                                    <Divider />
                                    <Box sx={{ px: 2, my: 1 }}>
                                        <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                            場所
                                        </Typography>
                                        <Typography variant="body2" sx={{ px: 1 }}>
                                            {String(contents.place)}
                                        </Typography>
                                    </Box>
                                </>
                            }

                            {contents.weather &&
                                <>
                                    <Divider />
                                    <Box sx={{ px: 2, my: 1 }}>
                                        <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                            天気
                                        </Typography>
                                        <Typography variant="body2" sx={{ px: 1 }}>
                                            {String(contents.weather)}
                                        </Typography>
                                    </Box>
                                </>
                            }

                            {contents.details[0] != null &&
                                <>
                                    <Divider />
                                    <Box sx={{ px: 2, my: 1 }}>
                                        <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                            練習メニュー
                                        </Typography>

                                        {contents.details.map((detail, index) => (
                                            <Typography key={index} variant="body2" sx={{ px: 1, pb: 1 }}>
                                                {detail}
                                            </Typography>
                                        ))}
                                    </Box>
                                </>
                            }
                        </AccordionDetails>

                    </Accordion>
                </Box >
            </Card >
        </>
    )
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