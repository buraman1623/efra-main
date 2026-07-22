import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
}

export function Skeleton({ className, variant = "rectangular" }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-gradient-to-r from-white/[0.03] via-white/[0.08] to-white/[0.03]",
        "bg-[length:200%_100%] rounded-brand-md border border-white/5",
        variant === "text" && "h-4 w-full",
        variant === "circular" && "rounded-full aspect-square",
        variant === "rectangular" && "h-32 w-full",
        className
      )}
      aria-hidden="true"
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="flex flex-col gap-4 rounded-brand-xl border border-glass-border bg-black/40 backdrop-blur-md p-6 shadow-xl">
      <Skeleton className="h-48 w-full rounded-brand-lg" />
      <Skeleton variant="text" className="h-6 w-3/4" />
      <Skeleton variant="text" className="h-4 w-full" />
      <Skeleton variant="text" className="h-4 w-2/3" />
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-3 rounded-brand-xl border border-glass-border bg-black/40 backdrop-blur-md p-4">
      {/* Header Row Skeleton */}
      <Skeleton variant="text" className="h-9 w-full bg-white/[0.06]" />
      
      {/* Data Rows Skeletons */}
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} variant="text" className="h-10 w-full" />
      ))}
    </div>
  );
}