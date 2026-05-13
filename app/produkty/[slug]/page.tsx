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

const dostupnostStyle: Record<string, { dot: string; label: string }> = {
  'Na sklade': { dot: 'bg-green-500', label: 'text-green-400' },
  'Na objednávku': { dot: 'bg-blue-500', label: 'text-blue-400' },
  Nedostupné: { dot: 'bg-red-500', label: 'text-red-400' },
}

export default async function ProduktDetailPage({ params }: Props) {
  const { slug } = await params
  const produkt = await getProdukt(slug)
  if (!produkt) notFound()

  const suvisiace =
    produkt.kategoria_id ? await getSuvisiace(produkt.kategoria_id, produkt.id) : []

  const dst = dostupnostStyle[produkt.dostupnost] ?? { dot: 'bg-[#333]', label: 'text-[#666]' }

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-10 flex items-center gap-2 text-sm text-[#444]">
        <Link href="/" className="hover:text-[#e8001e] transition-colors">Domov</Link>
        <span>/</span>
        <Link href="/produkty" className="hover:text-[#e8001e] transition-colors">Nádrže</Link>
        <span>/</span>
        <span className="text-[#888]">{produkt.nazov}</span>
      </nav>

      <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
        {/* Obrázok */}
        <div className="relative aspect-square w-full overflow-hidden border border-[#242424] bg-[#141414]">
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
                <div className="font-heading text-[100px] font-bold leading-none text-[#1a1a1a]">IBC</div>
                <div className="font-heading text-sm uppercase tracking-widest text-[#333]">1000 litrov</div>
              </div>
            </div>
          )}
          {/* Red corner accent */}
          <div className="absolute bottom-0 right-0 h-10 w-10 bg-[#e8001e]" />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          {produkt.kategorie && (
            <Link
              href={`/produkty?kategoria=${(produkt.kategorie as { slug: string }).slug}`}
              className="mb-4 inline-flex items-center gap-2 font-heading text-xs font-bold uppercase tracking-[0.2em] text-[#e8001e]"
            >
              <div className="h-0.5 w-6 bg-[#e8001e]" />
              {(produkt.kategorie as { nazov: string }).nazov}
            </Link>
          )}

          <h1 className="font-heading text-4xl font-bold uppercase tracking-wide text-white sm:text-5xl">
            {produkt.nazov}
          </h1>

          {/* Dostupnosť */}
          <div className="mt-5 flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${dst.dot}`} />
            <span className={`font-heading text-sm font-bold uppercase tracking-widest ${dst.label}`}>
              {produkt.dostupnost}
            </span>
          </div>

          {/* Cena */}
          <div className="mt-6 border border-[#242424] bg-[#141414] px-6 py-5">
            <div className="font-heading text-xs uppercase tracking-[0.2em] text-[#555]">Cena od</div>
            <div className="mt-1 font-heading text-4xl font-bold text-[#e8001e]">
              {produkt.cena_od != null
                ? `${produkt.cena_od.toLocaleString('sk-SK')} € / ${produkt.jednotka}`
                : 'Cena na dopyt'}
            </div>
          </div>

          {produkt.popis && (
            <p className="mt-6 whitespace-pre-line leading-relaxed text-[#666]">
              {produkt.popis}
            </p>
          )}

          <ProduktDetailForm produkt={produkt} />
        </div>
      </div>

      {/* Súvisiace */}
      {suvisiace.length > 0 && (
        <section className="mt-24 border-t border-[#1a1a1a] pt-16">
          <div className="mb-4 inline-flex items-center gap-2">
            <div className="h-0.5 w-8 bg-[#e8001e]" />
            <span className="font-heading text-xs font-bold uppercase tracking-[0.25em] text-[#e8001e]">
              Súvisiace
            </span>
          </div>
          <h2 className="mb-10 font-heading text-3xl font-bold uppercase tracking-wide text-white">
            Podobné produkty
          </h2>
          <div className="grid grid-cols-1 gap-px bg-[#1a1a1a] sm:grid-cols-2 lg:grid-cols-3">
            {suvisiace.map((p) => (
              <ProduktKarta key={p.id} produkt={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
