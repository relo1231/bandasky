import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { Produkt } from '@/types'
import { ProduktKarta } from '@/components/ProduktKarta'
import { ProduktDetailForm } from './ProduktDetailForm'

async function getProdukt(slug: string): Promise<Produkt | null> {
  const { data } = await supabase
    .from('produkty')
    .select('*, kategorie(*)')
    .eq('slug', slug)
    .eq('aktivny', true)
    .single()
  return data
}

async function getSuvisiace(kategoriaId: number, aktualnyId: number): Promise<Produkt[]> {
  const { data } = await supabase
    .from('produkty')
    .select('*, kategorie(*)')
    .eq('kategoria_id', kategoriaId)
    .eq('aktivny', true)
    .neq('id', aktualnyId)
    .order('zoradenie', { ascending: false })
    .limit(3)
  return data ?? []
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const produkt = await getProdukt(slug)
  if (!produkt) return { title: 'Produkt nenájdený' }
  return {
    title: produkt.nazov,
    description: produkt.kratky_popis ?? produkt.popis ?? undefined,
  }
}

const dostupnostStyle: Record<string, string> = {
  'Na sklade': 'bg-green-950 text-green-400',
  'Na objednávku': 'bg-blue-950 text-blue-400',
  Nedostupné: 'bg-red-950 text-red-400',
}

export default async function ProduktDetailPage({ params }: Props) {
  const { slug } = await params
  const produkt = await getProdukt(slug)
  if (!produkt) notFound()

  const suvisiace =
    produkt.kategoria_id
      ? await getSuvisiace(produkt.kategoria_id, produkt.id)
      : []

  const badgeClass = dostupnostStyle[produkt.dostupnost] ?? 'bg-[#0a1628] text-[#6b7fa3]'

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-[#6b7fa3]">
        <Link href="/" className="hover:text-[#1e6fff] transition-colors">Domov</Link>
        <span>/</span>
        <Link href="/produkty" className="hover:text-[#1e6fff] transition-colors">Nádrže</Link>
        <span>/</span>
        <span className="text-[#e2e8f0]">{produkt.nazov}</span>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Obrázok */}
        <div className="relative aspect-square w-full overflow-hidden rounded-sm border border-[#1a2a45] bg-[#0f1e38]">
          {produkt.obrazok_url ? (
            <Image
              src={produkt.obrazok_url}
              alt={produkt.nazov}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-[#1e6fff] opacity-20"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          {produkt.kategorie && (
            <Link
              href={`/produkty?kategoria=${(produkt.kategorie as { slug: string }).slug}`}
              className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#6b7fa3] hover:text-[#1e6fff] transition-colors"
            >
              {(produkt.kategorie as { nazov: string }).nazov}
            </Link>
          )}

          <h1 className="font-heading text-4xl font-bold uppercase tracking-wide text-white">
            {produkt.nazov}
          </h1>

          <div className="mt-4 flex items-center gap-3">
            <span className={`rounded-sm px-3 py-1 text-sm font-semibold ${badgeClass}`}>
              {produkt.dostupnost}
            </span>
            <span className="font-heading text-2xl font-bold text-[#60a5fa]">
              {produkt.cena_od != null
                ? `od ${produkt.cena_od.toLocaleString('sk-SK')} € / ${produkt.jednotka}`
                : 'Cena na dopyt'}
            </span>
          </div>

          {produkt.popis && (
            <p className="mt-6 whitespace-pre-line font-body leading-relaxed text-[#6b7fa3]">
              {produkt.popis}
            </p>
          )}

          <ProduktDetailForm produkt={produkt} />
        </div>
      </div>

      {/* Súvisiace */}
      {suvisiace.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-4 font-heading text-2xl font-bold uppercase tracking-wide text-white">
            Súvisiace produkty
          </h2>
          <div className="mt-3 mb-8 h-1 w-16 bg-[#1e6fff]" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {suvisiace.map((p) => (
              <ProduktKarta key={p.id} produkt={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
