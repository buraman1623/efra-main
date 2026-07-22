"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  quoteRequestSchema,
  type QuoteRequestFormData,
} from "@/lib/validation/schemas";
import { createClient } from "@/lib/supabase/client";
import { Button, Input, Textarea } from "@/components/ui";

interface QuoteFormProps {
  defaultProduct?: string;
  productId?: string;
}

function emptyToNull(value?: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export function QuoteForm({ defaultProduct, productId }: QuoteFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QuoteRequestFormData>({
    resolver: zodResolver(quoteRequestSchema),
    defaultValues: {
      product_interest: defaultProduct ?? "",
      product_id: productId ?? "",
    },
  });

  async function onSubmit(data: QuoteRequestFormData) {
    setSubmitError(null);
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("quote_requests").insert({
      full_name: data.full_name.trim(),
      company: emptyToNull(data.company),
      email: data.email.trim(),
      phone: data.phone.trim(),
      whatsapp: emptyToNull(data.whatsapp),
      product_interest: emptyToNull(data.product_interest),
      product_id: emptyToNull(data.product_id),
      message: emptyToNull(data.message),
      user_id: user?.id ?? null,
    });

    if (error) {
      console.error("Quote request submission failed:", error);
      setSubmitError(
        "We couldn't submit your quote request. Please try again or call us directly."
      );
      return;
    }

    setSubmitted(true);
    reset({
      product_interest: defaultProduct ?? "",
      product_id: productId ?? "",
    });
  }

  if (submitted) {
    return (
      <div className="rounded-brand-xl border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md p-8 text-center shadow-2xl">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-white">
          Quote request received
        </h3>
        <p className="mt-2 text-sm text-brand-muted">
          Our sales team will contact you shortly to discuss availability and pricing.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-6 border-glass-border bg-white/5 text-white hover:bg-white/10 text-xs"
          onClick={() => setSubmitted(false)}
        >
          Submit another request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Full Name"
          placeholder="Your name"
          error={errors.full_name?.message}
          className="bg-black/50 border-glass-border focus:border-brand-amber text-white placeholder:text-brand-muted/50 text-sm"
          {...register("full_name")}
        />
        <Input
          label="Company"
          placeholder="Company name (optional)"
          error={errors.company?.message}
          className="bg-black/50 border-glass-border focus:border-brand-amber text-white placeholder:text-brand-muted/50 text-sm"
          {...register("company")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Email"
          type="email"
          placeholder="you@company.com"
          error={errors.email?.message}
          className="bg-black/50 border-glass-border focus:border-brand-amber text-white placeholder:text-brand-muted/50 text-sm"
          {...register("email")}
        />
        <Input
          label="Phone"
          type="tel"
          placeholder="0911674126"
          error={errors.phone?.message}
          className="bg-black/50 border-glass-border focus:border-brand-amber text-white placeholder:text-brand-muted/50 text-sm font-mono"
          {...register("phone")}
        />
      </div>

      <Input
        label="WhatsApp"
        type="tel"
        placeholder="Optional WhatsApp number"
        hint="We often respond faster via WhatsApp"
        error={errors.whatsapp?.message}
        className="bg-black/50 border-glass-border focus:border-brand-amber text-white placeholder:text-brand-muted/50 text-sm font-mono"
        {...register("whatsapp")}
      />

      <Input
        label="Machinery of Interest"
        placeholder="e.g. GCM-01 Industrial Crusher"
        error={errors.product_interest?.message}
        className="bg-black/50 border-glass-border focus:border-brand-amber text-white placeholder:text-brand-muted/50 text-sm font-mono"
        {...register("product_interest")}
      />

      <input type="hidden" {...register("product_id")} />

      <Textarea
        label="Additional Details"
        placeholder="Capacity requirements, delivery location, timeline…"
        rows={4}
        error={errors.message?.message}
        className="bg-black/50 border-glass-border focus:border-brand-amber text-white placeholder:text-brand-muted/50 text-sm leading-relaxed"
        {...register("message")}
      />

      {submitError && (
        <div className="rounded-brand-md bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-400" role="alert">
          {submitError}
        </div>
      )}

      <div className="space-y-3 pt-2">
        <Button
          type="submit"
          isLoading={isSubmitting}
          className="w-full sm:w-auto bg-brand-amber hover:bg-brand-amber/90 text-black font-semibold text-sm px-8 py-2.5 transition-all"
        >
          Request a Quote
        </Button>

        <p className="text-xs text-brand-muted/70">
          Your information is kept secure and never shared with third parties.
        </p>
      </div>
    </form>
  );
}