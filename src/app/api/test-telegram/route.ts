import { NextResponse } from "next/server";
import { sendTelegramNotification } from "@/lib/telegram";

export async function GET() {
  const hasToken = !!process.env.TELEGRAM_BOT_TOKEN;
  const chatIds = (process.env.TELEGRAM_CHAT_IDS || process.env.TELEGRAM_CHAT_ID || "").split(",").filter(Boolean);

  if (!hasToken || chatIds.length === 0) {
    return NextResponse.json({
      ok: false,
      error: "Faltan variables de entorno",
      token_set: hasToken,
      chat_ids_count: chatIds.length,
    });
  }

  const result = await sendTelegramNotification({
    id: "test",
    name: "🧪 Prueba de Movidos por la Fe",
    state: "Distrito Capital",
    city: "Caracas (Prueba)",
    address: "Dirección de prueba",
    description: "Este es un mensaje de prueba para verificar que el bot funciona.",
    help_types: ["food", "water", "medicine"],
    urgency: "media",
    contact_name: "Admin",
    contact_phone: "0412-0000000",
  });

  return NextResponse.json({
    ok: result.ok,
    token_set: hasToken,
    chat_ids: chatIds,
    details: result.details,
    message: result.ok
      ? "✅ Mensaje enviado correctamente a Telegram"
      : "❌ Falló el envío. Revisa los detalles abajo.",
  });
}
