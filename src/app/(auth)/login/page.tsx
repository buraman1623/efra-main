"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/ui/MotionWrapper";
import { useLocale } from "@/lib/i18n/LocaleProvider";

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const supabase = createClient();
  const { t } = useLocale();

  // Only treat `next` as "explicit" if it was genuinely present in the URL
  // and isn't just the plain root. If we always defaulted this to "/" and
  // sent it along, the callback route could never tell "nobody asked to
  // go anywhere in particular" apart from "someone explicitly asked for
  // the homepage" — and admins would never get their /admin redirect,
  // since an explicit destination (even "/") always wins over role-based
  // routing by design.
  const rawNext = searchParams.get("next");
  const explicitNext =
    rawNext && rawNext !== "/" && rawNext.startsWith("/") && !rawNext.startsWith("//")
      ? rawNext
      : null;

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback${
            explicitNext ? `?next=${encodeURIComponent(explicitNext)}` : ""
          }`,
          queryParams: {
            access_type: "online",
            prompt: "consent",
          },
          scopes: "email profile",
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error("Login Error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 pt-24 pb-12">
      <FadeUp delay={0.1} className="w-full max-w-md">
        <div className="glass-panel border border-glass-border rounded-brand-xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle accent glow */}
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-brand-amber/10 rounded-full blur-xl pointer-events-none" />

          <div className="text-center mb-8">
            <h1 className="font-heading text-display-xs text-brand-light">
              {t.login.welcomeBack}
            </h1>
            <p className="mt-3 text-body-sm text-brand-muted leading-relaxed">
              {t.login.subtitle}
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/15 border border-glass-border text-brand-light transition-all duration-200 py-3.5"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-brand-amber/20 border-t-brand-amber rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            )}
            <span className="font-semibold text-body-sm">
              {isLoading ? t.login.connecting : t.login.continueWithGoogle}
            </span>
          </Button>

          <p className="mt-8 text-center text-xs text-brand-muted/60">
            {t.login.privacyNote}
          </p>
        </div>
      </FadeUp>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex items-center justify-center px-4">
          <div className="w-full max-w-md glass-panel border border-glass-border rounded-brand-xl p-8 text-center animate-pulse">
            <div className="h-7 w-36 mx-auto bg-white/10 rounded mb-4" />
            <div className="h-4 w-64 mx-auto bg-white/5 rounded mb-8" />
            <div className="h-12 w-full bg-white/10 rounded-full" />
          </div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}