import Link from 'next/link'

export function Footer() {
  const nazov = process.env.NEXT_PUBLIC_NAZOV_FIRMY ?? 'B2B Shop s.r.o.'
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-[#2a2a2a] bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <p className="font-heading text-lg font-bold uppercase tracking-widest text-gold">
              {nazov}
            </p>
            <p className="mt-2 text-sm text-[#888]">
              Profesionálne riešenia pre váš biznis.
            </p>
          </div>

          <div>
            <p className="font-heading text-sm font-semibold uppercase tracking-widest text-[#e8e8e8]">
              Navigácia
            </p>
            <ul className="mt-3 space-y-2">
              {[
                { href: '/', label: 'Domov' },
                { href: '/produkty', label: 'Produkty' },
                { href: '/kosik', label: 'Košík' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#888] transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-heading text-sm font-semibold uppercase tracking-widest text-[#e8e8e8]">
              Kontakt
            </p>
            <ul className="mt-3 space-y-2 text-sm text-[#888]">
              <li>IČO: 12 345 678</li>
              <li>Adresa: Hlavná 1, 010 01 Žilina</li>
              <li>
                <a
                  href="mailto:info@firma.sk"
                  className="transition-colors hover:text-gold"
                >
                  info@firma.sk
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[#2a2a2a] pt-6 text-center text-xs text-[#888]">
          © {year} {nazov}. Všetky práva vyhradené.
        </div>
      </div>
    </footer>
  )
}
