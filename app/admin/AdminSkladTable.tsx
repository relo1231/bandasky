'use client'

import { useState } from 'react'
import type { Produkt } from '@/types'

type Props = { produkty: Produkt[] }

const dostupnostOptions = ['Na sklade', 'Na objednávku', 'Nedostupné'] as const

const dostupnostStyle: Record<string, string> = {
  'Na sklade': 'text-green-400',
  'Na objednávku': 'text-blue-400',
  'Nedostupné': 'text-red-400',
}

export function AdminSkladTable({ produkty: init }: Props) {
  const [produkty, setProdukty] = useState(init)
  const [saving, setSaving] = useState<number | null>(null)
  const [saved, setSaved] = useState<number | null>(null)

  const update = async (id: number, field: 'pocet_sklad' | 'dostupnost', value: number | string) => {
    setSaving(id)
    const res = await fetch('/api/admin/sklad', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, [field]: value }),
    })
    if (res.ok) {
      const { produkt } = await res.json()
      setProdukty((prev) => prev.map((p) => (p.id === id ? { ...p, ...produkt } : p)))
      setSaved(id)
      setTimeout(() => setSaved(null), 1500)
    }
    setSaving(null)
  }

  return (
    <div className="rounded-sm border border-[#1a2a45] bg-[#0a1628] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1a2a45] bg-[#0f1e38]">
              <th className="px-4 py-3 text-left font-heading text-xs uppercase tracking-widest text-[#6b7fa3]">Produkt</th>
              <th className="px-4 py-3 text-left font-heading text-xs uppercase tracking-widest text-[#6b7fa3]">Kategória</th>
              <th className="px-4 py-3 text-center font-heading text-xs uppercase tracking-widest text-[#6b7fa3]">Kusov</th>
              <th className="px-4 py-3 text-left font-heading text-xs uppercase tracking-widest text-[#6b7fa3]">Dostupnosť</th>
              <th className="px-4 py-3 text-center font-heading text-xs uppercase tracking-widest text-[#6b7fa3]">Stav</th>
            </tr>
          </thead>
          <tbody>
            {produkty.map((p) => {
              const kat = p.kategorie as { nazov: string } | undefined
              const kusy = p.pocet_sklad ?? 0
              const nizkySklad = kusy <= 3 && p.dostupnost === 'Na sklade'

              return (
                <tr
                  key={p.id}
                  className={`border-b border-[#1a2a45] transition-colors ${nizkySklad ? 'bg-amber-950/10' : 'hover:bg-[#0f1e38]'}`}
                >
                  {/* Produkt */}
                  <td className="px-4 py-4">
                    <p className="font-heading text-sm font-semibold uppercase tracking-wide text-[#e2e8f0]">
                      {p.nazov}
                    </p>
                    {p.cena_od && (
                      <p className="text-xs text-[#6b7fa3]">od {p.cena_od} € / {p.jednotka}</p>
                    )}
                  </td>

                  {/* Kategória */}
                  <td className="px-4 py-4 text-sm text-[#6b7fa3]">
                    {kat?.nazov ?? '–'}
                  </td>

                  {/* Kusov – inline edit */}
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => update(p.id, 'pocet_sklad', kusy - 1)}
                        disabled={kusy <= 0 || saving === p.id}
                        className="flex h-7 w-7 items-center justify-center border border-[#1a2a45] text-[#6b7fa3] transition-colors hover:border-[#1e6fff] hover:text-[#1e6fff] disabled:opacity-30"
                      >
                        −
                      </button>
                      <span className={`w-10 text-center font-heading text-lg font-bold ${
                        nizkySklad ? 'text-amber-400' : 'text-white'
                      }`}>
                        {kusy}
                      </span>
                      <button
                        onClick={() => update(p.id, 'pocet_sklad', kusy + 1)}
                        disabled={saving === p.id}
                        className="flex h-7 w-7 items-center justify-center border border-[#1a2a45] text-[#6b7fa3] transition-colors hover:border-[#1e6fff] hover:text-[#1e6fff]"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  {/* Dostupnosť */}
                  <td className="px-4 py-4">
                    <select
                      value={p.dostupnost}
                      onChange={(e) => update(p.id, 'dostupnost', e.target.value)}
                      disabled={saving === p.id}
                      className={`rounded-sm border border-[#1a2a45] bg-[#050d1a] px-3 py-1.5 font-heading text-xs uppercase tracking-wide focus:border-[#1e6fff] focus:outline-none transition-colors disabled:opacity-50 ${
                        dostupnostStyle[p.dostupnost] ?? 'text-[#6b7fa3]'
                      }`}
                    >
                      {dostupnostOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </td>

                  {/* Stav */}
                  <td className="px-4 py-4 text-center">
                    {saving === p.id ? (
                      <span className="text-xs text-[#6b7fa3]">Ukladám...</span>
                    ) : saved === p.id ? (
                      <span className="text-xs text-green-400">✓ Uložené</span>
                    ) : nizkySklad ? (
                      <span className="text-xs text-amber-400">⚠ Nízky stav</span>
                    ) : (
                      <span className="text-xs text-[#2a3a55]">–</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
