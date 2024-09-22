"use client"

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Container, Box, Typography, Button, Divider, CardMedia, Stack, IconButton } from '@mui/material';
import InfoFooter from '@/components/InfoFooter';
import { mainColor } from '@/constants/Color';
import RepeatIcon from '@mui/icons-material/Repeat';

const mainImageStyle = {
    top: 0,
    left: 0,
    backgroundColor: "#999",
    minHeight: "100vh",
    position: "fixed",
    transform: "translateZ(0)",
    width: "100%",
    zIndex: -1,
    backgroundImage: "url(/images/welcomePage/mainImage.jpg)",
    backgroundSize: "cover",
}

export default function WelcomePage() {
    const router = useRouter()

    return (
        <Box sx={{ position: "absolute", left: 0, top: 0, width: "100%", zIndex: 0 }}>
            <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{
                    color: "aliceblue", padding: "0 25px", fontWeight: "bold", position: "sticky",
                    top: "10px", left: "-7px",
                }}>
                <IconButton sx={{ p: "0" }}>
                    <Box sx={{ width: 45, height: 45, backgroundImage: "url(/images/icon.png)", backgroundSize: "cover" }} />
                </IconButton>
                <Typography sx={{
                    fontSize: { xs: 25, md: 30 },
                    fontWeight: "bold"
                }}>
                    coco-board
                </Typography>
            </Stack>

            <Box sx={mainImageStyle} />
            <Box sx={{ height: { xs: 460, md: 500, lg: 540 }, ml: { md: 10, lg: 30 } }}>
                <Box sx={{ p: "0 20px", textAlign: { xs: "center", md: "unset" } }}>
                    <Box sx={{ pt: { xs: "200px", md: "150px" }, }}>
                        <Typography variant="h1" sx={{
                            color: "aliceblue", fontSize: { xs: 33, md: 45, lg: 54 },
                            mb: 1
                        }}>サッカーノートアプリ</Typography>
                        <Typography variant="h2" sx={{
                            color: "aliceblue", fontSize: { xs: 20, md: 27, lg: 36 },
                            mb: 1
                        }}>戦術・試合・練習をスマホで記録</Typography>
                    </Box>
                    <Box>
                        <Button onClick={() => router.push('/home')} size="large" variant="contained"
                            sx={{ textTransform: "none", mt: 2, borderRadius: 3, backgroundColor: "#1976d2 !important" }}>
                            coco-boardを使ってみる
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ zIndex: 1200, background: "white", width: "100%", mt: 5 }} >
                <Box sx={{ textAlign: "center", py: 10, maxWidth: 450, margin: "auto" }}>
                    <Typography sx={{ fontSize: 25, mb: 3, px: 3, fontWeight: 600, color: mainColor }}>coco-boardとは？</Typography>
                    <Typography sx={{ px: 3 }}>
                        coco-boardはサッカー選手が練習や試合の内容をスマホひとつで記録できるWebアプリケーションです。
                        サッカー選手なら一度は紙のノートで練習や試合の記録を取ったことがあると思います。
                        このアプリを使えば、紙のノートではできなかった記録の共有ができたり、いつでもどこでもサッカーについて記録することができます。
                    </Typography>
                </Box>

                <Box sx={{ textAlign: "center", py: 7, margin: "auto" }}>
                    <Typography sx={{ fontSize: 25, px: 3 }}>coco-boardの機能</Typography>

                    <Box sx={{ textAlign: "center", py: 10, maxWidth: 450, margin: "auto" }}>
                        <Typography sx={{ fontSize: 25, mb: 3, mx: 3, fontWeight: 600, color: mainColor }}>戦術ボードでアニメーション作成</Typography>
                        <Typography sx={{ px: 3 }}>
                            誰でも簡単にアニメーションを作成することができます。
                            戦術やフォーメーションを記録する際には最適です。
                        </Typography>
                        <Box sx={{ mx: 3, maxWidth: 400 }}>
                            <CardMedia
                                component='video'
                                autoPlay
                                playsInline
                                muted
                                loop
                                image="/images/welcomePage/tacticsImage.mp4"
                                sx={{ margin: "auto", mt: 3 }}
                            />
                        </Box>
                    </Box>

                    <Box sx={{ width: "100%", backgroundColor: "#f2f2f2" }}>
                        <Box sx={{ textAlign: "center", py: 10, maxWidth: 450, margin: "auto" }}>
                            <Typography sx={{ fontSize: 25, mb: 3, mx: 3, fontWeight: 600, color: mainColor }}>フォーマットに沿って試合・練習の内容を記録</Typography>
                            <Typography sx={{ px: 2 }}>
                                coco-boardには試合と練習を記録するためのフォーマットが用意されています。
                                フォーマットに沿って入力することで短時間で試合と練習について記録できます。
                            </Typography>
                            <Stack direction="row" spacing={1} sx={{ mx: 1, mt: 3 }}>
                                <Box sx={{ maxWidth: 210, mx: "auto" }}>
                                    <CardMedia
                                        component='img'
                                        image="/images/welcomePage/note1.jpg"
                                        sx={{}}
                                    />
                                    <Typography sx={{ fontSize: 13, mt: 1 }}>入力ページ</Typography>
                                </Box>
                                <Box sx={{ maxWidth: 210, mx: "auto" }}>
                                    <CardMedia
                                        component='img'
                                        image="/images/welcomePage/note2.jpg"
                                        sx={{}}
                                    />
                                    <Typography sx={{ fontSize: 13, mt: 1 }}>閲覧ページ</Typography>
                                </Box>
                            </Stack>
                        </Box>
                    </Box>
                    <Box sx={{ textAlign: "center", py: 10, maxWidth: 450, margin: "auto" }}>
                        <Typography sx={{ fontSize: 25, mb: 3, mx: 3, fontWeight: 600, color: mainColor }}>LINEで記録を共有</Typography>
                        <Typography sx={{ px: 2 }}>
                            coco-boardで取った記録はLINEで共有できます。チームメイトやコーチ、家族とノートを共有することで成長に繋がります。
                        </Typography>
                        <Stack direction="row" spacing={1} sx={{ mx: 4, mt: 3, maxWidth: 360 }}>
                            <Box sx={{ maxWidth: 180, width: "100%", mx: "auto" }}>
                                <CardMedia
                                    component='img'
                                    image="/images/icon.png"
                                    sx={{}}
                                />
                            </Box>
                            <Stack justifyContent="center" alignContent="center" sx={{ width: "100%" }}>
                                <RepeatIcon sx={{ width: "70%", height: "70%", m: "auto", color: "#555" }} />
                            </Stack>
                            <Box sx={{ maxWidth: 180, width: "100%", mx: "auto" }}>
                                <CardMedia
                                    component='img'
                                    image="/images/welcomePage/LINE-icon.png"
                                    sx={{}}
                                />
                            </Box>
                        </Stack>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ height: { xs: 450, md: 500 } }}>
                <Box sx={{ p: "0 20px", textAlign: "center" }}>
                    <Box sx={{ pt: "150px", }}>
                        <Typography variant="h1" sx={{
                            color: "aliceblue", fontSize: { xs: 33, md: 45 },
                            mb: 1
                        }}>coco-boardでサッカーを振り返ろう</Typography>
                    </Box>
                    <Box>
                        <Button onClick={() => router.push('/home')} size="large" variant="contained"
                            sx={{ textTransform: "none", mt: 2, borderRadius: 3, backgroundColor: "#1976d2 !important" }}>
                            coco-boardを使ってみる
                        </Button>
                    </Box>
                </Box>
            </Box>
            <InfoFooter />
        </Box >
    );
}