import * as React from 'react';
import Outlinedinput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import type { GameContentsType } from '@/types/game/GameContents';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

type PageProps = {
    title: string,
    contents: Array<String>,
    ChangeInput: Function,
    AddInput: any,
}

export default function AddInputBox({ title, contents, ChangeInput, AddInput }: PageProps) {

    return (
        <Box sx={{ mb: 1 }}>
            <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center">
                <InputLabel sx={{ mx: 1, fontSize: 14 }}>{title}</InputLabel>
                <Button sx={{ fontSize: 13 }} onClick={AddInput}>追加</Button>
            </Stack>
            {contents.map((input, index) => (
                <FormControl key={index} fullWidth sx={{ mb: 1 }}>
                    <Outlinedinput
                        id="outlined-adornment-input"
                        name={title}
                        // label="good point"
                        value={input}
                        onChange={newValue => ChangeInput(newValue.target.value, index)}
                        sx={{ fontSize: 14, backgroundColor: "background.paper" }}
                    />
                </FormControl>
            ))}
        </Box>
    )
}