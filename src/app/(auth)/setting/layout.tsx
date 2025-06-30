import type { Metadata } from 'next'
import '@/app/globals.css'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'coco board',
  description: 'スマホ1つで簡単に記録できるサッカーノートアプリ。戦術ボードの作成や試合・練習の記録を手軽に管理できる便利なアプリです。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" style={{ 
      position: "relative", 
      fontFamily: '"Untitled Sans", "Yu Gothic Medium", "游ゴシック Medium", YuGothic, "游ゴシック体", "hiragino-kaku-gothic-pron", "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN", "Noto Sans JP", Meiryo, sans-serif'
    }}>
      <Script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js" strategy='afterInteractive' />
      <Script src='https://fam-8.net/ad/js/fam8-tagify.min.js' strategy='afterInteractive' />
      <body style={{ 
        position: "relative",
        fontFamily: 'inherit'  // htmlから継承
      }}>
        {children}
      </body>
    </html>
  )
}
