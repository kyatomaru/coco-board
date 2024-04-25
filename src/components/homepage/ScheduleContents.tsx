import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import type { ProblemContentsType } from '@/types/problem/ProblemContents';
import { contentsCheckModel } from '@/types/problem/ProblemContents';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type PageProps = {
    problemContents: Array<ProblemContentsType | null>
}

export default function ScheduleContents() {
    const EditButtonClick = (index) => {

    }

    const DeleteButtonClick = () => {

    }

    return (
        <Box>
            <Box sx={{ p: 1 }}>
                <Typography sx={{ fontSize: 14 }} variant="h6" component="div">
                    今日
                </Typography>
                <Typography sx={{ fontSize: 13 }} variant="body1" component="div">
                    予定なし
                </Typography>
            </Box>

            <Box sx={{ p: 1 }}>
                <Typography sx={{ fontSize: 14 }} variant="h6" component="div">
                    明日
                </Typography>
                <Typography sx={{ fontSize: 13 }} variant="body1" component="div">
                    予定なし
                </Typography>
            </Box>
        </Box>
    )
}