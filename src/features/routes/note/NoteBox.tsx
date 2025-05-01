"use client"

import * as React from 'react';
import type { User } from 'firebase/auth';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation'
import { useGetNote } from '@/hooks/note/useGetDateNote';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import GameNote from '@/features/routes/note/GameNote';
import PracticeNote from '@/features/routes/note/PracticeNote';
import BoardCard from '@/features/common/contents/card/BoardCard';
import Modal from '@mui/material/Modal';
import CreateNoteFormBox from '@/features/routes/note/CreateNoteFormBox';
import LinearProgress from '@mui/material/LinearProgress';
import { BoardType } from '@/types/board/Board';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddIcon from '@mui/icons-material/Add';
import GameForm from '../../common/forms/game/GameForm';
import { mainColor } from '@/constants/Color';
import InviteSubscribe from './InviteSubscribe';

type PageProps = {
    user: User,
    contents: any,
    setContents: any,
    boards: BoardType[],
    date: any,
    isLimited: boolean,
    isSubscriptionValid: boolean
}

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    minWidth: 320,
    width: "400px",
    maxWidth: '100%',
    zIndex: 2200,
    outline: "none",
};

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && (
                <Box>{children}</Box>
            )}
        </div>
    );
}

export default function NoteCardBox({ user, contents, setContents, boards, date, isLimited, isSubscriptionValid }: PageProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState(false);
    const [tabValue, setTabValue] = React.useState(0);
    const [noteCreateMenu, setNoteCreateMenu] = React.useState(0)

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    React.useEffect(() => {
        setTabValue(() => {
            if (!contents || !contents[0]) return 0;
            return 1;
        });
        setNoteCreateMenu(() => {
            if (!contents || !contents[0]) return 0;
            return -1;
        });
    }, [date]);

    return (
        <Box sx={{ background: "white", overflowY: "scroll", overflowX: "hidden", position: "fixed", zIndex: 1000, width: "100%", maxWidth: "550px", height: "100%", left: { xs: "50%", md: "unset"}, ml: { xs: "0px", md: "120px", lg: "55px" }, transform: { xs: "translateX(-50%)", md: "translateX(0)" } }}>
            <Box sx={{ 
                borderBottom: 1, 
                borderColor: 'divider', 
                position: "sticky", 
                top: 0, 
                zIndex: 1000, 
                background: "white",
                left: 0,
                right: 0,
                backdropFilter: 'blur(8px)',
                backgroundColor: 'rgba(255, 255, 255, 0.9)'
            }}>
                <Tabs 
                    value={tabValue} 
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        my:1,
                        minHeight: 36,
                        '& .MuiTab-root': {
                            minHeight: 36,
                            fontSize: 13,
                            minWidth: 100,
                            maxWidth: 150,
                            textAlign: 'left',
                            alignItems: 'center',
                            borderRadius: 20,
                            border: '2px solid #aaa',
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                            mr: 1,
                            '&.Mui-selected': {
                                border: '2px solid #444',
                                fontWeight: "semibold"
                            }
                        },
                        '& .MuiTabs-flexContainer': {
                            mx: 2,
                        },
                        '& button': {
                            height: "40px",
                            justifyContent: 'flex-start',
                            textTransform: 'none',
                            px: "10px !important",
                            fontSize: "11px !important",
                        },
                        '& span': {
                            overflow: 'hidden',
                            display: 'block',
                        },
                        '.MuiTabs-scrollButtons': {
                            width: 20,
                            '&.Mui-disabled': {
                                opacity: 0.3
                            }
                        },
                        '& .MuiTabs-indicator': {
                            display: 'none'
                        }
                    }}
                >
                    <Tab 
                        icon={<AddIcon sx={{ fontSize: 18, mb: 0.2, mr: "4px !important", color: mainColor }} />}
                        iconPosition="start"
                        label="新規作成"
                        onClick={() => setNoteCreateMenu(0)}
                        sx={{ fontSize: 13, color: mainColor }}
                    />
                    {contents.map((value, index) => (
                        <Tab 
                            key={index}
                            label={value.title || "無題のノート"}
                            sx={{ fontSize: 13, backgroundColor: contents[index].collection == "game" ? "orange !important" : "#1976d2 !important", color: "#fff !important" }}
                            onClick={() => setNoteCreateMenu(-1)}
                        />
                    ))}
                </Tabs>
            </Box>

            {(false && isLimited && !isSubscriptionValid) ?
                <CustomTabPanel value={tabValue} index={0}>
                    <InviteSubscribe /> 
                </CustomTabPanel>
                :
                <CustomTabPanel value={tabValue} index={0}>
                    <CreateNoteFormBox allContents={contents} setContents={setContents} boards={boards} isLoading={isLoading} setIsLoading={setIsLoading} menu={noteCreateMenu} setMenu={setNoteCreateMenu} date={date} setTabValue={setTabValue} />
                </CustomTabPanel>
            }

            {contents.map((value, index) => (
                <CustomTabPanel key={index} value={tabValue} index={index + 1}>
                    {value.collection == "game" &&
                        <GameNote user={user} allContents={contents} content={value} setContents={setContents} boards={boards} setTabValue={setTabValue} />
                    }
                    {value.collection == "practice" &&
                        <PracticeNote user={user} allContents={contents} content={value} setContents={setContents} boards={boards} setTabValue={setTabValue} />
                    }
                </CustomTabPanel>
            ))}
        </Box>
    )
}