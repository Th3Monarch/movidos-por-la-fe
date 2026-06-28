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
  photo_urls?: string[];
  video_urls?: string[];
  lat?: number | null;
  lng?: number | null;
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

function buildMessage(data: PlaceData): string {
  const helpLines = data.help_types
    .map((t) => `   ${helpTypeLabels[t] ?? "• " + t}`)
    .join("\n");

  let mapsLink = "";
  if (data.lat && data.lng) {
    mapsLink = `📍 <a href="https://www.google.com/maps?q=${data.lat},${data.lng}">Ver en Google Maps</a>`;
  } else if (data.address) {
    mapsLink = `📍 <a href="https://www.google.com/maps/search/${encodeURIComponent(data.address + ", " + data.city + ", " + data.state)}">Ver en Google Maps</a>`;
  }

  return [
    `🚨 <b>NUEVO REPORTE DE AYUDA 🚨</b>`,
    ``,
    `━━━━━━━━━━━━━━━━━━━━━`,
    ``,
    `<b>📍 Lugar:</b> ${data.name}`,
    `<b>🗺 Ubicación:</b> ${data.city}, ${data.state}`,
    data.address ? `<b>📌 Dirección:</b> ${data.address}` : null,
    mapsLink || null,
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
    data.photo_urls && data.photo_urls.length > 0
      ? `<b>🖼 Fotos:</b> ${data.photo_urls.length} adjunta(s)`
      : null,
    `<b>🔗 Ver en web:</b>`,
    `https://movidosporlafe.vercel.app`,
  ]
    .filter(Boolean)
    .join("\n");
}

async function fetchWithTimeout(url: string, options: RequestInit, ms = 20000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}

export async function sendTelegramNotification(data: PlaceData): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn("Telegram not configured");
    return false;
  }

  const api = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;
  const text = buildMessage(data);

  try {
    if (data.photo_urls && data.photo_urls.length > 0) {
      const media = data.photo_urls.slice(0, 10).map((url, i) => ({
        type: "photo" as const,
        media: url,
        caption: i === 0 ? text : undefined,
        parse_mode: i === 0 ? ("HTML" as const) : undefined,
      }));

      const res = await fetchWithTimeout(`${api}/sendMediaGroup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, media }),
      });

      if (!res.ok) {
        const errText = await res.text();
        const fallback = await fetchWithTimeout(`${api}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: "HTML", disable_web_page_preview: true }),
        });
        return fallback.ok;
      }
      return true;
    }

    const res = await fetchWithTimeout(`${api}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: "HTML", disable_web_page_preview: true }),
    });
    return res.ok;
  } catch (err) {
    console.warn("Telegram notification skipped (timeout or network):", err instanceof Error ? err.message : err);
    return false;
  }
}
