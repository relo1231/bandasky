'use client'

export default function ProduktyError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <p className="font-heading text-xl uppercase tracking-wide text-[#f44336]">
        Chyba pri načítaní produktov
      </p>
      <button
        onClick={reset}
        className="mt-6 border border-gold px-6 py-2 font-heading text-sm uppercase tracking-widest text-gold transition-all hover:bg-gold hover:text-[#0a0a0a]"
      >
        Skúsiť znova
      </button>
    </div>
  )
}
