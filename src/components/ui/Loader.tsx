import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

const sizes = {
  sm: "h-5 w-5 border-2",
  md: "h-8 w-8 border-2",
  lg: "h-12 w-12 border-[3px]",
};

export function Loader({ size = "md", className, label = "Loading" }: LoaderProps) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center gap-3", className)}
      role="status"
    >
      <div
        className={cn(
          "animate-spin rounded-full border-brand-amber/20 border-t-brand-amber",
          sizes[size]
        )}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <Loader size="lg" label="Loading page" />
      <p className="text-xs font-semibold uppercase tracking-widest text-brand-muted/70 animate-pulse">
        Loading...
      </p>
    </div>
  );
}

export function InlineLoader({ label }: { label?: string }) {
  return (
    <div className="inline-flex items-center gap-2.5 text-brand-muted">
      <Loader size="sm" label={label ?? "Loading"} />
      {label && <span className="text-xs font-medium text-brand-muted">{label}</span>}
    </div>
  );
}