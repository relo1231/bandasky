'use client'

import { useRouter } from 'next/navigation'

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="border border-[#1a2a45] px-4 py-2 font-heading text-xs uppercase tracking-widest text-[#6b7fa3] transition-all hover:border-red-500 hover:text-red-400"
    >
      Odhlásiť
    </button>
  )
}
