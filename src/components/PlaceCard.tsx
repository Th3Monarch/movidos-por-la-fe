"use client";

import type { Place, Language } from "@/lib/types";
import { getStatusColor } from "@/lib/helpers";

interface PlaceCardProps {
  place: Place;
  lang: Language;
}

const helpTypeLabels: Record<string, Record<string, string>> = {
  es: {
    food: "Alimentos", water: "Agua", medicine: "Medicinas",
    clothing: "Ropa", shelter: "Refugio", rescue: "Rescate",
    heavy_machinery: "Maquinaria", electricity: "Electricidad",
    communications: "Comunicaciones", other: "Otros",
  },
  en: {
    food: "Food", water: "Water", medicine: "Medicine",
    clothing: "Clothing", shelter: "Shelter", rescue: "Rescue",
    heavy_machinery: "Machinery", electricity: "Electricity",
    communications: "Comms", other: "Other",
  },
};

const urgencyColors: Record<string, string> = {
  alta: "bg-red-100 text-red-700 border-red-200",
  media: "bg-yellow-100 text-yellow-700 border-yellow-200",
  baja: "bg-green-100 text-green-700 border-green-200",
};

const urgencyLabels: Record<string, Record<string, string>> = {
  es: { alta: "Alta", media: "Media", baja: "Baja" },
  en: { alta: "High", media: "Medium", baja: "Low" },
};

const statusLabels: Record<string, Record<string, string>> = {
  es: { activo: "Activo", en_proceso: "En proceso", resuelto: "Resuelto" },
  en: { activo: "Active", en_proceso: "In progress", resuelto: "Resolved" },
};

export default function PlaceCard({ place, lang }: PlaceCardProps) {
  const labels = helpTypeLabels[lang];
  const typesShown = place.help_types.slice(0, 3);
  const extra = place.help_types.length - 3;

  return (
    <a
      href={`/lugar/${place.id}`}
      className="block bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all animate-fade-in"
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-gray-900 text-base leading-snug">
            {place.name}
          </h3>
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${urgencyColors[place.urgency]}`}
          >
            {urgencyLabels[lang][place.urgency]}
          </span>
        </div>

        <p className="text-sm text-gray-500 mb-3">
          {place.city}, {place.state}
        </p>

        <p className="text-sm text-gray-700 line-clamp-2 mb-3">
          {place.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {typesShown.map((t) => (
            <span
              key={t}
              className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-100"
            >
              {labels[t] ?? t}
            </span>
          ))}
          {extra > 0 && (
            <span className="text-xs text-gray-400">+{extra} más</span>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${getStatusColor(place.status)}`}
          >
            {statusLabels[lang][place.status]}
          </span>
          <span className="text-xs text-gray-400">
            {new Date(place.created_at).toLocaleDateString(lang === "es" ? "es-VE" : "en-US", {
              day: "numeric",
              month: "short",
            })}
          </span>
        </div>
      </div>
    </a>
  );
}
