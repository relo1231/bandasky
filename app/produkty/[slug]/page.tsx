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

const dostupnostConfig: Record<string, { dot: string; text: string; bg: string }> = {
  'Na sklade': { dot: 'bg-emerald-500', text: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
  'Na objednávku': { dot: 'bg-blue-500', text: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
  Nedostupné: { dot: 'bg-red-500', text: 'text-red-700', bg: 'bg-red-50 border-red-200' },
}

export default async function ProduktDetailPage({ params }: Props) {
  const { slug } = await params
  const produkt = await getProdukt(slug)
  if (!produkt) notFound()

  const suvisiace =
    produkt.kategoria_id ? await getSuvisiace(produkt.kategoria_id, produkt.id) : []

  const dst = dostupnostConfig[produkt.dostupnost] ?? {
    dot: 'bg-slate-400',
    text: 'text-slate-600',
    bg: 'bg-slate-50 border-slate-200',
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-10 flex items-center gap-2 text-sm text-slate-400">
          <Link href="/" className="transition-colors hover:text-slate-900">Domov</Link>
          <span>/</span>
          <Link href="/produkty" className="transition-colors hover:text-slate-900">Nádrže</Link>
          <span>/</span>
          <span className="text-slate-600">{produkt.nazov}</span>
        </nav>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Obrázok */}
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
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
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-20 w-20 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <p className="mt-3 font-heading text-sm uppercase tracking-widest text-slate-400">1000 litrov</p>
                </div>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            {produkt.kategorie && (
              <Link
                href={`/produkty?kategoria=${(produkt.kategorie as { slug: string }).slug}`}
                className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                {(produkt.kategorie as { nazov: string }).nazov}
              </Link>
            )}

            <h1 className="font-heading text-4xl font-bold uppercase tracking-wide text-slate-900 sm:text-5xl">
              {produkt.nazov}
            </h1>

            {/* Dostupnosť */}
            <div className={`mt-5 inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 ${dst.bg}`}>
              <span className={`h-2 w-2 rounded-full ${dst.dot}`} />
              <span className={`font-heading text-xs font-bold uppercase tracking-widest ${dst.text}`}>
                {produkt.dostupnost}
              </span>
            </div>

            {/* Cena */}
            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 px-6 py-5">
              <div className="text-xs font-medium text-slate-400">Cena od</div>
              <div className="mt-1 font-heading text-4xl font-bold text-slate-900">
                {produkt.cena_od != null
                  ? `${produkt.cena_od.toLocaleString('sk-SK')} € / ${produkt.jednotka}`
                  : 'Cena na dopyt'}
              </div>
            </div>

            {produkt.popis && (
              <p className="mt-6 whitespace-pre-line leading-relaxed text-slate-500">
                {produkt.popis}
              </p>
            )}

            <ProduktDetailForm produkt={produkt} />
          </div>
        </div>

        {/* Súvisiace */}
        {suvisiace.length > 0 && (
          <section className="mt-24 border-t border-slate-100 pt-16">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Súvisiace</p>
            <h2 className="mt-2 font-heading text-3xl font-bold uppercase tracking-wide text-slate-900 mb-10">
              Podobné produkty
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {suvisiace.map((p) => (
                <ProduktKarta key={p.id} produkt={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
