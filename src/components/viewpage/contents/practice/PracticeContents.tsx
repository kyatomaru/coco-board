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
import Chip from '@mui/material/Chip';
import MuiListItemText, { ListItemTextProps } from '@mui/material/ListItemText';
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
import { useDateFormat } from '@/hooks/useDateFormat';
import Grid from '@mui/material/Grid';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

type PageProps = {
    contents: PracticeContentsType,
    DeleteContents: any
}

const DataFormat = (date: String) => {
    return useDateFormat(date)
}

export default function PracticeContents({ contents, DeleteContents }: PageProps) {
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
    const router = useRouter()

    const [contentsModalOpen, setContentsModalOpen] = React.useState<boolean>(false)

    const menuHandleClick = () => {
        setContentsModalOpen(true)
    }

    const ViewButtonClick = () => {
        router.replace(`/practice/${contents.contentsId}`)
    }

    const EditButtonClick = () => {
        router.replace(`/practice/edit/${contents.contentsId}`)
    }

    const DeleteButtonClick = () => {
        setDeleteModalOpen(true)
    }

    const DeletePracticeContents = () => {
        useDeletePractice(contents.contentsId)
        DeleteContents(contents.contentsId)
        setDeleteModalOpen(false)
    }

    return (
        <Box>
            <Box sx={{ position: 'sticky', top: 0, left: 0, right: 0, backgroundColor: "white", zIndex: 100 }} >
                <Grid sx={{ px: 1, height: "45px" }} container direction="row" alignItems="center" justifyContent="space-between">
                    <Grid >
                        <IconButton onClick={(event) => router.push(`/calendar/${dayjs(String(contents.date)).format('YYYY-MM-DD')}`)} ><ArrowBackIosNewIcon /></IconButton>
                    </Grid>
                    <Grid>
                        <Typography variant="h6" sx={{ fontSize: 16 }} component="div">
                            記録
                        </Typography>
                    </Grid>
                    <Grid >
                        <Stack direction="row" spacing={1}>
                            <IconButton onClick={EditButtonClick} ><EditIcon /></IconButton>
                            <IconButton onClick={DeleteButtonClick} ><DeleteIcon /></IconButton>
                        </Stack>
                        {/* <NextButton size="small" sx={{ backgroundColor: "#1976d2 !important" }} variant='filled' type='submit'>記録する</NextButton> */}
                    </Grid>
                </Grid>
                <Divider />
            </Box>

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
            </Stack>

            <Divider />

            <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} justifyContent="space-between" alignItems="center">
                <Box sx={{ px: 2, py: 1, width: "100%" }}>
                    <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                        場所
                    </Typography>
                    {contents.place &&
                        <Typography variant="body2" sx={{}}>
                            {String(contents.place)}
                        </Typography>
                    }
                </Box>
                <Box sx={{ px: 2, py: 1, width: "100%" }}>
                    <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                        天気
                    </Typography>
                    {contents.weather &&
                        <Typography variant="body2" sx={{}}>
                            {String(contents.weather)}
                        </Typography>
                    }
                </Box>
            </Stack>

            <Divider />

            <Box sx={{ px: 2, my: 1 }}>
                <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                    練習メニュー
                </Typography>
                {contents.details[0] != null ?
                    <List sx={{ px: 0, my: 1, py: 0 }}>
                        {contents.details.map((detail, index) => (
                            <Box key={index}>
                                {
                                    detail.context != "" &&
                                    <ListText primary={detail.context} secondary={contents.detailsCategory[Number(detail.type)].title} />
                                }
                            </Box>
                        ))
                        }
                    </List >
                    :
                    <Typography variant="body2" sx={{ px: 1, width: "100px", fontSize: 14 }}>
                        なし
                    </Typography>
                }
            </Box>
        </Box >
    )
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