export default function ProduktyLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 h-10 w-48 animate-pulse rounded-sm bg-[#1a1a1a]" />
      <div className="mb-8 flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-9 w-24 animate-pulse rounded-sm bg-[#1a1a1a]" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-sm border border-[#2a2a2a] bg-[#141414]">
            <div className="h-48 animate-pulse bg-[#1a1a1a]" />
            <div className="p-4 space-y-3">
              <div className="h-5 w-3/4 animate-pulse rounded-sm bg-[#1a1a1a]" />
              <div className="h-4 w-full animate-pulse rounded-sm bg-[#1a1a1a]" />
              <div className="h-4 w-2/3 animate-pulse rounded-sm bg-[#1a1a1a]" />
              <div className="flex justify-between pt-2">
                <div className="h-6 w-20 animate-pulse rounded-sm bg-[#1a1a1a]" />
                <div className="h-9 w-32 animate-pulse rounded-sm bg-[#1a1a1a]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
