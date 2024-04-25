import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import AddInputBox from '../inputBox/AddInputBox';
import { ProblemContentsType } from '@/types/problem/ProblemContents';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ListItemText from '@mui/material/ListItemText'
import { ProblemGrowthType } from '@/types/problem/ProblemGrowth';
import { styled } from '@mui/material/styles';
import MuiRating, { RatingProps, IconContainerProps } from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

type PageProps = {
    setOpen: Function,
    contents: ProblemGrowthType,
    titleError: boolean
}

const shapeStyles = { width: 40, height: 40 };
const shapeCircleStyles = { borderRadius: '50%' };
const SelectCircle = (bgColor) => {
    return (
        <Box component="span" sx={{ backgroundColor: bgColor, ...shapeStyles, ...shapeCircleStyles }} />
    )
}

export default function GrowthForm({ contents, titleError }: PageProps) {
    const [overcome, setOvercome] = React.useState<Number>(contents.overcome);
    const [comment, setComment] = React.useState(contents.comment);
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
            <Box sx={{ mt: 1, mb: 3 }}>
                <InputLabel sx={{ fontSize: 14, mb: 1 }}>成長の変化</InputLabel>
                {/* <Rating
                    size="large"
                    name="simple-controlled"
                    value={Number(contents.overcome)}
                    precision={0.5}
                    onChange={(event, newValue) => {
                        setOvercome(newValue);
                        contents.overcome = newValue
                    }}
                /> */}
                <Stack direction="row" spacing={2}>
                    <StyledRating
                        name="highlight-selected-only"
                        size="large"
                        value={Number(contents.overcome)}
                        IconContainerComponent={IconContainer}
                        getLabelText={(value: number) => customIcons[value].label}
                        onChange={(event, newValue) => {
                            setOvercome(newValue);
                            contents.overcome = newValue
                        }}
                        highlightSelectedOnly
                    />
                    {contents.overcome != 0 &&
                        <Typography variant="h6" sx={{ px: 1, fontSize: 14 }}>
                            {customIcons[Number(contents.overcome)].label}
                        </Typography>
                    }
                </Stack>
            </Box>

            <Box sx={{ mb: 3, fontSize: "14px !important" }}>
                <FormControl fullWidth sx={{ fontSize: 14 }} variant="outlined">
                    <InputLabel sx={{ fontSize: 14 }} shrink={contents.comment != ""} htmlFor="filled-multiline-flexible">コメント</InputLabel>
                    <OutlinedInput
                        sx={{ m: "0 !important", fontSize: 14 }}
                        id="filled-multiline-flexible"
                        label="課題の詳細"
                        multiline
                        value={contents.comment}
                        onChange={newValue => {
                            setComment(newValue.target.value)
                            contents.comment = newValue.target.value
                        }}
                        notched={contents.comment != ""}
                    />
                </FormControl>
            </Box>

            {/* <Box sx={{ my: 1 }}>
                <AddInputBox title="取り組んだこと" contents={contents.solutions} ChangeInput={ChangeSolutions} AddInput={AddSolutions} />
            </Box> */}
        </Box >
    )
}

const StyledRating = styled((props: RatingProps) => (
    <MuiRating
        max={4}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
        color: theme.palette.action.disabled,
    },
}));

const customIcons: {
    [index: string]: {
        icon: React.ReactElement;
        label: string;
    };
} = {
    // 1: {
    //     icon: <SentimentVeryDissatisfiedIcon color="error" />,
    //     label: 'Very Dissatisfied',
    // },
    1: {
        icon: <SentimentDissatisfiedIcon color="error" />,
        label: '退化・改悪した',
    },
    2: {
        icon: <SentimentSatisfiedIcon color="warning" />,
        label: '成長が見られない',
    },
    3: {
        icon: <SentimentSatisfiedAltIcon color="success" />,
        label: 'やや成長・改善した',
    },
    4: {
        icon: <SentimentVerySatisfiedIcon sx={{ color: "#00cc33" }} />,
        label: '成長・改善した',
    },
};

function IconContainer(props: IconContainerProps) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
}