'use client'

import { useEffect, useState } from 'react'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('cookies_accepted')) {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('cookies_accepted', '1')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('cookies_accepted', '0')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white px-4 py-4 shadow-2xl sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-sm leading-relaxed text-slate-600">
          Používame cookies na zlepšenie vašej skúsenosti. Pokračovaním súhlasíte s ich použitím.{' '}
          <a href="/kontakt" className="font-medium text-emerald-600 underline hover:text-emerald-700">
            Viac info
          </a>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={decline}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
          >
            Odmietnuť
          </button>
          <button
            onClick={accept}
            className="rounded-lg bg-emerald-600 px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-emerald-700"
          >
            Prijať všetky
          </button>
        </div>
      </div>
    </div>
  )
}
