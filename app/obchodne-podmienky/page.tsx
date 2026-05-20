import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Obchodné podmienky',
  description: 'Všeobecné obchodné podmienky Bandasky – nákup IBC nádrží online.',
  alternates: { canonical: 'https://bandasky.sk/obchodne-podmienky' },
}

const sections = [
  {
    title: 'Základné ustanovenia',
    content: [
      'Tieto všeobecné obchodné podmienky (ďalej len „VOP") upravujú práva a povinnosti zmluvných strán vzniknuté v súvislosti alebo na základe kúpnej zmluvy uzatvorenej medzi predávajúcim a kupujúcim prostredníctvom internetového obchodu na adrese bandasky.sk.',
      'Predávajúci: Bandasky (ďalej len „predávajúci"). Kontakt: info@bandasky.sk, tel.: +421 900 000 000.',
      'Kupujúcim sa rozumie fyzická alebo právnická osoba, ktorá odošle elektronický formulár s dopytom prostredníctvom internetového obchodu predávajúceho.',
    ],
  },
  {
    title: 'Objednávka a uzatvorenie zmluvy',
    content: [
      'Kupujúci si vyberá tovar z ponuky predávajúceho, pridáva ho do dopytu a odošle vyplnený kontaktný formulár. Odoslaním formulára kupujúci potvrdzuje, že sa oboznámil s týmito VOP.',
      'Po doručení dopytu predávajúci kontaktuje kupujúceho s cenovou ponukou do 24 hodín (v pracovné dni). Zmluva je uzatvorená okamihom písomného (emailového) potvrdenia objednávky zo strany predávajúceho.',
      'Predávajúci si vyhradzuje právo odmietnuť objednávku alebo jej časť (napr. tovar nie je dostupný, zjavná chyba v cene).',
    ],
  },
  {
    title: 'Ceny a platobné podmienky',
    content: [
      'Ceny uvedené na webovej stránke sú informatívne a môžu sa meniť. Záväzná cena je uvedená v cenovej ponuke zaslanej predávajúcim emailom.',
      'Platba prebieha na základe faktúry vystavenej predávajúcim. Predávajúci je platcom DPH. Splatnosť faktúry je 14 dní od vystavenia, pokiaľ nie je dohodnuté inak.',
      'Predávajúci si vyhradzuje právo požadovať zálohu pred expedíciou tovaru, najmä pri vyšších objemoch alebo pri prvej objednávke.',
    ],
  },
  {
    title: 'Doprava a dodanie',
    content: [
      'Predávajúci zabezpečuje dopravu tovaru na celom území Slovenskej republiky. Štandardná dodacia lehota je 48 hodín od potvrdenia objednávky a úhrady (príp. dohody o platbe).',
      'Miesto dodania určuje kupujúci pri objednávke. Kupujúci je povinný zabezpečiť prístup pre doručenie (napr. možnosť vyloženia paletovým vozíkom).',
      'Náklady na dopravu sú dohodnuté individuálne podľa množstva a miesta dodania a sú súčasťou cenovej ponuky.',
    ],
  },
  {
    title: 'Prevzatie tovaru',
    content: [
      'Kupujúci je povinný skontrolovať tovar pri prevzatí. Zjavné poškodenia a nezrovnalosti je kupujúci povinný ihneď zaznamenať do dodacieho listu a bezodkladne oznámiť predávajúcemu.',
      'Podpísaním dodacieho listu kupujúci potvrdzuje prevzatie tovaru v poriadku. Neskoršie reklamácie zjavných poškodení vzniknutých pri preprave nemusia byť uznané.',
    ],
  },
  {
    title: 'Vlastnícke právo a prechod nebezpečenstva',
    content: [
      'Vlastnícke právo k tovaru prechádza na kupujúceho úplným zaplatením kúpnej ceny.',
      'Nebezpečenstvo škody na tovare prechádza na kupujúceho prevzatím tovaru.',
    ],
  },
  {
    title: 'Zodpovednosť za vady – záruka',
    content: [
      'Na nový tovar poskytuje predávajúci záruku 24 mesiacov. Na repasovaný tovar poskytuje predávajúci záruku 6 mesiacov, pokiaľ nie je dohodnuté inak.',
      'Záruka sa nevzťahuje na vady spôsobené nesprávnym používaním, mechanickým poškodením, nevhodným skladovaním alebo použitím na účel, na ktorý tovar nebol určený.',
      'Podrobnosti o uplatnení reklamácie sú uvedené v Reklamačnom poriadku zverejnenom na stránke bandasky.sk/reklamacny-poriadok.',
    ],
  },
  {
    title: 'Odstúpenie od zmluvy',
    content: [
      'Keďže predávajúci pôsobí primárne v oblasti B2B (predaj podnikateľom), na kupujúcich – podnikateľov sa nevzťahuje 14-dňová lehota na odstúpenie od zmluvy podľa § 7 zákona č. 102/2014 Z. z.',
      'Fyzická osoba – spotrebiteľ má právo odstúpiť od zmluvy uzatvorenej na diaľku bez udania dôvodu do 14 dní od prevzatia tovaru. Tovar je nutné vrátiť nepoškodený, v pôvodnom stave. Náklady na vrátenie tovaru znáša kupujúci.',
      'Odstúpenie od zmluvy je potrebné zaslať písomne na info@bandasky.sk.',
    ],
  },
  {
    title: 'Ochrana osobných údajov',
    content: [
      'Predávajúci spracúva osobné údaje kupujúceho v súlade s nariadením GDPR a zákonom č. 18/2018 Z. z. Podrobnosti sú uvedené v dokumente Ochrana osobných údajov na stránke bandasky.sk/ochrana-osobnych-udajov.',
    ],
  },
  {
    title: 'Záverečné ustanovenia',
    content: [
      'Tieto VOP sú platné a účinné od ich zverejnenia na stránke bandasky.sk. Predávajúci si vyhradzuje právo tieto VOP meniť. O zmenách informuje zverejnením novej verzie na tejto stránke.',
      'Právne vzťahy neupravené týmito VOP sa riadia príslušnými ustanoveniami Obchodného zákonníka (zákon č. 513/1991 Zb.) a Občianskeho zákonníka (zákon č. 40/1964 Zb.).',
      'Prípadné spory sa zmluvné strany zaväzujú riešiť prednostne dohodou. V prípade spotrebiteľského sporu má kupujúci – spotrebiteľ právo obrátiť sa na Slovenskú obchodnú inšpekciu (www.soi.sk).',
      'Posledná aktualizácia: máj 2026',
    ],
  },
]

export default function ObchodnePodmienkyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-700 to-teal-800 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/60">
            <Link href="/" className="transition-colors hover:text-white">Domov</Link>
            <span>/</span>
            <span className="text-white">Obchodné podmienky</span>
          </nav>
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">Právne informácie</p>
          <h1 className="mt-3 font-heading text-4xl font-bold uppercase tracking-wide text-white sm:text-5xl">
            Obchodné podmienky
          </h1>
          <p className="mt-4 max-w-xl text-white/70">
            Všeobecné obchodné podmienky pre nákup IBC nádrží na bandasky.sk.
          </p>
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
                {s.content.map((p, j) => (
                  <p key={j} className="text-sm leading-relaxed text-slate-500">{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-emerald-100 bg-emerald-50 p-6">
          <p className="text-sm font-semibold text-emerald-800">Máte otázky k obchodným podmienkam?</p>
          <p className="mt-1 text-sm text-emerald-700">Kontaktujte nás na <a href="mailto:info@bandasky.sk" className="underline">info@bandasky.sk</a> alebo <a href="tel:+421900000000" className="underline">+421 900 000 000</a>.</p>
        </div>
      </div>
    </div>
  )
}
