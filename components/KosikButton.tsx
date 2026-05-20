'use client'

import { useKosik } from './KosikProvider'
import type { KosikPolozka } from '@/types'
import { useState } from 'react'

type Props = {
  polozka: KosikPolozka
  className?: string
}

export function KosikButton({ polozka, className }: Props) {
  const { pridaj } = useKosik()
  const [pridany, setPridany] = useState(false)

  const handleClick = () => {
    pridaj(polozka)
    setPridany(true)
    setTimeout(() => setPridany(false), 1500)
  }

  return (
    <button
      onClick={handleClick}
      className={`rounded-md px-4 py-2 font-heading font-semibold uppercase tracking-wide text-sm transition-all ${
        pridany
          ? 'bg-emerald-600 text-white'
          : 'bg-slate-900 text-white hover:bg-slate-700'
      } ${className ?? ''}`}
    >
      {pridany ? '✓ Pridané' : 'Do dopytu'}
    </button>
  )
}
