import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
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

  const supabase = await createClient();

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
