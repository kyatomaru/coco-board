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
import type { ProblemContentsType } from '@/types/ProblemContents';
import { contentsCheckModel } from '@/types/ProblemContents';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';

type PageProps = {
    contents: ProblemContentsType,
    DeleteContents: any
}

export default function ProblemContents({ contents, DeleteContents }: PageProps) {
    const EditButtonClick = (index) => {

    }

    const DeleteButtonClick = () => {

    }

    return (
        <>
            <Stack direction="row" sx={{ p: 1, mx: 1 }} >
                <Box sx={{ width: "100%", alignItems: "center" }} >
                    <Typography variant="h6" sx={{ fontSize: 16 }} component="div">
                        {String(contents.problem)}
                    </Typography>
                </Box>
                <IconButton sx={{ minWidth: "20px", m: "auto" }} onClick={EditButtonClick}><EditIcon /></IconButton>
                <IconButton sx={{ minWidth: "20px", m: "auto" }} onClick={DeleteButtonClick}><DeleteIcon /></IconButton>
            </Stack>

            <Divider />
            {contents.solutions[0] != null &&
                <>
                    <Divider />
                    <Box sx={{ px: 2, my: 1 }}>
                        <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                            悪かったところ
                        </Typography>

                        {contents.solutions.map((solution, index) => (
                            <Typography key={index} variant="body2" sx={{ px: 1, pb: 1 }}>
                                {solution}
                            </Typography>
                        ))}
                    </Box>
                </>
            }
        </>
    );
}