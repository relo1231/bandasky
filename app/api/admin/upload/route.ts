import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase'
import { cookies } from 'next/headers'

async function overAdmin() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')?.value
  return session === process.env.ADMIN_SESSION_TOKEN
}

export async function POST(req: Request) {
  if (!(await overAdmin())) {
    return NextResponse.json({ error: 'Neoprávnený prístup' }, { status: 401 })
  }

  const form = await req.formData()
  const file = form.get('file') as File | null

  if (!file) {
    return NextResponse.json({ error: 'Chýba súbor' }, { status: 400 })
  }

  const ext = file.name.split('.').pop()
  const name = `${Date.now()}.${ext}`
  const buffer = await file.arrayBuffer()

  const { error } = await supabaseServer.storage
    .from('produkty')
    .upload(name, buffer, { contentType: file.type, upsert: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const { data } = supabaseServer.storage.from('produkty').getPublicUrl(name)

  return NextResponse.json({ url: data.publicUrl })
}
