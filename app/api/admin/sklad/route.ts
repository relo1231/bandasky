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

  const body = await req.json()
  const { id, ...rest } = body

  if (typeof id !== 'number') {
    return NextResponse.json({ error: 'Chybajúce ID' }, { status: 400 })
  }

  const allowed = [
    'nazov', 'slug', 'popis', 'kratky_popis', 'cena_od', 'jednotka',
    'kategoria_id', 'obrazok_url', 'dostupnost', 'pocet_sklad', 'zoradenie', 'aktivny',
  ]

  const update: Record<string, unknown> = {}
  for (const key of allowed) {
    if (key in rest) {
      if (key === 'pocet_sklad' && typeof rest[key] === 'number') {
        update[key] = Math.max(0, rest[key])
      } else if (key === 'slug' && typeof rest[key] === 'string') {
        update[key] = rest[key].trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
      } else if (typeof rest[key] === 'string') {
        update[key] = rest[key].trim()
      } else {
        update[key] = rest[key]
      }
    }
  }

  const { data, error } = await supabaseServer
    .from('produkty')
    .update(update)
    .eq('id', id)
    .select('*, kategorie(*)')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true, produkt: data })
}
