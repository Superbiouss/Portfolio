"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="max-w-[95vw] mx-auto py-16 md:py-32 min-h-screen">
      {/* Header Skeleton */}
      <div className="mb-16 md:mb-24 space-y-4">
        <div className="w-32 h-4 bg-muted/30 rounded-full animate-pulse" />
        <div className="w-3/4 max-w-2xl h-16 md:h-24 bg-muted/20 rounded-2xl animate-pulse" />
        <div className="w-1/2 max-w-md h-16 md:h-24 bg-muted/20 rounded-2xl animate-pulse" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-background/40 backdrop-blur-sm border border-border/50 p-8 md:p-12 rounded-2xl min-h-[300px] flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-16 h-6 bg-muted/30 rounded-full animate-pulse" />
              <div className="w-full h-8 bg-muted/20 rounded-lg animate-pulse mt-4" />
              <div className="w-4/5 h-4 bg-muted/20 rounded-lg animate-pulse" />
              <div className="w-3/5 h-4 bg-muted/20 rounded-lg animate-pulse" />
            </div>
            
            <div className="w-full h-12 bg-muted/10 rounded-xl animate-pulse mt-8" />
          </div>
        ))}
      </div>
    </div>
  );
}
