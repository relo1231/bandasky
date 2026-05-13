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
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12 border-b border-[#1a1a1a] pb-10">
        <div className="mb-4 inline-flex items-center gap-2">
          <div className="h-0.5 w-8 bg-[#e8001e]" />
          <span className="font-heading text-xs font-bold uppercase tracking-[0.25em] text-[#e8001e]">
            Ponuka
          </span>
        </div>
        <h1 className="font-heading text-5xl font-bold uppercase tracking-wide text-white">
          IBC Nádrže
        </h1>
        <p className="mt-4 max-w-xl text-[#666]">
          Nové a repasované 1000L kontajnery na vodu. Pridajte do dopytu a my vám zašleme ponuku.
        </p>

        {/* Filter */}
        <div className="mt-8 flex flex-wrap gap-2">
          <a
            href="/produkty"
            className={`border px-5 py-2 font-heading text-sm font-bold uppercase tracking-widest transition-all ${
              !kategoria
                ? 'border-[#e8001e] bg-[#e8001e] text-white'
                : 'border-[#242424] text-[#555] hover:border-[#e8001e] hover:text-white'
            }`}
          >
            Všetky
          </a>
          {kategorie.map((kat) => (
            <a
              key={kat.id}
              href={`/produkty?kategoria=${kat.slug}`}
              className={`border px-5 py-2 font-heading text-sm font-bold uppercase tracking-widest transition-all ${
                kategoria === kat.slug
                  ? 'border-[#e8001e] bg-[#e8001e] text-white'
                  : 'border-[#242424] text-[#555] hover:border-[#e8001e] hover:text-white'
              }`}
            >
              {kat.nazov}
            </a>
          ))}
        </div>
      </div>

      {produkty.length > 0 ? (
        <div className="grid grid-cols-1 gap-px bg-[#1a1a1a] sm:grid-cols-2 lg:grid-cols-3">
          {produkty.map((p) => (
            <ProduktKarta key={p.id} produkt={p} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="font-heading text-6xl font-bold text-[#1a1a1a]">IBC</div>
          <p className="mt-6 font-heading text-lg uppercase tracking-wide text-[#444]">
            Žiadne produkty v tejto kategórii
          </p>
          <a
            href="/produkty"
            className="mt-6 font-heading text-sm font-bold uppercase tracking-widest text-[#e8001e] hover:underline transition-colors"
          >
            Zobraziť všetky →
          </a>
        </div>
      )}
    </div>
  )
}
