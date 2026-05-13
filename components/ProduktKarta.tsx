'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Produkt } from '@/types'
import { KosikButton } from './KosikButton'

type Props = { produkt: Produkt }

const dostupnostStyle: Record<string, string> = {
  'Na sklade': 'text-green-400',
  'Na objednávku': 'text-blue-400',
  Nedostupné: 'text-red-400',
}

export function ProduktKarta({ produkt }: Props) {
  const dostColor = dostupnostStyle[produkt.dostupnost] ?? 'text-[#666]'

  return (
    <div className="group flex flex-col border border-[#242424] bg-[#141414] transition-all duration-200 hover:border-[#e8001e]">
      <Link href={`/produkty/${produkt.slug}`} className="block overflow-hidden">
        <div className="relative h-52 w-full bg-[#1a1a1a]">
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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-[#333]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          )}
          {/* Dostupnosť overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3">
            <span className={`font-heading text-xs font-bold uppercase tracking-widest ${dostColor}`}>
              ● {produkt.dostupnost}
            </span>
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link
          href={`/produkty/${produkt.slug}`}
          className="font-heading text-base font-bold uppercase tracking-wide text-white transition-colors hover:text-[#e8001e] line-clamp-2"
        >
          {produkt.nazov}
        </Link>

        {produkt.kratky_popis && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#666]">{produkt.kratky_popis}</p>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 pt-4 border-t border-[#242424] mt-4">
          <div>
            <div className="font-heading text-xs uppercase tracking-widest text-[#555]">Cena od</div>
            <div className="font-heading text-xl font-bold text-[#e8001e]">
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
