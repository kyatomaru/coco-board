import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';

type PageProps = {
    open: boolean,
    setOpen: Function,
    AddPlayer: Function
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    width: 320,
    maxWidth: '100%'
};

export default function AddPlayerModal({ open, setOpen, AddPlayer }: PageProps) {
    const handleClose = () => setOpen(false);

    const AddButtonClick = (team) => {
        AddPlayer(team)
    }

    const CancelButtonClick = () => {
        setOpen(false);
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Paper sx={style}>
                <Box sx={{ textAlign: "center", p: 2 }}>
                    <Typography variant="h4" sx={{ fontSize: 15 }}>
                        プレイヤーの追加
                    </Typography>
                </Box>
                <Divider />
                <MenuList sx={{ textAlign: "center" }}>
                    <MenuItem sx={{ py: 1 }} onClick={() => { AddButtonClick(0) }} >
                        <Typography variant="button" sx={{ mx: "auto", fontWeight: "bold" }} >ホーム</Typography>
                    </MenuItem>

                    <MenuItem sx={{ py: 1 }} onClick={() => { AddButtonClick(1) }} >
                        <Typography variant="button" sx={{ mx: "auto", fontWeight: "bold" }} >アウェイ</Typography>
                    </MenuItem>

                    <MenuItem sx={{ py: 1 }} onClick={CancelButtonClick}>
                        <Typography variant="button" sx={{ mx: "auto" }}>キャンセル</Typography>
                    </MenuItem>
                </MenuList>
            </Paper>
        </Modal>
    )
}