'use client'

import { useState } from 'react'
import type { Dopyt, DopytPolozka } from '@/types'

type DopytWithPolozky = Dopyt & {
  dopyt_polozky: DopytPolozka[]
  poznamka_admin?: string | null
}

const stavStyle: Record<string, string> = {
  'nový': 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  'vybavený': 'bg-green-500/15 text-green-400 border-green-500/30',
  'zrušený': 'bg-red-500/15 text-red-400 border-red-500/30',
}

const stavOptions = ['nový', 'vybavený', 'zrušený'] as const

export function DopytTable({ dopyty: init }: { dopyty: DopytWithPolozky[] }) {
  const [dopyty, setDopyty] = useState(init)
  const [openId, setOpenId] = useState<number | null>(null)
  const [saving, setSaving] = useState<number | null>(null)
  const [filterStav, setFilterStav] = useState<string>('všetky')
  const [poznamky, setPoznamky] = useState<Record<number, string>>(
    Object.fromEntries(init.map((d) => [d.id, d.poznamka_admin ?? '']))
  )

  const filtered = filterStav === 'všetky'
    ? dopyty
    : dopyty.filter((d) => d.stav === filterStav)

  const updateStav = async (id: number, stav: string) => {
    setSaving(id)
    const res = await fetch('/api/admin/dopyt', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, stav }),
    })
    if (res.ok) {
      const { dopyt } = await res.json()
      setDopyty((prev) => prev.map((d) => d.id === id ? { ...d, ...dopyt } : d))
    }
    setSaving(null)
  }

  const savePoznamka = async (id: number) => {
    setSaving(id)
    await fetch('/api/admin/dopyt', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, poznamka: poznamky[id] }),
    })
    setSaving(null)
  }

  const counts = {
    všetky: dopyty.length,
    nový: dopyty.filter((d) => d.stav === 'nový').length,
    vybavený: dopyty.filter((d) => d.stav === 'vybavený').length,
    zrušený: dopyty.filter((d) => d.stav === 'zrušený').length,
  }

  return (
    <>
      {/* Filter tabs */}
      <div className="mb-4 flex flex-wrap gap-2">
        {(['všetky', 'nový', 'vybavený', 'zrušený'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilterStav(s)}
            className={`rounded-sm border px-4 py-1.5 font-heading text-xs uppercase tracking-wide transition-colors ${
              filterStav === s
                ? 'border-[#1e6fff] bg-[#1e6fff]/10 text-[#1e6fff]'
                : 'border-[#1a2a45] text-[#6b7fa3] hover:border-[#1e6fff] hover:text-[#1e6fff]'
            }`}
          >
            {s} {counts[s] > 0 && <span className="ml-1 opacity-60">({counts[s]})</span>}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-sm border border-[#1a2a45] bg-[#0a1628] px-6 py-12 text-center text-sm text-[#6b7fa3]">
          Žiadne dopyty v tejto kategórii.
        </div>
      )}

      <div className="flex flex-col gap-3">
        {filtered.map((d) => {
          const isOpen = openId === d.id

          return (
            <div key={d.id} className="rounded-sm border border-[#1a2a45] bg-[#0a1628] overflow-hidden">
              {/* Riadok */}
              <button
                onClick={() => setOpenId(isOpen ? null : d.id)}
                className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-[#0f1e38] transition-colors"
              >
                {/* Číslo + stav */}
                <div className="shrink-0">
                  <p className="font-heading text-sm font-bold text-[#1e6fff]">{d.cislo_dopytu}</p>
                  <span className={`mt-1 inline-block rounded-sm border px-2 py-0.5 font-heading text-[10px] uppercase tracking-wide ${stavStyle[d.stav]}`}>
                    {d.stav}
                  </span>
                </div>

                {/* Zákazník */}
                <div className="flex-1 min-w-0">
                  <p className="font-heading text-sm font-semibold text-[#e2e8f0]">{d.meno}</p>
                  <p className="text-xs text-[#6b7fa3] truncate">{d.firma ? `${d.firma} · ` : ''}{d.email}</p>
                </div>

                {/* Produkty count */}
                <div className="shrink-0 text-center hidden sm:block">
                  <p className="font-heading text-lg font-bold text-white">{d.dopyt_polozky.length}</p>
                  <p className="text-xs text-[#6b7fa3]">položiek</p>
                </div>

                {/* Dátum */}
                <div className="shrink-0 text-right hidden md:block">
                  <p className="text-xs text-[#6b7fa3]">
                    {new Date(d.created_at).toLocaleDateString('sk-SK', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                  </p>
                  <p className="text-xs text-[#6b7fa3]">
                    {new Date(d.created_at).toLocaleTimeString('sk-SK', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                {/* Šípka */}
                <svg
                  className={`h-4 w-4 shrink-0 text-[#6b7fa3] transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Detail */}
              {isOpen && (
                <div className="border-t border-[#1a2a45] px-5 py-5 space-y-5">
                  {/* Kontaktné info */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <p className="font-heading text-xs uppercase tracking-widest text-[#6b7fa3]">Kontakt</p>
                      <div className="space-y-1 text-sm">
                        <p className="text-[#e2e8f0]">{d.meno}{d.firma ? ` · ${d.firma}` : ''}</p>
                        <a href={`mailto:${d.email}`} className="block text-[#1e6fff] hover:underline">{d.email}</a>
                        <a href={`tel:${d.telefon}`} className="block text-[#6b7fa3] hover:text-white">{d.telefon}</a>
                        {d.sprava && (
                          <p className="mt-2 rounded-sm border border-[#1a2a45] bg-[#050d1a] px-3 py-2 text-xs text-[#6b7fa3]">
                            {d.sprava}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Zmena stavu */}
                    <div className="space-y-2">
                      <p className="font-heading text-xs uppercase tracking-widest text-[#6b7fa3]">Stav dopytu</p>
                      <div className="flex flex-wrap gap-2">
                        {stavOptions.map((s) => (
                          <button
                            key={s}
                            disabled={saving === d.id || d.stav === s}
                            onClick={() => updateStav(d.id, s)}
                            className={`rounded-sm border px-3 py-1.5 font-heading text-xs uppercase tracking-wide transition-colors disabled:cursor-not-allowed ${
                              d.stav === s
                                ? stavStyle[s]
                                : 'border-[#1a2a45] text-[#6b7fa3] hover:border-[#1e6fff] hover:text-[#1e6fff] disabled:opacity-40'
                            }`}
                          >
                            {saving === d.id ? '...' : s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Položky */}
                  <div>
                    <p className="mb-2 font-heading text-xs uppercase tracking-widest text-[#6b7fa3]">Objednané produkty</p>
                    <div className="rounded-sm border border-[#1a2a45] overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-[#1a2a45] bg-[#0f1e38]">
                            <th className="px-4 py-2 text-left font-heading text-xs uppercase tracking-wide text-[#6b7fa3]">Produkt</th>
                            <th className="px-4 py-2 text-center font-heading text-xs uppercase tracking-wide text-[#6b7fa3]">Ks</th>
                            <th className="px-4 py-2 text-left font-heading text-xs uppercase tracking-wide text-[#6b7fa3]">Poznámka</th>
                          </tr>
                        </thead>
                        <tbody>
                          {d.dopyt_polozky.map((p) => (
                            <tr key={p.id} className="border-b border-[#1a2a45] last:border-0">
                              <td className="px-4 py-2.5 text-[#e2e8f0]">{p.nazov}</td>
                              <td className="px-4 py-2.5 text-center font-heading font-bold text-white">{p.mnozstvo}</td>
                              <td className="px-4 py-2.5 text-[#6b7fa3]">{p.poznamka || '–'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Interná poznámka */}
                  <div>
                    <p className="mb-2 font-heading text-xs uppercase tracking-widest text-[#6b7fa3]">Interná poznámka</p>
                    <div className="flex gap-2">
                      <textarea
                        rows={2}
                        value={poznamky[d.id] ?? ''}
                        onChange={(e) => setPoznamky((prev) => ({ ...prev, [d.id]: e.target.value }))}
                        placeholder="Poznámka pre interné účely..."
                        className="flex-1 resize-none rounded-sm border border-[#1a2a45] bg-[#050d1a] px-3 py-2 text-sm text-[#e2e8f0] placeholder-[#2a3a55] focus:border-[#1e6fff] focus:outline-none"
                      />
                      <button
                        onClick={() => savePoznamka(d.id)}
                        disabled={saving === d.id}
                        className="shrink-0 self-end rounded-sm border border-[#1a2a45] px-4 py-2 font-heading text-xs uppercase tracking-wide text-[#6b7fa3] transition-colors hover:border-[#1e6fff] hover:text-[#1e6fff] disabled:opacity-40"
                      >
                        Uložiť
                      </button>
                    </div>
                  </div>

                  {/* Akcie */}
                  <div className="flex gap-3 pt-1 border-t border-[#1a2a45]">
                    <a
                      href={`mailto:${d.email}?subject=Dopyt č. ${d.cislo_dopytu}&body=Dobrý deň ${d.meno},%0A%0A`}
                      className="rounded-sm border border-[#1a2a45] px-4 py-2 font-heading text-xs uppercase tracking-wide text-[#6b7fa3] transition-colors hover:border-[#1e6fff] hover:text-[#1e6fff]"
                    >
                      ✉ Odpovedať emailom
                    </a>
                    <a
                      href={`tel:${d.telefon}`}
                      className="rounded-sm border border-[#1a2a45] px-4 py-2 font-heading text-xs uppercase tracking-wide text-[#6b7fa3] transition-colors hover:border-[#1e6fff] hover:text-[#1e6fff]"
                    >
                      ✆ Zavolať
                    </a>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}
