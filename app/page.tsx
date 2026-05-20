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
  { hodnota: '48h', popis: 'Doprava po SR' },
  { hodnota: '100%', popis: 'Certifikované' },
]

const vyhody = [
  {
    nazov: 'Certifikované pre pitnú vodu',
    popis: 'Všetky nádrže spĺňajú normy pre skladovanie pitnej aj úžitkovej vody.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    nazov: 'Oceľová ochranná klietka',
    popis: 'Robustná galvanizovaná klietka chráni plastový kontajner. Stohovateľné 2-vrstvovo.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    nazov: 'Záručný servis',
    popis: 'Záruka na nové nádrže a poradenstvo pri výbere. Sme tu pre vás aj po kúpe.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    nazov: 'Dodávka kamkoľvek',
    popis: 'Rozvozy po celom Slovensku. Dovezieme priamo na vašu adresu do 48 hodín.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
]

const kategorie = [
  {
    href: '/produkty?kategoria=nove-nadrze',
    nazov: 'Nové IBC nádrže',
    popis: 'Značkové 1000L IBC kontajnery. Certifikované, záručné, vhodné na pitnú vodu.',
    cena: 'od 89 €',
    badge: 'Najpredávanejšie',
  },
  {
    href: '/produkty?kategoria=repasovane',
    nazov: 'Repasované nádrže',
    popis: 'Vyčistené a preverené 1000L IBC nádrže za výhodnú cenu. Ekologická voľba.',
    cena: 'od 39 €',
    badge: 'Najlepšia cena',
  },
  {
    href: '/produkty?kategoria=prislusenstvo',
    nazov: 'Príslušenstvo',
    popis: 'Kohúty, adaptéry, čerpadlá, víka a náhradné diely pre IBC nádrže.',
    cena: 'od 3 €',
    badge: null,
  },
]

export default async function HomePage() {
  const featuredProdukty = await getFeaturedProdukty()

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid min-h-[calc(100vh-5.25rem)] grid-cols-1 items-center gap-12 py-20 lg:grid-cols-2">
            {/* Left */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="text-xs font-medium text-slate-600">Skladom · Doprava do 48h</span>
              </div>

              <h1 className="font-heading text-5xl font-bold uppercase leading-[1.1] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
                1000L IBC<br />
                <span className="text-slate-400">nádrže</span><br />
                na vodu
              </h1>

              <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-500">
                Nové aj repasované IBC nádrže skladom. Certifikované pre pitnú vodu. Rýchla doprava po celom Slovensku — priamo k vám.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/produkty"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-900 px-8 py-3.5 font-heading text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-slate-700"
                >
                  Pozrieť nádrže
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/kosik"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 px-8 py-3.5 font-heading text-sm font-bold uppercase tracking-widest text-slate-600 transition-all hover:border-slate-900 hover:text-slate-900"
                >
                  Nezáväzný dopyt
                </Link>
              </div>

              {/* Trust signals */}
              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
                <span className="flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Bez záväzku
                </span>
                <span className="flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Odpoveď do 24h
                </span>
                <span className="flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Celé Slovensko
                </span>
              </div>
            </div>

            {/* Right: Specs card */}
            <div className="hidden lg:block">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="font-heading text-xs font-semibold uppercase tracking-widest text-slate-400">Cena od</p>
                    <p className="font-heading text-4xl font-bold text-slate-900">39 €</p>
                  </div>
                  <div className="rounded-xl bg-white px-4 py-2 shadow-sm border border-slate-200">
                    <p className="font-heading text-xs uppercase tracking-widest text-slate-400">Objem</p>
                    <p className="font-heading text-2xl font-bold text-slate-900">1000 L</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { label: 'Typ', value: 'IBC kontajner' },
                    { label: 'Materiál', value: 'HDPE + oceľ' },
                    { label: 'Objem', value: '1000 litrov' },
                    { label: 'Nosnosť', value: '1250 kg' },
                    { label: 'Certifikát', value: 'Pitná voda' },
                    { label: 'Doprava', value: 'do 48 hodín' },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between rounded-lg bg-white px-4 py-3 border border-slate-100">
                      <span className="text-sm text-slate-500">{row.label}</span>
                      <span className="text-sm font-semibold text-slate-900">{row.value}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/produkty"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 py-3.5 font-heading text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-slate-700"
                >
                  Zobraziť všetky nádrže
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="border-b border-slate-100 bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 divide-x divide-slate-800 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.popis} className="px-8 py-10 text-center">
                <p className="font-heading text-4xl font-bold text-white">{s.hodnota}</p>
                <p className="mt-1 text-sm text-slate-400">{s.popis}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── KATEGÓRIE ─── */}
      <section className="border-b border-slate-100 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Ponuka</p>
            <h2 className="mt-2 font-heading text-4xl font-bold uppercase tracking-wide text-slate-900">
              Čo ponúkame
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {kategorie.map((kat) => (
              <Link
                key={kat.href}
                href={kat.href}
                className="group relative flex flex-col rounded-xl border border-slate-200 bg-white p-8 transition-all hover:border-slate-900 hover:shadow-lg"
              >
                {kat.badge && (
                  <span className="absolute right-4 top-4 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                    {kat.badge}
                  </span>
                )}
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="font-heading text-lg font-bold uppercase tracking-wide text-slate-900">
                  {kat.nazov}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{kat.popis}</p>
                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                  <div>
                    <p className="text-xs text-slate-400">Cena od</p>
                    <p className="font-heading text-xl font-bold text-slate-900">{kat.cena}</p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VÝHODY ─── */}
      <section className="border-b border-slate-100 bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Prečo Bandasky</p>
            <h2 className="mt-2 font-heading text-4xl font-bold uppercase tracking-wide text-slate-900">
              Naše výhody
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {vyhody.map((v) => (
              <div key={v.nazov} className="rounded-xl border border-slate-200 bg-white p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                  {v.icon}
                </div>
                <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-slate-900">
                  {v.nazov}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{v.popis}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRODUKTY SKLADOM ─── */}
      {featuredProdukty.length > 0 && (
        <section className="border-b border-slate-100 bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex items-end justify-between">
              <div>
                <p className="font-heading text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Aktuálna ponuka</p>
                <h2 className="mt-2 font-heading text-4xl font-bold uppercase tracking-wide text-slate-900">Skladom</h2>
              </div>
              <Link
                href="/produkty"
                className="hidden font-heading text-sm font-semibold uppercase tracking-widest text-slate-500 transition-colors hover:text-slate-900 sm:block"
              >
                Všetky produkty →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProdukty.map((p) => (
                <ProduktKarta key={p.id} produkt={p} />
              ))}
            </div>
            <div className="mt-8 text-center sm:hidden">
              <Link href="/produkty" className="font-heading text-sm font-semibold uppercase tracking-widest text-slate-500 hover:text-slate-900">
                Všetky produkty →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── O NÁS ─── */}
      <section className="border-b border-slate-100 bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
            <div>
              <p className="font-heading text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">O nás</p>
              <h2 className="mt-2 font-heading text-4xl font-bold uppercase leading-tight tracking-wide text-slate-900">
                Vaši spoľahliví<br />dodávatelia nádrží
              </h2>
              <p className="mt-5 max-w-lg leading-relaxed text-slate-500">
                Už viac ako 10 rokov dodávame IBC nádrže firmám, farmám a súkromným zákazníkom na celom Slovensku. Pokrývame celé územie od Bratislavy po Košice.
              </p>
              <div className="mt-8 space-y-3">
                {[
                  'Osobný prístup ku každej objednávke',
                  'Technické poradenstvo zdarma',
                  'Flexibilné platobné podmienky pre firmy',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-900">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-slate-600">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/produkty"
                className="mt-8 inline-flex items-center gap-2 rounded-md border border-slate-200 px-6 py-3 font-heading text-sm font-bold uppercase tracking-widest text-slate-600 transition-all hover:border-slate-900 hover:text-slate-900"
              >
                Zobraziť ponuku
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-8">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s) => (
                  <div key={s.popis} className="rounded-lg bg-slate-50 p-6 text-center">
                    <p className="font-heading text-4xl font-bold text-slate-900">{s.hodnota}</p>
                    <p className="mt-1 text-sm text-slate-500">{s.popis}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-slate-900 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Kontakt</p>
          <h2 className="mt-3 font-heading text-4xl font-bold uppercase tracking-wide text-white">
            Máte záujem o cenovú ponuku?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-slate-400">
            Pošlite nezáväzný dopyt — ozveme sa do 24 hodín a pripravíme ponuku na mieru pre vás alebo vašu firmu.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/produkty"
              className="inline-block rounded-md bg-white px-10 py-3.5 font-heading text-sm font-bold uppercase tracking-widest text-slate-900 transition-colors hover:bg-slate-100"
            >
              Vybrať nádrž
            </Link>
            <Link
              href="/kosik"
              className="inline-block rounded-md border border-slate-700 px-10 py-3.5 font-heading text-sm font-bold uppercase tracking-widest text-slate-300 transition-all hover:border-white hover:text-white"
            >
              Poslať dopyt
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-600">
            <a href="tel:+421900000000" className="transition-colors hover:text-slate-400">+421 900 000 000</a>
            <span>·</span>
            <a href="mailto:info@bandasky.sk" className="transition-colors hover:text-slate-400">info@bandasky.sk</a>
          </div>
        </div>
      </section>
    </>
  )
}
