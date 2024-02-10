"use client"

import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import type { TargetType } from '@/types/Target';
import type { ProblemType } from '@/types/Problem';
import ProblemForm from '@/components/form/problem/ProblemForm';

type PageProps = {
    targetProp: TargetType,
    problemProp: ProblemType
}

export default function TargetForm({ targetProp, problemProp }: PageProps) {
    const [target, setTarget] = React.useState(targetProp);
    const [problem, setProblem] = React.useState(problemProp);

    const SetForm = () => {
        for (let i = 0; i < problem.problemList.length; i++) {
            return <ProblemForm problemProp={problem.problemList[i]} />
        }
    }

    return (
        <div>
            <div>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-target">Target</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-target"
                        name="target"
                        aria-describedby="outlined-target-helper-text"
                        label="target"
                        defaultValue={target.target}
                    />
                </FormControl>
            </div>

            {SetForm()}
        </div>
    );
}