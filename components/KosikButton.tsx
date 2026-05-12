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
      className={`px-4 py-2 font-heading font-semibold uppercase tracking-wide text-sm transition-all ${
        pridany
          ? 'bg-green-700 text-white'
          : 'bg-[#1e6fff] text-white hover:bg-[#1458d6]'
      } ${className ?? ''}`}
    >
      {pridany ? '✓ Pridané' : 'Pridať do dopytu'}
    </button>
  )
}
