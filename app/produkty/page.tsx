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

type Props = {
  searchParams: Promise<{ kategoria?: string }>
}

export default async function ProduktyPage({ searchParams }: Props) {
  const { kategoria } = await searchParams
  const [kategorie, produkty] = await Promise.all([
    getKategorie(),
    getProdukty(kategoria),
  ])

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="font-heading text-4xl font-bold uppercase tracking-wide text-white">
          IBC Nádrže
        </h1>
        <div className="mt-3 h-1 w-16 bg-[#1e6fff]" />
        <p className="mt-3 text-[#6b7fa3]">
          Nové a repasované 1000L kontajnery na vodu. Pridajte do dopytu a my vám zašleme ponuku.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        <a
          href="/produkty"
          className={`rounded-sm border px-4 py-2 font-heading text-sm font-semibold uppercase tracking-wide transition-all ${
            !kategoria
              ? 'border-[#1e6fff] bg-[#1e6fff] text-white'
              : 'border-[#1a2a45] text-[#6b7fa3] hover:border-[#1e6fff] hover:text-[#1e6fff]'
          }`}
        >
          Všetky
        </a>
        {kategorie.map((kat) => (
          <a
            key={kat.id}
            href={`/produkty?kategoria=${kat.slug}`}
            className={`rounded-sm border px-4 py-2 font-heading text-sm font-semibold uppercase tracking-wide transition-all ${
              kategoria === kat.slug
                ? 'border-[#1e6fff] bg-[#1e6fff] text-white'
                : 'border-[#1a2a45] text-[#6b7fa3] hover:border-[#1e6fff] hover:text-[#1e6fff]'
            }`}
          >
            {kat.nazov}
          </a>
        ))}
      </div>

      {produkty.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {produkty.map((p) => (
            <ProduktKarta key={p.id} produkt={p} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="text-5xl opacity-20">💧</div>
          <p className="mt-4 font-heading text-lg uppercase tracking-wide text-[#6b7fa3]">
            Žiadne produkty v tejto kategórii
          </p>
          <a
            href="/produkty"
            className="mt-6 text-sm text-[#1e6fff] hover:text-[#60a5fa] transition-colors"
          >
            Zobraziť všetky →
          </a>
        </div>
      )}
    </div>
  )
}
