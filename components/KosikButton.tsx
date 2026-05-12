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
      className={`btn-primary px-5 py-2.5 font-heading font-semibold uppercase tracking-wide text-sm transition-all ${
        pridany
          ? 'bg-green-700 text-white'
          : 'bg-gold text-bg hover:bg-gold-dark'
      } ${className ?? ''}`}
    >
      {pridany ? '✓ Pridané' : 'Pridať do košíka'}
    </button>
  )
}
