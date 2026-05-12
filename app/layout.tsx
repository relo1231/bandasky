import type { Metadata } from 'next'
import { Oswald, DM_Sans } from 'next/font/google'
import './globals.css'
import { KosikProvider } from '@/components/KosikProvider'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const oswald = Oswald({
  variable: '--font-oswald',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
})

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500'],
})

const nazovFirmy = process.env.NEXT_PUBLIC_NAZOV_FIRMY ?? 'B2B Shop'

export const metadata: Metadata = {
  title: {
    default: nazovFirmy,
    template: `%s | ${nazovFirmy}`,
  },
  description: `${nazovFirmy} – B2B dopytový e-shop. Vyberte produkty a pošlite dopyt.`,
  openGraph: {
    siteName: nazovFirmy,
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sk" className={`${oswald.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-[#0a0a0a] text-[#e8e8e8]">
        <KosikProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </KosikProvider>
      </body>
    </html>
  )
}
