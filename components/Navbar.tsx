'use client'

import Link from 'next/link'
import { useKosik } from './KosikProvider'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export function Navbar() {
  const { pocetPoloziek } = useKosik()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Domov' },
    { href: '/produkty', label: 'Nádrže' },
    { href: '/kontakt', label: 'Kontakt' },
  ]

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-9 items-center justify-between">
            <span className="hidden text-xs text-slate-500 sm:block">
              IBC nádrže na vodu · Celé Slovensko · Doprava do 48h
            </span>
            <div className="flex items-center gap-6 text-xs text-slate-500">
              <a href="mailto:info@bandasky.sk" className="flex items-center gap-1.5 transition-colors hover:text-sky-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                info@bandasky.sk
              </a>
              <a href="tel:+421900000000" className="flex items-center gap-1.5 transition-colors hover:text-sky-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                +421 900 000 000
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900">
                <span className="font-heading text-xs font-bold text-white">IBC</span>
              </div>
              <span className="font-heading text-lg font-bold uppercase tracking-[0.12em] text-slate-900">
                Bandasky
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden items-center gap-1 sm:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-4 py-2 font-heading text-sm font-semibold uppercase tracking-widest transition-colors ${
                    pathname === link.href
                      ? 'bg-sky-50 text-sky-700'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="ml-4 flex items-center gap-3 border-l border-slate-200 pl-4">
                <Link
                  href="/kosik"
                  className="relative flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 font-heading text-sm font-semibold uppercase tracking-widest text-slate-600 transition-all hover:border-sky-500 hover:text-sky-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Dopyt
                  {pocetPoloziek > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-sky-500 text-xs font-bold text-white">
                      {pocetPoloziek > 99 ? '99+' : pocetPoloziek}
                    </span>
                  )}
                </Link>

                <Link
                  href="/produkty"
                  className="rounded-lg bg-sky-600 px-5 py-2.5 font-heading text-sm font-bold uppercase tracking-widest text-white shadow-sm transition-all hover:bg-sky-500 hover:shadow-md"
                >
                  Pozrieť nádrže
                </Link>
              </div>
            </div>

            {/* Mobile hamburger */}
            <button
              className="flex sm:hidden flex-col gap-1.5 rounded-lg p-2 hover:bg-slate-100"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              <span className={`block h-0.5 w-6 bg-slate-900 transition-all ${open ? 'translate-y-2 rotate-45' : ''}`} />
              <span className={`block h-0.5 w-6 bg-slate-900 transition-all ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-6 bg-slate-900 transition-all ${open ? '-translate-y-2 -rotate-45' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="border-t border-slate-100 bg-white sm:hidden">
            <div className="space-y-1 px-4 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-2.5 font-heading text-sm font-semibold uppercase tracking-widest transition-colors ${
                    pathname === link.href
                      ? 'bg-sky-50 text-sky-700'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/kosik"
                onClick={() => setOpen(false)}
                className="block rounded-lg bg-sky-600 px-3 py-2.5 font-heading text-sm font-bold uppercase tracking-widest text-white"
              >
                Dopyt ({pocetPoloziek})
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
