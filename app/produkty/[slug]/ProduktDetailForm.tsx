'use client'

import { useState } from 'react'
import type { Produkt } from '@/types'
import { useKosik } from '@/components/KosikProvider'

type Props = { produkt: Produkt }

export function ProduktDetailForm({ produkt }: Props) {
  const { pridaj } = useKosik()
  const [mnozstvo, setMnozstvo] = useState(1)
  const [poznamka, setPoznamka] = useState('')
  const [pridany, setPridany] = useState(false)

  const handleAdd = () => {
    pridaj({ produktId: produkt.id, nazov: produkt.nazov, mnozstvo, poznamka: poznamka || undefined })
    setPridany(true)
    setTimeout(() => setPridany(false), 2000)
  }

  return (
    <div className="mt-8 space-y-4 border-t border-[#1a2a45] pt-8">
      <div className="flex items-center gap-4">
        <label className="font-heading text-sm uppercase tracking-wide text-[#6b7fa3]">
          Množstvo ({produkt.jednotka})
        </label>
        <div className="flex items-center border border-[#1a2a45]">
          <button
            onClick={() => setMnozstvo((m) => Math.max(1, m - 1))}
            className="w-10 py-2 text-center text-[#6b7fa3] transition-colors hover:bg-[#0f1e38] hover:text-[#1e6fff]"
          >
            −
          </button>
          <input
            type="number"
            min={1}
            value={mnozstvo}
            onChange={(e) => setMnozstvo(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-16 bg-[#050d1a] py-2 text-center font-heading font-semibold text-[#e2e8f0] [appearance:textfield] focus:outline-none"
          />
          <button
            onClick={() => setMnozstvo((m) => m + 1)}
            className="w-10 py-2 text-center text-[#6b7fa3] transition-colors hover:bg-[#0f1e38] hover:text-[#1e6fff]"
          >
            +
          </button>
        </div>
      </div>

      <div>
        <label className="block font-heading text-sm uppercase tracking-wide text-[#6b7fa3] mb-2">
          Poznámka (voliteľné)
        </label>
        <textarea
          value={poznamka}
          onChange={(e) => setPoznamka(e.target.value)}
          rows={3}
          placeholder="Napr. počet kusov, špecifické požiadavky..."
          className="w-full rounded-sm border border-[#1a2a45] bg-[#0a1628] px-4 py-2.5 font-body text-sm text-[#e2e8f0] placeholder-[#2a3a55] focus:border-[#1e6fff] focus:outline-none transition-colors resize-none"
        />
      </div>

      <button
        onClick={handleAdd}
        disabled={produkt.dostupnost === 'Nedostupné'}
        className={`w-full py-3.5 font-heading font-semibold uppercase tracking-widest transition-all disabled:cursor-not-allowed disabled:opacity-40 ${
          pridany
            ? 'bg-green-700 text-white'
            : 'bg-[#1e6fff] text-white hover:bg-[#1458d6]'
        }`}
      >
        {produkt.dostupnost === 'Nedostupné'
          ? 'Nedostupné'
          : pridany
          ? '✓ Pridané do dopytu'
          : 'Pridať do dopytu'}
      </button>
    </div>
  )
}
