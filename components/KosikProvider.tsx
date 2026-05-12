'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import type { KosikPolozka } from '@/types'

type KosikContextType = {
  polozky: KosikPolozka[]
  pocetPoloziek: number
  pridaj: (polozka: KosikPolozka) => void
  odober: (produktId: number) => void
  zmenMnozstvo: (produktId: number, mnozstvo: number) => void
  zmenPoznamku: (produktId: number, poznamka: string) => void
  vyprazdni: () => void
}

const KosikContext = createContext<KosikContextType | null>(null)

export function KosikProvider({ children }: { children: ReactNode }) {
  const [polozky, setPolozky] = useState<KosikPolozka[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('kosik')
    if (saved) {
      try {
        setPolozky(JSON.parse(saved))
      } catch {
        setPolozky([])
      }
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('kosik', JSON.stringify(polozky))
    }
  }, [polozky, mounted])

  const pridaj = (nova: KosikPolozka) => {
    setPolozky((prev) => {
      const existujuca = prev.find((p) => p.produktId === nova.produktId)
      if (existujuca) {
        return prev.map((p) =>
          p.produktId === nova.produktId
            ? { ...p, mnozstvo: p.mnozstvo + nova.mnozstvo }
            : p
        )
      }
      return [...prev, nova]
    })
  }

  const odober = (produktId: number) => {
    setPolozky((prev) => prev.filter((p) => p.produktId !== produktId))
  }

  const zmenMnozstvo = (produktId: number, mnozstvo: number) => {
    if (mnozstvo < 1) return
    setPolozky((prev) =>
      prev.map((p) => (p.produktId === produktId ? { ...p, mnozstvo } : p))
    )
  }

  const zmenPoznamku = (produktId: number, poznamka: string) => {
    setPolozky((prev) =>
      prev.map((p) => (p.produktId === produktId ? { ...p, poznamka } : p))
    )
  }

  const vyprazdni = () => setPolozky([])

  const pocetPoloziek = polozky.reduce((sum, p) => sum + p.mnozstvo, 0)

  return (
    <KosikContext.Provider
      value={{ polozky, pocetPoloziek, pridaj, odober, zmenMnozstvo, zmenPoznamku, vyprazdni }}
    >
      {children}
    </KosikContext.Provider>
  )
}

export function useKosik() {
  const ctx = useContext(KosikContext)
  if (!ctx) throw new Error('useKosik must be used within KosikProvider')
  return ctx
}
