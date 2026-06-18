export default function Loading() {
  return (
    <div className="max-w-[95vw] mx-auto py-16 md:py-32 min-h-screen">
      {/* Header Skeleton */}
      <div className="mb-16 md:mb-24 space-y-4">
        <div className="w-32 h-3 bg-muted/40 animate-pulse" />
        <div className="w-3/4 max-w-2xl h-20 md:h-28 bg-muted/20 animate-pulse" />
        <div className="w-1/2 max-w-md h-20 md:h-28 bg-muted/20 animate-pulse" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-background border-2 border-border p-8 md:p-12 min-h-[300px] flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-16 h-5 bg-muted/30 animate-pulse" />
              <div className="w-full h-8 bg-muted/20 animate-pulse mt-4" />
              <div className="w-4/5 h-4 bg-muted/20 animate-pulse" />
              <div className="w-3/5 h-4 bg-muted/20 animate-pulse" />
            </div>
            <div className="w-32 h-4 bg-muted/10 animate-pulse mt-8" />
          </div>
        ))}
      </div>
    </div>
  );
}
