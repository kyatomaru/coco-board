"use client"

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation'
import { auth } from '@/app/firebase';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material-next/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import ja from 'date-fns/locale/ja'
import { PracticeDetailsModel } from '@/types/practice/PracticeDetails';
import { elementsCategories } from '@/types/Category';
import Divider from '@mui/material/Divider'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ConfirmCloseModal from '../../contents/modal/ConfirmModal';
import { backTitle, backMs } from '@/constants/ModalMessage'
import IconButton from '@mui/material/IconButton'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { ImageSelectForm } from '../Input/ImageSelectForm';
import { useGetPracticeImages } from '@/hooks/practice/image/useGetPracticeImages';

type pageProps = {
    contents: any,
    postData: any,
    onClose: any
}

export default function PracticeForm({ contents, postData, onClose }: pageProps) {
    const router = useRouter()
    const params = useParams()
    const [isConfirmCloseModal, setIsConfirmCloseModal] = React.useState<boolean>(false)
    const [waitFlag, setWaitFlag] = React.useState(false);
    const [isImagesLoading, setIsImagesLoading] = React.useState(false)

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        if (!isImagesLoading) {
            event.preventDefault()
            const uid = await auth.currentUser?.uid;
            if (uid) {
                contents.uid = uid
                postData(contents, selectedFiles)
            }
        }
    }

    const [title, setTitle] = React.useState(contents.title);
    const [place, setPlace] = React.useState(contents.place);
    const [weather, setWeather] = React.useState(contents.weather);
    const [details, setDetails] = React.useState(contents.details);
    const [goodPoints, setGoodPoints] = React.useState(contents.goodPoints ?? [new PracticeDetailsModel()]);
    const [badPoints, setBadPoints] = React.useState(contents.badPoints ?? [new PracticeDetailsModel()]);
    const [next, setNext] = React.useState(contents.next);
    const [comment, setComment] = React.useState(contents.comment);
    const [selectedFiles, setSelectedFiles] = useGetPracticeImages(contents.images ?? [], setIsImagesLoading)

    const AddDetails = () => {
        const input = []
        details.forEach((item) => {
            input.push(item)
        })
        input.push(new PracticeDetailsModel())
        setDetails(input)
        contents.details = input
    }

    const deleteDetail = (index) => {
        const input = []
        details.map((item, itemIndex) => {
            if (itemIndex != index) {
                input.push(item)
            }
        })
        setDetails(input)
        contents.details = input
    }

    const ChangeDetailsContext = (newValue: String, index) => {
        const input = []
        details.forEach((item) => {
            input.push(item)
        })
        input[index].context = newValue
        setDetails(input)
        contents.details = input
    }

    const ChangeDetailsType = (newValue: Number, index) => {
        const input = []
        details.forEach((item) => {
            input.push(item)
        })
        input[index].type = newValue
        setDetails(input)
        contents.details = input
    }

    const ChangeGoodPointsContext = (newValue: String, index) => {
        const input = []
        goodPoints.forEach((item) => {
            input.push(item)
        })
        input[index].context = newValue
        setGoodPoints(input)
        contents.goodPoints = input
    }

    const ChangeGoodPointsType = (newValue: Number, index) => {
        const input = []
        goodPoints.forEach((item) => {
            input.push(item)
        })
        input[index].type = newValue
        setGoodPoints(input)
        contents.goodPoints = input
    }

    const AddGoodPoints = () => {
        const input = []
        goodPoints.forEach((item) => {
            input.push(item)
        })
        input.push(new PracticeDetailsModel())
        setGoodPoints(input)
        contents.goodPoints = input
    }

    const deleteGoodPoint = (index) => {
        const input = []
        goodPoints.map((item, itemIndex) => {
            if (itemIndex != index) {
                input.push(item)
            }
        })
        setGoodPoints(input)
        contents.goodPoints = input
    }

    const ChangeBadPointsContext = (newValue: String, index) => {
        const input = []
        badPoints.forEach((item) => {
            input.push(item)
        })
        input[index].context = newValue
        setBadPoints(input)
        contents.badPoints = input
    }

    const ChangeBadPointsType = (newValue: Number, index) => {
        const input = []
        badPoints.forEach((item) => {
            input.push(item)
        })
        input[index].type = newValue
        setBadPoints(input)
        contents.badPoints = input
    }

    const AddBadPoints = () => {
        const input = []
        badPoints.forEach((item) => {
            input.push(item)
        })
        input.push(new PracticeDetailsModel())
        setBadPoints(input)
        contents.badPoints = input
    }

    const deleteBadPoint = (index) => {
        const input = []
        badPoints.map((item, itemIndex) => {
            if (itemIndex != index) {
                input.push(item)
            }
        })
        setBadPoints(input)
        contents.badPoints = input
    }

    return (
        <>
            <ConfirmCloseModal open={isConfirmCloseModal} setOpen={setIsConfirmCloseModal} title={backTitle} message={backMs} confirmText="中止する" onSubmit={onClose} />
            <Box
                component="form"
                onSubmit={onSubmit}
                sx={{
                    '& .MuiTextField-root': { m: 1 },
                    marginBottom: "30px",
                    minHeight: "100vh"
                }}
                noValidate
                autoComplete="off"
                method='POST'
            >
                <Box sx={{ position: 'sticky', top: 0, backgroundColor: "white", zIndex: 100 }} >
                    <Grid sx={{ px: 1, height: "50px" }} container direction="row" alignItems="center" justifyContent="space-between">
                        <Grid >
                            <Button size="small" sx={{ color: 'black' }} variant='text' onClick={() => setIsConfirmCloseModal(true)}>
                                <Typography fontSize={13} component="p">
                                    キャンセル
                                </Typography>
                            </Button>
                        </Grid>
                        <Grid >
                            <Button size="small" sx={{ cursor: isImagesLoading && "pointer", backgroundColor: isImagesLoading ? "#aaa !important" : "#2e7d32 !important" }} variant='filled' type='submit'>
                                <Typography fontSize={13} component="p">
                                    記録する
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>

                    <Divider />
                </Box>

                <Box>
                    <Box sx={{ mx: "auto", px: 2 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker sx={{ mx: "0 !important", width: "auto !important", backgroundColor: "background.paper" }} format='yyyy年MM月dd日'
                                    value={new Date(String(contents.date))}
                                    disableFuture
                                    onChange={(newValue) => { contents.date = dayjs(String(newValue)).format('YYYY-MM-DD') }} />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Box>

                    <Box sx={{ my: 3 }}>
                        <Box sx={{ my: 2, px: 2 }}>
                            <InputLabel sx={{ mb: 1, fontSize: 14, color: "black" }} >タイトル</InputLabel>
                            <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                                <OutlinedInput
                                    required
                                    name="title"
                                    value={contents.title}
                                    onChange={newValue => {
                                        setTitle(newValue.target.value)
                                        contents.title = newValue.target.value
                                    }}
                                    sx={{ fontSize: 14, backgroundColor: "background.paper" }}
                                />
                            </FormControl>
                        </Box>

                        <Box sx={{ my: 2, px: 2 }}>
                            <InputLabel sx={{ mb: 1, fontSize: 14, color: "black" }} >場所</InputLabel>
                            <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                                <OutlinedInput
                                    sx={{ fontSize: 14, backgroundColor: "background.paper" }}
                                    name="place"
                                    value={contents.place}
                                    onChange={newValue => {
                                        setPlace(newValue.target.value)
                                        contents.place = newValue.target.value
                                    }}
                                />
                            </FormControl>
                        </Box>

                        <Box sx={{ my: 2, px: 2 }}>
                            <InputLabel sx={{ mb: 1, fontSize: 14, color: "black" }} >天気</InputLabel>
                            <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                                <Select
                                    sx={{ fontSize: 14, backgroundColor: "background.paper" }}
                                    name="weather"
                                    value={contents.weather}
                                    onChange={newValue => {
                                        setWeather(newValue.target.value)
                                        contents.weather = newValue.target.value
                                    }}
                                >
                                    <MenuItem sx={{ fontSize: 14 }} value="晴れ">晴れ</MenuItem>
                                    <MenuItem sx={{ fontSize: 14 }} value="曇り">曇り</MenuItem>
                                    <MenuItem sx={{ fontSize: 14 }} value="雨">雨</MenuItem>
                                    <MenuItem sx={{ fontSize: 14 }} value="雪">雪</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>

                    <Divider />

                    <Box sx={{ my: 3, px: 2 }}>
                        <Box sx={{ mb: 1 }}>
                            <Stack sx={{ mb: 1 }} spacing={2} direction="row" justifyContent="space-between" alignItems="center">
                                <Typography variant="h6" sx={{ fontSize: 14, color: "black" }} >
                                    練習内容
                                </Typography>
                                <Button size="small" color='secondary' sx={{ fontSize: 13, minWidth: 85 }} onClick={AddDetails}>
                                    <Typography fontSize={13} component="p">
                                        追加
                                    </Typography>
                                </Button>
                            </Stack>
                            {contents.details.map((input, index) => (
                                <FormControl key={index} fullWidth sx={{ mb: 1 }}>
                                    <OutlinedInput
                                        multiline
                                        minRows={2}
                                        value={contents.details[index].context}
                                        onChange={newValue => ChangeDetailsContext(newValue.target.value, index)}
                                        sx={{ fontSize: 14 }}
                                    />
                                    {index != 0 && !contents.details[index].context &&
                                        <IconButton onClick={() => deleteDetail(index)} sx={{ position: "absolute", right: "-5px", top: "-5px", p: 0, backgroundColor: "white !important" }}>
                                            <HighlightOffIcon sx={{ width: "20px", height: "20px" }} />
                                        </IconButton>
                                    }
                                </FormControl>
                            ))}
                        </Box>

                        {/* <AddInputBox title="取り組んだこと" contents={contents.details} ChangeInput={ChangeDetails} AddInput={AddDetails} /> */}
                    </Box>

                    <Divider />

                    <Box sx={{ my: 3, px: 2 }}>
                        <Box sx={{ my: 2 }}>
                            <Stack spacing={2} direction="row" justifyContent="space-between" sx={{ alignItems: "center", mb: 1 }}>
                                <InputLabel sx={{ mx: 1, fontSize: 14, color: "#ff5e00", fontWeight: "bold" }}>良い点</InputLabel>
                                <Button size="small" color='secondary' sx={{ fontSize: 13, minWidth: 85 }} onClick={AddGoodPoints}>
                                    <Typography fontSize={13} component="p">
                                        追加
                                    </Typography>
                                </Button>
                            </Stack>
                            {contents.goodPoints.map((input, index) => (
                                <FormControl key={index} fullWidth sx={{ mb: 1, position: "relative" }}>
                                    <OutlinedInput
                                        multiline
                                        minRows={2}
                                        value={contents.goodPoints[index].context}
                                        onChange={newValue => ChangeGoodPointsContext(newValue.target.value, index)}
                                        sx={{ fontSize: 14 }}
                                        placeholder={index == 0 && "良かったところや良かったプレーなど"}
                                        startAdornment
                                    />
                                    {index != 0 && !contents.goodPoints[index].context &&
                                        <IconButton onClick={() => deleteGoodPoint(index)} sx={{ position: "absolute", right: "-5px", top: "-5px", p: 0, backgroundColor: "white !important" }}>
                                            <HighlightOffIcon sx={{ width: "20px", height: "20px" }} />
                                        </IconButton>
                                    }
                                </FormControl>
                            ))}
                        </Box>

                        <Box sx={{ my: 2 }}>
                            <Stack spacing={2} direction="row" justifyContent="space-between" sx={{ alignItems: "center", mb: 1 }}>
                                <InputLabel sx={{ mx: 1, fontSize: 14, color: "#007eff", fontWeight: "bold" }}>悪い点</InputLabel>
                                <Button size="small" color='secondary' sx={{ fontSize: 13, minWidth: 85 }} onClick={AddBadPoints}>
                                    <Typography fontSize={13} component="p">
                                        追加
                                    </Typography>
                                </Button>
                            </Stack>
                            {contents.badPoints.map((input, index) => (
                                <FormControl key={index} fullWidth sx={{ mb: 1 }}>
                                    <OutlinedInput
                                        multiline
                                        minRows={2}
                                        value={contents.badPoints[index].context}
                                        onChange={newValue => ChangeBadPointsContext(newValue.target.value, index)}
                                        sx={{ fontSize: 14 }}
                                        placeholder={index == 0 && "悪かったところや悪かったプレーなど"}
                                    />
                                    {index != 0 && !contents.badPoints[index].context &&
                                        <IconButton onClick={() => deleteBadPoint(index)} sx={{ position: "absolute", right: "-5px", top: "-5px", p: 0, backgroundColor: "white !important" }}>
                                            <HighlightOffIcon sx={{ width: "20px", height: "20px" }} />
                                        </IconButton>
                                    }
                                </FormControl>
                            ))}
                        </Box>

                        <Box sx={{ my: 2 }}>
                            <InputLabel sx={{ mb: 1, fontSize: 14, color: "#16b41e", fontWeight: "bold" }}>次に向けて</InputLabel>
                            <FormControl fullWidth sx={{ fontSize: 14 }} variant="outlined">
                                <OutlinedInput
                                    sx={{ m: "0 !important", fontSize: 14, backgroundColor: "background.paper" }}
                                    multiline
                                    minRows={2}
                                    value={contents.next}
                                    onChange={newValue => {
                                        setNext(newValue.target.value)
                                        contents.next = newValue.target.value
                                    }}
                                    placeholder='次に向けての目標や取り組むことなど'
                                />
                            </FormControl>
                        </Box>
                    </Box>

                    <Divider />

                    <Box sx={{ my: 3, px: 2 }}>
                        <Typography variant="h6" sx={{ fontSize: 14, mb: 2, color: "black" }}>
                            画像
                        </Typography>
                        <ImageSelectForm
                            selectedFiles={selectedFiles}
                            setSelectedFiles={setSelectedFiles}
                            maxImages={5}
                            isLoading={isImagesLoading}
                        />
                    </Box>

                    <Divider />

                    <Box sx={{ my: 3, px: 2 }}>
                        <Typography variant="h6" sx={{ fontSize: 14, mb: 2, color: "black" }} component="div">
                            コメント
                        </Typography>
                        <FormControl fullWidth sx={{ fontSize: 14 }} variant="outlined">
                            <OutlinedInput
                                sx={{ m: "0 !important", fontSize: 14, backgroundColor: "background.paper" }}
                                multiline
                                minRows={2}
                                value={contents.comment}
                                onChange={newValue => {
                                    setComment(newValue.target.value)
                                    contents.comment = newValue.target.value
                                }}
                                notched={contents.comment != ""}
                            />
                        </FormControl>
                    </Box>
                </Box >
                {/* <MenuSelectBox date={dayjs(String(dateValue)).format('YYYY-MM-DD')} /> */}
            </Box >
        </>
    )
}