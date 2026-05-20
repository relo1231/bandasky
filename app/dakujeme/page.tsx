import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Ďakujeme za dopyt',
  description: 'Váš dopyt bol úspešne odoslaný.',
}

type Props = {
  searchParams: Promise<{ cislo?: string }>
}

export default async function DakujemePage({ searchParams }: Props) {
  const { cislo } = await searchParams

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-white px-4 py-24">
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-emerald-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="font-heading text-4xl font-bold uppercase tracking-wide text-slate-900">
          Ďakujeme!
        </h1>

        {cislo && (
          <p className="mt-4 text-slate-500">
            Dopyt č. <span className="font-bold text-slate-900">{cislo}</span> bol odoslaný.
          </p>
        )}

        <p className="mt-4 leading-relaxed text-slate-500">
          Ozveme sa vám na váš email alebo telefón do{' '}
          <strong className="text-slate-900">24 hodín</strong>.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-block rounded-lg bg-slate-900 px-8 py-3.5 font-heading text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-slate-700"
          >
            Späť na hlavnú
          </Link>
          <Link
            href="/produkty"
            className="inline-block rounded-lg border border-slate-200 px-8 py-3.5 font-heading text-sm font-bold uppercase tracking-widest text-slate-600 transition-all hover:border-slate-900 hover:text-slate-900"
          >
            Ďalšie nádrže
          </Link>
        </div>
      </div>
    </div>
  )
}
