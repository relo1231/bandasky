'use client'

import Link from 'next/link'
import { useKosik } from './KosikProvider'
import { usePathname } from 'next/navigation'

export function Navbar() {
  const { pocetPoloziek } = useKosik()
  const pathname = usePathname()

  const navLinks = [
    { href: '/', label: 'Domov' },
    { href: '/produkty', label: 'Nádrže' },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-[#1a2a45] bg-[#050d1a]/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#1e6fff] text-sm">
              💧
            </span>
            <span className="font-heading text-xl font-bold uppercase tracking-widest text-white hover:text-[#60a5fa] transition-colors">
              Bandasky
            </span>
          </Link>

          <div className="flex items-center gap-8">
            <div className="hidden items-center gap-6 sm:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-body text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? 'text-[#1e6fff]'
                      : 'text-[#6b7fa3] hover:text-[#e2e8f0]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <Link
              href="/kosik"
              className="relative flex items-center gap-2 rounded-sm border border-[#1a2a45] px-3 py-2 text-[#e2e8f0] transition-all hover:border-[#1e6fff] hover:text-[#1e6fff]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              <span className="font-heading text-sm font-semibold">Dopyt</span>
              {pocetPoloziek > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#1e6fff] text-xs font-bold text-white">
                  {pocetPoloziek > 99 ? '99+' : pocetPoloziek}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
