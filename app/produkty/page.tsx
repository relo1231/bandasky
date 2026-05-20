import type { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import type { Kategoria, Produkt } from '@/types'
import { ProduktKarta } from '@/components/ProduktKarta'

export const metadata: Metadata = {
  title: 'Nádrže – 1000L IBC kontajnery',
  description: 'Nové a repasované 1000L IBC nádrže na vodu. Skladom, rýchla doprava.',
}

async function getKategorie(): Promise<Kategoria[]> {
  const { data } = await supabase.from('kategorie').select('*').order('nazov')
  return data ?? []
}

async function getProdukty(kategoriaSlug?: string): Promise<Produkt[]> {
  let query = supabase
    .from('produkty')
    .select('*, kategorie(*)')
    .eq('aktivny', true)
    .order('zoradenie', { ascending: false })

  if (kategoriaSlug) {
    const { data: kat } = await supabase
      .from('kategorie')
      .select('id')
      .eq('slug', kategoriaSlug)
      .single()
    if (kat) query = query.eq('kategoria_id', kat.id)
  }

  const { data } = await query
  return data ?? []
}

type Props = { searchParams: Promise<{ kategoria?: string }> }

export default async function ProduktyPage({ searchParams }: Props) {
  const { kategoria } = await searchParams
  const [kategorie, produkty] = await Promise.all([getKategorie(), getProdukty(kategoria)])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Ponuka</p>
          <h1 className="mt-2 font-heading text-5xl font-bold uppercase tracking-wide text-slate-900">
            IBC Nádrže
          </h1>
          <p className="mt-3 max-w-xl text-slate-500">
            Nové a repasované 1000L kontajnery na vodu. Pridajte do dopytu a my vám zašleme ponuku.
          </p>

          {/* Filters */}
          <div className="mt-8 flex flex-wrap gap-2">
            <a
              href="/produkty"
              className={`rounded-full border px-5 py-2 font-heading text-sm font-semibold uppercase tracking-widest transition-all ${
                !kategoria
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-200 text-slate-500 hover:border-slate-900 hover:text-slate-900'
              }`}
            >
              Všetky
            </a>
            {kategorie.map((kat) => (
              <a
                key={kat.id}
                href={`/produkty?kategoria=${kat.slug}`}
                className={`rounded-full border px-5 py-2 font-heading text-sm font-semibold uppercase tracking-widest transition-all ${
                  kategoria === kat.slug
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-200 text-slate-500 hover:border-slate-900 hover:text-slate-900'
                }`}
              >
                {kat.nazov}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {produkty.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {produkty.map((p) => (
              <ProduktKarta key={p.id} produkt={p} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h2 className="mt-6 font-heading text-xl font-bold uppercase tracking-wide text-slate-700">
              Žiadne produkty v tejto kategórii
            </h2>
            <p className="mt-2 text-slate-400">Skúste zobraziť všetky nádrže.</p>
            <a
              href="/produkty"
              className="mt-6 rounded-md bg-slate-900 px-6 py-3 font-heading text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-slate-700"
            >
              Zobraziť všetky
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
