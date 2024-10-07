"use client"

import * as React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import SaveIcon from '@mui/icons-material/Save';

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    width: 320,
    maxWidth: '100%',
    zIndex: 3000
};

type PageProps = {
    register: any
}

export default function TutorialEndModal({ register }: PageProps) {

    return (
        <Modal open={true} onClose={() => { }} sx={{ zIndex: 3000 }}>
            <Paper sx={modalStyle}>
                <Box sx={{ textAlign: "center", p: 3 }}>
                    <Typography variant="body1" sx={{ color: "black", fontSize: 14, pb: 1 }}>
                        以上でアニメーション作成が終わりました！
                    </Typography>
                    <Typography variant="body1" sx={{ color: "black", fontSize: 14, pb: 1 }}>
                        作成したアニメーションは{<SaveIcon sx={{ color: "#444 !important" }} />}ボタンから保存できます。
                    </Typography>
                </Box>
                <Divider />
                <Stack direction="row" justifyContent="space-between" sx={{ float: "right" }}>
                    <Button onClick={register}>
                        <Typography variant="button" sx={{ mx: "auto", fontWeight: "bold" }} >OK</Typography>
                    </Button>
                </Stack>
            </Paper>
        </Modal>
    )
}
