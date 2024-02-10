import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import AddInputBox from '../inputBox/AddInputBox';
import { ProblemContentsType } from '@/types/ProblemContents';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

type PageProps = {
    contents: ProblemContentsType
}

export default function ProblemForm({ contents }: PageProps) {
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
        <Box>
            <InputLabel sx={{ m: 1 }}>課題</InputLabel>
            <Box sx={{ m: 1 }}>
                <FormControl fullWidth>
                    <OutlinedInput
                        id="outlined-adornment-problem"
                        name="problem"
                        value={problem}
                        onChange={newValue => {
                            setProblem(newValue.target.value)
                            contents.problem = newValue.target.value
                        }}
                    />
                </FormControl>
            </Box>
            <Box sx={{ my: 3 }}>
                <AddInputBox title="課題解決のために取り組むこと" contents={contents.solutions} ChangeInput={ChangeSolutions} AddInput={AddSolutions} />
            </Box>
        </Box>
    )
}