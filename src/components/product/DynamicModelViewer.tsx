"use client";

import dynamic from "next/dynamic";
import { useLocale } from "@/lib/i18n/LocaleProvider";

function ModelViewerLoading() {
  const { t } = useLocale();
  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[500px] rounded-brand-xl bg-black/40 border border-glass-border animate-pulse flex flex-col items-center justify-center gap-3">
      <div className="w-8 h-8 border-2 border-brand-amber border-t-transparent rounded-full animate-spin" />
      <span className="text-xs text-brand-light/60 uppercase tracking-wider font-semibold">
        {t.products.initializing3dCanvas}
      </span>
    </div>
  );
}

const ProductModelViewer = dynamic(
  () => import("./ProductModelViewer"),
  {
    ssr: false,
    loading: () => <ModelViewerLoading />,
  }
);

export default ProductModelViewer;