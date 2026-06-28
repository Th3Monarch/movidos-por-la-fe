import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendTelegramNotification } from "@/lib/telegram";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const ADMIN_SECRET = process.env.ADMIN_SECRET || "admin123";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const auth = request.headers.get("x-admin-secret");
  if (auth !== ADMIN_SECRET) {
    return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  }

  try {
    const { data, error } = await createClient(supabaseUrl, supabaseKey)
      .from("places")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json({ ok: false, error: "Reporte no encontrado" }, { status: 404 });
    }

    const result = await sendTelegramNotification({
      id: data.id,
      name: data.name,
      state: data.state,
      city: data.city,
      address: data.address || "",
      description: data.description || "",
      help_types: data.help_types,
      urgency: data.urgency,
      contact_name: data.contact_name || "",
      contact_phone: data.contact_phone || "",
      photo_urls: data.photo_urls || [],
      lat: data.lat,
      lng: data.lng,
    });

    return NextResponse.json({
      ok: result.ok,
      details: result.details,
      message: result.ok
        ? "Reporte reenviado a Telegram"
        : "Error al reenviar. Revisa los logs.",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
