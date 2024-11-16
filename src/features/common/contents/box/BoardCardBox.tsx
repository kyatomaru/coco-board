"use client"

import * as React from 'react';
import Script from 'next/script'
import type { User } from 'firebase/auth';
import dayjs from 'dayjs';
import LoadingPage from '@/components/common/LoadingPage';
import { useRouter } from 'next/navigation'
import { useGetNote } from '@/hooks/note/useGetDateNote';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import GameCard from '@/features/common/contents/card/GameCard';
import PracticeCard from '@/features/common/contents/card/PracticeCard';
import BoardCard from '@/features/common/contents/card/BoardCard';
import Modal from '@mui/material/Modal';
import CreateBoardFormBox from '@/features/routes/home/CreateBoardFormBox';
import LinearProgress from '@mui/material/LinearProgress';

type PageProps = {
    user: User,
    contents: any,
    setContents: any,
    date: String | Date,
    menu: Number,
    setMenu: any
}

export default function BoardCardBox({ user, contents, setContents, date, menu, setMenu }: PageProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState(false);
    const [isDateLoding, setIsDateLoding] = React.useState(false);

    React.useEffect(() => {
        // setContents(undefined)
        setIsDateLoding(true)
    }, [date]);

    React.useEffect(() => {
        setIsDateLoding(false)
    }, [contents]);

    const iframeRef = React.useRef(null);
    const [iframeHeight, setIframeHeight] = React.useState(10);

    React.useEffect(() => {
        const handleMessage = (event) => {
            // メッセージの種類が 'setIframeHeight' の場合
            if (event.data.type === 'setIframeHeight') {
                // iframeの高さを更新
                setIframeHeight(event.data.height);
            }
        };

        // メッセージを受け取るリスナーを追加
        window.addEventListener('message', handleMessage);

        // クリーンアップ
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    // React.useEffect(() => {
    //     if (iframeRef.current) {
    //         iframeRef.current.style.height = `${iframeHeight}px`;
    //     }
    // }, [iframeHeight]);

    return (
        <Box>
            {menu != -1 ?
                <Modal
                    open={menu != -1}
                    onClose={() => { }}
                    sx={{ overflowY: "hidden", scrollbarWidth: "none" }}
                >
                    <CreateBoardFormBox allContents={contents} setContents={setContents} setIsLoading={setIsLoading} setMenu={setMenu} date={date} />
                </Modal>
                :
                <>{contents == undefined || isDateLoding ?
                    <Skeleton variant="rounded" height={131} />
                    :
                    <>
                        {isLoading &&
                            <Card sx={{ minWidth: 250, mb: 2 }} elevation={2}>
                                <Typography sx={{ fontSize: 13, textAlign: "center", my: 1, color: "black" }} component="h2">
                                    ボードを保存しています。
                                </Typography>
                                <LinearProgress />
                            </Card>
                        }

                        {contents[0] != undefined ?
                            contents.map((value, index) => {
                                return (
                                    <>
                                        {index > 0 && (index + 1) % 2 == 0 &&
                                            <Card sx={{ minWidth: 250, mb: 2 }} elevation={2}>
                                                <iframe
                                                    ref={iframeRef}
                                                    src="/fam8/tag.html"
                                                    width="100%"
                                                    height={iframeHeight + 21}
                                                    // style={{ padding: 5 }}
                                                    aria-hidden="false"
                                                ></iframe>
                                            </Card>
                                        }

                                        <Card key={index} sx={{ minWidth: 250, mb: 2 }} elevation={2}>
                                            <BoardCard allContents={contents} contents={value} setContents={setContents} />
                                        </Card>
                                    </>
                                )
                            })
                            : !isLoading &&
                            <Box sx={{ p: 1, textAlign: "center", height: "100%", width: "100%", mb: 2 }} >
                                <Typography sx={{ fontSize: 15, textAlign: "center", fontWeight: "bold", mb: 1, color: "black" }} component="h2">
                                    戦術・フォーメーションを記録しよう。
                                </Typography>
                                <Typography sx={{ fontSize: 14, textAlign: "center", color: "black" }} component="h2">
                                    まだ記録がありません。次の勝利のために、今すぐ記録を残しましょう。
                                </Typography>
                                <Box sx={{ mt: 2 }}>
                                    <Button onClick={(event) => setMenu(0)}>記録する</Button>
                                </Box>
                            </Box>
                        }
                    </>
                }
                    <Card sx={{ minWidth: 250, mb: 2 }} elevation={2}>
                        <iframe
                            ref={iframeRef}
                            src="/fam8/tag.html"
                            width="100%"
                            height={iframeHeight + 21}
                            // style={{ padding: 5 }}
                            aria-hidden="false"
                        ></iframe>
                    </Card>
                </>
            }
        </Box>
    )
}