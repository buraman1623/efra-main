import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { contactFormSchema } from "@/lib/validation/schemas";
import { notifyNewContactMessage } from "@/lib/telegram/notify";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { full_name, email, phone, subject, message } = parsed.data;

  try {
    // Service role client: this route is the trusted, validated write path
    // for a public form. Anonymous visitors are allowed to INSERT here but
    // not SELECT (that's admin-only), so the anon-key client can't read the
    // row back after inserting it — the service role bypasses that safely,
    // since we've already validated everything above.
    const supabase = createServiceClient();

    const { data, error } = await supabase
      .from("contact_messages")
      .insert({
        full_name: full_name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        subject: subject.trim(),
        message: message.trim(),
      })
      .select("id, full_name, email, phone, subject, message")
      .single();

    if (error || !data) {
      console.error("Failed to insert contact message:", error);
      // TEMP: surfacing the real error for debugging. Remove `detail` once
      // the Telegram/insert issue is confirmed fixed.
      return NextResponse.json(
        { error: "Failed to submit message", detail: error?.message ?? String(error) },
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
      await notifyNewContactMessage(data);
    } catch (err) {
      console.error("Telegram notification failed:", err);
    }

    return NextResponse.json({ success: true, id: data.id }, { status: 201 });
  } catch (err) {
    console.error("Contact route threw:", err);
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
