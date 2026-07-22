import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  asChild?: boolean;
}

const variants = {
  primary:
    "bg-brand-amber text-black font-semibold hover:bg-brand-amber/90 active:scale-[0.98] shadow-md shadow-brand-amber/10",
  secondary:
    "bg-white/5 text-white border border-glass-border hover:bg-white/10 hover:border-white/20 active:scale-[0.98]",
  outline:
    "border border-brand-amber/50 text-brand-amber hover:bg-brand-amber/10 hover:border-brand-amber active:scale-[0.98]",
  ghost:
    "text-white/80 hover:text-white hover:bg-white/10 active:scale-[0.98]",
  danger:
    "bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 hover:border-red-500/50 active:scale-[0.98]",
};

const sizes = {
  sm: "h-8 px-3 text-xs rounded-brand-md gap-1.5",
  md: "h-10 px-5 text-xs font-semibold uppercase tracking-wider rounded-brand-md gap-2",
  lg: "h-12 px-7 text-sm font-semibold uppercase tracking-wider rounded-brand-lg gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      "inline-flex items-center justify-center font-medium transition-all duration-200 select-none",
      "focus:outline-none focus:ring-2 focus:ring-brand-amber/50 focus:ring-offset-2 focus:ring-offset-black",
      "disabled:opacity-50 disabled:pointer-events-none disabled:transform-none",
      variants[variant],
      sizes[size],
      className
    );

    if (asChild) {
      return (
        <Slot ref={ref} className={classes} {...props}>
          {children}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="h-4 w-4 animate-spin shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";