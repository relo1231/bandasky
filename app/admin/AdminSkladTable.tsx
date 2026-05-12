'use client'

import { useState, useRef } from 'react'
import type { Produkt, Kategoria } from '@/types'

type Props = { produkty: Produkt[]; kategorie: Kategoria[] }

const dostupnostOptions = ['Na sklade', 'Na objednávku', 'Nedostupné'] as const

const dostupnostStyle: Record<string, string> = {
  'Na sklade': 'text-green-400',
  'Na objednávku': 'text-blue-400',
  'Nedostupné': 'text-red-400',
}

type EditForm = {
  nazov: string
  slug: string
  popis: string
  kratky_popis: string
  cena_od: string
  jednotka: string
  kategoria_id: string
  obrazok_url: string
  dostupnost: string
  pocet_sklad: string
  zoradenie: string
  aktivny: boolean
}

function produktToForm(p: Produkt): EditForm {
  return {
    nazov: p.nazov,
    slug: p.slug,
    popis: p.popis ?? '',
    kratky_popis: p.kratky_popis ?? '',
    cena_od: p.cena_od?.toString() ?? '',
    jednotka: p.jednotka,
    kategoria_id: p.kategoria_id?.toString() ?? '',
    obrazok_url: p.obrazok_url ?? '',
    dostupnost: p.dostupnost,
    pocet_sklad: p.pocet_sklad?.toString() ?? '0',
    zoradenie: p.zoradenie?.toString() ?? '0',
    aktivny: p.aktivny,
  }
}

export function AdminSkladTable({ produkty: init, kategorie }: Props) {
  const [produkty, setProdukty] = useState(init)
  const [saving, setSaving] = useState<number | null>(null)
  const [saved, setSaved] = useState<number | null>(null)
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState<EditForm | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const quickUpdate = async (id: number, field: 'pocet_sklad' | 'dostupnost', value: number | string) => {
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

  const openEdit = (p: Produkt) => {
    setForm(produktToForm(p))
    setEditId(p.id)
  }

  const closeEdit = () => {
    setEditId(null)
    setForm(null)
  }

  const handleUpload = async (file: File) => {
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    if (res.ok) {
      const { url } = await res.json()
      setForm((f) => f ? { ...f, obrazok_url: url } : f)
    }
    setUploading(false)
  }

  const saveEdit = async () => {
    if (!form || editId === null) return
    setSaving(editId)
    const res = await fetch('/api/admin/sklad', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: editId,
        nazov: form.nazov,
        slug: form.slug,
        popis: form.popis || null,
        kratky_popis: form.kratky_popis || null,
        cena_od: form.cena_od ? parseFloat(form.cena_od) : null,
        jednotka: form.jednotka,
        kategoria_id: form.kategoria_id ? parseInt(form.kategoria_id) : null,
        obrazok_url: form.obrazok_url || null,
        dostupnost: form.dostupnost,
        pocet_sklad: parseInt(form.pocet_sklad) || 0,
        zoradenie: parseInt(form.zoradenie) || 0,
        aktivny: form.aktivny,
      }),
    })
    if (res.ok) {
      const { produkt } = await res.json()
      setProdukty((prev) => prev.map((p) => (p.id === editId ? { ...p, ...produkt } : p)))
      closeEdit()
    }
    setSaving(null)
  }

  const field = (label: string, node: React.ReactNode) => (
    <div>
      <label className="mb-1 block font-heading text-xs uppercase tracking-widest text-[#6b7fa3]">{label}</label>
      {node}
    </div>
  )

  const inp = (className = '') =>
    `w-full rounded-sm border border-[#1a2a45] bg-[#050d1a] px-3 py-2 text-sm text-[#e2e8f0] focus:border-[#1e6fff] focus:outline-none ${className}`

  return (
    <>
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
                <th className="px-4 py-3 text-center font-heading text-xs uppercase tracking-widest text-[#6b7fa3]"></th>
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
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        {p.obrazok_url && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={p.obrazok_url} alt="" className="h-10 w-10 rounded-sm object-cover opacity-80" />
                        )}
                        <div>
                          <p className="font-heading text-sm font-semibold uppercase tracking-wide text-[#e2e8f0]">
                            {p.nazov}
                          </p>
                          {p.cena_od && (
                            <p className="text-xs text-[#6b7fa3]">od {p.cena_od} € / {p.jednotka}</p>
                          )}
                          {!p.aktivny && (
                            <span className="text-xs text-red-400">Neaktívny</span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-sm text-[#6b7fa3]">
                      {kat?.nazov ?? '–'}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => quickUpdate(p.id, 'pocet_sklad', kusy - 1)}
                          disabled={kusy <= 0 || saving === p.id}
                          className="flex h-7 w-7 items-center justify-center border border-[#1a2a45] text-[#6b7fa3] transition-colors hover:border-[#1e6fff] hover:text-[#1e6fff] disabled:opacity-30"
                        >
                          −
                        </button>
                        <span className={`w-10 text-center font-heading text-lg font-bold ${nizkySklad ? 'text-amber-400' : 'text-white'}`}>
                          {kusy}
                        </span>
                        <button
                          onClick={() => quickUpdate(p.id, 'pocet_sklad', kusy + 1)}
                          disabled={saving === p.id}
                          className="flex h-7 w-7 items-center justify-center border border-[#1a2a45] text-[#6b7fa3] transition-colors hover:border-[#1e6fff] hover:text-[#1e6fff]"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <select
                        value={p.dostupnost}
                        onChange={(e) => quickUpdate(p.id, 'dostupnost', e.target.value)}
                        disabled={saving === p.id}
                        className={`rounded-sm border border-[#1a2a45] bg-[#050d1a] px-3 py-1.5 font-heading text-xs uppercase tracking-wide focus:border-[#1e6fff] focus:outline-none transition-colors disabled:opacity-50 ${dostupnostStyle[p.dostupnost] ?? 'text-[#6b7fa3]'}`}
                      >
                        {dostupnostOptions.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </td>

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

                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => openEdit(p)}
                        className="rounded-sm border border-[#1a2a45] px-3 py-1.5 font-heading text-xs uppercase tracking-wide text-[#6b7fa3] transition-colors hover:border-[#1e6fff] hover:text-[#1e6fff]"
                      >
                        Upraviť
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit modal */}
      {editId !== null && form && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 px-4 py-10">
          <div className="w-full max-w-2xl rounded-sm border border-[#1a2a45] bg-[#0a1628] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1a2a45] px-6 py-4">
              <h2 className="font-heading text-lg font-bold uppercase tracking-wide text-white">Upraviť produkt</h2>
              <button onClick={closeEdit} className="text-[#6b7fa3] hover:text-white">✕</button>
            </div>

            <div className="space-y-5 px-6 py-6">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {field('Názov', (
                  <input className={inp()} value={form.nazov} onChange={(e) => setForm({ ...form, nazov: e.target.value })} />
                ))}
                {field('Slug (URL)', (
                  <input className={inp()} value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
                ))}
              </div>

              {field('Krátky popis', (
                <input className={inp()} value={form.kratky_popis} onChange={(e) => setForm({ ...form, kratky_popis: e.target.value })} />
              ))}

              {field('Popis', (
                <textarea
                  className={inp('min-h-[100px] resize-y')}
                  value={form.popis}
                  onChange={(e) => setForm({ ...form, popis: e.target.value })}
                />
              ))}

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                {field('Cena od (€)', (
                  <input type="number" step="0.01" min="0" className={inp()} value={form.cena_od} onChange={(e) => setForm({ ...form, cena_od: e.target.value })} />
                ))}
                {field('Jednotka', (
                  <input className={inp()} value={form.jednotka} onChange={(e) => setForm({ ...form, jednotka: e.target.value })} />
                ))}
                {field('Kategória', (
                  <select className={inp()} value={form.kategoria_id} onChange={(e) => setForm({ ...form, kategoria_id: e.target.value })}>
                    <option value="">— bez kategórie —</option>
                    {kategorie.map((k) => (
                      <option key={k.id} value={k.id}>{k.nazov}</option>
                    ))}
                  </select>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                {field('Kusov na sklade', (
                  <input type="number" min="0" className={inp()} value={form.pocet_sklad} onChange={(e) => setForm({ ...form, pocet_sklad: e.target.value })} />
                ))}
                {field('Dostupnosť', (
                  <select className={inp()} value={form.dostupnost} onChange={(e) => setForm({ ...form, dostupnost: e.target.value })}>
                    {dostupnostOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                ))}
                {field('Zoradenie', (
                  <input type="number" className={inp()} value={form.zoradenie} onChange={(e) => setForm({ ...form, zoradenie: e.target.value })} />
                ))}
              </div>

              {field('Fotka', (
                <div className="space-y-2">
                  <input className={inp()} value={form.obrazok_url} placeholder="https://..." onChange={(e) => setForm({ ...form, obrazok_url: e.target.value })} />
                  <div className="flex items-center gap-3">
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f) }}
                    />
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      disabled={uploading}
                      className="rounded-sm border border-[#1a2a45] px-3 py-1.5 font-heading text-xs uppercase tracking-wide text-[#6b7fa3] transition-colors hover:border-[#1e6fff] hover:text-[#1e6fff] disabled:opacity-50"
                    >
                      {uploading ? 'Nahrávam...' : 'Nahrať súbor'}
                    </button>
                    {form.obrazok_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={form.obrazok_url} alt="" className="h-12 w-12 rounded-sm object-cover" />
                    )}
                  </div>
                </div>
              ))}

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="aktivny"
                  checked={form.aktivny}
                  onChange={(e) => setForm({ ...form, aktivny: e.target.checked })}
                  className="h-4 w-4 accent-[#1e6fff]"
                />
                <label htmlFor="aktivny" className="font-heading text-sm uppercase tracking-wide text-[#6b7fa3]">
                  Aktívny produkt (zobrazuje sa na webe)
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-[#1a2a45] px-6 py-4">
              <button
                onClick={closeEdit}
                className="rounded-sm border border-[#1a2a45] px-5 py-2 font-heading text-xs uppercase tracking-wide text-[#6b7fa3] transition-colors hover:border-[#1e6fff] hover:text-[#1e6fff]"
              >
                Zrušiť
              </button>
              <button
                onClick={saveEdit}
                disabled={saving === editId || uploading}
                className="rounded-sm bg-[#1e6fff] px-5 py-2 font-heading text-xs uppercase tracking-wide text-white transition-opacity hover:opacity-80 disabled:opacity-50"
              >
                {saving === editId ? 'Ukladám...' : 'Uložiť zmeny'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
