import type { Metadata, Viewport } from 'next'
import { DM_Sans, Manrope } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-manrope',
  display: 'swap',
})

const deploymentHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL

export const metadata: Metadata = {
  metadataBase: new URL(deploymentHost ? `https://${deploymentHost}` : 'http://localhost:3000'),
  title: 'PAKET AT — Paket tamam. Peki, cebinde ne kaldı?',
  description:
    'Kurye, moto-kurye, taksi ve minibüs şoförleri için gelir gider hesabı. Yakıt, bakım, sigorta ve yemek masraflarını düş; gün sonunda gerçek kazancını gör. Ücretsiz canlı hesaplayıcıyı dene.',
  applicationName: 'PAKET AT',
  icons: { icon: { url: '/icon.svg', type: 'image/svg+xml' } },
  keywords: ['kurye gelir gider', 'moto kurye kazanç hesaplama', 'taksi gelir gider', 'net kazanç', 'PAKET AT'],
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    siteName: 'PAKET AT',
    title: 'PAKET AT — Emeğinin hesabı sende.',
    description: 'Ciron değil, cebinde kalan önemli. Kuryeler ve şoförler için sade bir gelir gider hesabı.',
    images: [{ url: '/img/kurye-hero.png', width: 1024, height: 1024, alt: 'PAKET AT — Turuncu teslimat çantalı moto-kurye' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PAKET AT — Emeğinin hesabı sende.',
    description: 'Yakıt, bakım, sigorta, yemek. Hepsi çıksın, gerçek kazancın kalsın.',
    images: ['/img/kurye-hero.png'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark',
  themeColor: '#121414',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`dark bg-background ${dmSans.variable} ${manrope.variable}`}>
      <body className="font-sans antialiased">
        <a href="#ana-icerik" className="sr-only fixed left-4 top-4 z-100 rounded-lg bg-primary px-5 py-3 text-primary-foreground focus:not-sr-only">
          Ana içeriğe geç
        </a>
        {children}
      </body>
    </html>
  )
}
