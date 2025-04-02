"use client"

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import IosShareIcon from '@mui/icons-material/IosShare';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const style = {
    position: 'absolute' as 'absolute',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    minWidth: 320,
    width: "400px",
    maxWidth: '100%',
    zIndex: 1000,
    outline: "none",
};

export default function HomePageGuideModal() {
    const [open, setOpen] = React.useState(false)
    const [isDetailPage, setIsDetailPage] = React.useState(false)

    React.useEffect(() => {
        // ローカルストレージをチェック
        const hideGuide = localStorage.getItem('hideHomePageGuide')
        if (!hideGuide) {
            setOpen(true)
        }
    }, [])

    const handleHideGuide = () => {
        // ローカルストレージに保存
        localStorage.setItem('hideHomePageGuide', 'true')
        setOpen(false)
    }

    return (
        <>
            {open && (
                !isDetailPage ? (
                    <Paper sx={{ backgroundColor: "black", color: "#2e7d32!important", bottom: "250px", ...style }}>
                        <Box>
                            <Box sx={{ textAlign: "center", p: 2 }}>
                                <Typography variant="body1" sx={{ fontSize: 15, py: 1, fontWeight: "bold" }}>
                                    スマートフォンでご利用の場合は<br />
                                    アプリをホームスクリーンに追加することができます。
                                </Typography>
                            </Box>
                            <Divider />
                            <Stack direction="row" justifyContent="space-between" sx={{ px: 2 }}>
                                <Button onClick={() => setIsDetailPage(true)}>
                                    <Typography variant="button" sx={{ fontWeight: "bold" }}>詳細</Typography>
                                </Button>
                            </Stack>
                        </Box>
                    </Paper>
                ) : (
                    <Modal open={open} onClose={() => setOpen(false)}>
                        <Paper sx={{ top: '50%', ...style }}>
                            <Box sx={{ textAlign: "center", p: 3 }}>
                                <Typography variant="body1" sx={{ color: "black", fontSize: 16, pb: 4 }}>
                                    スマートフォン / タブレットでご利用の方は
                                    <br />
                                    以下の方法でcoco-boardをホーム画面に追加できます！
                                </Typography>
                                <Typography variant="body1" sx={{ color: "black", fontSize: 14, pb: 1 }}>
                                    iOS:「{<IosShareIcon />}」から「ホーム画面に追加」
                                </Typography>
                                <Typography variant="body1" sx={{ color: "black", fontSize: 14, pb: 1 }}>
                                    Android:「{<MoreVertIcon />}」から「ホーム画面に追加」
                                </Typography>
                            </Box>
                            <Divider />
                            <Stack direction="row" justifyContent="space-between" sx={{ px: 2 }}>
                                <Button onClick={() => handleHideGuide()}>
                                    <Typography variant="button" sx={{ mx: "auto", fontWeight: "bold" }}>今後表示しない</Typography>
                                </Button>
                                <Button onClick={() => setIsDetailPage(false)}>
                                    <Typography variant="button" sx={{ mx: "auto", fontWeight: "bold" }}>閉じる</Typography>
                                </Button>
                            </Stack>
                        </Paper>
                    </Modal>
                )
            )}
        </>
    )
}
