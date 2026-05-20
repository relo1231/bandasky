import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Ochrana osobných údajov',
  description: 'Zásady ochrany osobných údajov Bandasky – spracúvanie údajov v súlade s GDPR.',
  alternates: { canonical: 'https://bandasky.sk/ochrana-osobnych-udajov' },
  robots: { index: false, follow: false },
}

const sections = [
  {
    title: 'Základné informácie',
    content: [
      'Spoločnosť Bandasky (ďalej len „prevádzkovateľ") spracúva osobné údaje v súlade s nariadením Európskeho parlamentu a Rady (EÚ) 2016/679 o ochrane fyzických osôb pri spracúvaní osobných údajov (GDPR) a zákonom č. 18/2018 Z. z. o ochrane osobných údajov.',
    ],
  },
  {
    title: 'Kontakt na prevádzkovateľa',
    content: [
      'V prípade otázok týkajúcich sa spracúvania vašich osobných údajov nás môžete kontaktovať:',
    ],
    list: [
      'E-mail: info@bandasky.sk',
      'Telefón: +421 900 000 000',
      'Adresa: Slovenská republika',
    ],
  },
  {
    title: 'Zásady ochrany údajov',
    content: [
      'Osobné údaje sú uchovávané bezpečne, len po dobu nevyhnutnú na splnenie účelu spracúvania. Prístup k osobným údajom majú iba oprávnené osoby. Zálohy slúžia na ochranu pred bezpečnostnými incidentami.',
      'Osobné údaje nie sú poskytované tretím stranám bez vášho súhlasu, s výnimkou prípadov stanovených zákonom alebo pri plnení zmluvy (napr. doručovacia služba).',
    ],
  },
  {
    title: 'Účely spracúvania osobných údajov',
    content: [
      'Vaše osobné údaje spracúvame na nasledovné účely:',
    ],
    listItems: [
      { label: 'Kontaktný formulár', desc: 'Meno, email, telefón, obsah správy – za účelom odpovede na vašu otázku alebo vypracovania cenovej ponuky. Doba uchovávania: 1 rok od poslednej komunikácie.' },
      { label: 'Zmluvné vzťahy', desc: 'Meno, priezvisko, adresa, kontaktné údaje – za účelom uzatvorenia a plnenia zmluvy. Doba uchovávania: 10 rokov (účtovné a daňové povinnosti).' },
      { label: 'Cookies a analýza webu', desc: 'IP adresa, správanie na webe – za účelom analýzy návštevnosti (Google Analytics 4). Spracúvanie prebieha iba s vaším súhlasom. Doba uchovávania: 2 roky.' },
      { label: 'Marketingová komunikácia', desc: 'Email – za účelom zasielania obchodných ponúk, iba s vaším výslovným súhlasom. Súhlas môžete kedykoľvek odvolať.' },
    ],
  },
  {
    title: 'Cookies',
    content: [
      'Táto webová stránka používa súbory cookie. Nevyhnutné cookies zabezpečujú základné fungovanie webu a sú aktívne vždy. Analytické a marketingové cookies aktivujeme iba s vaším súhlasom, ktorý môžete kedykoľvek zmeniť cez odkaz „Nastavenia cookies" v päte stránky.',
      'Podrobné informácie o jednotlivých cookies nájdete v nastaveniach súborov cookie.',
    ],
  },
  {
    title: 'Práva dotknutej osoby',
    content: [
      'V súvislosti so spracúvaním vašich osobných údajov máte nasledovné práva:',
    ],
    list: [
      'Právo na prístup – získať potvrdenie o tom, či spracúvame vaše osobné údaje, a prístup k nim.',
      'Právo na opravu – požiadať o opravu nesprávnych alebo neúplných osobných údajov.',
      'Právo na vymazanie – požiadať o vymazanie osobných údajov, ak pominul účel ich spracúvania.',
      'Právo na obmedzenie spracúvania – požiadať o dočasné pozastavenie spracúvania vašich údajov.',
      'Právo na prenositeľnosť – získať vaše údaje v štruktúrovanom, strojovo čitateľnom formáte.',
      'Právo namietať – namietať voči spracúvaniu na základe oprávneného záujmu alebo na priamy marketing.',
      'Právo odvolať súhlas – kedykoľvek odvolať súhlas so spracúvaním, bez vplyvu na zákonnosť predchádzajúceho spracúvania.',
    ],
  },
  {
    title: 'Podanie sťažnosti',
    content: [
      'Ak sa domnievate, že spracúvanie vašich osobných údajov porušuje právne predpisy, máte právo podať sťažnosť na Úrad na ochranu osobných údajov Slovenskej republiky:',
    ],
    list: [
      'Adresa: Hraničná 12, 820 07 Bratislava',
      'Web: www.dataprotection.gov.sk',
      'Tel.: +421 2 3231 3214',
    ],
  },
  {
    title: 'Zmeny zásad',
    content: [
      'Tieto zásady ochrany osobných údajov môžeme príležitostne aktualizovať. O zmenách vás budeme informovať zverejnením aktualizovanej verzie na tejto stránke. Odporúčame stránku pravidelne navštevovať.',
      'Posledná aktualizácia: máj 2026',
    ],
  },
]

export default function OchranaOsobnychUdajovPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-700 to-teal-800 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/60">
            <Link href="/" className="transition-colors hover:text-white">Domov</Link>
            <span>/</span>
            <span className="text-white">Ochrana osobných údajov</span>
          </nav>
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">Právne informácie</p>
          <h1 className="mt-3 font-heading text-4xl font-bold uppercase tracking-wide text-white sm:text-5xl">
            Ochrana osobných údajov
          </h1>
          <p className="mt-4 max-w-xl text-white/70">
            Spracúvame vaše osobné údaje zodpovedne, v súlade s GDPR a zákonom č. 18/2018 Z. z.
          </p>
        </div>
      </div>

      {/* Obsah */}
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12">
          {sections.map((s, i) => (
            <div key={i}>
              <h2 className="mb-4 border-b border-slate-100 pb-3 font-heading text-lg font-bold uppercase tracking-wide text-slate-900">
                {s.title}
              </h2>
              <div className="flex flex-col gap-3">
                {s.content.map((p, j) => (
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
      </div>
    </div>
  )
}
