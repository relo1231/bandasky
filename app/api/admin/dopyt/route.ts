import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabaseServer } from '@/lib/supabase'

async function checkAuth() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')?.value
  return session === process.env.ADMIN_SESSION_TOKEN
}

export async function PATCH(req: Request) {
  if (!(await checkAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id, stav, poznamka } = await req.json()
  if (!id) return NextResponse.json({ error: 'Chýba id' }, { status: 400 })

  const update: Record<string, unknown> = {}
  if (stav) update.stav = stav
  if (poznamka !== undefined) update.poznamka_admin = poznamka

  const { data, error } = await supabaseServer
    .from('dopyty')
    .update(update)
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ dopyt: data })
}
