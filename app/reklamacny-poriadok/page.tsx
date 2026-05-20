import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Reklamačný poriadok',
  description: 'Reklamačný poriadok Bandasky – ako reklamovať IBC nádrže a príslušenstvo.',
  alternates: { canonical: 'https://bandasky.sk/reklamacny-poriadok' },
}

const steps = [
  { cislo: '01', nazov: 'Kontaktujte nás', popis: 'Pošlite email na info@bandasky.sk s číslom objednávky, popisom vady a fotografiami poškodenia.' },
  { cislo: '02', nazov: 'Potvrdenie prijatia', popis: 'Do 3 pracovných dní potvrdíme prijatie reklamácie a informujeme vás o ďalšom postupe.' },
  { cislo: '03', nazov: 'Posúdenie reklamácie', popis: 'Reklamáciu posúdime do 30 dní od jej doručenia. O výsledku vás informujeme emailom.' },
  { cislo: '04', nazov: 'Vybavenie', popis: 'Pri uznaní reklamácie opravíme, vymeníme tovar alebo vrátime peniaze — podľa dohody.' },
]

const sections = [
  {
    title: 'Všeobecné ustanovenia',
    content: [
      'Reklamačný poriadok upravuje spôsob uplatnenia práv kupujúceho zo zodpovednosti predávajúceho za vady tovaru zakúpeného prostredníctvom internetového obchodu bandasky.sk.',
      'Predávajúci: Bandasky, info@bandasky.sk, +421 900 000 000.',
    ],
  },
  {
    title: 'Záručná doba',
    listItems: [
      { label: 'Nový tovar', desc: '24 mesiacov od prevzatia tovaru.' },
      { label: 'Repasovaný tovar', desc: '6 mesiacov od prevzatia tovaru, pokiaľ nie je dohodnuté inak.' },
      { label: 'Príslušenstvo', desc: '24 mesiacov, ak nie je výslovne uvedené inak.' },
    ],
  },
  {
    title: 'Kedy záruka nevzniká',
    content: [
      'Záruka sa nevzťahuje na vady spôsobené:',
    ],
    list: [
      'Nesprávnym používaním alebo skladovaním (napr. mráz, priame UV žiarenie nad rámec špecifikácií).',
      'Mechanickým poškodením kupujúcim (pádom, nárazom, prepichnutím).',
      'Použitím chemikálií alebo látok, na ktoré nádrž nie je certifikovaná.',
      'Bežným opotrebovaním pri repasovanom tovare.',
      'Neoprávneným zásahom do konštrukcie tovaru.',
    ],
  },
  {
    title: 'Ako uplatniť reklamáciu',
    content: [
      'Reklamáciu je možné uplatniť emailom na info@bandasky.sk. Správa musí obsahovať:',
    ],
    list: [
      'Číslo objednávky alebo faktúry.',
      'Popis zistenej vady — kedy sa vada prejavila a ako.',
      'Fotodokumentáciu vady (minimálne 2 fotografie).',
      'Požadovaný spôsob vybavenia reklamácie (oprava, výmena, vrátenie peňazí).',
    ],
  },
  {
    title: 'Lehoty na vybavenie',
    content: [
      'Predávajúci potvrdí prijatie reklamácie do 3 pracovných dní. Reklamácia bude vybavená najneskôr do 30 dní od jej uplatnenia.',
      'Ak predávajúci nerozhodne o reklamácii v stanovenej lehote, kupujúci má právo od zmluvy odstúpiť alebo požadovať výmenu tovaru.',
    ],
  },
  {
    title: 'Spôsoby vybavenia reklamácie',
    content: [
      'Pri oprávnenej reklamácii predávajúci podľa dohody s kupujúcim:',
    ],
    list: [
      'Vadu odstráni opravou tovaru.',
      'Vadný tovar vymení za nový/repasovaný bez vady.',
      'Poskytne primeranú zľavu z kúpnej ceny.',
      'Vráti kúpnu cenu a zmluvu zruší (pri odstúpení od zmluvy).',
    ],
  },
  {
    title: 'Náklady reklamácie',
    content: [
      'Pri oprávnenej reklamácii hradí náklady spojené s vrátením alebo výmenou tovaru predávajúci.',
      'Pri neoprávnenej reklamácii (vada nespadá pod záruku) môže predávajúci požadovať náhradu vzniknutých nákladov.',
    ],
  },
  {
    title: 'Alternatívne riešenie sporov',
    content: [
      'Kupujúci – spotrebiteľ má právo obrátiť sa na predávajúceho so žiadosťou o nápravu, ak nie je spokojný so spôsobom vybavenia reklamácie.',
      'Ak predávajúci odpovie zamietavo alebo neodpovie do 30 dní, spotrebiteľ môže podať návrh na alternatívne riešenie sporu na Slovenskú obchodnú inšpekciu (www.soi.sk) alebo iný príslušný subjekt.',
      'Posledná aktualizácia: máj 2026',
    ],
  },
]

export default function ReklamacnyPoriadokPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-700 to-teal-800 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/60">
            <Link href="/" className="transition-colors hover:text-white">Domov</Link>
            <span>/</span>
            <span className="text-white">Reklamačný poriadok</span>
          </nav>
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">Právne informácie</p>
          <h1 className="mt-3 font-heading text-4xl font-bold uppercase tracking-wide text-white sm:text-5xl">
            Reklamačný poriadok
          </h1>
          <p className="mt-4 max-w-xl text-white/70">
            Ako postupovať pri reklamácii IBC nádrží alebo príslušenstva zakúpeného na bandasky.sk.
          </p>
        </div>
      </div>

      {/* Kroky */}
      <div className="border-b border-slate-100 bg-slate-50 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.cislo} className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-100">
                  <span className="font-heading text-lg font-bold text-emerald-600">{s.cislo}</span>
                </div>
                <h3 className="mt-3 font-heading text-sm font-bold uppercase tracking-wide text-slate-900">{s.nazov}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{s.popis}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Obsah */}
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12">
          {sections.map((s, i) => (
            <div key={i}>
              <h2 className="mb-4 border-b border-slate-100 pb-3 font-heading text-lg font-bold uppercase tracking-wide text-slate-900">
                {i + 1}. {s.title}
              </h2>
              <div className="flex flex-col gap-3">
                {s.content?.map((p, j) => (
                  <p key={j} className="text-sm leading-relaxed text-slate-500">{p}</p>
                ))}
                {s.list && (
                  <ul className="mt-1 flex flex-col gap-2">
                    {s.list.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm leading-relaxed text-slate-500">
                        <span className="mt-px shrink-0 font-bold text-emerald-600">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {s.listItems && (
                  <div className="mt-1 flex flex-col gap-3">
                    {s.listItems.map((item, j) => (
                      <div key={j} className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-4">
                        <div className="mb-1 text-sm font-semibold text-slate-900">{item.label}</div>
                        <div className="text-xs leading-relaxed text-slate-500">{item.desc}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-emerald-100 bg-emerald-50 p-6">
          <p className="text-sm font-semibold text-emerald-800">Chcete reklamovať tovar?</p>
          <p className="mt-1 text-sm text-emerald-700">
            Napíšte nám na <a href="mailto:info@bandasky.sk" className="underline">info@bandasky.sk</a> s číslom objednávky a popisom vady. Odpovieme do 3 pracovných dní.
          </p>
        </div>
      </div>
    </div>
  )
}
