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
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-24">
      <div className="mx-auto max-w-lg text-center">
        {/* Blue checkmark */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#1e6fff] bg-[#0a1628]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-[#1e6fff]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="font-heading text-4xl font-bold uppercase tracking-wide text-white">
          Ďakujeme!
        </h1>

        {cislo && (
          <p className="mt-4 font-heading text-lg text-[#6b7fa3]">
            Dopyt č. <span className="font-bold text-[#60a5fa]">{cislo}</span> bol odoslaný.
          </p>
        )}

        <p className="mt-4 font-body leading-relaxed text-[#6b7fa3]">
          Ozveme sa vám na váš email alebo telefón do{' '}
          <strong className="text-[#e2e8f0]">24 hodín</strong>.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-block bg-[#1e6fff] px-8 py-3.5 font-heading text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#1458d6]"
          >
            Späť na hlavnú
          </Link>
          <Link
            href="/produkty"
            className="inline-block border border-[#1a2a45] px-8 py-3.5 font-heading text-sm font-semibold uppercase tracking-widest text-[#6b7fa3] transition-all hover:border-[#1e6fff] hover:text-[#1e6fff]"
          >
            Ďalšie nádrže
          </Link>
        </div>
      </div>
    </div>
  )
}
