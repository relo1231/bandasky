import Link from 'next/link'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-[#1a2a45] bg-[#050d1a]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#1e6fff] text-sm">💧</span>
              <p className="font-heading text-lg font-bold uppercase tracking-widest text-white">
                Bandasky
              </p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#6b7fa3]">
              1000L IBC nádrže na vodu – nové aj repasované.
              Rýchla doprava po celom Slovensku.
            </p>
          </div>

          <div>
            <p className="font-heading text-sm font-semibold uppercase tracking-widest text-[#e2e8f0]">
              Navigácia
            </p>
            <ul className="mt-4 space-y-2">
              {[
                { href: '/', label: 'Domov' },
                { href: '/produkty', label: 'Nádrže' },
                { href: '/produkty?kategoria=nove-nadrze', label: 'Nové nádrže' },
                { href: '/produkty?kategoria=repasovane', label: 'Repasované' },
                { href: '/kosik', label: 'Poslať dopyt' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#6b7fa3] transition-colors hover:text-[#1e6fff]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-heading text-sm font-semibold uppercase tracking-widest text-[#e2e8f0]">
              Kontakt
            </p>
            <ul className="mt-4 space-y-2 text-sm text-[#6b7fa3]">
              <li>IČO: 12 345 678</li>
              <li>Slovenská republika</li>
              <li>
                <a href="mailto:info@bandasky.sk" className="transition-colors hover:text-[#1e6fff]">
                  info@bandasky.sk
                </a>
              </li>
              <li>
                <a href="tel:+421900000000" className="transition-colors hover:text-[#1e6fff]">
                  +421 900 000 000
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[#1a2a45] pt-6 text-center text-xs text-[#6b7fa3]">
          © {year} Bandasky. Všetky práva vyhradené.
        </div>
      </div>
    </footer>
  )
}
