'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get('from') ?? '/admin'

  const [heslo, setHeslo] = useState('')
  const [chyba, setChyba] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setChyba('')

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ heslo }),
    })

    if (res.ok) {
      router.push(from)
      router.refresh()
    } else {
      setChyba('Nesprávne heslo')
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050d1a] px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="text-4xl">💧</span>
          <h1 className="mt-3 font-heading text-2xl font-bold uppercase tracking-widest text-white">
            Admin
          </h1>
          <p className="mt-1 text-sm text-[#6b7fa3]">Bandasky – správa skladu</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-sm border border-[#1a2a45] bg-[#0a1628] p-8">
          <div className="mb-6">
            <label className="block font-heading text-xs uppercase tracking-widest text-[#6b7fa3] mb-2">
              Heslo
            </label>
            <input
              type="password"
              value={heslo}
              onChange={(e) => setHeslo(e.target.value)}
              autoFocus
              className="w-full rounded-sm border border-[#1a2a45] bg-[#050d1a] px-4 py-3 font-body text-[#e2e8f0] placeholder-[#2a3a55] focus:border-[#1e6fff] focus:outline-none transition-colors"
              placeholder="••••••••"
            />
            {chyba && <p className="mt-2 text-sm text-red-400">{chyba}</p>}
          </div>

          <button
            type="submit"
            disabled={loading || !heslo}
            className="w-full py-3 font-heading font-semibold uppercase tracking-widest bg-[#1e6fff] text-white transition-all hover:bg-[#1458d6] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Prihlasujem...' : 'Prihlásiť sa'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
