'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'cookie_consent_v2'

interface ConsentState {
  saved: boolean
  analytics: boolean
  marketing: boolean
}

function updateGtag(analytics: boolean, marketing: boolean) {
  if (typeof window === 'undefined') return
  const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag
  if (typeof gtag !== 'function') return
  gtag('consent', 'update', {
    analytics_storage: analytics ? 'granted' : 'denied',
    ad_storage: marketing ? 'granted' : 'denied',
    ad_user_data: marketing ? 'granted' : 'denied',
    ad_personalization: marketing ? 'granted' : 'denied',
  })
}

function saveConsent(analytics: boolean, marketing: boolean) {
  const state: ConsentState = { saved: true, analytics, marketing }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  updateGtag(analytics, marketing)
}

const categories = [
  {
    id: 'necessary',
    label: 'Nevyhnutné cookies',
    alwaysOn: true,
    desc: 'Niektoré cookies sú potrebné na zabezpečenie základných funkcií. Bez týchto súborov cookie nebude web fungovať správne a sú predvolene povolené a nemožno ich deaktivovať. Zvyčajne sa nastavujú iba v reakcii na akcie, ktoré ste urobili a ktoré predstavujú požiadavku na služby, napríklad nastavenie vašich preferencií ochrany osobných údajov, prihlásenie alebo vyplnenie formulárov.',
    cookies: [
      { name: 'cookie_consent_v2', purpose: 'Ukladá vaše nastavenia súborov cookie.', duration: '1 rok' },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytické cookies',
    alwaysOn: false,
    desc: 'Analytické súbory cookie sa používajú na pochopenie toho, ako návštevníci interagujú s webovou stránkou. Tieto súbory cookie pomáhajú poskytovať informácie o metrikách – počet návštevníkov, miera okamžitých odchodov, zdroj návštevnosti atď. Používame Google Analytics 4 (GA4) a Hotjar.',
    cookies: [
      { name: '_ga', purpose: 'Rozlišuje jednotlivých používateľov.', duration: '2 roky' },
      { name: '_ga_XXXXXXXX', purpose: 'Uchováva stav relácie pre Google Analytics 4.', duration: '2 roky' },
      { name: '_hjSessionUser_*', purpose: 'Hotjar – identifikuje používateľa naprieč reláciami.', duration: '1 rok' },
      { name: '_hjSession_*', purpose: 'Hotjar – uchováva dáta aktuálnej relácie.', duration: '30 minút' },
    ],
  },
  {
    id: 'marketing',
    label: 'Marketingové cookies',
    alwaysOn: false,
    desc: 'Reklamné súbory cookie sa používajú na poskytovanie relevantných reklám a marketingových kampaní návštevníkom. Tieto súbory cookie sledujú návštevníkov naprieč webovými stránkami a zhromažďujú informácie na poskytovanie prispôsobených reklám (Google Ads, Facebook).',
    cookies: [
      { name: '_gcl_au', purpose: 'Google Ads – sledovanie konverzií.', duration: '3 mesiace' },
      { name: 'IDE', purpose: 'Google DoubleClick – personalizácia reklám.', duration: '1 rok' },
      { name: '_fbp', purpose: 'Facebook Pixel – sleduje návštevy pre zobrazovanie reklám na Facebooku.', duration: '3 mesiace' },
      { name: '_fbc', purpose: 'Facebook Pixel – ukladá informáciu o kliknutí na reklamu.', duration: '3 mesiace' },
    ],
  },
]

const vyhlasenie = `Táto webová stránka používa súbory cookie na zlepšenie vášho zážitku pri jej prehliadaní. Spomedzi nich sú súbory cookie, ktoré sú kategorizované podľa potreby, uložené vo vašom prehliadači, pretože sú nevyhnutné pre fungovanie základných funkcií webu.

Používame aj súbory cookie tretích strán, ktoré nám pomáhajú analyzovať a pochopiť, ako používate túto webovú stránku. Tieto súbory cookie budú uložené vo vašom prehliadači iba s vaším súhlasom. Máte možnosť odmietnuť tieto súbory cookie. Odhlásenie sa z niektorých z týchto súborov cookie však môže ovplyvniť váš zážitok z prehliadania.

Prevádzkovateľom webu je spoločnosť Bandasky. Vaše osobné údaje spracúvame v súlade s nariadením GDPR a zákonom č. 18/2018 Z. z. o ochrane osobných údajov.

V prípade otázok týkajúcich sa spracovania vašich osobných údajov nás môžete kontaktovať na info@bandasky.sk.`

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      aria-pressed={on}
      className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${on ? 'bg-emerald-600' : 'bg-zinc-300'}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${on ? 'translate-x-5' : ''}`} />
    </button>
  )
}

export function CookieBanner() {
  const [bannerVisible, setBannerVisible] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'kategorie' | 'vyhlasenie'>('kategorie')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      setBannerVisible(true)
    } else {
      try {
        const c: ConsentState = JSON.parse(stored)
        if (c.saved) {
          setAnalytics(c.analytics)
          setMarketing(c.marketing)
          updateGtag(c.analytics, c.marketing)
        }
      } catch {}
    }

    function handleOpen() {
      setModalOpen(true)
      setBannerVisible(false)
    }
    window.addEventListener('open-cookie-settings', handleOpen)
    return () => window.removeEventListener('open-cookie-settings', handleOpen)
  }, [])

  function acceptAll() {
    setAnalytics(true)
    setMarketing(true)
    saveConsent(true, true)
    setBannerVisible(false)
    setModalOpen(false)
  }

  function saveSettings() {
    saveConsent(analytics, marketing)
    setBannerVisible(false)
    setModalOpen(false)
  }

  function toggleCategory(id: string) {
    if (id === 'analytics') setAnalytics(v => !v)
    if (id === 'marketing') setMarketing(v => !v)
  }

  function isOn(id: string) {
    if (id === 'necessary') return true
    if (id === 'analytics') return analytics
    if (id === 'marketing') return marketing
    return false
  }

  return (
    <>
      {/* ─── MALÝ BANNER ─── */}
      {bannerVisible && !modalOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
          <div className="max-w-3xl mx-auto bg-zinc-900 border border-zinc-700 rounded-2xl px-6 py-5 shadow-2xl">
            <p className="text-base font-bold text-white mb-2">Vaše dáta si vážime</p>
            <p className="text-sm text-zinc-300 leading-relaxed mb-4">
              Súbory cookie používame na zhromažďovanie a analýzu informácií o výkone a používaní stránok, na poskytovanie funkcií sociálnych médií a na vylepšenie a prispôsobenie obsahu a reklám.
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => { setBannerVisible(false); setModalOpen(true) }}
                className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 rounded-lg transition-all"
              >
                Nastavenia
              </button>
              <button
                onClick={acceptAll}
                className="ml-auto px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
              >
                Povoliť všetko
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL ─── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

            {/* Header */}
            <div className="px-7 pt-7 pb-0">
              <div className="flex items-start justify-between mb-5">
                <h2 className="text-xl font-black text-zinc-950">Nastavenia súborov cookie</h2>
                <button
                  onClick={() => {
                    setModalOpen(false)
                    if (!localStorage.getItem(STORAGE_KEY)) setBannerVisible(true)
                  }}
                  className="ml-4 text-zinc-400 hover:text-zinc-700 transition-colors"
                  aria-label="Zavrieť"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Taby */}
              <div className="flex border-b border-zinc-200">
                {(['kategorie', 'vyhlasenie'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
                      activeTab === tab
                        ? 'border-zinc-950 text-zinc-950'
                        : 'border-transparent text-zinc-400 hover:text-zinc-700'
                    }`}
                  >
                    {tab === 'kategorie' ? 'Kategórie' : 'Vyhlásenie o cookies'}
                  </button>
                ))}
              </div>
            </div>

            {/* Obsah — scrollovateľný */}
            <div className="flex-1 overflow-y-auto px-7 py-6">

              {activeTab === 'kategorie' && (
                <>
                  <p className="text-sm text-zinc-500 leading-relaxed mb-6">
                    Súbory cookie použité na tejto stránke sú kategorizované a nižšie si môžete prečítať o každej kategórii a povoliť alebo zakázať niektoré alebo všetky z nich. Ak sú kategórie, ktoré boli predtým povolené, zakázané, odstránia sa z vášho prehliadača všetky súbory cookie priradené k tejto kategórii.
                  </p>

                  <button
                    onClick={() => { setAnalytics(true); setMarketing(true) }}
                    className="mb-6 px-5 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white text-sm font-semibold rounded-lg transition-colors"
                  >
                    Povoliť všetko
                  </button>

                  <div className="flex flex-col gap-3">
                    {categories.map(cat => (
                      <div key={cat.id} className="border border-zinc-200 rounded-xl overflow-hidden">
                        <div className="flex items-center gap-4 px-5 py-4">
                          <button
                            onClick={() => setExpanded(expanded === cat.id ? null : cat.id)}
                            className="flex-1 flex items-center gap-2 text-left"
                          >
                            <svg
                              className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform ${expanded === cat.id ? 'rotate-180' : ''}`}
                              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                            <span className="text-sm font-semibold text-zinc-900">{cat.label}</span>
                          </button>
                          {cat.alwaysOn ? (
                            <span className="text-xs font-medium text-zinc-400 bg-zinc-100 px-3 py-1 rounded-full shrink-0">Vždy aktívne</span>
                          ) : (
                            <Toggle on={isOn(cat.id)} onChange={() => toggleCategory(cat.id)} />
                          )}
                        </div>

                        {expanded === cat.id && (
                          <div className="border-t border-zinc-100 px-5 py-4 bg-zinc-50">
                            <p className="text-xs text-zinc-500 leading-relaxed mb-4">{cat.desc}</p>
                            <div className="flex flex-col gap-2">
                              {cat.cookies.map(c => (
                                <div key={c.name} className="bg-white border border-zinc-200 rounded-lg px-4 py-3">
                                  <div className="flex items-center justify-between gap-4 mb-1">
                                    <span className="text-xs font-semibold text-zinc-800 font-mono">{c.name}</span>
                                    <span className="text-xs text-zinc-400 shrink-0">{c.duration}</span>
                                  </div>
                                  <p className="text-xs text-zinc-500">{c.purpose}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {activeTab === 'vyhlasenie' && (
                <div className="flex flex-col gap-4">
                  {vyhlasenie.split('\n\n').map((p, i) => (
                    <p key={i} className="text-sm text-zinc-500 leading-relaxed">{p}</p>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-7 py-5 border-t border-zinc-100 flex justify-end">
              <button
                onClick={saveSettings}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Uložiť nastavenia
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
