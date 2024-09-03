"use client"

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import IosShareIcon from '@mui/icons-material/IosShare';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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
};

export default function InviteModal() {
    const [openMs, setOpenMs] = React.useState(true)
    const [openModal, setOpenModal] = React.useState(false)

    return (
        <>
            <Modal open={openModal} onClose={() => { }} >
                <Paper sx={style}>
                    <Box sx={{ textAlign: "center", p: 3 }}>
                        <Typography variant="body1" sx={{ color: "black", fontSize: 14, pb: 2 }}>
                            以下の方法でcoco-boardをホーム画面に追加できます。
                        </Typography>
                        <Typography variant="body1" sx={{ color: "black", fontSize: 14, pb: 1 }}>
                            iOS:「{<IosShareIcon />}」から「ホーム画面に追加」
                        </Typography>
                        <Typography variant="body1" sx={{ color: "black", fontSize: 14, pb: 1 }}>
                            Android:「{<MoreVertIcon />}」から「ホーム画面に追加」
                        </Typography>
                    </Box>
                    <Divider />
                    <MenuList sx={{ textAlign: "center" }}>
                        <MenuItem sx={{ py: 1 }} onClick={() => setOpenModal(false)} >
                            <Typography variant="button" sx={{ mx: "auto", color: "red", fontWeight: "bold" }} >OK</Typography>
                        </MenuItem>
                    </MenuList>
                </Paper>
            </Modal >
            {openMs &&
                <Box sx={{ display: { md: "none", xs: "flex" }, position: "absolute", bottom: "30px", width: "100%", justifyContent: "center" }}>
                    <Box sx={{ backgroundColor: "#333", display: "flex", p: 2, width: "400px", minWidth: "300px", alignItems: "center" }}>
                        <Box>
                            <Typography variant="body1" sx={{ color: "white", fontSize: 14 }}>
                                スマートフォン / タブレットでご利用の場合はこのページをホーム画面に追加してご利用ください。
                            </Typography>
                        </Box>
                        <Box>
                            <Button onClick={() => { setOpenModal(true); setOpenMs(false) }} sx={{ color: "orange !important", }}>
                                詳しく
                            </Button>
                        </Box>
                    </Box>
                </Box>
            }
        </>
    );
}