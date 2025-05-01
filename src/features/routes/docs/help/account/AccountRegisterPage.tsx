"use client"

import * as React from 'react';
import { 
    Container, 
    Box, 
    Typography,
    List,
    ListItem,
    Divider,
    Link
} from '@mui/material';
import Header from '../../Header';
import Footer from '../../Footer';

export default function AccountRegisterPage() {
    const registerSteps = [
        {
            title: "1. ブラウザを開く",
            description: "iPhoneの方はSafari、Androidの方はChromeを開きます。",
        },
        {
            title: "2. ログインページにアクセス",
            description: "coco-boardのログインページ（https://www.cocoboard.jp/accounts/login）にアクセスします。",
        },
        {
            title: "3. Googleアカウントでログイン",
            description: "「Googleでログイン」ボタンを押してGoogleアカウントでログインします。",
        }
    ];

    return (
        <Box sx={{ width: "100%", background: "white", position: "relative", minHeight: "100vh", pb: "64px" }}>
            <Header title="アカウント登録方法" />
            <Container 
                maxWidth="md" 
                sx={{ 
                    mt: "90px", 
                    pb: 8,
                }}
            >
                <Box sx={{ 
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    boxShadow: 1,
                    p: 3
                }}>
                    {/* 概要説明セクション */}
                    <Typography variant="h1" sx={{ fontSize: "1.5rem", fontWeight: 700, mb: 3 }}>
                        coco-boardアカウントについて
                    </Typography>
                    
                    <Typography sx={{ fontSize: "1rem", mb: 4, lineHeight: 1.8 }}>
                        coco-boardアカウントへの登録はGoogleアカウントで行います。
                        すでにGoogleアカウントをお持ちの方はcoco-boardアカウントを作成することができます。
                        まだGoogleアカウントをお持ちでない方はGoogleアカウントを作成する必要があります。
                    </Typography>

                    <Divider sx={{ my: 4 }} />

                    {/* 手順説明セクション */}
                    <Typography variant="h2" sx={{ fontSize: "1.5rem", fontWeight: 700, mb: 3 }}>
                        アカウント作成手順
                    </Typography>
                    
                    <List sx={{ width: '100%' }}>
                        {registerSteps.map((step, index) => (
                            <React.Fragment key={index}>
                                <ListItem 
                                    sx={{ 
                                        display: 'block',
                                        py: 2
                                    }}
                                >
                                    <Typography 
                                        sx={{ 
                                            fontSize: "1.1rem", 
                                            fontWeight: 600,
                                            mb: 1,
                                            color: 'primary.main'
                                        }}
                                    >
                                        {step.title}
                                    </Typography>
                                    <Typography sx={{ fontSize: "0.95rem", color: '#555' }}>
                                        {step.description}
                                    </Typography>
                                </ListItem>
                                {index < registerSteps.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </List>

                    <Box sx={{ mt: 4, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                        <Typography sx={{ fontSize: "0.9rem", color: '#666' }}>
                            ※ SafariもしくはChromeからアプリをご利用ください。
                        </Typography>
                    </Box>
                </Box>
            </Container>
            <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
                <Footer />
            </Box>
        </Box>
    );
} 