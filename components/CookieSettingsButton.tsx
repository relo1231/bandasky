'use client'

export function CookieSettingsButton() {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))}
      className="text-xs text-slate-600 transition-colors hover:text-white"
    >
      Nastavenia cookies
    </button>
  )
}
