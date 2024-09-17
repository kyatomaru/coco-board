import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'coco board',
  description: 'スマホ1つで簡単にサッカーノートを作成できるアプリ。戦術ボードの作成や試合・練習の記録を手軽に管理できる。選手のパフォーマンスを向上させるための便利なツール。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" style={{ overflow: "hidden", position: "relative", height: "85vh" }}>
      <body className={inter.className} style={{ overscrollBehaviorY: "none", overflow: "hidden", position: "relative", height: "85vh" }}>{children}</body>
    </html>
  )
}
