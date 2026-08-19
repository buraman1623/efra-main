import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { syncUserProfile } from "@/lib/auth/profile";

function safeRedirectPath(next: string | null): string | null {
  if (next && next.startsWith("/") && !next.startsWith("//")) {
    return next;
  }
  return null;
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const explicitNext = safeRedirectPath(searchParams.get("next"));

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const profile = await syncUserProfile(supabase);

      // Admins land on the Admin Panel by default; everyone else lands on
      // the home page — unless the person was sent to /login from a
      // specific page (e.g. "Sign in to view your watchlist"), in which
      // case we honor that original destination for both roles.
      const destination =
        explicitNext ?? ((profile as any)?.role === "admin" ? "/admin" : "/");

      return NextResponse.redirect(`${origin}${destination}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`);
}
