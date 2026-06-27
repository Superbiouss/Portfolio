export default function AdminLoading() {
  return (
    <div className="animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <div className="h-10 w-64 bg-muted rounded-none mb-2" />
          <div className="h-4 w-48 bg-muted/60 rounded-none" />
        </div>
        <div className="h-10 w-36 bg-muted rounded-none" />
      </div>

      {/* Stats grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-border mb-12">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-background p-6 md:p-8 border-2 border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="h-3 w-20 bg-muted rounded-none" />
              <div className="w-4 h-4 bg-muted rounded-none" />
            </div>
            <div className="h-12 w-16 bg-muted rounded-none" />
          </div>
        ))}
      </div>

      {/* Content skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="border-2 border-border p-6 md:p-8">
            <div className="h-5 w-32 bg-muted rounded-none mb-6" />
            <div className="space-y-3">
              <div className="h-4 w-full bg-muted/60 rounded-none" />
              <div className="h-4 w-3/4 bg-muted/40 rounded-none" />
              <div className="h-4 w-1/2 bg-muted/30 rounded-none" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
