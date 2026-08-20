import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { quoteRequestSchema } from "@/lib/validation/schemas";
import { notifyNewQuoteRequest } from "@/lib/telegram/notify";

function emptyToNull(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = quoteRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { full_name, company, email, phone, whatsapp, product_interest, product_id, message } =
    parsed.data;

  try {
    // Cookie-based client: only used to identify a logged-in visitor, so a
    // quote request can be linked to their account if they're signed in.
    const authClient = await createClient();
    const {
      data: { user },
    } = await authClient.auth.getUser();

    // Service role client: this route is the trusted, validated write path
    // for a public form. Anonymous (and most logged-in) visitors are
    // allowed to INSERT here but can't SELECT it back afterward (that's
    // admin/owner-only), so the anon-key client can't read the row back
    // after inserting it — the service role bypasses that safely, since
    // we've already validated everything above.
    const supabase = createServiceClient();

    const { data, error } = await supabase
      .from("quote_requests")
      .insert({
        full_name: full_name.trim(),
        company: emptyToNull(company),
        email: email.trim(),
        phone: phone.trim(),
        whatsapp: emptyToNull(whatsapp),
        product_interest: emptyToNull(product_interest),
        product_id: emptyToNull(product_id),
        message: emptyToNull(message),
        user_id: user?.id ?? null,
      })
      .select("id, full_name, company, email, phone, whatsapp, product_interest, message")
      .single();

    if (error || !data) {
      console.error("Failed to insert quote request:", error);
      // TEMP: surfacing the real error for debugging. Remove `detail` once
      // the Telegram/insert issue is confirmed fixed.
      return NextResponse.json(
        { error: "Failed to submit quote request", detail: error?.message ?? String(error) },
        { status: 500 }
      );
    }

    // NOTE: this is deliberately awaited, not fire-and-forget. On Vercel
    // (and serverless generally), the function's execution environment
    // freezes as soon as the response is returned — an un-awaited promise
    // here gets silently cut off mid-flight before the Telegram request
    // completes, which is why messages weren't arriving. We still wrap it
    // so a Telegram outage can't fail the user's submission.
    try {
      await notifyNewQuoteRequest(data);
    } catch (err) {
      console.error("Telegram notification failed:", err);
    }

    return NextResponse.json({ success: true, id: data.id }, { status: 201 });
  } catch (err) {
    console.error("Quote route threw:", err);
    // TEMP: surfacing the real error for debugging. Remove `detail` once
    // the Telegram/insert issue is confirmed fixed.
    return NextResponse.json(
      {
        error: "Server error",
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
