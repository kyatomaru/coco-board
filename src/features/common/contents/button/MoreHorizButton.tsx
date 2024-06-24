"use client"

import * as React from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';

type PageProps = {
    menuHandleClick: any
}

export default function MoreHorizButton({ menuHandleClick }: PageProps) {

    return (
        <IconButton
            aria-label="more"
            id="long-button"
            aria-haspopup="true"
            onClick={menuHandleClick}
            sx={{
                right: "10px", top: "7px",
                position: "absolute",
                zIndex: 1000, width: "35px", height: "35px", m: "auto"
            }}
        >
            <MoreHorizIcon />
        </IconButton>
    )
}