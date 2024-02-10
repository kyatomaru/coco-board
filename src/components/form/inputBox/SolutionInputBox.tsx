import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import type { GameContentsType } from '@/types/GameContents';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

type PageProps = {
    mainTitle: String,
    subTitle: String,
    mainContents: any[],
    subContents: any[],
}

export default function SolutionInputBox({ mainTitle, subTitle, mainContents, subContents }: PageProps) {
    const ChangeProblem = (newValue, index) => {
        const problem = []
        problems.forEach((item) => {
            problem.push(item)
        })
        problem[index].problem = newValue
        setProblems(problem)
        contents.problems = problem
    }

    const AddProblem = () => {
        const problem = []
        problems.forEach((item) => {
            problem.push(item)
        })
        problem.push({ problem: undefined, solution: [undefined] })
        setProblems(problem)
        contents.problems = problem
    }

    const ChangeSolution = (newValue, index, index2) => {
        const problem = []
        problems.forEach((item) => {
            problem.push(item)
        })
        problem[index].solution[index2] = newValue
        setProblems(problem)
        contents.problems = problem
    }

    const AddSolution = (index) => {
        const problem = []
        problems.forEach((item) => {
            problem.push(item)
        })
        problem[index].solution.push(undefined)
        setProblems(problem)
        contents.problems = problem
    }

    return (
        <Box>
            <Stack spacing={2} direction="row">
                <InputLabel sx={{ mx: 1 }}>課題と解決策</InputLabel>
                <Button onClick={AddProblem}>追加</Button>
            </Stack>
            {
                problems.map((item, index1) => (
                    <Box sx={{ my: 3 }} key={index1}>
                        <InputLabel >課題{index1 + 1}</InputLabel>
                        <FormControl fullWidth sx={{ my: 1 }}>
                            <OutlinedInput
                                id="outlined-adornment-badPoint"
                                name="badPoint"
                                // label="good point"
                                value={item.problem}
                                onChange={newValue => ChangeProblem(newValue.target.value, index1)}
                            />
                        </FormControl>

                        <Box sx={{ my: 1 }}>
                            <Stack spacing={2} direction="row">
                                <InputLabel >課題{index1 + 1}の解決策</InputLabel>
                                <Button onClick={event => AddSolution(index1)}>追加</Button>
                            </Stack>
                            {problems[index1].solution.map((solution, index2) => (
                                <Box key={index2}>
                                    <FormControl fullWidth sx={{ mb: 1 }}>
                                        <OutlinedInput
                                            id="outlined-adornment-badPoint"
                                            name="badPoint"
                                            // label="good point"
                                            value={solution}
                                            onChange={newValue => ChangeSolution(newValue.target.value, index1, index2)}
                                        />
                                    </FormControl>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                ))
            }
        </Box >
    )
}