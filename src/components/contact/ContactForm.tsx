"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/validation/schemas";
import { createClient } from "@/lib/supabase/client";
import { Button, Input, Textarea } from "@/components/ui";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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
    const supabase = createClient();

    const { error } = await supabase.from("contact_messages").insert({
      full_name: data.full_name.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      subject: data.subject.trim(),
      message: data.message.trim(),
    });

    if (error) {
      console.error("Contact form submission failed:", error);
      setSubmitError(
        "We couldn't send your message. Please try again or call us directly."
      );
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
          Message sent successfully
        </h3>
        <p className="mt-2 text-sm text-brand-muted">
          Our team will respond within one business day.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-6 border-glass-border bg-white/5 text-white hover:bg-white/10 text-xs"
          onClick={() => setSubmitted(false)}
        >
          Send another message
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
          label="Email"
          type="email"
          placeholder="you@company.com"
          error={errors.email?.message}
          className="bg-black/50 border-glass-border focus:border-brand-amber text-white placeholder:text-brand-muted/50 text-sm"
          {...register("email")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Phone / WhatsApp"
          type="tel"
          placeholder="0911674126"
          error={errors.phone?.message}
          className="bg-black/50 border-glass-border focus:border-brand-amber text-white placeholder:text-brand-muted/50 text-sm font-mono"
          {...register("phone")}
        />
        <Input
          label="Subject"
          placeholder="How can we help?"
          error={errors.subject?.message}
          className="bg-black/50 border-glass-border focus:border-brand-amber text-white placeholder:text-brand-muted/50 text-sm"
          {...register("subject")}
        />
      </div>

      <Textarea
        label="Message"
        placeholder="Tell us about your inquiry…"
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
          Send Message
        </Button>

        <p className="text-xs text-brand-muted/70">
          Your information is kept secure and never shared with third parties.
        </p>
      </div>
    </form>
  );
}