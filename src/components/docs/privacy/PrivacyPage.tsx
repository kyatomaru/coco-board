"use client"

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Container, Box, Typography, Button, Divider, CardMedia, Stack } from '@mui/material';
import Header from '../Header';
import Footer from '../Footer';


export default function PrivacyPage() {
    return (
        <Box sx={{ width: "100%", background: "white" }}>
            <Header title="プライバシーポリシー" />
            <Container sx={{ mt: "90px" }}>
                <Box sx={{ py: 4 }}>
                    <Typography variant="h1" sx={{ fontSize: "1.9rem", fontWeight: 700, mb: 1 }}>
                        プライバシーポリシー
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: "1rem", color: "#657786" }}>
                        発行日: 2024年6月17日
                    </Typography>
                </Box>

                <Box sx={{ my: 8 }}>
                    <Box sx={{ py: 4 }}>
                        <Typography variant="h2" sx={{ fontSize: "1.9rem", fontWeight: 700, mb: "24px" }}>1. はじめに</Typography>
                        <Typography variant="body1" sx={{ fontSize: "1rem", color: "#657786" }}>
                            coco-board（以下「本アプリ」）は、ユーザーのプライバシーを尊重し、ユーザーの個人情報を保護することをお約束します。本プライバシーポリシーは、本アプリにおいて収集する個人情報の種類、その利用方法、およびユーザーの権利について説明します。
                        </Typography>
                        <Divider sx={{ my: 4 }} />
                    </Box>

                    <Box sx={{ py: 4 }}>
                        <Typography variant="h2" sx={{ fontSize: "1.9rem", fontWeight: 700, mb: "24px" }}>2. 収集する情報</Typography>
                        <Typography variant="body1" sx={{ fontSize: "1rem", color: "#657786" }}>
                            本アプリは、以下の情報を収集します：
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: "1rem", color: "#657786" }}>
                            ・メールアドレス（独自のメールアドレス認証およびGoogle認証を通じて収集）
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: "1rem", color: "#657786" }}>
                            ・Google認証の場合、以下の情報がGoogleから提供されますが、直接使用することはありません:
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: "1rem", color: "#657786", pl: 2 }}>
                            ・ユーザー数とセッション数 <br />
                            ・セッション継続時間<br />
                            ・オペレーティングシステム<br />
                            ・端末の機種<br />
                            ・地域<br />
                            ・初回起動<br />
                            ・アプリの起動<br />
                            ・アプリの更新<br />
                            ・アプリ内購入<br />
                        </Typography>
                        <Divider sx={{ my: 4 }} />
                    </Box>

                    <Box sx={{ py: 4 }}>
                        <Typography variant="h2" sx={{ fontSize: "1.9rem", fontWeight: 700, mb: "24px" }}>3. 情報の収集方法</Typography>
                        <Typography variant="body1" sx={{ fontSize: "1rem", color: "#657786" }}>
                            ・メールアドレス認証の場合、メールアドレスとパスワードをユーザーから入力してもらいます。
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: "1rem", color: "#657786" }}>
                            ・Google認証はFirebaseで提供されるGoogle認証を使用しています。
                        </Typography>
                        <Divider sx={{ my: 4 }} />
                    </Box>

                    <Box sx={{ py: 4 }}>
                        <Typography variant="h2" sx={{ fontSize: "1.9rem", fontWeight: 700, mb: "24px" }}>4. 情報の利用方法</Typography>
                        <Typography variant="body1" sx={{ fontSize: "1rem", color: "#657786" }}>
                            収集した情報は、ユーザー認証の目的で利用します。
                        </Typography>
                        <Divider sx={{ my: 4 }} />
                    </Box>

                    <Box sx={{ py: 4 }}>
                        <Typography variant="h2" sx={{ fontSize: "1.9rem", fontWeight: 700, mb: "24px" }}>5. 情報の共有と開示</Typography>
                        <Typography variant="body1" sx={{ fontSize: "1rem", color: "#657786" }}>
                            本アプリは、収集した情報を第三者と共有しません。
                        </Typography>
                        <Divider sx={{ my: 4 }} />
                    </Box>

                    <Box sx={{ py: 4 }}>
                        <Typography variant="h2" sx={{ fontSize: "1.9rem", fontWeight: 700, mb: "24px" }}>6. クッキーとトラッキング技術</Typography>
                        <Typography variant="body1" sx={{ fontSize: "1rem", color: "#657786" }}>
                            本アプリは、ログイン認証のためにクッキーを使用します。
                        </Typography>
                        <Divider sx={{ my: 4 }} />
                    </Box>

                    <Box sx={{ py: 4 }}>
                        <Typography variant="h2" sx={{ fontSize: "1.9rem", fontWeight: 700, mb: "24px" }}>7. データの保護</Typography>
                        <Typography variant="body1" sx={{ fontSize: "1rem", color: "#657786" }}>
                            本アプリは、Firebaseを使用してデータベースと認証のセキュリティを確保しています。
                        </Typography>
                        <Divider sx={{ my: 4 }} />
                    </Box>

                    <Box sx={{ py: 4 }}>
                        <Typography variant="h2" sx={{ fontSize: "1.9rem", fontWeight: 700, mb: "24px" }}>8. ユーザーの権利</Typography>
                        <Typography variant="body1" sx={{ fontSize: "1rem", color: "#657786" }}>
                            ユーザーは、以下の権利を有します：
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: "1rem", color: "#657786" }}>
                            ・アクセス権：ユーザーは、当社が保有する自身の個人情報にアクセスする権利があります。
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: "1rem", color: "#657786" }}>
                            ・修正権：ユーザーは、不正確または不完全な情報を修正する権利があります。
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: "1rem", color: "#657786" }}>
                            ・削除権：ユーザーは、自身の個人情報を削除するよう要求する権利があります。
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: "1rem", color: "#657786" }}>
                            ・データ移行権：ユーザーは、自身の個人情報を構造化された、一般的に使用される形式で受け取る権利があります。
                        </Typography>
                        <Divider sx={{ my: 4 }} />
                    </Box>

                    <Box sx={{ py: 4 }}>
                        <Typography variant="h2" sx={{ fontSize: "1.9rem", fontWeight: 700, mb: "24px" }}>9. プライバシーポリシーの変更</Typography>
                        <Typography variant="body1" sx={{ fontSize: "1rem", color: "#657786" }}>
                            本プライバシーポリシーの変更がある場合、ユーザーには本アプリ内で通知します。ユーザーは定期的に本ポリシーを確認することをお勧めします。
                        </Typography>
                        <Divider sx={{ my: 4 }} />
                    </Box>

                    <Box sx={{ py: 4 }}>
                        <Typography variant="h2" sx={{ fontSize: "1.9rem", fontWeight: 700, mb: "24px" }}>10. お問い合わせ</Typography>
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
