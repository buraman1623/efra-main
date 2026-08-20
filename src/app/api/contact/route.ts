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
    return NextResponse.json(
      { error: "Failed to submit message" },
      { status: 500 }
    );
  }

  // Fire-and-forget: don't let a Telegram outage fail the user's submission.
  notifyNewContactMessage(data).catch((err) =>
    console.error("Telegram notification failed:", err)
  );

  return NextResponse.json({ success: true, id: data.id }, { status: 201 });
}
