"use client"

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Container, Box, Typography, Button, Divider, CardMedia, Stack } from '@mui/material';
import Header from '../Header';
import Footer from '../Footer';


export default function TermsPage() {
    return (
        <Box sx={{ width: "100%", background: "white" }}>
            <Header title="利用規約" />
            <Container sx={{ mt: "90px" }}>
                <Box sx={{ py: 4 }}>
                    <Typography variant="h1" sx={{ fontSize: "1.9rem", fontWeight: 700, mb: 1, color: "black" }}>
                        利用規約
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: "1rem", color: "#657786" }}>
                        発行日: 2024年6月20日
                    </Typography>
                </Box>

                <Box sx={{ my: 8 }}>
                    <Box sx={{ py: 4 }}>
                        <Typography variant="h2" sx={{ fontSize: "1.9rem", fontWeight: 700, mb: "24px", color: "black" }}>1. はじめに</Typography>
                        <Typography variant="body1" sx={{ fontSize: "1rem", color: "#657786" }}>
                            本利用規約（以下「本規約」）は、coco-board（以下「本アプリ」）の利用に関する条件を定めるものです。本アプリを利用することにより、ユーザーは本規約に同意したものとみなされます。                        </Typography>
                        <Divider sx={{ my: 4 }} />
                    </Box>

                    <Box sx={{ py: 4 }}>
                        <Typography variant="h2" sx={{ fontSize: "1.9rem", fontWeight: 700, mb: "24px", color: "black" }}>2. 定義</Typography>
                        <Typography variant="body1" sx={{ fontSize: "1rem", color: "#657786" }}>
                            ・本アプリとはcoco-boardのことを指し、サッカーの戦術・試合・練習の記録を行うためのWebアプリケーションを意味します。
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: "1rem", color: "#657786" }}>
                            ・ユーザーとは本アプリを利用するすべての個人を指します。
                        </Typography>
                        <Divider sx={{ my: 4 }} />
                    </Box>

                    <Box sx={{ py: 4 }}>
                        <Typography variant="h2" sx={{ fontSize: "1.9rem", fontWeight: 700, mb: "24px", color: "black" }}>3. アカウントの作成と管理</Typography>
                        <Typography variant="body1" sx={{ fontSize: "1rem", color: "#657786" }}>
                            ユーザーは、正確かつ最新の情報を提供してアカウントを作成する必要があります。アカウント作成に必要な情報はメールアドレスのみです。Googleでログインする場合は、Googleの認証システムを利用します。アカウント情報の機密性を保持し、不正利用を防止する責任はユーザーにあります。
                        </Typography>
                        <Divider sx={{ my: 4 }} />
                    </Box>

                    <Box sx={{ py: 4 }}>
                        <Typography variant="h2" sx={{ fontSize: "1.9rem", fontWeight: 700, mb: "24px", color: "black" }}>4. 利用条件</Typography>
                        <Typography variant="body1" sx={{ fontSize: "1rem", color: "#657786" }}>
                            本アプリの利用対象者に特別な制限はありません。ユーザーは、本アプリを合法的かつ適切に利用し、不正行為や他者への迷惑行為を行わないものとします。
                        </Typography>
                        <Divider sx={{ my: 4 }} />
                    </Box>

                    <Box sx={{ py: 4 }}>
                        <Typography variant="h2" sx={{ fontSize: "1.9rem", fontWeight: 700, mb: "24px", color: "black" }}>5. 収集する情報</Typography>
                        <Typography variant="body1" sx={{ fontSize: "1rem", color: "#657786" }}>
                            本アプリは、ユーザーのメールアドレスを収集します。また、Google認証を利用する場合は、Googleから提供される情報も取得しますが、これらの情報は直接使用しません。詳細はプライバシーポリシーをご参照ください。収集した情報は、ユーザーの識別とメール配信のために利用します。
                        </Typography>
                        <Divider sx={{ my: 4 }} />
                    </Box>

                    <Box sx={{ py: 4 }}>
                        <Typography variant="h2" sx={{ fontSize: "1.9rem", fontWeight: 700, mb: "24px", color: "black" }}>6. 利用料金</Typography>
                        <Typography variant="body1" sx={{ fontSize: "1rem", color: "#657786" }}>
                            現在、本アプリは基本利用に関して無料で提供されます。将来的に、有料サービスとして追加コンテンツの提供を予定しています。その際は、料金体系や支払い方法について事前に通知いたします。                        </Typography>
                        <Divider sx={{ my: 4 }} />
                    </Box>

                    <Box sx={{ py: 4 }}>
                        <Typography variant="h2" sx={{ fontSize: "1.9rem", fontWeight: 700, mb: "24px", color: "black" }}>7. 禁止事項</Typography>
                        <Typography variant="body1" sx={{ fontSize: "1rem", color: "#657786" }}>
                            法律や公序良俗に反する行為は一切禁止します。特に禁止する行為については今のところありませんが、今後追加される可能性があります。                        </Typography>
                        <Divider sx={{ my: 4 }} />
                    </Box>

                    <Box sx={{ py: 4 }}>
                        <Typography variant="h2" sx={{ fontSize: "1.9rem", fontWeight: 700, mb: "24px", color: "black" }}>8. 免責事項</Typography>
                        <Typography variant="body1" sx={{ fontSize: "1rem", color: "#657786" }}>
                            本アプリは、提供する情報の正確性や完全性を保証しません。本アプリの利用によって生じた損害について、当社は一切の責任を負いません。
                        </Typography>
                        <Divider sx={{ my: 4 }} />
                    </Box>

                    <Box sx={{ py: 4 }}>
                        <Typography variant="h2" sx={{ fontSize: "1.9rem", fontWeight: 700, mb: "24px", color: "black" }}>9. サービスの変更および終了</Typography>
                        <Typography variant="body1" sx={{ fontSize: "1rem", color: "#657786" }}>
                            当社は、予告なく本アプリの内容を変更、追加、または終了することがあります。本アプリの変更または終了により生じた損害について、当社は一切の責任を負いません。サービス内容の変更や終了については、メールにてユーザーに通知します。
                        </Typography>
                        <Divider sx={{ my: 4 }} />
                    </Box>

                    <Box sx={{ py: 4 }}>
                        <Typography variant="h2" sx={{ fontSize: "1.9rem", fontWeight: 700, mb: "24px", color: "black" }}>10. 知的財産権</Typography>
                        <Typography variant="body1" sx={{ fontSize: "1rem", color: "#657786" }}>
                            本アプリに含まれるすべてのコンテンツ（テキスト、画像、プログラムなど）は、当社またはライセンサーの所有物です。ユーザーが投稿したコンテンツについては、特にルールは設けていませんが、今後変更する可能性があります。
                        </Typography>
                        <Divider sx={{ my: 4 }} />
                    </Box>

                    <Box sx={{ py: 4 }}>
                        <Typography variant="h2" sx={{ fontSize: "1.9rem", fontWeight: 700, mb: "24px", color: "black" }}>11. 準拠法および裁判管轄</Typography>
                        <Typography variant="body1" sx={{ fontSize: "1rem", color: "#657786" }}>
                            本規約は、日本法に準拠します。本アプリに関連して生じた紛争については、東京地方裁判所を専属的合意管轄裁判所とします。
                        </Typography>
                        <Divider sx={{ my: 4 }} />
                    </Box>

                    <Box sx={{ py: 4 }}>
                        <Typography variant="h2" sx={{ fontSize: "1.9rem", fontWeight: 700, mb: "24px", color: "black" }}>12. お問い合わせ</Typography>
                        <Typography variant="body1" sx={{ fontSize: "1rem", color: "#657786" }}>
                            プライバシーポリシーについてのご質問やご意見がある場合は、「cocoboard125@gmail.com」の連絡先までお問い合わせください
                        </Typography>
                    </Box>
                </Box>
            </Container >
            <Footer />
        </Box >
    );
}
