import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-emerald-50">
        <span className="font-heading text-4xl font-bold text-emerald-600">404</span>
      </div>
      <h1 className="mt-6 font-heading text-3xl font-bold uppercase tracking-wide text-slate-900 sm:text-4xl">
        Stránka nenájdená
      </h1>
      <p className="mt-4 max-w-md text-slate-500">
        Stránka, ktorú hľadáte, neexistuje alebo bola presunutá. Skúste sa vrátiť na hlavnú stránku.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-heading text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-emerald-700"
        >
          Domov
        </Link>
        <Link
          href="/produkty"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-6 py-3 font-heading text-sm font-bold uppercase tracking-widest text-slate-600 transition-colors hover:border-emerald-600 hover:text-emerald-600"
        >
          Nádrže
        </Link>
      </div>
    </div>
  )
}
