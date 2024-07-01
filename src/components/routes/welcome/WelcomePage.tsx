"use client"

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Container, Box, Typography, Button, Divider, CardMedia, Stack, IconButton } from '@mui/material';
import InfoFooter from '@/components/InfoFooter';

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
            <Box sx={{ height: { xs: 460, md: 500, lg: 540 }, ml: { md: 0, lg: 30 } }}>
                <Box sx={{ p: "0 20px", textAlign: { xs: "center", md: "unset" } }}>
                    <Typography variant="h1" sx={{
                        color: "aliceblue", fontSize: { xs: 33, md: 45, lg: 54 },
                        pt: { xs: "250px", md: "200px" },
                        mb: 1
                    }}>サッカーの全てを簡単記録</Typography>
                    <Box>
                        <Button onClick={() => router.push('/home')} size="large" variant="contained"
                            sx={{ textTransform: "none", mt: 2, borderRadius: 3, backgroundColor: "#1976d2 !important" }}>
                            coco-boardを使ってみる
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ zIndex: 1200, background: "white", width: "100%", mt: 5 }} >
                <Box sx={{ textAlign: "center", py: 7, maxWidth: 450, margin: "auto" }}>
                    <Typography sx={{ fontSize: 25, mb: 3, px: 3 }}>戦術を記録しよう</Typography>
                    <Typography sx={{ px: 3 }}>
                        アニメーションを作成することで戦術を視覚的に記録できます。
                        誰でも簡単にアニメーションが作成できます。
                    </Typography>
                    <CardMedia
                        component='video'
                        autoPlay
                        muted
                        loop
                        image="/images/welcomePage/tacticsImage.mp4"
                        sx={{ width: { xs: 210, sm: 260 }, margin: "auto", mt: 3 }}
                    />
                </Box>

                <Divider />

                <Box sx={{ textAlign: "center", width: "100%", minHeight: 380, backgroundImage: "url(/images/welcomePage/commuteImage.png)", backgroundSize: "cover" }}>
                    <Box sx={{ textAlign: "center", py: 7, px: 3, maxWidth: 450, margin: "auto" }}>
                        <Typography sx={{ color: "white", fontSize: 25, mb: 3 }}>いつでもどこでも練習・試合の内容を記録しよう</Typography>
                        <Typography sx={{ color: "white" }}>
                            練習・試合の内容を3分で記録できます。ノートの持ち運びは不要です。帰り道、寝る前など、思い立った時にスマホひとつで記録が可能です。いつでもどこでもアプリを開いて効率良く振り返ることができます。
                        </Typography>
                    </Box>
                </Box>

                <Divider />

                <Box sx={{ textAlign: "center", py: 7, maxWidth: 450, margin: "auto" }}>
                    <Typography sx={{ fontSize: 25, mb: 3, px: 3 }}>課題を管理しよう</Typography>
                    <Typography sx={{ px: 3 }}>
                        課題の管理機能で現状の課題を把握することができます。
                    </Typography>
                    <CardMedia
                        image="/images/welcomePage/problempageImage.png"
                        sx={{ width: { xs: 230, sm: 350 }, height: { xs: 320, sm: 480 }, margin: "auto", mt: 3 }}
                    />
                </Box>
            </Box>
            <Box sx={{ height: 100 }} />
            <InfoFooter />
        </Box>
    );
}