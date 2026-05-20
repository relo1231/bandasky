import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Kontaktujte nás — IBC nádrže Bandasky. Telefón, email, adresa. Odpovieme do 24 hodín.',
}

export default function KontaktPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-700 to-teal-800 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/60">
            <Link href="/" className="transition-colors hover:text-white">Domov</Link>
            <span>/</span>
            <span className="text-white">Kontakt</span>
          </nav>
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">Kontakt</p>
          <h1 className="mt-3 font-heading text-4xl font-bold uppercase tracking-wide text-white sm:text-5xl">
            Ozvite sa nám
          </h1>
          <p className="mt-4 max-w-lg text-white/70">
            Radi vám poradíme s výberom IBC nádrže. Odpovieme do 24 hodín.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Kontaktné info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-heading text-2xl font-bold uppercase tracking-wide text-slate-900">
                Kontaktné údaje
              </h2>
              <p className="mt-2 text-slate-500">Sme k dispozícii v pracovné dni od 8:00 do 17:00.</p>
            </div>

            <div className="space-y-4">
              {/* Telefón */}
              <a
                href="tel:+421900000000"
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400">Telefón</p>
                  <p className="font-heading text-lg font-bold text-slate-900">+421 900 000 000</p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:info@bandasky.sk"
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400">Email</p>
                  <p className="font-heading text-lg font-bold text-slate-900">info@bandasky.sk</p>
                </div>
              </a>

              {/* Adresa */}
              <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400">Adresa</p>
                  <p className="font-heading text-lg font-bold text-slate-900">Slovenská republika</p>
                  <p className="text-sm text-slate-500">Celonárodná pôsobnosť</p>
                </div>
              </div>

              {/* Prevádzkové hodiny */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-slate-700">Prevádzkové hodiny</h3>
                <div className="mt-3 space-y-2">
                  {[
                    { den: 'Pondelok – Piatok', cas: '08:00 – 17:00' },
                    { den: 'Sobota', cas: '09:00 – 12:00' },
                    { den: 'Nedeľa', cas: 'Zatvorené' },
                  ].map((row) => (
                    <div key={row.den} className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">{row.den}</span>
                      <span className={`font-semibold ${row.cas === 'Zatvorené' ? 'text-slate-400' : 'text-slate-900'}`}>{row.cas}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Formulár */}
          <div>
            <h2 className="font-heading text-2xl font-bold uppercase tracking-wide text-slate-900">
              Napíšte nám
            </h2>
            <p className="mt-2 text-slate-500">Alebo rovno <Link href="/kosik" className="font-medium text-emerald-600 hover:text-emerald-700 underline">pošlite dopyt</Link> s konkrétnymi produktmi.</p>

            <form className="mt-8 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">Meno *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ján Novák"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="jan@firma.sk"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">Telefón</label>
                <input
                  type="tel"
                  placeholder="+421 900 000 000"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600">Správa *</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Popíšte čo potrebujete — typ nádrže, počet kusov, účel použitia..."
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-emerald-600 px-6 py-4 font-heading text-sm font-bold uppercase tracking-widest text-white shadow-sm transition-all hover:bg-emerald-700 hover:shadow-md"
              >
                Odoslať správu
              </button>
              <p className="text-center text-xs text-slate-400">
                Odoslaním súhlasíte so spracovaním osobných údajov. Odpovieme do 24 hodín.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
