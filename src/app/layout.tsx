import type { Metadata } from 'next'
import { Inter, Roboto_Mono } from 'next/font/google'
import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'] })
const robot_mono = Roboto_Mono({ subsets: ['latin'] })
const style = { margin: 0 }

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
    <html lang="en">
      <body className={robot_mono.className}> {children}</body>
    </html >
  )
}
