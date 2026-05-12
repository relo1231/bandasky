export type Kategoria = {
  id: number
  nazov: string
  slug: string
  popis: string | null
  created_at: string
}

export type Produkt = {
  id: number
  nazov: string
  slug: string
  popis: string | null
  kratky_popis: string | null
  cena_od: number | null
  jednotka: string
  kategoria_id: number | null
  obrazok_url: string | null
  dostupnost: 'Na sklade' | 'Na objednávku' | 'Nedostupné'
  zoradenie: number
  aktivny: boolean
  created_at: string
  kategorie?: Kategoria
}

export type Dopyt = {
  id: number
  cislo_dopytu: string
  meno: string
  firma: string | null
  email: string
  telefon: string
  sprava: string | null
  stav: 'nový' | 'vybavený' | 'zrušený'
  created_at: string
}

export type DopytPolozka = {
  id: number
  dopyt_id: number
  produkt_id: number | null
  nazov: string
  mnozstvo: number
  poznamka: string | null
}

export type KosikPolozka = {
  produktId: number
  nazov: string
  mnozstvo: number
  poznamka?: string
}

export type DopytFormData = {
  meno: string
  firma?: string
  email: string
  telefon: string
  sprava?: string
  polozky: KosikPolozka[]
}

export type DopytResponse = {
  success: boolean
  cisloDopytu?: string
  error?: string
}
