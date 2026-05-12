'use client'

import type { Metadata } from 'next'
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
    if (polozky.length === 0) e.polozky = 'Košík je prázdny'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
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
    'w-full rounded-sm border border-[#2a2a2a] bg-[#141414] px-4 py-2.5 font-body text-sm text-[#e8e8e8] placeholder-[#444] focus:border-gold focus:outline-none transition-colors'
  const labelClass = 'block font-heading text-xs uppercase tracking-widest text-[#888] mb-1.5'

  if (polozky.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-6xl">🛒</div>
          <h1 className="mt-6 font-heading text-3xl font-bold uppercase tracking-wide text-[#e8e8e8]">
            Košík je prázdny
          </h1>
          <p className="mt-3 text-[#888]">Pridajte produkty do košíka a pošlite dopyt.</p>
          <Link
            href="/produkty"
            className="btn-primary mt-8 inline-block bg-gold px-8 py-3 font-heading text-sm font-semibold uppercase tracking-widest text-[#0a0a0a] transition-colors hover:bg-gold-dark"
          >
            Späť na produkty
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-10 font-heading text-4xl font-bold uppercase tracking-wide text-[#e8e8e8]">
        Košík & Dopyt
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Položky košíka */}
          <div className="lg:col-span-2">
            <h2 className="mb-4 font-heading text-lg font-semibold uppercase tracking-wide text-[#e8e8e8]">
              Produkty ({polozky.length})
            </h2>
            <div className="space-y-3">
              {polozky.map((p) => (
                <div
                  key={p.produktId}
                  className="rounded-sm border border-[#2a2a2a] bg-[#141414] p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-heading font-semibold uppercase tracking-wide text-[#e8e8e8]">
                      {p.nazov}
                    </p>
                    <button
                      type="button"
                      onClick={() => odober(p.produktId)}
                      className="shrink-0 text-[#888] transition-colors hover:text-[#f44336]"
                      aria-label="Odstrániť"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    <span className="font-heading text-xs uppercase tracking-widest text-[#888]">
                      Množstvo:
                    </span>
                    <div className="flex items-center border border-[#2a2a2a]">
                      <button
                        type="button"
                        onClick={() => zmenMnozstvo(p.produktId, p.mnozstvo - 1)}
                        className="w-8 py-1 text-center text-[#888] hover:bg-[#1a1a1a] hover:text-gold transition-colors"
                      >
                        −
                      </button>
                      <span className="w-10 py-1 text-center font-heading font-semibold text-[#e8e8e8]">
                        {p.mnozstvo}
                      </span>
                      <button
                        type="button"
                        onClick={() => zmenMnozstvo(p.produktId, p.mnozstvo + 1)}
                        className="w-8 py-1 text-center text-[#888] hover:bg-[#1a1a1a] hover:text-gold transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="mt-3">
                    <input
                      type="text"
                      value={p.poznamka ?? ''}
                      onChange={(e) => zmenPoznamku(p.produktId, e.target.value)}
                      placeholder="Poznámka k produktu..."
                      className="w-full rounded-sm border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-1.5 text-sm text-[#888] placeholder-[#333] focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formulár */}
          <div className="rounded-sm border border-[#2a2a2a] bg-[#141414] p-6 lg:col-span-1 h-fit">
            <h2 className="mb-6 font-heading text-lg font-semibold uppercase tracking-wide text-[#e8e8e8]">
              Kontaktné údaje
            </h2>

            <div className="space-y-4">
              <div>
                <label className={labelClass}>Meno a priezvisko *</label>
                <input
                  type="text"
                  value={form.meno}
                  onChange={(e) => setForm({ ...form, meno: e.target.value })}
                  placeholder="Ján Novák"
                  className={`${inputClass} ${errors.meno ? 'border-[#f44336]' : ''}`}
                />
                {errors.meno && <p className="mt-1 text-xs text-[#f44336]">{errors.meno}</p>}
              </div>

              <div>
                <label className={labelClass}>Firma / IČO (voliteľné)</label>
                <input
                  type="text"
                  value={form.firma}
                  onChange={(e) => setForm({ ...form, firma: e.target.value })}
                  placeholder="ABC s.r.o."
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="jan@firma.sk"
                  className={`${inputClass} ${errors.email ? 'border-[#f44336]' : ''}`}
                />
                {errors.email && <p className="mt-1 text-xs text-[#f44336]">{errors.email}</p>}
              </div>

              <div>
                <label className={labelClass}>Telefón *</label>
                <input
                  type="tel"
                  value={form.telefon}
                  onChange={(e) => setForm({ ...form, telefon: e.target.value })}
                  placeholder="+421 900 123 456"
                  className={`${inputClass} ${errors.telefon ? 'border-[#f44336]' : ''}`}
                />
                {errors.telefon && <p className="mt-1 text-xs text-[#f44336]">{errors.telefon}</p>}
              </div>

              <div>
                <label className={labelClass}>Správa / poznámka k dopytu</label>
                <textarea
                  value={form.sprava}
                  onChange={(e) => setForm({ ...form, sprava: e.target.value })}
                  rows={4}
                  placeholder="Prosím o cenovú ponuku..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {serverError && (
                <div className="rounded-sm border border-[#f44336] bg-[#3a1a1a] px-4 py-3 text-sm text-[#f44336]">
                  {serverError}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full py-3 font-heading font-semibold uppercase tracking-widest bg-gold text-[#0a0a0a] transition-all hover:bg-gold-dark disabled:cursor-not-allowed disabled:opacity-60"
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
