"use client"

import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import type { TargetType } from '@/types/Target';
import type { SolutionType } from '@/types/Problem';


type PageProps = {
    problemProp: SolutionType
}

export default function ProblemForm({ problemProp }: PageProps) {
    const [problem, setProblem] = React.useState(problemProp.problem);
    const [solution, setSolution] = React.useState(problemProp.solution);

    const SetForm = () => {
        for (let i = 0; i < solution.length; i++) {
            return <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-solution">Solution</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-solution"
                    name="solution"
                    label="solution"
                    defaultValue={solution}
                />
            </FormControl>
        }
    }

    return (
        <div>
            <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-problem">Problem</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-problem"
                    name="problem"
                    label="problem"
                    defaultValue={problem}
                />
            </FormControl>
            {SetForm()}
        </div>
    );
}