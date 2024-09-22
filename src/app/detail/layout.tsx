import type { Metadata, Viewport } from 'next'
import { Inter, Roboto_Mono } from 'next/font/google'
import '@/app/globals.css'
import { GoogleAnalytics } from '@next/third-parties/google'
import { GA_TAG_ID } from '@/libs/gtag'

const inter = Inter({ subsets: ['latin'] })
const robot_mono = Roboto_Mono({ subsets: ['latin'] })
const style = { margin: 0 }

export const metadata: Metadata = {
  title: 'coco board',
  description: 'スマホ1つで簡単に記録できるサッカーノートアプリ。戦術ボードの作成や試合・練習の記録を手軽に管理できる便利なアプリです。',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? null} />
      <body className={robot_mono.className}>{children}</body>
    </html >
  )
}
