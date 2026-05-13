import Link from 'next/link'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-[#242424] bg-black">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-1 bg-[#e8001e]" />
              <p className="font-heading text-xl font-bold uppercase tracking-[0.15em] text-white">Bandasky</p>
            </div>
            <p className="text-sm leading-relaxed text-[#666]">
              Nové a repasované 1000L IBC nádrže na vodu.<br />
              Rýchla doprava po celom Slovensku do 48 hodín.
            </p>
          </div>

          <div>
            <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-[#e8001e] mb-5">
              Navigácia
            </p>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Domov' },
                { href: '/produkty', label: 'Všetky nádrže' },
                { href: '/produkty?kategoria=nove-nadrze', label: 'Nové nádrže' },
                { href: '/produkty?kategoria=repasovane', label: 'Repasované nádrže' },
                { href: '/kosik', label: 'Poslať dopyt' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#666] transition-colors hover:text-[#e8001e]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-[#e8001e] mb-5">
              Kontakt
            </p>
            <ul className="space-y-3 text-sm text-[#666]">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-4 w-4 shrink-0 text-[#e8001e]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </span>
                Slovenská republika
              </li>
              <li>
                <a href="mailto:info@bandasky.sk" className="flex items-center gap-2 transition-colors hover:text-[#e8001e]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 text-[#e8001e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  info@bandasky.sk
                </a>
              </li>
              <li>
                <a href="tel:+421900000000" className="flex items-center gap-2 transition-colors hover:text-[#e8001e]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 text-[#e8001e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  +421 900 000 000
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[#1a1a1a] pt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-[#444]">© {year} Bandasky. Všetky práva vyhradené.</p>
          <div className="h-px w-12 bg-[#e8001e]" />
        </div>
      </div>
    </footer>
  )
}
