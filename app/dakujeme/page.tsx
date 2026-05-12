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
        {/* Gold checkmark */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-2 border-gold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gold"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="font-heading text-4xl font-bold uppercase tracking-wide text-[#e8e8e8]">
          Ďakujeme!
        </h1>

        {cislo && (
          <p className="mt-4 font-heading text-lg text-[#888]">
            Dopyt č. <span className="font-bold text-gold">{cislo}</span> bol odoslaný.
          </p>
        )}

        <p className="mt-4 font-body text-[#888]">
          Ozveme sa vám na váš email alebo telefón do{' '}
          <strong className="text-[#e8e8e8]">24 hodín</strong>.
        </p>

        <div className="mt-10">
          <Link
            href="/"
            className="btn-primary inline-block bg-gold px-8 py-3 font-heading text-sm font-semibold uppercase tracking-widest text-[#0a0a0a] transition-colors hover:bg-gold-dark"
          >
            Späť na hlavnú
          </Link>
        </div>
      </div>
    </div>
  )
}
