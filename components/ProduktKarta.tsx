'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Produkt } from '@/types'
import { KosikButton } from './KosikButton'

type Props = {
  produkt: Produkt
}

const dostupnostStyle: Record<string, string> = {
  'Na sklade': 'bg-[#1a3a1a] text-[#4caf50]',
  'Na objednávku': 'bg-[#3a2a0a] text-[#d4a017]',
  Nedostupné: 'bg-[#3a1a1a] text-[#f44336]',
}

export function ProduktKarta({ produkt }: Props) {
  const badgeClass =
    dostupnostStyle[produkt.dostupnost] ?? 'bg-[#1a1a1a] text-[#888]'

  return (
    <div className="group flex flex-col rounded-sm border border-[#2a2a2a] bg-[#141414] transition-all duration-200 hover:border-gold">
      <Link href={`/produkty/${produkt.slug}`} className="block overflow-hidden">
        <div className="relative h-48 w-full bg-[#1a1a1a]">
          {produkt.obrazok_url ? (
            <Image
              src={produkt.obrazok_url}
              alt={produkt.nazov}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gold opacity-30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <Link
            href={`/produkty/${produkt.slug}`}
            className="font-heading text-base font-semibold uppercase tracking-wide text-[#e8e8e8] transition-colors hover:text-gold line-clamp-2"
          >
            {produkt.nazov}
          </Link>
          <span className={`shrink-0 rounded-sm px-2 py-0.5 text-xs font-medium ${badgeClass}`}>
            {produkt.dostupnost}
          </span>
        </div>

        {produkt.kratky_popis && (
          <p className="mb-3 line-clamp-2 text-sm text-[#888]">{produkt.kratky_popis}</p>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 pt-3 border-t border-[#2a2a2a]">
          <div className="font-heading text-lg font-bold text-gold">
            {produkt.cena_od != null
              ? `od ${produkt.cena_od.toLocaleString('sk-SK')} €`
              : 'Na dopyt'}
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
