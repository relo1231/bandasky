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
    { href: '/kosik', label: 'Dopyt' },
  ]

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-black border-b border-[#242424]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-9 items-center justify-between">
            <span className="hidden text-xs text-[#666] sm:block">
              IBC nádrže na vodu · Celé Slovensko
            </span>
            <div className="flex items-center gap-6 text-xs text-[#888]">
              <a href="mailto:info@bandasky.sk" className="flex items-center gap-1.5 hover:text-[#e8001e] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                info@bandasky.sk
              </a>
              <a href="tel:+421900000000" className="flex items-center gap-1.5 hover:text-[#e8001e] transition-colors">
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
      <nav className="bg-[#0d0d0d] border-b border-[#242424]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
              <div className="h-8 w-1 bg-[#e8001e]" />
              <span className="font-heading text-xl font-bold uppercase tracking-[0.15em] text-white hover:text-[#e8001e] transition-colors">
                Bandasky
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden items-center gap-8 sm:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-heading text-sm font-semibold uppercase tracking-widest transition-colors ${
                    pathname === link.href
                      ? 'text-[#e8001e]'
                      : 'text-[#888] hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/kosik"
                className="relative flex items-center gap-2 bg-[#e8001e] px-5 py-2 font-heading text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#b5001a]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                Dopyt
                {pocetPoloziek > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-[#e8001e]">
                    {pocetPoloziek > 99 ? '99+' : pocetPoloziek}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="flex sm:hidden flex-col gap-1.5 p-2"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              <span className={`block h-0.5 w-6 bg-white transition-all ${open ? 'translate-y-2 rotate-45' : ''}`} />
              <span className={`block h-0.5 w-6 bg-white transition-all ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-6 bg-white transition-all ${open ? '-translate-y-2 -rotate-45' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="border-t border-[#242424] bg-[#0d0d0d] sm:hidden">
            <div className="space-y-1 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block py-2.5 font-heading text-sm font-semibold uppercase tracking-widest transition-colors ${
                    pathname === link.href ? 'text-[#e8001e]' : 'text-[#888] hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
