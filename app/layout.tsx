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

export const metadata: Metadata = {
  title: {
    default: 'Bandasky – 1000L nádrže na vodu',
    template: '%s | Bandasky',
  },
  description: 'Nové a repasované 1000L IBC nádrže na vodu. Rýchla doprava po celom Slovensku. Pošlite dopyt ešte dnes.',
  openGraph: {
    siteName: 'Bandasky',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sk" className={`${oswald.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-[#0d0d0d] text-white">
        <KosikProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </KosikProvider>
      </body>
    </html>
  )
}
