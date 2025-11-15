"use client";

export function ProductCardSkeleton() {
  return (
    <div className="bg-card rounded-lg shadow-md border border-primary/20 overflow-hidden animate-pulse">
      <div className="aspect-square bg-gradient-to-br from-primary/10 to-primary/5" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-primary/20 rounded w-3/4" />
        <div className="h-6 bg-primary/20 rounded w-1/2" />
        <div className="h-4 bg-primary/10 rounded w-full" />
        <div className="h-4 bg-primary/10 rounded w-2/3" />
        <div className="h-10 bg-primary/20 rounded w-full mt-4" />
      </div>
    </div>
  );
}

export function ButtonSkeleton() {
  return (
    <div className="h-12 bg-primary/20 rounded-lg animate-pulse w-full" />
  );
}

