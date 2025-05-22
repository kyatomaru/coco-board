"use client"

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Container, Box, Typography, Button, Divider, CardMedia, Stack, IconButton } from '@mui/material';
import InfoFooter from '@/components/InfoFooter';
import { mainColor } from '@/constants/Color';
import RepeatIcon from '@mui/icons-material/Repeat';
import Image from 'next/image';

const mainImageStyle = {
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#222",
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
        <Box sx={{ position: "absolute", left: 0, right: 0, top: 0, width: "100%", zIndex: 0, overflowX: "hidden" }}>
            <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{
                    color: "aliceblue", padding: "0 25px", fontWeight: "bold", position: "sticky",
                    top: "10px", left: "-7px", zIndex: 1300,
                }}>
                <IconButton sx={{ p: "0" }}>
                    <Box sx={{ width: 45, height: 45, backgroundImage: "url(/images/icon.png)", backgroundSize: "cover" }} />
                </IconButton>
                <Typography sx={{
                    fontSize: { xs: 25, md: 30 },
                    fontWeight: "bold"
                }}>
                    CocoBoard
                </Typography>
            </Stack>

            <Box sx={mainImageStyle} />
            <Box sx={{ backgroundColor: "rgba(0, 0, 0, 0.4)", position: "absolute", top: 0, right: 0, width: "100%", height: "100%" }} />
                <Box sx={{ height: { xs: 460, md: 500, lg: 540 }, ml: { md: 10, lg: 30 }, zIndex: 1300, position: "relative" }}>
                    <Box sx={{ pl: { xs: "20px", md: "30px" }, pr: { xs: "10px", md: "20px" }, textAlign: { xs: "center", md: "unset" } }}>
                        <Box sx={{ pt: { xs: "200px", md: "150px" }, }}>
                            <Box sx={{ mb: 2, display: "flex", flexDirection: { xs: "column", md: "row" } }}>
                                <Typography variant="h1" sx={{
                                    color: "aliceblue", fontSize: { xs: 26, md: 45, lg: 50 },
                                }}>サッカー戦術ボード</Typography>
                                <Typography variant="h1" sx={{
                                    color: "aliceblue", fontSize: { xs: 26, md: 45, lg: 54 },
                                }}>アプリ</Typography>
                            </Box>
                            <Typography variant="h2" sx={{
                                color: "aliceblue", fontSize: { xs: 14, md: 20, lg: 26 },
                                mb: 1
                            }}>CocoBoardは指導者やプレイヤー向けのシンプルな戦術ボードアプリです</Typography>
                        </Box>
                        <Box>
                            <Button onClick={() => window.open('https://cocoboard.jp/note', '_blank')} size="large" variant="contained"
                                sx={{ textTransform: "none", mt: 2, borderRadius: 3, backgroundColor: "#07c !important" }}>
                                今すぐ使ってみる
                            </Button>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ position: "relative", zIndex: 1200, background: "white", width: "100%", mt: 5, pl: { xs: "20px", md: "30px" }, pr: { xs: "10px", md: "20px" } }} >
                    <Box sx={{ textAlign: "center", py: 7, margin: "auto", display: "flex", flexDirection: { xs: "column", md: "row-reverse" }, alignItems: { xs: "center", md: "flex-start" }, justifyContent: "center", gap: { xs: 0, md: 4 }}}>
                        <Box sx={{ mt: { xs: 0, md: 20 }}}>
                            <Typography sx={{ fontSize: { xs: 20, md: 30 }, mb: 2, mx: 3, fontWeight: 500, color: mainColor }}>CocoBoard</Typography>
                            <Typography sx={{ px: 2, color: "#666", fontWeight: 600, fontSize: { xs: 14, md: 18 } }}>
                                スマホやPCから利用できる戦術ボードアプリを開発しました。
                            </Typography>
                            <Typography sx={{ px: 2, color: "#666", fontWeight: 600, fontSize: { xs: 14, md: 18 } }}>
                                ドラッグ&ドロップで簡単に操作できます
                            </Typography>
                        </Box>
                        <Box sx={{ position: "relative", mt: { xs: 2, md: 0 } }}>
                            <Box sx={{ position: "absolute", zIndex: 500, top: 0, left: -23, width: 300, height: 600, backgroundImage: "url(/images/welcomePage/smart-phone.png)", backgroundSize: "cover" }} />

                            <CardMedia
                                component='video'
                                autoPlay
                                playsInline
                                muted
                                loop
                                image="/videos/video1.mp4"
                                sx={{ margin: "auto", mt: 3, width: 255, position: "relative", zIndex: 1000, borderRadius: 10 }}
                            />
                        </Box>
                    </Box>

                    <Box sx={{  py: 7, px: { xs: 0, md: 3 }, maxWidth: 1000, margin: "auto"}}>
                        <Typography sx={{ fontSize: { xs: 20, md: 30 }, mb: 3, color: mainColor, textAlign: "center" }}>利用の流れ</Typography>
                        <Box sx={{ display: "flex", justifyContent: "flex-start", flexDirection: { xs: "column", md: "row" }, gap: { xs: "100px", md: 2 }}}>
                            <Box sx={{ width: { xs: "100%", md: 380}, textAlign: "center", mx: "auto", display: "flex", flexDirection: { xs: "column" }, alignItems: { xs: "center", md: "flex-start" }, justifyContent: "flex-start", gap: { xs: 0, md: 2 }}}>
                                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", mx: { xs: 2, md: "auto" }}}>
                                    <Typography sx={{ fontSize: { xs: 14, md: 20 }, mb: 2, fontWeight: 600, color: mainColor }}>STEP1. アニメーション作成</Typography>
                                    <Typography sx={{ color: "#666", fontWeight: 600, fontSize: { xs: 12, md: 14 }, textAlign: "left" }}>
                                        監督やキャプテンは共有したい戦術シーンのアニメーションを作成します
                                    </Typography>
                                </Box>
                                <Box sx={{ position: "relative", mt: { xs: 2, md: 0 }, mx: "auto" }}>
                                    <Box sx={{ position: "absolute", zIndex: 500, top: 0, left: -23, width: 300, height: 600, backgroundImage: "url(/images/welcomePage/smart-phone.png)", backgroundSize: "cover" }} />

                                    <CardMedia
                                        component='video'
                                        autoPlay
                                        playsInline
                                        muted
                                        loop
                                        image="/videos/video2.mp4"
                                        sx={{ margin: "auto", mt: 3, width: 255, position: "relative", zIndex: 1000, borderRadius: 10 }}
                                    />
                                </Box>
                            </Box>
                   

                            <Box sx={{ width: { xs: "unset", md: 380}, textAlign: "center", mx: "auto", display: "flex", flexDirection: { xs: "column" }, alignItems: { xs: "center", md: "flex-start" }, justifyContent: "flex-start", gap: { xs: 0, md: 2 }}}>
                                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", mx: { xs: 2, md: "auto" }}}>
                                    <Typography sx={{ fontSize: { xs: 14, md: 20 }, mb: 2, fontWeight: 600, color: mainColor }}>STEP2. LINEで共有</Typography>
                                    <Typography sx={{ color: "#666", fontWeight: 600, fontSize: { xs: 12, md: 14 }, textAlign: "left"  }}>
                                        作成したアニメーションをLINEで共有します
                                    </Typography>
                                    <Typography sx={{ color: "#666", fontWeight: 600, fontSize: { xs: 12, md: 14 }, textAlign: "left"  }}>
                                        試合の振り返りや戦術を選手と共有することができます
                                    </Typography>
                                </Box>
                                <Box sx={{ height: "550px", margin: "auto", position: "relative", px: 1, mt: 1  }}>
                                    <Box sx={{ position: "absolute", top: 0, left: 0, height: "550px", width: "100%", borderRadius: 10, border: "3px solid #ccc" }} />
                                    <CardMedia
                                        component='img'
                                        image="/images/welcomePage/share.png"
                                        sx={{ borderRadius: 10, posision: "absolute", height: "550px", margin: "auto", width: "330px" }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ height: { xs: 450, md: 500 }, zIndex: 1300, position: "relative" }}>
                    <Box sx={{ p: "0 20px", textAlign: "center" }}>
                        <Box sx={{ pt: "150px", }}>
                            <Typography variant="h1" sx={{
                                color: "aliceblue", fontSize: { xs: 28, md: 45 },
                                mb: 1
                            }}>CocoBoardで戦術を記録しよう</Typography>
                        </Box>
                        <Box>
                            <Button onClick={() => window.open('https://cocoboard.jp/note', '_blank')} size="large" variant="contained"
                                sx={{ textTransform: "none", mt: 2, borderRadius: 3, backgroundColor: "#07c !important" }}>
                                coco-boardを使ってみる
                            </Button>
                        </Box>
                    </Box>
                </Box>
                <InfoFooter />
        </Box >
    );
}