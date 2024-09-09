import type { Metadata, Viewport } from 'next'
import { Inter, Roboto_Mono } from 'next/font/google'
import '@/app/globals.css'
import GoogleAnalytics from '@/components/GoogleAnalytics/GoogleAnalytics'

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
      <head>
        <GoogleAnalytics />
      </head>
      <body className={robot_mono.className}> {children}</body>
    </html >
  )
}
