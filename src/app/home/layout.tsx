import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

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
    <html lang="ja" style={{ overflow: "hidden", position: "relative", height: "85vh" }}>
      <Script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js" strategy='afterInteractive' />
      <Script src='https://fam-8.net/ad/js/fam8-tagify.min.js' strategy='afterInteractive' />
      <body className={inter.className} style={{ overscrollBehaviorY: "none", overflow: "hidden", position: "relative", height: "85vh" }}>
        {children}
      </body>
    </html >
  )
}
