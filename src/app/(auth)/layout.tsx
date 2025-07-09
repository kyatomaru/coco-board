// app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { Inter, Roboto_Mono } from 'next/font/google'
import '@/app/globals.css'
import { GoogleAnalytics } from '@next/third-parties/google'
import { GA_TAG_ID } from '@/libs/gtag'
import { AuthProvider } from '@/context/auth/AuthContext'
import Script from 'next/script'        // 構造化データ用

/* ----------------- フォント ----------------- */
const inter       = Inter({ subsets: ['latin'] })
const robotoMono  = Roboto_Mono({ subsets: ['latin'] })

/* ----------------- メタデータ ----------------- */
export const metadata: Metadata = {
  metadataBase: new URL('https://www.cocoboard.jp'),       // canonical の基準
  title: {
    default : 'CocoBoard｜サッカー戦術ボード＆ノート Web アプリ',
    template: '%s | CocoBoard',
  },
  description:
    'スマホだけでフォーメーションを描いて共有できるサッカー戦術ボード Web アプリ。ドラッグ＆ドロップで簡単操作、LINE 共有も可能。',
  alternates: { canonical: '/' },                          // どの URL でも “/” を正規扱い
  openGraph: {
    type : 'website',
    url  : 'https://www.cocoboard.jp/',
    title: 'CocoBoard｜サッカー戦術ボード＆ノート Web アプリ',
    description:
      'スマホだけでフォーメーションを描いて共有できるサッカー戦術ボード Web アプリ。',
    images: [
      { url: '/images/ogp.png', width: 1200, height: 630, alt: 'CocoBoard OGP' },
    ],
  },
  twitter: {
    card : 'summary_large_image',
    site : '@coco_board',
    title: 'CocoBoard｜サッカー戦術ボード＆ノート Web アプリ',
    description:
      'スマホだけでフォーメーションを描いて共有できるサッカー戦術ボード Web アプリ。',
    images: ['/images/ogp.png'],
  },
  robots: { index: true, follow: true },
  themeColor: '#0077cc',
}

/* ----------------- ビューポート ----------------- */
export const viewport: Viewport = {
  width        : 'device-width',
  initialScale : 1,
  maximumScale : 1,
}

/* ----------------- ルートレイアウト ----------------- */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${inter.className} ${robotoMono.className}`}>
      <head>
        {/* AdSense Auto-ads 用メタ。head 直下に置く */}
        <meta name="google-adsense-account" content="ca-pub-2002981317413430" />

        {/* 構造化データ: WebApplication（ネイティブ無しなので Web 専用） */}
        <Script
          id="ld-json-webapp"
          strategy="afterInteractive"          // 先に HTML を返し、描画後に実行
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type'   : 'WebApplication',
              name      : 'CocoBoard',
              applicationCategory: 'SportsApplication',
              operatingSystem     : 'Web',
              offers: {
                '@type'       : 'Offer',
                price         : '0',
                priceCurrency : 'JPY',
              },
              aggregateRating: {
                '@type'      : 'AggregateRating',
                ratingValue  : '4.8',
                ratingCount  : '120',
              },
            }),
          }}
        />
      </head>

      <body className={robotoMono.className}>
        <AuthProvider>  
          {children}
        </AuthProvider>

        {/* GA は body 終端で OK。環境変数が無いときは描画しない */}
        {GA_TAG_ID && <GoogleAnalytics gaId={GA_TAG_ID} />}
      </body>
    </html>
  )
}
