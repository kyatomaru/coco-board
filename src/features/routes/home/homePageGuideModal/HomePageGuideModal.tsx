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


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    minWidth: 320,
    width: "400px",
    maxWidth: '100%',
    zIndex: 2000,
    outline: "none",
};

export default function WelcomeModal() {
    const [open, setOpen] = React.useState(false)
    const [isDetailPage, setIsDetailPage] = React.useState(false)

    return (
        <>
            {!isDetailPage ?
                <Modal open={open} onClose={() => { }} >
                    <Paper sx={style}>

                        <Box>
                            <Box sx={{ textAlign: "center", p: 2 }}>
                                <Typography variant="body1" sx={{ color: "black", fontSize: 15, py: 1 }}>
                                    スマートフォンでご利用の場合は
                                    アプリをホームスクリーンに追加することができます。
                                </Typography>
                            </Box>
                            <Divider />
                            <Stack direction="row" justifyContent="flex-end">
                                <Button onClick={() => setIsDetailPage(true)}>
                                    <Typography variant="button" sx={{ mx: "auto", fontWeight: "bold" }} >詳細</Typography>
                                </Button>
                            </Stack>
                        </Box>

                    </Paper>
                </Modal>
                :
                <Box>
                    <Box sx={{ textAlign: "center", p: 2 }}>
                        <Typography variant="body1" sx={{ color: "black", fontSize: 15, py: 1 }}>
                            スマートフォンでご利用の場合は
                            アプリをホームスクリーンに追加することができます。
                        </Typography>
                    </Box>
                    <Divider />
                    <Stack direction="row" justifyContent="flex-end">
                        <Button onClick={() => setIsDetailPage(true)}>
                            <Typography variant="button" sx={{ mx: "auto", fontWeight: "bold" }} >詳細</Typography>
                        </Button>
                    </Stack>
                </Box>
            }
        </>
    )
}
