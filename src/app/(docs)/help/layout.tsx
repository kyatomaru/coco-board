import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'] })
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
      {children}
  )
}
