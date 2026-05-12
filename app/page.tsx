import type { Metadata } from 'next'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { Kategoria, Produkt } from '@/types'
import { ProduktKarta } from '@/components/ProduktKarta'

export const metadata: Metadata = {
  title: 'Domov',
  description: 'B2B dopytový e-shop – vyberte produkty a pošlite dopyt.',
}

const kategoriaIkony: Record<string, string> = {
  stroje: '⚙️',
  prislusenstvo: '🔧',
  servis: '🛠️',
}

async function getKategorie(): Promise<Kategoria[]> {
  const { data } = await supabase.from('kategorie').select('*').order('nazov')
  return data ?? []
}

async function getFeaturedProdukty(): Promise<Produkt[]> {
  const { data } = await supabase
    .from('produkty')
    .select('*, kategorie(*)')
    .eq('aktivny', true)
    .order('zoradenie', { ascending: false })
    .limit(4)
  return data ?? []
}

export default async function HomePage() {
  const [kategorie, featuredProdukty] = await Promise.all([
    getKategorie(),
    getFeaturedProdukty(),
  ])

  const nazovFirmy = process.env.NEXT_PUBLIC_NAZOV_FIRMY ?? 'B2B Shop'

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-[#0a0a0a]">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 49px, #2a2a2a 50px), repeating-linear-gradient(90deg, transparent, transparent 49px, #2a2a2a 50px)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <p className="mb-4 font-heading text-sm font-semibold uppercase tracking-[0.3em] text-gold">
            Profesionálne riešenia
          </p>
          <h1 className="font-heading text-5xl font-bold uppercase leading-tight tracking-tight text-[#e8e8e8] sm:text-6xl lg:text-7xl">
            {nazovFirmy}
          </h1>
          <p className="mx-auto mt-6 max-w-xl font-body text-lg text-[#888]">
            Vyberte si z nášho sortimentu, pošlite dopyt a my vám pripravíme cenovú ponuku na mieru.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/produkty"
              className="btn-primary inline-block bg-gold px-8 py-3 font-heading text-sm font-semibold uppercase tracking-widest text-[#0a0a0a] transition-colors hover:bg-gold-dark"
            >
              Pozrieť produkty
            </Link>
            <Link
              href="/kosik"
              className="inline-block border border-gold px-8 py-3 font-heading text-sm font-semibold uppercase tracking-widest text-gold transition-all hover:bg-gold hover:text-[#0a0a0a]"
            >
              Košík
            </Link>
          </div>
        </div>
      </section>

      {/* Kategórie */}
      {kategorie.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="mb-10 font-heading text-3xl font-bold uppercase tracking-wide text-[#e8e8e8]">
            Kategórie
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {kategorie.map((kat) => (
              <Link
                key={kat.id}
                href={`/produkty?kategoria=${kat.slug}`}
                className="group flex items-center gap-4 rounded-sm border border-[#2a2a2a] bg-[#141414] p-5 transition-all duration-200 hover:border-gold hover:bg-[#1a1a1a]"
              >
                <span className="text-3xl">{kategoriaIkony[kat.slug] ?? '📦'}</span>
                <div>
                  <p className="font-heading text-base font-semibold uppercase tracking-wide text-[#e8e8e8] group-hover:text-gold transition-colors">
                    {kat.nazov}
                  </p>
                  {kat.popis && (
                    <p className="mt-0.5 text-sm text-[#888]">{kat.popis}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured produkty */}
      {featuredProdukty.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="font-heading text-3xl font-bold uppercase tracking-wide text-[#e8e8e8]">
              Vybrané produkty
            </h2>
            <Link
              href="/produkty"
              className="font-heading text-sm font-semibold uppercase tracking-widest text-gold transition-colors hover:text-gold-dark"
            >
              Všetky →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProdukty.map((p) => (
              <ProduktKarta key={p.id} produkt={p} />
            ))}
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="border-y border-[#2a2a2a] bg-[#141414] py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-3xl font-bold uppercase tracking-wide text-[#e8e8e8]">
            Máte záujem?
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-body text-[#888]">
            Pošlite dopyt – ozvonime do 24 hodín a pripravíme vám cenovú ponuku na mieru.
          </p>
          <Link
            href="/produkty"
            className="btn-primary mt-8 inline-block bg-gold px-10 py-3 font-heading text-sm font-semibold uppercase tracking-widest text-[#0a0a0a] transition-colors hover:bg-gold-dark"
          >
            Pozrieť produkty
          </Link>
        </div>
      </section>
    </>
  )
}
