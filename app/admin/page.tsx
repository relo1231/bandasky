import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { supabaseServer } from '@/lib/supabase'
import type { Produkt, Kategoria } from '@/types'
import { AdminSkladTable } from './AdminSkladTable'
import { LogoutButton } from './LogoutButton'

async function getProdukty(): Promise<Produkt[]> {
  const { data } = await supabaseServer
    .from('produkty')
    .select('*, kategorie(*)')
    .order('zoradenie', { ascending: false })
  return data ?? []
}

async function getKategorie(): Promise<Kategoria[]> {
  const { data } = await supabaseServer.from('kategorie').select('*').order('nazov')
  return data ?? []
}

export default async function AdminPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')?.value
  if (session !== process.env.ADMIN_SESSION_TOKEN) redirect('/admin/login')

  const [produkty, kategorie] = await Promise.all([getProdukty(), getKategorie()])

  const celkomSkladom = produkty
    .filter((p) => p.dostupnost === 'Na sklade')
    .reduce((sum, p) => sum + (p.pocet_sklad ?? 0), 0)

  const nizkyStav = produkty.filter((p) => (p.pocet_sklad ?? 0) <= 3 && p.aktivny)

  return (
    <div className="min-h-screen bg-[#050d1a] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold uppercase tracking-wide text-white">
              Správa skladu
            </h1>
            <p className="mt-1 text-sm text-[#6b7fa3]">Bandasky – prehľad zásoby</p>
          </div>
          <LogoutButton />
        </div>

        {/* Nav */}
        <div className="mb-8 flex gap-2">
          <Link
            href="/admin"
            className="rounded-sm border border-[#1e6fff] bg-[#1e6fff]/10 px-4 py-2 font-heading text-xs uppercase tracking-wide text-[#1e6fff]"
          >
            Sklad
          </Link>
          <Link
            href="/admin/dopyty"
            className="rounded-sm border border-[#1a2a45] px-4 py-2 font-heading text-xs uppercase tracking-wide text-[#6b7fa3] transition-colors hover:border-[#1e6fff] hover:text-[#1e6fff]"
          >
            Dopyty
          </Link>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div className="rounded-sm border border-[#1a2a45] bg-[#0a1628] p-5">
            <p className="font-heading text-3xl font-bold text-[#1e6fff]">{produkty.length}</p>
            <p className="mt-1 text-sm text-[#6b7fa3]">Produktov celkom</p>
          </div>
          <div className="rounded-sm border border-[#1a2a45] bg-[#0a1628] p-5">
            <p className="font-heading text-3xl font-bold text-green-400">{celkomSkladom}</p>
            <p className="mt-1 text-sm text-[#6b7fa3]">Kusov skladom</p>
          </div>
          <div className={`rounded-sm border p-5 ${nizkyStav.length > 0 ? 'border-amber-500/50 bg-amber-950/30' : 'border-[#1a2a45] bg-[#0a1628]'}`}>
            <p className={`font-heading text-3xl font-bold ${nizkyStav.length > 0 ? 'text-amber-400' : 'text-[#6b7fa3]'}`}>
              {nizkyStav.length}
            </p>
            <p className="mt-1 text-sm text-[#6b7fa3]">Nízky stav (≤ 3 ks)</p>
          </div>
        </div>

        {/* Upozornenie na nízky stav */}
        {nizkyStav.length > 0 && (
          <div className="mb-6 rounded-sm border border-amber-500/40 bg-amber-950/20 px-5 py-4">
            <p className="font-heading text-sm font-semibold uppercase tracking-wide text-amber-400">
              ⚠ Nízky stav zásob
            </p>
            <ul className="mt-2 space-y-1">
              {nizkyStav.map((p) => (
                <li key={p.id} className="text-sm text-[#6b7fa3]">
                  <span className="text-[#e2e8f0]">{p.nazov}</span>
                  {' – '}
                  <span className="font-semibold text-amber-400">{p.pocet_sklad ?? 0} ks</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tabuľka */}
        <AdminSkladTable produkty={produkty} kategorie={kategorie} />
      </div>
    </div>
  )
}
