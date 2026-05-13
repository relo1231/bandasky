import type { Metadata } from 'next'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { Produkt } from '@/types'
import { ProduktKarta } from '@/components/ProduktKarta'

export const metadata: Metadata = {
  title: 'Bandasky – 1000L IBC nádrže na vodu',
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

const stats = [
  { hodnota: '500+', popis: 'Dodaných nádrží ročne' },
  { hodnota: '10', popis: 'Rokov na trhu' },
  { hodnota: '48h', popis: 'Dodávka po SR' },
  { hodnota: '100%', popis: 'Certifikované nádrže' },
]

const vyhody = [
  {
    cislo: '01',
    nazov: 'Certifikované pre pitnú vodu',
    popis: 'Všetky nádrže spĺňajú normy pre skladovanie pitnej aj úžitkovej vody.',
  },
  {
    cislo: '02',
    nazov: 'Oceľová ochranná klietka',
    popis: 'Robustná galvanizovaná klietka chráni plastový kontajner. Stohovateľné 2-vrstvovo.',
  },
  {
    cislo: '03',
    nazov: 'Záručný servis',
    popis: 'Poskytujeme záruku na nové nádrže a poradenstvo pri výbere pri repasovaných.',
  },
  {
    cislo: '04',
    nazov: 'Dodávka kamkoľvek',
    popis: 'Rozvozy po celom Slovensku. Dovezieme priamo na vašu adresu do 48 hodín.',
  },
]

const kategorie = [
  {
    href: '/produkty?kategoria=nove-nadrze',
    nazov: 'Nové IBC nádrže',
    popis: 'Značkové 1000L IBC kontajnery. Certifikované, záručné, vhodné na pitnú vodu.',
    cena: 'od 89 €',
  },
  {
    href: '/produkty?kategoria=repasovane',
    nazov: 'Repasované nádrže',
    popis: 'Vyčistené a preverené 1000L IBC nádrže za výhodnú cenu. Ekologická voľba.',
    cena: 'od 39 €',
  },
  {
    href: '/produkty?kategoria=prislusenstvo',
    nazov: 'Príslušenstvo',
    popis: 'Kohúty, adaptéry, čerpadlá, víka a náhradné diely pre IBC nádrže.',
    cena: 'od 3 €',
  },
]

export default async function HomePage() {
  const featuredProdukty = await getFeaturedProdukty()

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#0d0d0d]">
        {/* Diagonal lines pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)',
            backgroundSize: '12px 12px',
          }}
        />
        {/* Red glow */}
        <div className="absolute -right-40 top-1/2 h-[700px] w-[700px] -translate-y-1/2 rounded-full bg-[#e8001e] opacity-[0.06] blur-[140px]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0d0d0d] to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Left: content */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2">
                <div className="h-0.5 w-8 bg-[#e8001e]" />
                <span className="font-heading text-xs font-bold uppercase tracking-[0.25em] text-[#e8001e]">
                  IBC kontajnery · Slovensko
                </span>
              </div>

              <h1 className="font-heading text-5xl font-bold uppercase leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
                1000L nádrže<br />
                <span className="text-[#e8001e]">na vodu</span>
              </h1>

              <p className="mt-6 max-w-lg text-base leading-relaxed text-[#888]">
                Nové aj repasované IBC nádrže skladom. Certifikované pre pitnú vodu.
                Rýchla doprava po celom Slovensku.
              </p>

              {/* Price box */}
              <div className="mt-8 inline-flex flex-col border border-[#242424] bg-[#141414] px-6 py-4">
                <span className="font-heading text-xs uppercase tracking-[0.2em] text-[#666]">Cena od</span>
                <span className="font-heading text-4xl font-bold text-[#e8001e]">39 €</span>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/produkty"
                  className="inline-flex items-center justify-center gap-2 bg-[#e8001e] px-8 py-3.5 font-heading text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#b5001a]"
                >
                  Pozrieť nádrže
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/kosik"
                  className="inline-flex items-center justify-center gap-2 border border-[#333] px-8 py-3.5 font-heading text-sm font-bold uppercase tracking-widest text-[#888] transition-all hover:border-[#e8001e] hover:text-white"
                >
                  Poslať dopyt
                </Link>
              </div>
            </div>

            {/* Right: visual block */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative">
                <div className="h-[420px] w-[420px] border border-[#242424] bg-[#141414] flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-heading text-[120px] font-bold leading-none text-[#1a1a1a]">
                      IBC
                    </div>
                    <div className="font-heading text-lg font-bold uppercase tracking-widest text-[#333]">
                      1000 litrov
                    </div>
                  </div>
                  {/* Corner accent */}
                  <div className="absolute bottom-0 right-0 h-16 w-16 bg-[#e8001e]" />
                  <div className="absolute left-0 top-0 h-16 w-16 border-l-2 border-t-2 border-[#e8001e]" />
                </div>
                {/* Price tag */}
                <div className="absolute -left-6 -bottom-6 bg-[#e8001e] px-6 py-4">
                  <div className="font-heading text-xs uppercase tracking-widest text-white/70">Skladom od</div>
                  <div className="font-heading text-2xl font-bold text-white">39 €</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="font-heading text-xs uppercase tracking-widest text-[#444]">Scroll</div>
          <div className="h-8 w-px bg-gradient-to-b from-[#444] to-transparent" />
        </div>
      </section>

      {/* ─── O NÁS ─── */}
      <section className="border-t border-[#1a1a1a] bg-black py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
            <div>
              <div className="mb-4 inline-flex items-center gap-2">
                <div className="h-0.5 w-8 bg-[#e8001e]" />
                <span className="font-heading text-xs font-bold uppercase tracking-[0.25em] text-[#e8001e]">
                  O nás
                </span>
              </div>
              <h2 className="font-heading text-4xl font-bold uppercase leading-tight tracking-wide text-white">
                Vaši spoľahliví<br />dodávatelia nádrží
              </h2>
              <p className="mt-6 max-w-lg leading-relaxed text-[#666]">
                Už viac ako 10 rokov dodávame IBC nádrže firmám, farmám a súkromným zákazníkom na celom Slovensku.
                Pokrývame celé územie od Bratislavy po Košice.
              </p>
              <Link
                href="/produkty"
                className="mt-8 inline-flex items-center gap-2 border border-[#333] px-6 py-3 font-heading text-sm font-bold uppercase tracking-widest text-[#888] transition-all hover:border-[#e8001e] hover:text-white"
              >
                Zobraziť ponuku
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-px bg-[#1a1a1a]">
              {stats.map((s) => (
                <div key={s.popis} className="bg-[#0d0d0d] p-8">
                  <p className="font-heading text-5xl font-bold text-[#e8001e]">{s.hodnota}</p>
                  <p className="mt-2 text-sm text-[#666]">{s.popis}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── VÝHODY ─── */}
      <section className="border-t border-[#1a1a1a] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2">
                <div className="h-0.5 w-8 bg-[#e8001e]" />
                <span className="font-heading text-xs font-bold uppercase tracking-[0.25em] text-[#e8001e]">
                  Prečo Bandasky
                </span>
              </div>
              <h2 className="font-heading text-4xl font-bold uppercase tracking-wide text-white">
                Chceme byť<br />najlepšou voľbou
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-px bg-[#1a1a1a] sm:grid-cols-2 lg:grid-cols-4">
            {vyhody.map((v) => (
              <div key={v.nazov} className="group bg-[#0d0d0d] p-8 transition-colors hover:bg-[#141414]">
                <div className="mb-6 font-heading text-6xl font-bold text-[#1a1a1a] group-hover:text-[#e8001e] transition-colors leading-none">
                  {v.cislo}
                </div>
                <h3 className="font-heading text-base font-bold uppercase tracking-wide text-white">
                  {v.nazov}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#666]">{v.popis}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── KATEGÓRIE ─── */}
      <section className="border-t border-[#1a1a1a] bg-black py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="mb-4 inline-flex items-center gap-2">
              <div className="h-0.5 w-8 bg-[#e8001e]" />
              <span className="font-heading text-xs font-bold uppercase tracking-[0.25em] text-[#e8001e]">
                Vozíky skladom
              </span>
            </div>
            <h2 className="font-heading text-4xl font-bold uppercase tracking-wide text-white">
              Čo ponúkame
            </h2>
          </div>

          <div className="space-y-px bg-[#1a1a1a]">
            {kategorie.map((kat, i) => (
              <Link
                key={kat.href}
                href={kat.href}
                className="group flex flex-col bg-[#0d0d0d] transition-colors hover:bg-[#141414] sm:flex-row sm:items-center"
              >
                <div className="flex w-full items-center justify-between gap-6 px-8 py-7 sm:w-auto sm:flex-1">
                  <div className="flex items-center gap-8">
                    <span className="font-heading text-5xl font-bold text-[#1a1a1a] group-hover:text-[#e8001e] transition-colors leading-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-heading text-xl font-bold uppercase tracking-wide text-white group-hover:text-[#e8001e] transition-colors">
                        {kat.nazov}
                      </h3>
                      <p className="mt-1 text-sm text-[#555]">{kat.popis}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6 border-t border-[#1a1a1a] px-8 py-5 sm:border-l sm:border-t-0">
                  <div>
                    <div className="font-heading text-xs uppercase tracking-widest text-[#555]">Cena od</div>
                    <div className="font-heading text-2xl font-bold text-[#e8001e]">{kat.cena}</div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 text-[#333] transition-all group-hover:translate-x-1 group-hover:text-[#e8001e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRODUKTY SKLADOM ─── */}
      {featuredProdukty.length > 0 && (
        <section className="border-t border-[#1a1a1a] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex items-end justify-between">
              <div>
                <div className="mb-4 inline-flex items-center gap-2">
                  <div className="h-0.5 w-8 bg-[#e8001e]" />
                  <span className="font-heading text-xs font-bold uppercase tracking-[0.25em] text-[#e8001e]">
                    Aktuálna ponuka
                  </span>
                </div>
                <h2 className="font-heading text-4xl font-bold uppercase tracking-wide text-white">Skladom</h2>
              </div>
              <Link
                href="/produkty"
                className="font-heading text-sm font-bold uppercase tracking-widest text-[#555] transition-colors hover:text-[#e8001e]"
              >
                Všetky →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-px bg-[#1a1a1a] sm:grid-cols-2 lg:grid-cols-3">
              {featuredProdukty.map((p) => (
                <ProduktKarta key={p.id} produkt={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ─── */}
      <section className="border-t border-[#1a1a1a] bg-[#e8001e] py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-4xl font-bold uppercase tracking-wide text-white">
            Máte záujem?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/70">
            Pošlite nezáväzný dopyt – ozveme sa do 24 hodín a pripravíme cenovú ponuku na mieru.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/produkty"
              className="inline-block bg-white px-10 py-3.5 font-heading text-sm font-bold uppercase tracking-widest text-[#e8001e] transition-colors hover:bg-gray-100"
            >
              Vybrať nádrž
            </Link>
            <Link
              href="/kosik"
              className="inline-block border-2 border-white px-10 py-3.5 font-heading text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white hover:text-[#e8001e]"
            >
              Poslať dopyt
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
