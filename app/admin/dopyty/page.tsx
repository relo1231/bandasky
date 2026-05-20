import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { supabaseServer } from '@/lib/supabase'
import { LogoutButton } from '../LogoutButton'
import { DopytTable } from './DopytTable'

async function getDopyty() {
  const { data } = await supabaseServer
    .from('dopyty')
    .select('*, dopyt_polozky(*)')
    .order('created_at', { ascending: false })
  return data ?? []
}

export default async function AdminDopytePage() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')?.value
  if (session !== process.env.ADMIN_SESSION_TOKEN) redirect('/admin/login')

  const dopyty = await getDopyty()

  const noveCount = dopyty.filter((d) => d.stav === 'nový').length
  const vybavenychCount = dopyty.filter((d) => d.stav === 'vybavený').length
  const zrusenych = dopyty.filter((d) => d.stav === 'zrušený').length

  return (
    <div className="min-h-screen bg-[#050d1a] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold uppercase tracking-wide text-white">
              Správa dopytov
            </h1>
            <p className="mt-1 text-sm text-[#6b7fa3]">Bandasky – prehľad dopytov zákazníkov</p>
          </div>
          <LogoutButton />
        </div>

        {/* Nav */}
        <div className="mb-8 flex gap-2">
          <Link
            href="/admin"
            className="rounded-sm border border-[#1a2a45] px-4 py-2 font-heading text-xs uppercase tracking-wide text-[#6b7fa3] transition-colors hover:border-[#1e6fff] hover:text-[#1e6fff]"
          >
            Sklad
          </Link>
          <Link
            href="/admin/dopyty"
            className="rounded-sm border border-[#1e6fff] bg-[#1e6fff]/10 px-4 py-2 font-heading text-xs uppercase tracking-wide text-[#1e6fff]"
          >
            Dopyty {noveCount > 0 && <span className="ml-1 rounded-full bg-[#1e6fff] px-1.5 py-0.5 text-[10px] text-white">{noveCount}</span>}
          </Link>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-3 gap-4">
          <div className="rounded-sm border border-[#1a2a45] bg-[#0a1628] p-5">
            <p className="font-heading text-3xl font-bold text-blue-400">{noveCount}</p>
            <p className="mt-1 text-sm text-[#6b7fa3]">Nové dopyty</p>
          </div>
          <div className="rounded-sm border border-[#1a2a45] bg-[#0a1628] p-5">
            <p className="font-heading text-3xl font-bold text-green-400">{vybavenychCount}</p>
            <p className="mt-1 text-sm text-[#6b7fa3]">Vybavené</p>
          </div>
          <div className="rounded-sm border border-[#1a2a45] bg-[#0a1628] p-5">
            <p className="font-heading text-3xl font-bold text-[#6b7fa3]">{zrusenych}</p>
            <p className="mt-1 text-sm text-[#6b7fa3]">Zrušené</p>
          </div>
        </div>

        {/* Upozornenie na nové dopyty */}
        {noveCount > 0 && (
          <div className="mb-6 rounded-sm border border-blue-500/40 bg-blue-950/20 px-5 py-4">
            <p className="font-heading text-sm font-semibold uppercase tracking-wide text-blue-400">
              {noveCount === 1 ? '1 nový dopyt čaká na vybavenie' : `${noveCount} nových dopytov čaká na vybavenie`}
            </p>
          </div>
        )}

        <DopytTable dopyty={dopyty} />
      </div>
    </div>
  )
}
