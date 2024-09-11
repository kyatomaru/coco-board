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
  description: 'soccer note app',
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
      <GoogleAnalytics gaId={process.env.GA_TAG_ID ?? ""} />
      <body className={robot_mono.className}>{children}</body>
    </html >
  )
}
