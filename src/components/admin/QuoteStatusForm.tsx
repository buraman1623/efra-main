"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  quoteStatusUpdateSchema,
  type QuoteStatusUpdateData,
} from "@/lib/validation/schemas";
import { createClient } from "@/lib/supabase/client";
import { Button, Textarea } from "@/components/ui";
import type { QuoteStatus } from "@/types";

interface QuoteStatusFormProps {
  quoteId: string;
  currentStatus: QuoteStatus;
  currentNotes: string | null;
}

export function QuoteStatusForm({
  quoteId,
  currentStatus,
  currentNotes,
}: QuoteStatusFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<QuoteStatusUpdateData>({
    resolver: zodResolver(quoteStatusUpdateSchema),
    defaultValues: {
      status: currentStatus,
      admin_notes: currentNotes ?? "",
    },
  });

  async function onSubmit(data: QuoteStatusUpdateData) {
    setError(null);
    setSaved(false);
    const supabase = createClient();

    const { error: updateError } = await supabase
      .from("quote_requests")
      .update({
        status: data.status,
        admin_notes: data.admin_notes?.trim() || null,
      })
      .eq("id", quoteId);

    if (updateError) {
      console.error("Quote status update failed:", updateError);
      setError("Could not save changes. Please try again.");
      return;
    }

    setSaved(true);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <label
          htmlFor="quote-status"
          className="block text-xs font-semibold uppercase tracking-wider text-brand-muted"
        >
          Update Status
        </label>
        <div className="relative">
          <select
            id="quote-status"
            className="w-full appearance-none rounded-brand-md border border-glass-border bg-black/50 px-4 py-2.5 text-sm font-medium text-white shadow-inner transition-colors hover:border-white/20 focus:border-brand-amber focus:outline-none focus:ring-1 focus:ring-brand-amber"
            {...register("status")}
          >
            <option value="new" className="bg-neutral-900 text-white">
              New
            </option>
            <option value="contacted" className="bg-neutral-900 text-white">
              Contacted
            </option>
            <option value="closed" className="bg-neutral-900 text-white">
              Closed
            </option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-brand-muted">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Textarea
          label="Admin Notes"
          rows={4}
          placeholder="Internal notes about this lead..."
          className="bg-black/50 border-glass-border focus:border-brand-amber text-white placeholder:text-brand-muted/50 text-sm"
          {...register("admin_notes")}
        />
      </div>

      {error && (
        <div className="rounded-brand-md bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-400" role="alert">
          {error}
        </div>
      )}

      {saved && (
        <div className="rounded-brand-md bg-emerald-500/10 border border-emerald-500/20 p-3 text-xs text-emerald-400" role="status">
          Changes saved successfully.
        </div>
      )}

      <Button
        type="submit"
        isLoading={isSubmitting}
        className="w-full bg-brand-amber hover:bg-brand-amber/90 text-black font-semibold text-sm transition-all py-2.5"
      >
        Save Changes
      </Button>
    </form>
  );
}