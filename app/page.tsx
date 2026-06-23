import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { Produkt } from '@/types'
import { ProduktKarta } from '@/components/ProduktKarta'

export const metadata: Metadata = {
  title: 'Bandasky – IBC nádrže 1000L skladom',
  description: 'Nové a repasované 1000L IBC nádrže na vodu. Certifikované, preverené, doprava do 48h po celom Slovensku.',
}

async function getFeaturedRepasovane(): Promise<Produkt[]> {
  const { data: kat } = await supabase
    .from('kategorie')
    .select('id')
    .eq('slug', 'repasovane')
    .single()
  if (!kat) return []
  const { data } = await supabase
    .from('produkty')
    .select('*, kategorie(*)')
    .eq('aktivny', true)
    .eq('kategoria_id', kat.id)
    .order('cena_od', { ascending: false })
    .limit(3)
  return data ?? []
}

type Stats = {
  produktovSkladom: number
  vybavenychDopytov: number
  rokovNaTrhu: number
  maxCenaRepasovane: number | null
  minCenaRepasovane: number | null
  minCenaNove: number | null
}

async function getStats(): Promise<Stats> {
  const [{ data: katRep }, { data: katNove }] = await Promise.all([
    supabase.from('kategorie').select('id').eq('slug', 'repasovane').single(),
    supabase.from('kategorie').select('id').eq('slug', 'nove-nadrze').single(),
  ])

  const [
    { count: produktovSkladom },
    { count: vybavenychDopytov },
    { data: cenyRep },
    { data: cenyNove },
  ] = await Promise.all([
    supabase.from('produkty').select('*', { count: 'exact', head: true }).eq('aktivny', true).eq('dostupnost', 'Na sklade'),
    supabase.from('dopyty').select('*', { count: 'exact', head: true }).eq('stav', 'vybavený'),
    katRep
      ? supabase.from('produkty').select('cena_od').eq('aktivny', true).eq('kategoria_id', katRep.id).not('cena_od', 'is', null)
      : Promise.resolve({ data: [] }),
    katNove
      ? supabase.from('produkty').select('cena_od').eq('aktivny', true).eq('kategoria_id', katNove.id).not('cena_od', 'is', null)
      : Promise.resolve({ data: [] }),
  ])

  const ceny = (cenyRep ?? []).map((p) => p.cena_od as number)
  const cenyN = (cenyNove ?? []).map((p) => p.cena_od as number)

  return {
    produktovSkladom: produktovSkladom ?? 0,
    vybavenychDopytov: vybavenychDopytov ?? 0,
    rokovNaTrhu: new Date().getFullYear() - 2014,
    maxCenaRepasovane: ceny.length > 0 ? Math.max(...ceny) : null,
    minCenaRepasovane: ceny.length > 0 ? Math.min(...ceny) : null,
    minCenaNove: cenyN.length > 0 ? Math.min(...cenyN) : null,
  }
}

const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
)

const CheckIcon = ({ cls = 'text-sky-400' }: { cls?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 shrink-0 ${cls}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
)

export default async function HomePage() {
  const [featuredProdukty, stats] = await Promise.all([
    getFeaturedRepasovane(),
    getStats(),
  ])

  const fmt = (n: number | null) => n != null ? `${n.toLocaleString('sk-SK')} €` : 'Na dopyt'

  const katSekcie = [
    {
      href: '/produkty?kategoria=nove-nadrze',
      nazov: 'Nové IBC nádrže',
      popis: 'Priamo od výrobcu. Certifikované pre pitnú aj úžitkovú vodu s plnou 24-mesačnou zárukou.',
      cena: fmt(stats.minCenaNove),
      badge: 'Nové',
      badgeCls: 'bg-sky-500 text-white',
      features: ['24 mesiacov záruka', 'Certifikát pre pitnú vodu', 'HDPE + oceľová konštrukcia'],
      img: 'https://b2bpartnercdn.vshcdn.net/content/images/product/ibc-kontajner-plastova-paleta-novy_3626.jpg?width=1000',
      reverse: false,
      accent: 'text-sky-500',
      priceCls: 'text-sky-600',
      btn: 'bg-sky-600 hover:bg-sky-700',
    },
    {
      href: '/produkty?kategoria=repasovane',
      nazov: 'Repasované nádrže',
      popis: 'Vyčistené, preverené a funkčné IBC nádrže za zlomok ceny nových. Ideálne pre priemysel aj poľnohospodárstvo.',
      cena: fmt(stats.minCenaRepasovane),
      badge: 'Eko voľba',
      badgeCls: 'bg-teal-500 text-white',
      features: ['6 mesiacov záruka', 'Profesionálne vyčistené', 'Skontrolované kohúty a tesnenia'],
      img: 'https://b2bpartnercdn.vshcdn.net/content/images/product/ibc-kontajner-reko-1000-l-repasovany_3627.jpg?width=1000',
      reverse: true,
      accent: 'text-teal-500',
      priceCls: 'text-teal-600',
      btn: 'bg-teal-600 hover:bg-teal-700',
    },
    {
      href: '/produkty?kategoria=prislusenstvo',
      nazov: 'Príslušenstvo',
      popis: 'Kohúty, adaptéry, čerpadlá, víka a náhradné diely pre vaše IBC nádrže — všetko skladom.',
      cena: 'od 3 €',
      badge: 'Skladom',
      badgeCls: 'bg-blue-500 text-white',
      features: ['Kohúty a ventily S60', 'Adaptéry a redukcie', 'Elektrické čerpadlá'],
      img: 'https://b2bpartnercdn.vshcdn.net/content/images/product/ibc-kontajner-plastova-paleta-novy_3626.jpg?width=1000',
      reverse: false,
      accent: 'text-blue-500',
      priceCls: 'text-blue-600',
      btn: 'bg-blue-600 hover:bg-blue-700',
    },
  ]

  const faqs = [
    { q: 'Čo je repasovaná IBC nádrž?', a: 'Repasovaná nádrž je použitá IBC nádoba, ktorá prešla dôkladným čistením, kontrolou tesnení a vizuálnou inšpekciou. Vhodná na vodu, hnojivá aj iné kvapaliny — za zlomok ceny novej.' },
    { q: 'Sú nádrže vhodné na pitnú vodu?', a: 'Závisí od predchádzajúceho obsahu. Nádrže „food grade" (pôvodne s potravinárskymi látkami) sú vhodné pre pitnú vodu. Vždy to upresníme pri objednávke.' },
    { q: 'Ako dlho trvá doručenie?', a: 'Štandardne do 48 hodín po celom Slovensku. Pri väčších objednávkach vás vopred informujeme o presnom termíne.' },
    { q: 'Aký je objem IBC nádrží?', a: 'Štandardný objem je 1 000 litrov. Pracujeme výhradne s 1000L kontajnermi — najpopulárnejší formát pre B2B použitie.' },
    { q: 'Môžem si nádrže osobne vyzdvihnúť?', a: 'Áno, osobný odber je možný po telefonickom dohodnutí termínu. Kontaktujte nás.' },
    { q: 'Robíte faktúry pre firmy?', a: 'Samozrejme — sme platcovia DPH a vystavujeme faktúry pre právnické aj fyzické osoby. Stačí uviesť IČO pri objednávke.' },
  ]

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen overflow-hidden bg-[#060f1e]">
        {/* Ambient glows */}
        <div className="pointer-events-none absolute -left-64 -top-64 h-[700px] w-[700px] rounded-full bg-sky-600/8 blur-[140px]" />
        <div className="pointer-events-none absolute -bottom-64 -right-64 h-[600px] w-[600px] rounded-full bg-blue-700/8 blur-[120px]" />
        {/* Subtle dot grid */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2">

            {/* Left — text */}
            <div>
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-sky-500/8 px-4 py-2 backdrop-blur-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-sky-400" />
                <span className="text-sm font-medium text-sky-300">Certifikované · Skladom · Doprava 48h</span>
              </div>

              <h1 className="font-heading text-6xl font-bold uppercase leading-[0.88] tracking-tight text-white sm:text-7xl xl:text-[5.5rem]">
                IBC<br />
                <span className="bg-gradient-to-r from-sky-300 to-blue-400 bg-clip-text text-transparent">
                  nádrže
                </span><br />
                na vodu.
              </h1>

              <p className="mt-8 max-w-md text-lg leading-relaxed text-slate-400">
                Nové aj repasované 1000L IBC kontajnery. Certifikované, preverené a pripravené. Celé Slovensko do 48 hodín.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/produkty"
                  className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-8 py-4 font-heading text-sm font-bold uppercase tracking-widest text-white shadow-lg shadow-sky-500/20 transition-all hover:bg-sky-400 hover:shadow-xl hover:shadow-sky-500/30"
                >
                  Pozrieť nádrže <ArrowRight />
                </Link>
                <Link
                  href="/kosik"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/12 px-8 py-4 font-heading text-sm font-bold uppercase tracking-widest text-white/70 backdrop-blur-sm transition-all hover:border-sky-500/40 hover:text-white"
                >
                  Nezáväzný dopyt
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2">
                {['Bez záväzku', 'Odpoveď do 24h', 'Overená kvalita'].map((item) => (
                  <span key={item} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckIcon cls="text-sky-500" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — product showcase */}
            <div className="relative hidden lg:flex items-center justify-center">
              {/* Glow beneath tank */}
              <div className="absolute bottom-8 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-sky-500/12 blur-[80px]" />

              <div className="relative h-[540px] w-full max-w-[460px]">
                <Image
                  src="https://b2bpartnercdn.vshcdn.net/content/images/product/ibc-kontajner-plastova-paleta-novy_3626.jpg?width=800"
                  alt="IBC nádrž 1000L nová"
                  fill
                  className="object-contain drop-shadow-[0_40px_70px_rgba(14,165,233,0.12)]"
                  sizes="460px"
                  priority
                />

                {/* Floating — 48h badge */}
                <div className="absolute right-0 top-16 rounded-2xl bg-sky-500 px-5 py-4 shadow-xl shadow-sky-500/25">
                  <p className="font-heading text-3xl font-bold leading-none text-white">48h</p>
                  <p className="mt-0.5 font-heading text-[10px] font-bold uppercase tracking-widest text-sky-200">Doprava SR</p>
                </div>

                {/* Floating — cena */}
                <div className="absolute -left-6 bottom-24 rounded-2xl border border-white/8 bg-white/5 px-5 py-4 backdrop-blur-xl">
                  <p className="text-[10px] font-medium uppercase tracking-widest text-sky-400">Repasovaná, cena od</p>
                  <p className="mt-1 font-heading text-2xl font-bold text-white">{fmt(stats.minCenaRepasovane)}</p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span className="text-xs font-medium text-emerald-400">Skladom</span>
                  </div>
                </div>

                {/* Floating — certified */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-sky-500/25 bg-sky-500/8 px-4 py-2 backdrop-blur-md">
                  <span className="text-xs font-medium text-sky-300">✓ Certifikované pre pitnú vodu</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade to white */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#060f1e] to-transparent" />
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="bg-[#060f1e] pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-sky-900/40 bg-[#0a1628]/50 px-6 py-6 backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {[
                { value: '48h', label: 'Doprava po SR', icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                ) },
                { value: `${stats.rokovNaTrhu}+`, label: 'Rokov na trhu', icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                ) },
                { value: '100%', label: 'Certifikovaných', icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                ) },
                { value: '24h', label: 'Odpoveď na dopyt', icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                  </svg>
                ) },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-sky-800/40 bg-sky-900/20">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-heading text-xl font-bold text-white">{item.value}</p>
                    <p className="text-xs text-slate-500">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── KATEGÓRIE ─── */}
      <section className="bg-white">
        <div className="border-b border-slate-100 py-20 text-center">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.35em] text-sky-600">Naša ponuka</p>
          <h2 className="mx-auto mt-3 max-w-2xl font-heading text-4xl font-bold uppercase tracking-tight text-slate-900 sm:text-5xl">
            Čo hľadáte?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-slate-400">
            Nové, repasované alebo príslušenstvo — všetko skladom, všetko certifikované.
          </p>
        </div>

        {katSekcie.map((kat) => (
          <div key={kat.href} className={`flex flex-col border-b border-slate-100 ${kat.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
            <div className="relative h-72 w-full overflow-hidden lg:h-auto lg:min-h-[500px] lg:w-1/2">
              <Image
                src={kat.img}
                alt={kat.nazov}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-[#060f1e]/25" />
            </div>

            <div className="flex w-full flex-col justify-center px-8 py-14 lg:w-1/2 lg:px-16 lg:py-24">
              <span className={`mb-5 inline-block w-fit rounded-full px-4 py-1.5 font-heading text-xs font-bold uppercase tracking-widest ${kat.badgeCls}`}>
                {kat.badge}
              </span>
              <h2 className="font-heading text-4xl font-bold uppercase leading-tight tracking-tight text-slate-900 sm:text-5xl">
                {kat.nazov}
              </h2>
              <p className="mt-4 leading-relaxed text-slate-500">{kat.popis}</p>
              <ul className="mt-6 space-y-2.5">
                {kat.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-slate-700">
                    <CheckIcon cls={kat.accent} />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-slate-100 pt-8">
                <div>
                  <p className="text-xs text-slate-400">Cena od</p>
                  <p className={`font-heading text-3xl font-bold ${kat.priceCls}`}>{kat.cena}</p>
                </div>
                <Link href={kat.href} className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 font-heading text-sm font-bold uppercase tracking-widest text-white transition-colors ${kat.btn}`}>
                  Zobraziť <ArrowRight />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ─── STATS ─── */}
      <section className="relative overflow-hidden bg-[#060f1e] py-24">
        <div className="pointer-events-none absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-sky-700/10 blur-[100px]" />
        <div className="pointer-events-none absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-blue-700/10 blur-[100px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.35em] text-sky-500">Čísla</p>
            <h2 className="mt-3 font-heading text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl">
              Prečo nám zákazníci dôverujú
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {[
              { hodnota: `${stats.rokovNaTrhu}+`, popis: 'Rokov skúseností', sub: 'na trhu od 2014' },
              { hodnota: stats.produktovSkladom.toString(), popis: 'Produktov skladom', sub: 'ihneď dostupné' },
              { hodnota: '48h', popis: 'Garantovaná doprava', sub: 'celé Slovensko' },
              { hodnota: stats.vybavenychDopytov > 0 ? `${stats.vybavenychDopytov}+` : '100+', popis: 'Spokojných zákazníkov', sub: 'vybavených dopytov' },
            ].map((s) => (
              <div key={s.popis} className="text-center">
                <p className="bg-gradient-to-b from-sky-300 to-sky-500 bg-clip-text font-heading text-5xl font-bold text-transparent lg:text-6xl">
                  {s.hodnota}
                </p>
                <p className="mt-3 font-heading text-sm font-bold uppercase tracking-wide text-white">{s.popis}</p>
                <p className="mt-1 text-xs text-slate-600">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUKTY ─── */}
      {featuredProdukty.length > 0 && (
        <section className="bg-slate-50 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="font-heading text-xs font-bold uppercase tracking-[0.35em] text-sky-600">Repasované nádrže</p>
                <h2 className="mt-2 font-heading text-4xl font-bold uppercase tracking-tight text-slate-900 sm:text-5xl">
                  Aktuálne skladom
                </h2>
              </div>
              <Link
                href="/produkty"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 font-heading text-sm font-semibold uppercase tracking-widest text-slate-600 shadow-sm transition-all hover:border-sky-500 hover:text-sky-600"
              >
                Všetky nádrže <ArrowRight />
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

      {/* ─── AKO TO FUNGUJE ─── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.35em] text-sky-600">Proces</p>
            <h2 className="mt-3 font-heading text-4xl font-bold uppercase tracking-tight text-slate-900 sm:text-5xl">
              Ako to funguje
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-px bg-slate-100 md:grid-cols-3">
            {[
              { n: '01', nazov: 'Vyberte nádrž', popis: 'Prezrite si katalóg repasovaných aj nových IBC nádrží a vyberte tú, ktorá vám vyhovuje.', dark: false },
              { n: '02', nazov: 'Pošlite dopyt', popis: 'Pridajte produkty do dopytu a vyplňte formulár. Trvá to menej ako 2 minúty.', dark: true },
              { n: '03', nazov: 'Doručíme k vám', popis: 'Ozveme sa do 24 hodín a doručíme nádrže priamo k vám — celé Slovensko do 48h.', dark: false },
            ].map((krok) => (
              <div key={krok.n} className={`flex flex-col p-10 lg:p-14 ${krok.dark ? 'bg-[#060f1e]' : 'bg-white'}`}>
                <span className={`font-heading text-8xl font-bold leading-none ${krok.dark ? 'text-sky-500/20' : 'text-slate-100'}`}>
                  {krok.n}
                </span>
                <h3 className={`mt-4 font-heading text-xl font-bold uppercase tracking-wide ${krok.dark ? 'text-white' : 'text-slate-900'}`}>
                  {krok.nazov}
                </h3>
                <p className={`mt-2 text-sm leading-relaxed ${krok.dark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {krok.popis}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RECENZIE ─── */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.35em] text-sky-600">Recenzie</p>
            <h2 className="mt-3 font-heading text-4xl font-bold uppercase tracking-tight text-slate-900 sm:text-5xl">
              Čo hovoria zákazníci
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { meno: 'Marek Novák', firma: 'Farma Novák, s.r.o.', text: 'Objednali sme 5 repasovaných nádrží. Dorazili čisté, v perfektnom stave. Komunikácia bezproblémová, dodanie do 2 dní. Odporúčam.', hviezdy: 5 },
              { meno: 'Jana Kováčová', firma: 'Záhradné centrum Bratislava', text: 'Potrebovala som nádrže na zavlažovanie. Poradili mi správny typ, cena bola férová. Určite sa vrátim pri ďalšej objednávke.', hviezdy: 5 },
              { meno: 'Peter Blaho', firma: 'Blaho Logistics', text: 'Výborná spolupráca. Rýchle doručenie, nádrže v poriadku. Cena zodpovedá kvalite. Odporúčam každému, kto hľadá IBC kontajnery.', hviezdy: 5 },
            ].map((r) => (
              <div key={r.meno} className="flex flex-col rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-100">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: r.hviezdy }).map((_, i) => (
                    <svg key={i} className="h-4 w-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="flex-1 text-sm leading-relaxed text-slate-500 italic">&ldquo;{r.text}&rdquo;</p>
                <div className="mt-6 border-t border-slate-100 pt-5">
                  <p className="font-heading text-sm font-bold text-slate-900">{r.meno}</p>
                  <p className="text-xs text-slate-400">{r.firma}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="relative overflow-hidden bg-[#060f1e] py-24">
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-700/8 blur-[100px]" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.35em] text-sky-500">Otázky</p>
            <h2 className="mt-3 font-heading text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl">
              Časté otázky
            </h2>
          </div>
          <div className="divide-y divide-white/8">
            {faqs.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-sm font-bold uppercase tracking-wide text-white/80 transition-colors hover:text-sky-400">
                  {item.q}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 text-slate-600 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-slate-400">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-700 via-sky-600 to-blue-700 py-28">
        <div className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-white/8 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-blue-900/30 blur-[100px]" />

        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.35em] text-sky-200">Kontakt</p>
          <h2 className="mt-4 font-heading text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Potrebujete<br />IBC nádrž?
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-lg text-sky-100/70">
            Pošlite nezáväzný dopyt — ozveme sa do 24 hodín s ponukou presne pre vás.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/produkty"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-10 py-4 font-heading text-sm font-bold uppercase tracking-widest text-sky-700 shadow-xl transition-all hover:bg-sky-50 hover:shadow-2xl"
            >
              Vybrať nádrž <ArrowRight />
            </Link>
            <Link
              href="/kosik"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/25 px-10 py-4 font-heading text-sm font-bold uppercase tracking-widest text-white transition-all hover:border-white/50 hover:bg-white/8"
            >
              Poslať dopyt
            </Link>
          </div>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8">
            <a href="tel:+421900000000" className="flex items-center gap-2 text-sm text-sky-200/60 transition-colors hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              +421 900 000 000
            </a>
            <span className="hidden text-sky-200/20 sm:block">|</span>
            <a href="mailto:info@bandasky.sk" className="flex items-center gap-2 text-sm text-sky-200/60 transition-colors hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              info@bandasky.sk
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
