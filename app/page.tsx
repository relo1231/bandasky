import type { Metadata } from 'next'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { Produkt } from '@/types'
import { ProduktKarta } from '@/components/ProduktKarta'

export const metadata: Metadata = {
  title: 'Domov – 1000L nádrže na vodu',
  description: 'Nové a repasované 1000L IBC nádrže na vodu. Rýchla doprava po SR.',
}

async function getFeaturedProdukty(): Promise<Produkt[]> {
  const { data } = await supabase
    .from('produkty')
    .select('*, kategorie(*)')
    .eq('aktivny', true)
    .order('zoradenie', { ascending: false })
    .limit(3)
  return data ?? []
}

const kategorie = [
  {
    slug: 'nove-nadrze',
    href: '/produkty?kategoria=nove-nadrze',
    nazov: 'Nové IBC nádrže',
    popis: 'Značkové 1000L IBC kontajnery vhodné na pitnú aj úžitkovú vodu. Certifikované, záručné.',
    cena: 'od 89 €',
    image: '🏭',
  },
  {
    slug: 'repasovane',
    href: '/produkty?kategoria=repasovane',
    nazov: 'Repasované nádrže',
    popis: 'Vyčistené a preverené 1000L IBC nádrže za výhodnú cenu. Ekologická voľba pre farmy a záhrady.',
    cena: 'od 39 €',
    image: '♻️',
  },
  {
    slug: 'prislusenstvo',
    href: '/produkty?kategoria=prislusenstvo',
    nazov: 'Príslušenstvo',
    popis: 'Kohúty, adaptéry, čerpadlá, víka a náhradné diely pre IBC nádrže.',
    cena: 'od 3 €',
    image: '🔧',
  },
  {
    slug: 'doprava',
    href: '/produkty?kategoria=doprava',
    nazov: 'Doprava & Servis',
    popis: 'Doručenie nádrže priamo k vám. Celé Slovensko do 48 hodín.',
    cena: 'od 15 €',
    image: '🚚',
  },
]

const stats = [
  { hodnota: '500+', popis: 'Dodaných nádrží ročne' },
  { hodnota: '10', popis: 'Rokov na trhu' },
  { hodnota: '48h', popis: 'Dodávka po SR' },
  { hodnota: '100%', popis: 'Certifikované nádrže' },
]

const vyhody = [
  {
    ikona: '💧',
    nazov: 'Vhodné na pitnú vodu',
    popis: 'Nádrže sú certifikované a vhodné na skladovanie pitnej aj úžitkovej vody.',
  },
  {
    ikona: '🏗️',
    nazov: 'Robustná oceľová klietka',
    popis: 'Plastový kontajner chránený oceľovou klietkou. Stohovateľné, odolné.',
  },
  {
    ikona: '🚛',
    nazov: 'Doručenie kamkoľvek',
    popis: 'Dovezieme priamo na vašu adresu. Celé Slovensko, do 48 hodín.',
  },
  {
    ikona: '💬',
    nazov: 'Poradenstvo zadarmo',
    popis: 'Pomôžeme vybrať správnu nádrž. Zavolajte alebo pošlite dopyt.',
  },
]

export default async function HomePage() {
  const featuredProdukty = await getFeaturedProdukty()

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-[#050d1a]">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 59px, #1e6fff 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, #1e6fff 60px)',
          }}
        />
        {/* Blue glow */}
        <div className="absolute left-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-[#1e6fff] opacity-[0.08] blur-[120px]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050d1a] to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block rounded-sm bg-[#1e6fff]/10 border border-[#1e6fff]/30 px-4 py-1.5 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-[#60a5fa] mb-6">
              IBC kontajnery · Slovensko
            </span>
            <h1 className="font-heading text-5xl font-bold uppercase leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
              1000L nádrže<br />
              <span className="text-[#1e6fff]">na vodu</span>
            </h1>
            <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-[#6b7fa3]">
              Nové aj repasované IBC nádrže skladom. Certifikované pre pitnú vodu.
              Rýchla doprava po celom Slovensku.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/produkty"
                className="inline-flex items-center justify-center gap-2 bg-[#1e6fff] px-8 py-3.5 font-heading text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#1458d6]"
              >
                Pozrieť nádrže
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/kosik"
                className="inline-flex items-center justify-center gap-2 border border-[#1a2a45] px-8 py-3.5 font-heading text-sm font-semibold uppercase tracking-widest text-[#e2e8f0] transition-all hover:border-[#1e6fff] hover:text-[#1e6fff]"
              >
                Poslať dopyt
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Kategórie – alternating layout ako vzv-tech.sk */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <h2 className="font-heading text-4xl font-bold uppercase tracking-wide text-white">
            Čo ponúkame
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 bg-[#1e6fff]" />
        </div>

        <div className="space-y-6">
          {kategorie.map((kat, i) => (
            <Link
              key={kat.slug}
              href={kat.href}
              className={`group flex flex-col overflow-hidden rounded-sm border border-[#1a2a45] bg-[#0a1628] transition-all duration-300 hover:border-[#1e6fff] sm:flex-row ${
                i % 2 === 1 ? 'sm:flex-row-reverse' : ''
              }`}
            >
              {/* Image/icon side */}
              <div className="flex min-h-[200px] w-full items-center justify-center bg-gradient-to-br from-[#0f1e38] to-[#0a1628] sm:w-72 sm:min-h-[180px] shrink-0">
                <span className="text-6xl">{kat.image}</span>
              </div>
              {/* Text side */}
              <div className="flex flex-1 flex-col justify-center p-8">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <h3 className="font-heading text-2xl font-bold uppercase tracking-wide text-white group-hover:text-[#1e6fff] transition-colors">
                    {kat.nazov}
                  </h3>
                  <span className="shrink-0 rounded-sm bg-[#1e6fff]/10 px-3 py-1 font-heading text-sm font-bold text-[#60a5fa]">
                    {kat.cena}
                  </span>
                </div>
                <p className="mt-3 font-body leading-relaxed text-[#6b7fa3]">{kat.popis}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-widest text-[#1e6fff]">
                  Zobraziť produkty
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-[#1a2a45] bg-[#0a1628]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.popis} className="text-center">
                <p className="font-heading text-5xl font-bold text-[#1e6fff]">{s.hodnota}</p>
                <p className="mt-2 font-body text-sm text-[#6b7fa3]">{s.popis}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Výhody */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <h2 className="font-heading text-4xl font-bold uppercase tracking-wide text-white">
            Prečo Bandasky?
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 bg-[#1e6fff]" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {vyhody.map((v) => (
            <div
              key={v.nazov}
              className="rounded-sm border border-[#1a2a45] bg-[#0a1628] p-6 transition-all duration-200 hover:border-[#1e6fff]"
            >
              <div className="mb-4 text-4xl">{v.ikona}</div>
              <h3 className="font-heading text-base font-semibold uppercase tracking-wide text-white">
                {v.nazov}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6b7fa3]">{v.popis}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured produkty */}
      {featuredProdukty.length > 0 && (
        <section className="border-t border-[#1a2a45] bg-[#0a1628] py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <h2 className="font-heading text-4xl font-bold uppercase tracking-wide text-white">
                  Skladom
                </h2>
                <div className="mt-3 h-1 w-16 bg-[#1e6fff]" />
              </div>
              <Link
                href="/produkty"
                className="font-heading text-sm font-semibold uppercase tracking-widest text-[#1e6fff] transition-colors hover:text-[#60a5fa]"
              >
                Všetky →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProdukty.map((p) => (
                <ProduktKarta key={p.id} produkt={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="relative overflow-hidden bg-[#1e6fff] py-20">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, white 0px, white 1px, transparent 1px, transparent 10px)' }}
        />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-4xl font-bold uppercase tracking-wide text-white">
            Máte záujem?
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-body text-blue-100">
            Pošlite nezáväzný dopyt – ozveme sa do 24 hodín a pripravíme cenovú ponuku na mieru.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/produkty"
              className="inline-block bg-white px-10 py-3.5 font-heading text-sm font-bold uppercase tracking-widest text-[#1e6fff] transition-colors hover:bg-blue-50"
            >
              Vybrať nádrž
            </Link>
            <Link
              href="/kosik"
              className="inline-block border-2 border-white px-10 py-3.5 font-heading text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white hover:text-[#1e6fff]"
            >
              Poslať dopyt
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
