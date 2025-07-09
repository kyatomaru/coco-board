import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

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
      <meta name="google-site-verification" content="ob25A7sueFm2o8FmW6NqBb-CcSocSbSwEatM894SV6s" />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
