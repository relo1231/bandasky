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

const dokumenty: Record<string, { produktovyList?: string; technickyList?: string }> = {
  'trdx-01': {
    produktovyList: '/docs/trdx-01-produktovy-list.pdf',
    technickyList: '/docs/trdx-01-technicky-list.pdf',
  },
  'trdx-02': {
    produktovyList: '/docs/trdx-02-produktovy-list.pdf',
    technickyList: '/docs/trdx-02-technicky-list.pdf',
  },
  'trdx-03': {
    produktovyList: '/docs/trdx-03-produktovy-list.pdf',
    technickyList: '/docs/trdx-03-technicky-list.pdf',
  },
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

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: produkt.nazov,
    description: produkt.kratky_popis ?? produkt.popis ?? undefined,
    image: produkt.obrazok_url ?? undefined,
    offers: produkt.cena_od != null ? {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: produkt.cena_od,
      availability: produkt.dostupnost === 'Na sklade'
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: { '@type': 'Organization', name: 'Bandasky' },
    } : undefined,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
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
              <Image
                src="https://b2bpartnercdn.vshcdn.net/content/images/product/ibc-kontajner-plastova-paleta-novy_3626.jpg?width=800"
                alt="IBC nádrž"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
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

            {dokumenty[slug] && (
              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
                <p className="mb-3 font-heading text-xs font-bold uppercase tracking-widest text-slate-400">
                  Dokumenty na stiahnutie
                </p>
                <div className="flex flex-wrap gap-3">
                  {dokumenty[slug].produktovyList && (
                    <a
                      href={dokumenty[slug].produktovyList}
                      download
                      className="inline-flex items-center gap-2 rounded-lg border border-sky-200 bg-white px-4 py-2.5 font-heading text-sm font-semibold uppercase tracking-widest text-sky-700 shadow-sm transition-all hover:border-sky-400 hover:bg-sky-50 hover:shadow"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                      Produktový list
                    </a>
                  )}
                  {dokumenty[slug].technickyList && (
                    <a
                      href={dokumenty[slug].technickyList}
                      download
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 font-heading text-sm font-semibold uppercase tracking-widest text-slate-700 shadow-sm transition-all hover:border-slate-400 hover:bg-slate-100 hover:shadow"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                      </svg>
                      Technický list
                    </a>
                  )}
                </div>
              </div>
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
    </>
  )
}
