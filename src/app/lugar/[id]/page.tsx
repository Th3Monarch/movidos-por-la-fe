"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { Place, Language } from "@/lib/types";
import { useLang } from "@/lib/LanguageProvider";
import { getStatusColor, formatDate } from "@/lib/helpers";

const helpTypeLabels: Record<string, Record<string, string>> = {
  es: {
    food: "Alimentos", water: "Agua potable", medicine: "Medicinas",
    clothing: "Ropa", shelter: "Refugio", rescue: "Rescate",
    heavy_machinery: "Maquinaria pesada", electricity: "Electricidad",
    communications: "Comunicaciones", other: "Otros",
  },
  en: {
    food: "Food", water: "Drinking water", medicine: "Medicine",
    clothing: "Clothing", shelter: "Shelter", rescue: "Rescue",
    heavy_machinery: "Heavy machinery", electricity: "Electricity",
    communications: "Communications", other: "Other",
  },
};

const urgencyLabels: Record<string, Record<string, string>> = {
  es: { alta: "Alta", media: "Media", baja: "Baja" },
  en: { alta: "High", media: "Medium", baja: "Low" },
};

const statusLabels: Record<string, Record<string, string>> = {
  es: { activo: "Activo", en_proceso: "En proceso", resuelto: "Resuelto" },
  en: { activo: "Active", en_proceso: "In progress", resuelto: "Resolved" },
};

export default function PlaceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { lang, t } = useLang();
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) return;
    supabase
      .from("places")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        if (data) setPlace(data as Place);
        setLoading(false);
      });
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (loading) {
    return <div className="max-w-3xl mx-auto px-4 py-20 text-center text-gray-400">Cargando...</div>;
  }

  if (!place) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-lg text-gray-500">Lugar no encontrado.</p>
        <a href="/" className="text-blue-600 underline mt-2 inline-block">Volver al inicio</a>
      </div>
    );
  }

  const labels = helpTypeLabels[lang];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="text-sm text-gray-500 hover:text-blue-700 mb-6 inline-flex items-center gap-1"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        {t("detail.back")}
      </button>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{place.name}</h1>
            <div className="flex gap-2">
              <span className={`text-sm font-semibold px-3 py-1 rounded-full border ${getStatusColor(place.status)}`}>
                {statusLabels[lang][place.status]}
              </span>
            </div>
          </div>

          <p className="text-gray-500 mb-6">{place.city}, {place.state}</p>

          {place.description && (
            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">{place.description}</p>
            </div>
          )}

          {place.address && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-1">{t("place.location")}</h3>
              <p className="text-gray-600">{place.address}</p>
              {(place.lat && place.lng) ? (
                <a
                  href={`https://www.google.com/maps?q=${place.lat},${place.lng}`}
                  target="_blank"
                  className="text-blue-600 text-sm hover:underline inline-flex items-center gap-1 mt-1"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Ver en Google Maps
                </a>
              ) : (
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(place.address + ", " + place.city + ", " + place.state)}`}
                  target="_blank"
                  className="text-blue-600 text-sm hover:underline inline-flex items-center gap-1 mt-1"
                >
                  Ver en Google Maps
                </a>
              )}
            </div>
          )}

          {place.photo_urls && place.photo_urls.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Fotos</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {place.photo_urls.map((url, i) => (
                  <a key={i} href={url} target="_blank" className="block aspect-video rounded-lg overflow-hidden bg-gray-100">
                    <img src={url} alt={`Foto ${i + 1}`} className="w-full h-full object-cover hover:opacity-90 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {place.video_urls && place.video_urls.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Videos</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {place.video_urls.map((url, i) => (
                  <video key={i} controls className="w-full rounded-lg bg-gray-100" preload="metadata">
                    <source src={url} />
                  </video>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">{t("detail.help_needed")}</h3>
            <div className="flex flex-wrap gap-2">
              {place.help_types.map((ht) => (
                <span key={ht} className="bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full border border-blue-100">
                  {labels[ht] ?? ht}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg px-4 py-2">
              <span className="text-xs text-gray-500">{t("place.urgency")}</span>
              <p className="font-semibold">{urgencyLabels[lang][place.urgency]}</p>
            </div>
            {place.contact_name && (
              <div className="bg-gray-50 rounded-lg px-4 py-2">
                <span className="text-xs text-gray-500">{t("place.contact")}</span>
                <p className="font-semibold">{place.contact_name}</p>
              </div>
            )}
            {place.contact_phone && (
              <a href={`tel:${place.contact_phone}`} className="bg-green-50 rounded-lg px-4 py-2 hover:bg-green-100 transition-colors">
                <span className="text-xs text-gray-500">Teléfono</span>
                <p className="font-semibold text-green-700">{place.contact_phone}</p>
              </a>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="text-xs text-gray-400 space-y-1">
              <p>{t("place.reported_at")}: {formatDate(place.created_at)}</p>
              {place.updated_at !== place.created_at && (
                <p>{t("place.updated_at")}: {formatDate(place.updated_at)}</p>
              )}
            </div>
            <button
              onClick={handleShare}
              className="text-sm text-gray-500 hover:text-blue-700 flex items-center gap-1.5"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                <path d="m15.7 7.3-7.4 4.4M8.3 12.8l7.4 4.4" />
              </svg>
              {copied ? t("detail.copied") : t("detail.share")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
