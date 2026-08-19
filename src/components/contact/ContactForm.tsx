"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContactFormSchema, type ContactFormData } from "@/lib/validation/schemas";
import { Button, Input, Textarea } from "@/components/ui";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { t } = useLocale();
  const contactFormSchema = useMemo(() => createContactFormSchema(t), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  async function onSubmit(data: ContactFormData) {
    setSubmitError(null);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      console.error("Contact form submission failed:", await res.text());
      setSubmitError(t.forms.contactErrorGeneric);
      return;
    }

    setSubmitted(true);
    reset();
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
          {t.forms.messageSentTitle}
        </h3>
        <p className="mt-2 text-sm text-brand-muted">
          {t.forms.messageSentDesc}
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-6 border-glass-border bg-white/5 text-white hover:bg-white/10 text-xs"
          onClick={() => setSubmitted(false)}
        >
          {t.forms.submitAnotherMessage}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label={t.forms.fullName}
          placeholder={t.forms.fullNamePlaceholder}
          error={errors.full_name?.message}
          className="bg-black/50 border-glass-border focus:border-brand-amber text-white placeholder:text-brand-muted/50 text-sm"
          {...register("full_name")}
        />
        <Input
          label={t.forms.email}
          type="email"
          placeholder={t.forms.emailPlaceholder}
          error={errors.email?.message}
          className="bg-black/50 border-glass-border focus:border-brand-amber text-white placeholder:text-brand-muted/50 text-sm"
          {...register("email")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label={t.forms.phoneWhatsapp}
          type="tel"
          placeholder={t.forms.phonePlaceholder}
          error={errors.phone?.message}
          className="bg-black/50 border-glass-border focus:border-brand-amber text-white placeholder:text-brand-muted/50 text-sm font-mono"
          {...register("phone")}
        />
        <Input
          label={t.forms.subject}
          placeholder={t.forms.subjectPlaceholder}
          error={errors.subject?.message}
          className="bg-black/50 border-glass-border focus:border-brand-amber text-white placeholder:text-brand-muted/50 text-sm"
          {...register("subject")}
        />
      </div>

      <Textarea
        label={t.forms.message}
        placeholder={t.forms.messagePlaceholder}
        rows={5}
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
          {t.forms.sendMessage}
        </Button>

        <p className="text-xs text-brand-muted/70">
          {t.forms.privacyNote}
        </p>
      </div>
    </form>
  );
}
