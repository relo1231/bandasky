export default function ProduktDetailLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 h-5 w-64 animate-pulse rounded-sm bg-[#1a1a1a]" />
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="aspect-square w-full animate-pulse rounded-sm bg-[#1a1a1a]" />
        <div className="space-y-4">
          <div className="h-4 w-24 animate-pulse rounded-sm bg-[#1a1a1a]" />
          <div className="h-10 w-3/4 animate-pulse rounded-sm bg-[#1a1a1a]" />
          <div className="h-8 w-48 animate-pulse rounded-sm bg-[#1a1a1a]" />
          <div className="space-y-2 pt-4">
            <div className="h-4 w-full animate-pulse rounded-sm bg-[#1a1a1a]" />
            <div className="h-4 w-5/6 animate-pulse rounded-sm bg-[#1a1a1a]" />
            <div className="h-4 w-4/6 animate-pulse rounded-sm bg-[#1a1a1a]" />
          </div>
          <div className="mt-8 h-12 w-full animate-pulse rounded-sm bg-[#1a1a1a]" />
        </div>
      </div>
    </div>
  )
}
