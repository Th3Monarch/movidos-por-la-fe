import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendTelegramNotification } from "@/lib/telegram";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { error } = await createClient(supabaseUrl, supabaseKey)
      .from("places")
      .insert([
        {
          name: body.name,
          state: body.state,
          city: body.city,
          address: body.address || "",
          description: body.description || "",
          help_types: body.help_types,
          urgency: body.urgency,
          status: "activo",
          contact_name: body.contact_name || "",
          contact_phone: body.contact_phone || "",
          photo_urls: body.photo_urls || [],
          lat: body.lat || null,
          lng: body.lng || null,
        },
      ]);

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    sendTelegramNotification(body).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
