import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';

const ITEM_HEIGHT = 48;


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

type PageProps = {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    Delete: React.MouseEventHandler<HTMLLIElement>,
    Edit: React.MouseEventHandler<HTMLLIElement>,
    View: React.MouseEventHandler<HTMLLIElement>
}

export default function ContentsMenu({ open, setOpen, View, Edit, Delete }: PageProps) {

    const handleClose = () => {
        setOpen(false)
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Paper sx={style}>
                <MenuList sx={{ textAlign: "center" }}>
                    <MenuItem sx={{ py: 1 }} onClick={Delete} >
                        <Typography variant="button" sx={{ mx: "auto", color: "red", fontWeight: "bold" }} >削除</Typography>
                    </MenuItem>
                    <MenuItem sx={{ py: 1 }} onClick={Edit}>
                        <Typography variant="button" sx={{ mx: "auto" }}>編集</Typography>
                    </MenuItem>
                    <MenuItem sx={{ py: 1 }} onClick={View}>
                        <Typography variant="button" sx={{ mx: "auto" }}>閲覧ページへ移動</Typography>
                    </MenuItem>
                    <MenuItem sx={{ py: 1 }} onClick={handleClose}>
                        <Typography variant="button" sx={{ mx: "auto" }}>キャンセル</Typography>
                    </MenuItem>
                </MenuList>
            </Paper>
        </Modal  >
    );
}