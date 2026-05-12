'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useKosik } from '@/components/KosikProvider'
import type { DopytFormData, DopytResponse } from '@/types'

export default function KosikPage() {
  const router = useRouter()
  const { polozky, odober, zmenMnozstvo, zmenPoznamku, vyprazdni } = useKosik()

  const [form, setForm] = useState({
    meno: '',
    firma: '',
    email: '',
    telefon: '',
    sprava: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.meno.trim()) e.meno = 'Meno je povinné'
    if (!form.email.trim()) e.email = 'Email je povinný'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Neplatný email'
    if (!form.telefon.trim()) e.telefon = 'Telefón je povinný'
    if (polozky.length === 0) e.polozky = 'Dopyt je prázdny'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setSubmitting(true)
    setServerError('')

    const body: DopytFormData = {
      meno: form.meno,
      firma: form.firma || undefined,
      email: form.email,
      telefon: form.telefon,
      sprava: form.sprava || undefined,
      polozky,
    }

    try {
      const res = await fetch('/api/dopyt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data: DopytResponse = await res.json()
      if (data.success && data.cisloDopytu) {
        vyprazdni()
        router.push(`/dakujeme?cislo=${data.cisloDopytu}`)
      } else {
        setServerError(data.error ?? 'Nastala chyba. Skúste znova.')
      }
    } catch {
      setServerError('Nastala sieťová chyba. Skúste znova.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    'w-full rounded-sm border border-[#1a2a45] bg-[#0a1628] px-4 py-2.5 font-body text-sm text-[#e2e8f0] placeholder-[#2a3a55] focus:border-[#1e6fff] focus:outline-none transition-colors'
  const labelClass = 'block font-heading text-xs uppercase tracking-widest text-[#6b7fa3] mb-1.5'

  if (polozky.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-6xl opacity-30">💧</div>
          <h1 className="mt-6 font-heading text-3xl font-bold uppercase tracking-wide text-white">
            Dopyt je prázdny
          </h1>
          <p className="mt-3 text-[#6b7fa3]">Pridajte nádrže do dopytu a pošlite nám ho.</p>
          <Link
            href="/produkty"
            className="mt-8 inline-block bg-[#1e6fff] px-8 py-3.5 font-heading text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#1458d6]"
          >
            Zobraziť nádrže
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="font-heading text-4xl font-bold uppercase tracking-wide text-white">
          Váš dopyt
        </h1>
        <div className="mt-3 h-1 w-16 bg-[#1e6fff]" />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Položky */}
          <div className="lg:col-span-2">
            <h2 className="mb-4 font-heading text-lg font-semibold uppercase tracking-wide text-white">
              Vybrané nádrže ({polozky.length})
            </h2>
            <div className="space-y-3">
              {polozky.map((p) => (
                <div key={p.produktId} className="rounded-sm border border-[#1a2a45] bg-[#0a1628] p-4">
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-heading font-semibold uppercase tracking-wide text-[#e2e8f0]">
                      {p.nazov}
                    </p>
                    <button
                      type="button"
                      onClick={() => odober(p.produktId)}
                      className="shrink-0 text-[#6b7fa3] transition-colors hover:text-red-400"
                      aria-label="Odstrániť"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    <span className="font-heading text-xs uppercase tracking-widest text-[#6b7fa3]">Ks:</span>
                    <div className="flex items-center border border-[#1a2a45]">
                      <button type="button"
                        onClick={() => zmenMnozstvo(p.produktId, p.mnozstvo - 1)}
                        className="w-8 py-1 text-center text-[#6b7fa3] hover:bg-[#0f1e38] hover:text-[#1e6fff] transition-colors"
                      >−</button>
                      <span className="w-10 py-1 text-center font-heading font-semibold text-[#e2e8f0]">
                        {p.mnozstvo}
                      </span>
                      <button type="button"
                        onClick={() => zmenMnozstvo(p.produktId, p.mnozstvo + 1)}
                        className="w-8 py-1 text-center text-[#6b7fa3] hover:bg-[#0f1e38] hover:text-[#1e6fff] transition-colors"
                      >+</button>
                    </div>
                  </div>

                  <div className="mt-3">
                    <input
                      type="text"
                      value={p.poznamka ?? ''}
                      onChange={(e) => zmenPoznamku(p.produktId, e.target.value)}
                      placeholder="Poznámka k produktu..."
                      className="w-full rounded-sm border border-[#1a2a45] bg-[#050d1a] px-3 py-1.5 text-sm text-[#6b7fa3] placeholder-[#1a2a45] focus:border-[#1e6fff] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formulár */}
          <div className="rounded-sm border border-[#1a2a45] bg-[#0a1628] p-6 lg:col-span-1 h-fit">
            <h2 className="mb-6 font-heading text-lg font-semibold uppercase tracking-wide text-white">
              Kontaktné údaje
            </h2>

            <div className="space-y-4">
              <div>
                <label className={labelClass}>Meno a priezvisko *</label>
                <input type="text" value={form.meno}
                  onChange={(e) => setForm({ ...form, meno: e.target.value })}
                  placeholder="Ján Novák"
                  className={`${inputClass} ${errors.meno ? 'border-red-500' : ''}`}
                />
                {errors.meno && <p className="mt-1 text-xs text-red-400">{errors.meno}</p>}
              </div>

              <div>
                <label className={labelClass}>Firma / IČO (voliteľné)</label>
                <input type="text" value={form.firma}
                  onChange={(e) => setForm({ ...form, firma: e.target.value })}
                  placeholder="ABC s.r.o."
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Email *</label>
                <input type="email" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="jan@firma.sk"
                  className={`${inputClass} ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
              </div>

              <div>
                <label className={labelClass}>Telefón *</label>
                <input type="tel" value={form.telefon}
                  onChange={(e) => setForm({ ...form, telefon: e.target.value })}
                  placeholder="+421 900 123 456"
                  className={`${inputClass} ${errors.telefon ? 'border-red-500' : ''}`}
                />
                {errors.telefon && <p className="mt-1 text-xs text-red-400">{errors.telefon}</p>}
              </div>

              <div>
                <label className={labelClass}>Správa / poznámka</label>
                <textarea value={form.sprava}
                  onChange={(e) => setForm({ ...form, sprava: e.target.value })}
                  rows={4}
                  placeholder="Napr. miesto doručenia, termín..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {serverError && (
                <div className="rounded-sm border border-red-500 bg-red-950 px-4 py-3 text-sm text-red-400">
                  {serverError}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 font-heading font-semibold uppercase tracking-widest bg-[#1e6fff] text-white transition-all hover:bg-[#1458d6] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? 'Odosiela sa...' : 'Odoslať dopyt'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
