const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

interface PlaceData {
  name: string;
  state: string;
  city: string;
  address: string;
  description: string;
  help_types: string[];
  urgency: string;
  contact_name: string;
  contact_phone: string;
}

const urgencyLabels: Record<string, string> = {
  alta: "🔴 Alta",
  media: "🟡 Media",
  baja: "🟢 Baja",
};

const helpTypeLabels: Record<string, string> = {
  food: "🍽 Alimentos",
  water: "💧 Agua potable",
  medicine: "💊 Medicinas",
  clothing: "👕 Ropa",
  shelter: "🏠 Refugio",
  rescue: "🚨 Rescate",
  heavy_machinery: "🏗 Maquinaria pesada",
  electricity: "⚡ Electricidad",
  communications: "📡 Comunicaciones",
  other: "📦 Otros",
};

export async function sendTelegramNotification(data: PlaceData): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn("Telegram not configured: missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID");
    return false;
  }

  const helpLines = data.help_types
    .map((t) => `   ${helpTypeLabels[t] ?? "• " + t}`)
    .join("\n");

  const message = [
    `🚨 <b>NUEVO REPORTE DE AYUDA 🚨</b>`,
    ``,
    `━━━━━━━━━━━━━━━━━━━━━`,
    ``,
    `<b>📍 Lugar:</b> ${data.name}`,
    `<b>🗺 Ubicación:</b> ${data.city}, ${data.state}`,
    data.address ? `<b>📌 Dirección:</b> ${data.address}` : null,
    ``,
    `━━━━━━━━━━━━━━━━━━━━━`,
    ``,
    `<b>❗ Urgencia:</b> ${urgencyLabels[data.urgency] ?? data.urgency}`,
    ``,
    `<b>📋 Ayuda necesaria:</b>`,
    helpLines,
    ``,
    `━━━━━━━━━━━━━━━━━━━━━`,
    ``,
    data.description ? `<b>📝 Descripción:</b>\n${data.description}\n` : null,
    data.contact_name ? `<b>👤 Contacto:</b> ${data.contact_name}` : null,
    data.contact_phone ? `<b>📞 Teléfono:</b> ${data.contact_phone}` : null,
    ``,
    `━━━━━━━━━━━━━━━━━━━━━`,
    ``,
    `<b>🔗 Ver en web:</b>`,
    `https://movidosporlafe.vercel.app`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        signal: controller.signal,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      }
    );
    clearTimeout(timeout);
    return res.ok;
  } catch (err) {
    console.error("Telegram notification failed (timeout or network):", err);
    return false;
  }
}
