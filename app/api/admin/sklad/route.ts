import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase'
import { cookies } from 'next/headers'

async function overAdmin() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')?.value
  return session === process.env.ADMIN_SESSION_TOKEN
}

export async function PATCH(req: Request) {
  if (!(await overAdmin())) {
    return NextResponse.json({ error: 'Neoprávnený prístup' }, { status: 401 })
  }

  const { id, pocet_sklad, dostupnost } = await req.json()

  if (typeof id !== 'number') {
    return NextResponse.json({ error: 'Chybajúce ID' }, { status: 400 })
  }

  const update: Record<string, unknown> = {}
  if (typeof pocet_sklad === 'number') update.pocet_sklad = Math.max(0, pocet_sklad)
  if (dostupnost) update.dostupnost = dostupnost

  const { data, error } = await supabaseServer
    .from('produkty')
    .update(update)
    .eq('id', id)
    .select('id, nazov, pocet_sklad, dostupnost')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true, produkt: data })
}
