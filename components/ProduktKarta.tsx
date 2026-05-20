'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Produkt } from '@/types'
import { KosikButton } from './KosikButton'

type Props = { produkt: Produkt }

const dostupnostConfig: Record<string, { dot: string; text: string; bg: string }> = {
  'Na sklade': { dot: 'bg-emerald-500', text: 'text-emerald-700', bg: 'bg-emerald-50' },
  'Na objednávku': { dot: 'bg-blue-500', text: 'text-blue-700', bg: 'bg-blue-50' },
  Nedostupné: { dot: 'bg-red-500', text: 'text-red-700', bg: 'bg-red-50' },
}

export function ProduktKarta({ produkt }: Props) {
  const dst = dostupnostConfig[produkt.dostupnost] ?? { dot: 'bg-slate-400', text: 'text-slate-500', bg: 'bg-slate-50' }

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/produkty/${produkt.slug}`} className="block overflow-hidden">
        <div className="relative h-52 w-full bg-slate-50">
          {produkt.obrazok_url ? (
            <Image
              src={produkt.obrazok_url}
              alt={produkt.nazov}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          )}
          {/* Status badge */}
          <div className={`absolute left-3 top-3 flex items-center gap-1.5 rounded-full ${dst.bg} px-2.5 py-1 shadow-sm`}>
            <span className={`h-1.5 w-1.5 rounded-full ${dst.dot}`} />
            <span className={`font-heading text-xs font-semibold ${dst.text}`}>
              {produkt.dostupnost}
            </span>
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link
          href={`/produkty/${produkt.slug}`}
          className="font-heading text-base font-bold uppercase tracking-wide text-slate-900 transition-colors hover:text-emerald-600 line-clamp-2"
        >
          {produkt.nazov}
        </Link>

        {produkt.kratky_popis && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">{produkt.kratky_popis}</p>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4 mt-4">
          <div>
            <div className="text-xs text-slate-400">Cena od</div>
            <div className="font-heading text-xl font-bold text-emerald-600">
              {produkt.cena_od != null
                ? `${produkt.cena_od.toLocaleString('sk-SK')} €`
                : 'Na dopyt'}
            </div>
          </div>
          <KosikButton
            polozka={{ produktId: produkt.id, nazov: produkt.nazov, mnozstvo: 1 }}
            className="text-xs"
          />
        </div>
      </div>
    </div>
  )
}
