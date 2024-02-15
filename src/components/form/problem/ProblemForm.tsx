import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import AddInputBox from '../inputBox/AddInputBox';
import { ProblemContentsType } from '@/types/ProblemContents';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

type PageProps = {
    contents: ProblemContentsType,
    titleError: boolean
}

export default function ProblemForm({ contents, titleError }: PageProps) {
    const [problem, setProblem] = React.useState(contents.problem);
    const [solution, setSolution] = React.useState(contents.solutions);

    const ChangeSolutions = (newValue, index) => {
        const input = []
        solution.forEach((item) => {
            input.push(item)
        })
        input[index] = newValue
        setSolution(input)
        contents.solutions = input
    }

    const AddSolutions = () => {
        const input = []
        solution.forEach((item) => {
            input.push(item)
        })
        input.push([undefined])
        setSolution(input)
        contents.solutions = input
    }

    return (
        <Box >
            <Box sx={{ mb: 3 }}>
                <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                    <InputLabel sx={{ fontSize: 14 }} error={titleError} htmlFor="outlined-adornment-problem">課題</InputLabel>
                    <OutlinedInput
                        required
                        id="outlined-adornment-problem"
                        name="problem"
                        aria-describedby="outlined-title-helper-text"
                        label="課題"
                        value={problem}
                        onChange={newValue => {
                            setProblem(newValue.target.value)
                            contents.problem = newValue.target.value
                        }}
                        sx={{ fontSize: 14 }}
                    />
                    {!!titleError && (
                        <FormHelperText error id="accountId-error">
                            {"入力してください。"}
                        </FormHelperText>
                    )}

                </FormControl>
            </Box>
            <Box >
                <AddInputBox title="課題解決のために取り組むこと" contents={contents.solutions} ChangeInput={ChangeSolutions} AddInput={AddSolutions} />
            </Box>
        </Box>
    )
}