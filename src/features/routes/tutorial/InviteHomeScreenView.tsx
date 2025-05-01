"use client"

import * as React from "react";
import { Button, Card, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";
import IosShareIcon from '@mui/icons-material/IosShare';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { mainColor } from "@/constants/Color";

// BottomBarコンポーネントを追加
const BottomBar = ({ children }: { children: React.ReactNode }) => (
    <Box sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0,
        p: 2,
        backgroundColor: '#fff',
        borderTop: '1px solid #e0e0e0',
        textAlign: 'center',
        zIndex: 2400
    }}>
        {children}
    </Box>
);

type PageProps = {
    tutorialStep: number,
    setTutorialStep: (step: number) => void
}

export default function InviteHomeScreenView({tutorialStep, setTutorialStep}: PageProps) {

    return (
        <Box 
        sx={{
            position: "fixed", 
            height: "100vh", 
            width: "100%",
            zIndex: 2200, 
            display: "flex",
            flexDirection: "column", 
            backgroundColor: "#fff",
            top: 0,
            left: 0,
            right: 0,
            overflowY: "auto",
        }}>
            {/* TopBar */}
            <Box 
            sx={{ 
                position: 'sticky',
                top: 0,
                backgroundColor: '#fff',
                borderBottom: '1px solid #e0e0e0',
                zIndex: 2400,
                width: '100%',
            }}>
            </Box>

            <Box sx={{ 
                flex: 1, 
                p: 2,
                pb: 8,  // bottombarの分のマージンを追加
                display: 'flex', 
                flexDirection: 'column',
                maxWidth: 800,
                mx: 'auto',
                width: '100%',
                alignItems: 'center',
            }}>
                <Box sx={{  pt: 3, px: 2 }}>
                    <Typography variant="h5" sx={{ fontSize: 16, pb: 6, color: mainColor, fontWeight: "bold" }}>
                        スマートフォン / タブレットでご利用の方は
                        <br />
                        以下の方法でcoco-boardをホーム画面に追加できます！
                    </Typography>
                    <Card sx={{ p: 2, mb: 2 }} elevation={1}>
                        <Typography variant="body1" sx={{ color: "black", fontSize: 14 }}>
                            iOS：
                            <br />
                        1. {<IosShareIcon sx={{ fontSize: 20, mb: 0.5 }} />} を押す
                        <br />
                        2. 「ホーム画面に追加」を押す
                        </Typography>
                    </Card>

                    <Card sx={{ p: 2 }} elevation={1}>
                        <Typography variant="body1" sx={{ color: "black", fontSize: 14 }}>
                            Android：
                            <br />
                            1. {<MoreVertIcon sx={{ fontSize: 20, mb: 0.5 }} />} を押す
                            <br />
                            2. 「ホーム画面に追加」を押す
                        </Typography>
                    </Card>
                </Box>
                <BottomBar>
                    <Button
                        onClick={() => {setTutorialStep(tutorialStep + 1)}}
                        variant="contained"
                        sx={{
                            backgroundColor: '#2e7d32 !important',
                            color: 'white',
                            borderRadius: '8px',
                            padding: '12px 32px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            '&:hover': {
                                backgroundColor: '#1b5e20 !important'
                            },
                            '&.Mui-disabled': {
                                backgroundColor: 'rgba(46, 125, 50, 0.12) !important',
                                color: 'rgba(255, 255, 255, 0.3)'
                            }
                        }}
                    >
                        OK
                    </Button>
                </BottomBar>
            </Box>
        </Box>
    );
}
