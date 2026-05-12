import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase'
import { transporter, buildOwnerEmail, buildCustomerEmail } from '@/lib/email'
import type { DopytFormData } from '@/types'

function padStart(n: number, len: number): string {
  return String(n).padStart(len, '0')
}

async function generujCisloDopytu(): Promise<string> {
  const year = new Date().getFullYear()
  const { count } = await supabaseServer
    .from('dopyty')
    .select('*', { count: 'exact', head: true })
    .like('cislo_dopytu', `D-${year}-%`)
  return `D-${year}-${padStart((count ?? 0) + 1, 4)}`
}

export async function POST(req: Request) {
  try {
    const body: DopytFormData = await req.json()

    if (!body.meno?.trim()) return NextResponse.json({ error: 'Meno je povinné' }, { status: 400 })
    if (!body.email?.trim()) return NextResponse.json({ error: 'Email je povinný' }, { status: 400 })
    if (!body.telefon?.trim()) return NextResponse.json({ error: 'Telefón je povinný' }, { status: 400 })
    if (!body.polozky?.length) return NextResponse.json({ error: 'Košík je prázdny' }, { status: 400 })

    const cisloDopytu = await generujCisloDopytu()

    const { data: dopyt, error: dopytError } = await supabaseServer
      .from('dopyty')
      .insert({
        cislo_dopytu: cisloDopytu,
        meno: body.meno.trim(),
        firma: body.firma?.trim() || null,
        email: body.email.trim().toLowerCase(),
        telefon: body.telefon.trim(),
        sprava: body.sprava?.trim() || null,
      })
      .select()
      .single()

    if (dopytError || !dopyt) {
      console.error('Supabase insert error:', dopytError)
      return NextResponse.json({ error: 'Chyba pri ukladaní dopytu' }, { status: 500 })
    }

    await supabaseServer.from('dopyt_polozky').insert(
      body.polozky.map((p) => ({
        dopyt_id: dopyt.id,
        produkt_id: p.produktId,
        nazov: p.nazov,
        mnozstvo: p.mnozstvo,
        poznamka: p.poznamka?.trim() || null,
      }))
    )

    const nazovFirmy = process.env.NEXT_PUBLIC_NAZOV_FIRMY ?? 'Bandasky'
    const emailPrijemca = process.env.EMAIL_PRIJEMCA
    const senderEmail = process.env.BREVO_SMTP_LOGIN

    if (emailPrijemca && senderEmail) {
      await Promise.allSettled([
        transporter.sendMail({
          from: `"${nazovFirmy}" <${senderEmail}>`,
          to: emailPrijemca,
          subject: `Nový dopyt č. ${cisloDopytu} – ${body.meno}`,
          html: buildOwnerEmail({
            cisloDopytu,
            meno: body.meno,
            firma: body.firma || null,
            email: body.email,
            telefon: body.telefon,
            sprava: body.sprava || null,
            polozky: body.polozky,
          }),
        }),
        transporter.sendMail({
          from: `"${nazovFirmy}" <${senderEmail}>`,
          to: body.email,
          subject: `Potvrdenie dopytu č. ${cisloDopytu}`,
          html: buildCustomerEmail({ cisloDopytu, meno: body.meno, nazovFirmy }),
        }),
      ])
    }

    return NextResponse.json({ success: true, cisloDopytu })
  } catch (err) {
    console.error('API route error:', err)
    return NextResponse.json({ error: 'Interná chyba servera' }, { status: 500 })
  }
}
