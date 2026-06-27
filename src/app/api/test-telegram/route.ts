import { NextResponse } from "next/server";
import { sendTelegramNotification } from "@/lib/telegram";

export async function GET() {
  const hasToken = !!process.env.TELEGRAM_BOT_TOKEN;
  const hasChatId = !!process.env.TELEGRAM_CHAT_ID;

  if (!hasToken || !hasChatId) {
    return NextResponse.json({
      ok: false,
      error: "Faltan variables de entorno",
      token_set: hasToken,
      chat_id_set: hasChatId,
    });
  }

  const result = await sendTelegramNotification({
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
    ok: result,
    token_set: hasToken,
    chat_id_set: hasChatId,
    message: result
      ? "✅ Mensaje enviado correctamente a Telegram"
      : "❌ Falló el envío a Telegram. Revisa que el bot sea miembro del grupo y el chat ID sea correcto.",
  });
}
