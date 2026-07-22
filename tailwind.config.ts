import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#000000",
          secondary: "#E05B2B",
          accent: "#FA834E",
          surface: "#35302C",
          border: "#4E4742",
          hover: "#9B3311",
          muted: "#6B6560",
          light: "#F5F2EF",
          amber: "#FFB020",
        },
        glass: {
          fill: "rgba(255,255,255,0.06)",
          border: "rgba(255,255,255,0.12)",
        },
      },
      fontFamily: {
        heading: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "700" }],
        "display-lg": ["3.75rem", { lineHeight: "1.08", letterSpacing: "-0.025em", fontWeight: "700" }],
        "display-md": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "600" }],
        "display-sm": ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.015em", fontWeight: "600" }],
        "heading-lg": ["1.875rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" }],
        "heading-md": ["1.5rem", { lineHeight: "1.25", letterSpacing: "-0.005em", fontWeight: "600" }],
        "heading-sm": ["1.25rem", { lineHeight: "1.3", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.65" }],
        "body-md": ["1rem", { lineHeight: "1.7" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
        "label": ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.08em", fontWeight: "600" }],
      },
      spacing: {
        "section-y": "6rem",
        "section-y-lg": "8rem",
        "gutter": "1.5rem",
        "gutter-lg": "2rem",
      },
      maxWidth: {
        "content": "72rem",
        "wide": "90rem",
        "narrow": "48rem",
      },
      borderRadius: {
        "brand-sm": "0.375rem",
        "brand-md": "0.625rem",
        "brand-lg": "1rem",
        "brand-xl": "1.5rem",
      },
      boxShadow: {
        "brand-sm": "0 1px 2px 0 rgb(31 26 23 / 0.08)",
        "brand-md": "0 4px 16px -2px rgb(31 26 23 / 0.12)",
        "brand-lg": "0 12px 40px -8px rgb(31 26 23 / 0.18)",
        "brand-glow": "0 0 40px -8px rgb(224 91 43 / 0.35)",
        "brand-inner": "inset 0 1px 0 0 rgb(255 255 255 / 0.06)",
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #000000 0%, #E05B2B 50%, #000000 100%)",
        "gradient-accent": "linear-gradient(135deg, #E05B2B 0%, #FA834E 100%)",
        "gradient-signal": "linear-gradient(120deg, #E05B2B 0%, #FFB020 100%)",
        "gradient-radial-accent": "radial-gradient(ellipse at top, rgb(224 91 43 / 0.15) 0%, transparent 60%)",
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      transitionTimingFunction: {
        "brand-in": "cubic-bezier(0.16, 1, 0.3, 1)",
        "brand-out": "cubic-bezier(0.7, 0, 0.84, 0)",
        "brand-spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      transitionDuration: {
        "instant": "100ms",
        "fast": "200ms",
        "normal": "300ms",
        "slow": "500ms",
        "slower": "700ms",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-down": {
          "0%": { opacity: "0", transform: "translateY(-16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px -4px rgb(224 91 43 / 0.3)" },
          "50%": { boxShadow: "0 0 32px -4px rgb(224 91 43 / 0.5)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 8px 2px rgba(255,176,32,0.6)" },
          "50%": { opacity: "0.35", boxShadow: "0 0 4px 1px rgba(255,176,32,0.3)" },
        },
        "float-y": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "ken-burns": {
          "0%": { transform: "scale(1.04)" },
          "100%": { transform: "scale(1.12)" },
        },
        "drift": {
          "0%, 100%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(40px,50px)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-brand-in forwards",
        "fade-up": "fade-up 0.6s ease-brand-in forwards",
        "fade-down": "fade-down 0.6s ease-brand-in forwards",
        "scale-in": "scale-in 0.4s ease-brand-in forwards",
        "slide-in-right": "slide-in-right 0.5s ease-brand-in forwards",
        "shimmer": "shimmer 2s linear infinite",
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
        "pulse-dot": "pulse-dot 1.8s ease-in-out infinite",
        "float-y": "float-y 5s ease-in-out infinite",
        "ken-burns": "ken-burns 26s ease-in-out infinite alternate",
        "drift": "drift 20s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
