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
    'w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-slate-900 focus:outline-none'
  const labelClass = 'block font-heading text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1.5'

  if (polozky.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h1 className="mt-6 font-heading text-3xl font-bold uppercase tracking-wide text-slate-900">
            Dopyt je prázdny
          </h1>
          <p className="mt-3 text-slate-500">Pridajte nádrže do dopytu a pošlite nám ho.</p>
          <Link
            href="/produkty"
            className="mt-8 inline-block rounded-lg bg-slate-900 px-8 py-3.5 font-heading text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-slate-700"
          >
            Zobraziť nádrže
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Objednávka</p>
          <h1 className="mt-2 font-heading text-4xl font-bold uppercase tracking-wide text-slate-900">
            Váš dopyt
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Položky */}
            <div className="lg:col-span-2">
              <h2 className="mb-4 font-heading text-sm font-bold uppercase tracking-widest text-slate-500">
                Vybrané nádrže ({polozky.length})
              </h2>
              <div className="space-y-3">
                {polozky.map((p) => (
                  <div key={p.produktId} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <p className="font-heading font-bold uppercase tracking-wide text-slate-900">
                        {p.nazov}
                      </p>
                      <button
                        type="button"
                        onClick={() => odober(p.produktId)}
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900"
                        aria-label="Odstrániť"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <span className="font-heading text-xs font-semibold uppercase tracking-widest text-slate-400">Počet ks:</span>
                      <div className="flex items-center overflow-hidden rounded-lg border border-slate-200">
                        <button type="button"
                          onClick={() => zmenMnozstvo(p.produktId, p.mnozstvo - 1)}
                          className="w-9 py-1.5 text-center text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                        >−</button>
                        <span className="w-10 py-1.5 text-center font-heading font-bold text-slate-900 text-sm">
                          {p.mnozstvo}
                        </span>
                        <button type="button"
                          onClick={() => zmenMnozstvo(p.produktId, p.mnozstvo + 1)}
                          className="w-9 py-1.5 text-center text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                        >+</button>
                      </div>
                    </div>

                    <div className="mt-3">
                      <input
                        type="text"
                        value={p.poznamka ?? ''}
                        onChange={(e) => zmenPoznamku(p.produktId, e.target.value)}
                        placeholder="Poznámka k produktu..."
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder-slate-400 transition-colors focus:border-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <Link href="/produkty" className="text-sm text-slate-400 transition-colors hover:text-slate-900">
                  ← Pridať ďalší produkt
                </Link>
              </div>
            </div>

            {/* Formulár */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm h-fit">
              <h2 className="mb-6 font-heading text-sm font-bold uppercase tracking-widest text-slate-500">
                Kontaktné údaje
              </h2>

              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Meno a priezvisko *</label>
                  <input type="text" value={form.meno}
                    onChange={(e) => setForm({ ...form, meno: e.target.value })}
                    placeholder="Ján Novák"
                    className={`${inputClass} ${errors.meno ? 'border-red-400' : ''}`}
                  />
                  {errors.meno && <p className="mt-1 text-xs text-red-500">{errors.meno}</p>}
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
                    className={`${inputClass} ${errors.email ? 'border-red-400' : ''}`}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <label className={labelClass}>Telefón *</label>
                  <input type="tel" value={form.telefon}
                    onChange={(e) => setForm({ ...form, telefon: e.target.value })}
                    placeholder="+421 900 123 456"
                    className={`${inputClass} ${errors.telefon ? 'border-red-400' : ''}`}
                  />
                  {errors.telefon && <p className="mt-1 text-xs text-red-500">{errors.telefon}</p>}
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
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {serverError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-lg py-3.5 font-heading font-bold uppercase tracking-widest bg-slate-900 text-white transition-all hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? 'Odosiela sa...' : 'Odoslať dopyt'}
                </button>

                <p className="text-center text-xs text-slate-400">
                  Nezáväzný dopyt · Odpoveď do 24 hodín
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
