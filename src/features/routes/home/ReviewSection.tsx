"use client"

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LoginBox from '@/features/routes/accounts/login/LoginBox';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import dayjs from 'dayjs';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import HeaderMenus from '@/components/HeaderMenus';
import { useState } from 'react';
import { useGetNewNext } from '@/hooks/note/next/useGetNewNext';
import Skeleton from '@mui/material/Skeleton';
import List from '@mui/material/List';
import Card from '@mui/material/Card';

const barStyle = {
    bgcolor: 'background.paper',
    color: "black",
    mx: "auto",
    position: 'fixed',
    zIndex: "1010",
    width: "100%",
    // height: { sx: 30, md: 50 },
    boxShadow: "none",
    borderBottom: "solid 1px rgb(219, 219, 219)",
    // display: { sm: "none", md: "block" },
    pl: { md: "120px", lg: "250px" },
    touchAction: "none"
}

export default function ReviewSection({ user }) {

    const [nextGoals, setNextGoals] = useGetNewNext(user)

    React.useEffect(() => {
        console.log(nextGoals)
    }, [nextGoals])

    return (
        <Card sx={{ px: 2, py: 3, bgcolor: "#f5f5f5", borderRadius: 2 }} elevation={0}>
            <Box>
                <Typography sx={{ fontSize: 12, mb: 1, fontWeight: "bold" }}>
                    次に向けての課題
                </Typography>
                {nextGoals &&
                    <List sx={{ px: 0, my: 1, py: 0 }}>
                        {nextGoals.length > 0 ?
                        nextGoals.map((nextGoal, index) => (
                            <Box key={index}>
                                <Typography variant="body2" sx={{ fontSize: 14, color: "black" }}>
                                    {nextGoal &&
                                        nextGoal.split('\\n').map((line, index) => (
                                            <Typography
                                                key={index}
                                                variant="body2"
                                                sx={{
                                                    fontSize: 14,
                                                    color: "black",
                                                    ml: index === 0 ? 0 : 2
                                                }}
                                            >
                                                {index === 0 && "・"}{line}
                                            </Typography>
                                        ))
                                    }
                                </Typography>
                            </Box>
                        ))
                        :
                        <Typography variant="body2" sx={{ px: 1, width: "100px", fontSize: 14, color: "black" }}>
                            なし
                        </Typography>
                    }
                </List>
            }
            </Box>
        </Card>
    );
}
