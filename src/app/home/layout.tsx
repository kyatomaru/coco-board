import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'coco board',
  description: 'soccer note app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" style={{ overflow: "hidden", position: "relative", height: "100vh" }}>
      <body className={inter.className} style={{ overscrollBehaviorY: "none", height: "100vh", overflow: "hidden", position: "relative" }}>{children}</body>
    </html >
  )
}
