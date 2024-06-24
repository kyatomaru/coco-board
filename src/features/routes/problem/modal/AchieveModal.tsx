import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/navigation'

type PageProps = {
    open: boolean,
    setOpen: Function,
    title: string,
    AchieveContents: Function
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    width: 320,
    maxWidth: '100%'
};

export default function AchieveModal({ open, setOpen, title, AchieveContents }: PageProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const router = useRouter()
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const AchieveButtonClick = () => {
        AchieveContents()
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
            <Paper sx={style} >
                <Box sx={{ textAlign: "center", p: 3 }}>
                    <Typography variant="h4" sx={{ fontSize: 15, mb: 1 }}>
                        {title}にしますか？
                    </Typography>
                </Box>
                <Divider />
                <MenuList sx={{ textAlign: "center" }}>
                    <MenuItem sx={{ py: 1 }} onClick={AchieveButtonClick} >
                        <Typography variant="button" color="primary" sx={{ mx: "auto", fontWeight: "bold" }} >{title}</Typography>
                    </MenuItem>
                    <MenuItem sx={{ py: 1 }} onClick={CancelButtonClick}>
                        <Typography variant="button" sx={{ mx: "auto" }}>キャンセル</Typography>
                    </MenuItem>
                </MenuList>
            </Paper>
        </Modal>
    )
}