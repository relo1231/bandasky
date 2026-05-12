import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { heslo } = await req.json()

  const spravneHeslo = process.env.ADMIN_PASSWORD
  const sessionToken = process.env.ADMIN_SESSION_TOKEN

  if (!spravneHeslo || !sessionToken) {
    return NextResponse.json({ error: 'Admin nie je nakonfigurovaný' }, { status: 500 })
  }

  if (heslo !== spravneHeslo) {
    return NextResponse.json({ error: 'Nesprávne heslo' }, { status: 401 })
  }

  const response = NextResponse.json({ success: true })
  response.cookies.set('admin_session', sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 dní
    path: '/',
  })

  return response
}

export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.delete('admin_session')
  return response
}
