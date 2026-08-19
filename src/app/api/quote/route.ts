import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
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

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

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
    return NextResponse.json(
      { error: "Failed to submit quote request" },
      { status: 500 }
    );
  }

  // Fire-and-forget: don't let a Telegram outage fail the user's submission.
  notifyNewQuoteRequest(data).catch((err) =>
    console.error("Telegram notification failed:", err)
  );

  return NextResponse.json({ success: true, id: data.id }, { status: 201 });
}
