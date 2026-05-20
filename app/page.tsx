import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { Produkt } from '@/types'
import { ProduktKarta } from '@/components/ProduktKarta'

export const metadata: Metadata = {
  title: 'Bandasky – 1000L IBC nádrže na vodu',
  description: 'Nové a repasované 1000L IBC nádrže na vodu. Certifikované pre pitnú vodu. Rýchla doprava po SR.',
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

type Stats = {
  produktovSkladom: number
  vybavenychDopytov: number
  rokovNaTrhu: number
}

async function getStats(): Promise<Stats> {
  const [{ count: produktovSkladom }, { count: vybavenychDopytov }] = await Promise.all([
    supabase
      .from('produkty')
      .select('*', { count: 'exact', head: true })
      .eq('aktivny', true)
      .eq('dostupnost', 'Na sklade'),
    supabase
      .from('dopyty')
      .select('*', { count: 'exact', head: true })
      .eq('stav', 'vybavený'),
  ])

  const rokovNaTrhu = new Date().getFullYear() - 2014

  return {
    produktovSkladom: produktovSkladom ?? 0,
    vybavenychDopytov: vybavenychDopytov ?? 0,
    rokovNaTrhu,
  }
}

const kategorie = [
  {
    href: '/produkty?kategoria=nove-nadrze',
    nazov: 'Nové IBC nádrže',
    popis: 'Značkové 1000L kontajnery s certifikátom pre pitnú vodu. Plná záruka.',
    cena: 'od 89 €',
    gradient: 'from-blue-600 to-blue-800',
    lightBg: 'bg-blue-50',
    lightText: 'text-blue-600',
    badge: 'Najpredávanejšie',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    href: '/produkty?kategoria=repasovane',
    nazov: 'Repasované nádrže',
    popis: 'Vyčistené a preverené IBC nádrže. Ekologická a ekonomická voľba.',
    cena: 'od 39 €',
    gradient: 'from-emerald-600 to-teal-700',
    lightBg: 'bg-emerald-50',
    lightText: 'text-emerald-600',
    badge: 'Najlepšia cena',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
  },
  {
    href: '/produkty?kategoria=prislusenstvo',
    nazov: 'Príslušenstvo',
    popis: 'Kohúty, adaptéry, čerpadlá, víka a náhradné diely pre IBC nádrže.',
    cena: 'od 3 €',
    gradient: 'from-amber-500 to-orange-600',
    lightBg: 'bg-amber-50',
    lightText: 'text-amber-600',
    badge: null,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
]

const kroky = [
  {
    cislo: '01',
    nazov: 'Vyberte nádrž',
    popis: 'Prezrite si náš katalóg nových a repasovaných IBC nádrží. Filtrujte podľa kategórie.',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
  },
  {
    cislo: '02',
    nazov: 'Pošlite dopyt',
    popis: 'Pridajte produkty do dopytu a vyplňte kontaktný formulár. Trvá to menej ako 2 minúty.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    cislo: '03',
    nazov: 'Doručíme k vám',
    popis: 'Ozveme sa do 24 hodín s ponukou a doručíme nádrže priamo k vám — celé Slovensko.',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
  },
]

export default async function HomePage() {
  const [featuredProdukty, stats] = await Promise.all([
    getFeaturedProdukty(),
    getStats(),
  ])

  const dynamicStats = [
    { hodnota: stats.produktovSkladom.toString(), popis: 'Produktov skladom', sub: 'aktuálne dostupné' },
    { hodnota: `${stats.rokovNaTrhu}+`, popis: 'Rokov skúseností', sub: 'na trhu od 2014' },
    { hodnota: '48h', popis: 'Doprava po SR', sub: 'zaručene' },
    { hodnota: stats.vybavenychDopytov > 0 ? `${stats.vybavenychDopytov}+` : '—', popis: 'Vybavených dopytu', sub: 'spokojných zákazníkov' },
  ]

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-700">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        {/* Subtle radial glow */}
        <div className="absolute top-0 right-0 h-[600px] w-[600px] -translate-y-1/4 translate-x-1/4 rounded-full bg-white opacity-[0.04] blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] translate-y-1/4 -translate-x-1/4 rounded-full bg-teal-300 opacity-[0.08] blur-[80px]" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
            {/* Left: text */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
                <span className="text-sm font-medium text-white/90">Skladom · Celé Slovensko · Doprava 48h</span>
              </div>

              <h1 className="font-heading text-5xl font-bold uppercase leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
                IBC nádrže<br />
                <span className="text-emerald-200">na vodu</span><br />
                skladom
              </h1>

              <p className="mt-6 max-w-md text-lg leading-relaxed text-white/70">
                Nové aj repasované 1000L IBC kontajnery. Certifikované pre pitnú vodu. Rýchla doprava po celom Slovensku priamo k vám.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/produkty"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-heading text-sm font-bold uppercase tracking-widest text-emerald-700 shadow-lg transition-all hover:bg-emerald-50 hover:shadow-xl"
                >
                  Pozrieť nádrže
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/kosik"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 px-7 py-3.5 font-heading text-sm font-bold uppercase tracking-widest text-white backdrop-blur-sm transition-all hover:border-white/60 hover:bg-white/10"
                >
                  Nezáväzný dopyt
                </Link>
              </div>

              {/* Social proof */}
              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
                {['Bez záväzku', 'Odpoveď do 24h', 'Overená kvalita'].map((item) => (
                  <span key={item} className="flex items-center gap-2 text-sm text-white/70">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: floating card */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="animate-float w-full max-w-sm">
                {/* Main card */}
                <div className="relative rounded-2xl bg-white p-6 shadow-2xl">
                  {/* Badge — vnútri karty, vpravo hore */}
                  <div className="absolute -right-3 -top-3 flex h-14 w-14 items-center justify-center rounded-xl bg-amber-400 shadow-lg">
                    <div className="text-center leading-tight">
                      <p className="font-heading text-xs font-bold text-white">48h</p>
                      <p className="font-heading text-[8px] font-bold text-white/80">DOPRAVA</p>
                    </div>
                  </div>

                  <div className="mb-5 flex items-center justify-between pr-8">
                    <div>
                      <p className="text-xs font-medium text-slate-400">Najpredávanejší produkt</p>
                      <p className="font-heading text-lg font-bold uppercase tracking-wide text-slate-900">IBC 1000L Nová</p>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Na sklade</span>
                  </div>

                  <div className="space-y-2">
                    {[
                      { label: 'Objem', value: '1 000 L' },
                      { label: 'Materiál', value: 'HDPE + oceľ' },
                      { label: 'Nosnosť', value: '1 250 kg' },
                      { label: 'Certifikát', value: 'Pitná voda' },
                    ].map((row) => (
                      <div key={row.label} className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-2.5">
                        <span className="text-sm text-slate-500">{row.label}</span>
                        <span className="text-sm font-semibold text-slate-900">{row.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5">
                    <div>
                      <p className="text-xs text-slate-400">Nová — cena od</p>
                      <p className="font-heading text-3xl font-bold text-emerald-600">89 €</p>
                    </div>
                    <Link href="/produkty" className="rounded-xl bg-emerald-600 px-5 py-2.5 font-heading text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-emerald-700">
                      Zobraziť
                    </Link>
                  </div>
                </div>

                {/* Mini karta — pod hlavnou, nie prekrývajúca */}
                <div className="mt-3 flex items-center justify-between rounded-xl border border-white/20 bg-white/10 px-5 py-3 backdrop-blur-sm">
                  <div>
                    <p className="text-xs text-white/60">Repasované nádrže</p>
                    <p className="font-heading text-lg font-bold text-white">od 39 €</p>
                  </div>
                  <Link href="/produkty?kategoria=repasovane" className="rounded-lg border border-white/30 px-4 py-1.5 font-heading text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-white/10">
                    Zobraziť
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="h-[60px] w-full">
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 28C840 36 960 40 1080 38C1200 36 1320 28 1380 24L1440 20V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {dynamicStats.map((s) => (
              <div key={s.popis} className="text-center">
                <p className="font-heading text-4xl font-bold text-emerald-600">{s.hodnota}</p>
                <p className="mt-1 font-semibold text-slate-800">{s.popis}</p>
                <p className="text-xs text-slate-400">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── KATEGÓRIE ─── */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">Ponuka</p>
            <h2 className="mt-3 font-heading text-4xl font-bold uppercase tracking-wide text-slate-900 sm:text-5xl">
              Čo hľadáte?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-500">
              Tri kategórie pre každú potrebu — od nových certifikovaných nádrží až po ekonomické repasované riešenia.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {kategorie.map((kat) => (
              <Link
                key={kat.href}
                href={kat.href}
                className="group relative flex flex-col overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Gradient header */}
                <div className={`relative bg-gradient-to-br ${kat.gradient} p-7 text-white`}>
                  {kat.badge && (
                    <span className="absolute right-4 top-4 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                      {kat.badge}
                    </span>
                  )}
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                    {kat.icon}
                  </div>
                  <h3 className="font-heading text-xl font-bold uppercase tracking-wide">{kat.nazov}</h3>
                  <p className="mt-2 text-sm text-white/80 leading-relaxed">{kat.popis}</p>
                </div>

                {/* White footer */}
                <div className="flex items-center justify-between bg-white px-7 py-5">
                  <div>
                    <p className="text-xs text-slate-400">Cena od</p>
                    <p className={`font-heading text-2xl font-bold ${kat.lightText}`}>{kat.cena}</p>
                  </div>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${kat.lightBg} transition-all group-hover:scale-110`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${kat.lightText}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HERO IMAGE SECTION ─── */}
      <section className="relative h-[420px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=80"
          alt="IBC nádrže sklad"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">O nás</p>
            <h2 className="mt-3 font-heading text-4xl font-bold uppercase leading-tight tracking-wide text-white sm:text-5xl">
              Váš spoľahlivý<br />dodávateľ od 2014
            </h2>
            <p className="mt-4 leading-relaxed text-slate-300">
              Viac ako 10 rokov dodávame IBC nádrže firmám, farmám a súkromným zákazníkom. Od Bratislavy po Košice — sme tu pre vás.
            </p>
            <Link
              href="/produkty"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-7 py-3.5 font-heading text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-emerald-700"
            >
              Pozrieť ponuku
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── AKO TO FUNGUJE ─── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">Proces</p>
            <h2 className="mt-3 font-heading text-4xl font-bold uppercase tracking-wide text-slate-900 sm:text-5xl">
              Ako to funguje
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-500">
              Jednoducho a rýchlo — od výberu nádrže po doručenie priamo k vám.
            </p>
          </div>

          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Connector line (desktop) */}
            <div className="absolute top-12 left-1/6 right-1/6 hidden h-px bg-gradient-to-r from-emerald-200 via-blue-200 to-amber-200 md:block" style={{ left: '20%', right: '20%' }} />

            {kroky.map((krok) => (
              <div key={krok.cislo} className="relative flex flex-col items-center text-center">
                <div className={`relative flex h-24 w-24 items-center justify-center rounded-2xl border-2 ${krok.borderColor} ${krok.bgColor} shadow-sm`}>
                  <span className={`font-heading text-3xl font-bold ${krok.color}`}>{krok.cislo}</span>
                </div>
                <h3 className="mt-5 font-heading text-lg font-bold uppercase tracking-wide text-slate-900">
                  {krok.nazov}
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-500">{krok.popis}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRODUKTY SKLADOM ─── */}
      {featuredProdukty.length > 0 && (
        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="font-heading text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">Aktuálna ponuka</p>
                <h2 className="mt-3 font-heading text-4xl font-bold uppercase tracking-wide text-slate-900 sm:text-5xl">
                  Skladom
                </h2>
              </div>
              <Link
                href="/produkty"
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 font-heading text-sm font-semibold uppercase tracking-widest text-slate-600 shadow-sm transition-all hover:border-emerald-600 hover:text-emerald-600"
              >
                Všetky nádrže
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
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

      {/* ─── VÝHODY STRIP ─── */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: '🏆', title: 'Certifikovaná kvalita', text: 'Všetky nádrže certifikované pre pitnú aj úžitkovú vodu.' },
              { icon: '🚛', title: 'Rýchla doprava', text: 'Doručenie do 48 hodín po celom Slovensku.' },
              { icon: '💬', title: 'Odborné poradenstvo', text: 'Pomôžeme vám vybrať správnu nádrž pre vaše potreby.' },
              { icon: '🔄', title: 'Záruka a servis', text: 'Plná záruka na nové nádrže, poradenstvo na repasované.' },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <span className="mt-0.5 text-2xl">{item.icon}</span>
                <div>
                  <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-700 to-teal-800 py-24">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">Kontakt</p>
          <h2 className="mt-4 font-heading text-4xl font-bold uppercase leading-tight tracking-wide text-white sm:text-5xl">
            Potrebujete IBC nádrž?<br />Ozvite sa nám.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg text-white/70">
            Pošlite nezáväzný dopyt — ozveme sa do 24 hodín a pripravíme cenovú ponuku presne pre vás.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/produkty"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-heading text-sm font-bold uppercase tracking-widest text-emerald-700 shadow-lg transition-all hover:bg-emerald-50 hover:shadow-xl"
            >
              Vybrať nádrž
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/kosik"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 px-8 py-4 font-heading text-sm font-bold uppercase tracking-widest text-white transition-all hover:border-white/60 hover:bg-white/10"
            >
              Poslať dopyt
            </Link>
          </div>
          <div className="mt-8 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-6">
            <a href="tel:+421900000000" className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              +421 900 000 000
            </a>
            <span className="hidden text-white/20 sm:block">·</span>
            <a href="mailto:info@bandasky.sk" className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white">
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
