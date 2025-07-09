// app/layout.tsx
import '@/app/globals.css'
import { AuthProvider } from '@/context/auth/AuthContext'

/* ----------------- ルートレイアウト ----------------- */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}
