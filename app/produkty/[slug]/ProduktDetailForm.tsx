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
    <div className="mt-8 space-y-4 border-t border-[#2a2a2a] pt-8">
      <div className="flex items-center gap-4">
        <label className="font-heading text-sm uppercase tracking-wide text-[#888]">
          Množstvo ({produkt.jednotka})
        </label>
        <div className="flex items-center border border-[#2a2a2a]">
          <button
            onClick={() => setMnozstvo((m) => Math.max(1, m - 1))}
            className="w-10 py-2 text-center text-[#888] transition-colors hover:bg-[#1a1a1a] hover:text-gold"
          >
            −
          </button>
          <input
            type="number"
            min={1}
            value={mnozstvo}
            onChange={(e) => setMnozstvo(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-16 bg-[#0a0a0a] py-2 text-center font-heading font-semibold text-[#e8e8e8] [appearance:textfield] focus:outline-none"
          />
          <button
            onClick={() => setMnozstvo((m) => m + 1)}
            className="w-10 py-2 text-center text-[#888] transition-colors hover:bg-[#1a1a1a] hover:text-gold"
          >
            +
          </button>
        </div>
      </div>

      <div>
        <label className="block font-heading text-sm uppercase tracking-wide text-[#888] mb-2">
          Poznámka k produktu (voliteľné)
        </label>
        <textarea
          value={poznamka}
          onChange={(e) => setPoznamka(e.target.value)}
          rows={3}
          placeholder="Napr. farba, rozmery, špecifikácia..."
          className="w-full rounded-sm border border-[#2a2a2a] bg-[#141414] px-4 py-2.5 font-body text-sm text-[#e8e8e8] placeholder-[#444] focus:border-gold focus:outline-none transition-colors resize-none"
        />
      </div>

      <button
        onClick={handleAdd}
        disabled={produkt.dostupnost === 'Nedostupné'}
        className={`btn-primary w-full py-3 font-heading font-semibold uppercase tracking-widest transition-all disabled:cursor-not-allowed disabled:opacity-40 ${
          pridany
            ? 'bg-green-700 text-white'
            : 'bg-gold text-[#0a0a0a] hover:bg-gold-dark'
        }`}
      >
        {produkt.dostupnost === 'Nedostupné'
          ? 'Nedostupné'
          : pridany
          ? '✓ Pridané do košíka'
          : 'Pridať do košíka'}
      </button>
    </div>
  )
}
