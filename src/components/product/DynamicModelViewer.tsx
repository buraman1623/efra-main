"use client";

import dynamic from "next/dynamic";

const ProductModelViewer = dynamic(
  () => import("./ProductModelViewer"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[400px] md:min-h-[500px] rounded-brand-xl bg-black/40 border border-glass-border animate-pulse flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-2 border-brand-amber border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-brand-muted uppercase tracking-wider font-semibold">
          Initializing 3D Canvas...
        </span>
      </div>
    ),
  }
);

export default ProductModelViewer;