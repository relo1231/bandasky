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
    <div className="mt-8 space-y-5 border-t border-slate-100 pt-8">
      <div className="flex items-center gap-4">
        <label className="font-heading text-sm font-semibold uppercase tracking-wide text-slate-500">
          Množstvo ({produkt.jednotka})
        </label>
        <div className="flex items-center overflow-hidden rounded-lg border border-slate-200">
          <button
            onClick={() => setMnozstvo((m) => Math.max(1, m - 1))}
            className="w-10 py-2.5 text-center text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            −
          </button>
          <input
            type="number"
            min={1}
            value={mnozstvo}
            onChange={(e) => setMnozstvo(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-16 bg-white py-2.5 text-center font-heading font-semibold text-slate-900 [appearance:textfield] focus:outline-none"
          />
          <button
            onClick={() => setMnozstvo((m) => m + 1)}
            className="w-10 py-2.5 text-center text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            +
          </button>
        </div>
      </div>

      <div>
        <label className="mb-2 block font-heading text-sm font-semibold uppercase tracking-wide text-slate-500">
          Poznámka (voliteľné)
        </label>
        <textarea
          value={poznamka}
          onChange={(e) => setPoznamka(e.target.value)}
          rows={3}
          placeholder="Napr. počet kusov, špecifické požiadavky..."
          className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-slate-900 focus:outline-none"
        />
      </div>

      <button
        onClick={handleAdd}
        disabled={produkt.dostupnost === 'Nedostupné'}
        className={`w-full rounded-lg py-3.5 font-heading font-bold uppercase tracking-widest transition-all disabled:cursor-not-allowed disabled:opacity-40 ${
          pridany
            ? 'bg-emerald-600 text-white'
            : 'bg-slate-900 text-white hover:bg-slate-700'
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
