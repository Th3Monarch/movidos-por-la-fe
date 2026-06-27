"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import type { Place } from "@/lib/types";
import { useLang } from "@/lib/LanguageProvider";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import PlaceCard from "@/components/PlaceCard";

type StatusFilter = "all" | "activo" | "en_proceso" | "resuelto";

export default function HomePage() {
  const { lang, t } = useLang();
  const [places, setPlaces] = useState<Place[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlaces();
  }, []);

  async function fetchPlaces() {
    const { data } = await supabase
      .from("places")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setPlaces(data as Place[]);
    setLoading(false);
  }

  const filtered = useMemo(() => {
    return places.filter((p) => {
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.state.toLowerCase().includes(search.toLowerCase()) ||
        p.city.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [places, search, statusFilter]);

  const stats = useMemo(
    () => ({
      total: places.length,
      active: places.filter((p) => p.status === "activo").length,
      resolved: places.filter((p) => p.status === "resuelto").length,
      statesCount: new Set(places.map((p) => p.state)).size,
    }),
    [places]
  );

  const statusChips: { key: StatusFilter; labelKey: string }[] = [
    { key: "all", labelKey: "filter.all" },
    { key: "activo", labelKey: "filter.active" },
    { key: "en_proceso", labelKey: "filter.in_progress" },
    { key: "resuelto", labelKey: "filter.resolved" },
  ];

  return (
    <>
      <HeroSection />
      <StatsBar {...stats} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
          <div className="flex flex-wrap gap-2">
            {statusChips.map((chip) => (
              <button
                key={chip.key}
                onClick={() => setStatusFilter(chip.key)}
                className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                  statusFilter === chip.key
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {t(chip.labelKey)}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("search.placeholder")}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-400">Cargando...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg font-medium mb-1">
              {places.length === 0 ? t("place.no_places") : t("place.no_results")}
            </p>
            {places.length === 0 && (
              <p className="text-sm text-gray-400">
                Sé el primero en{" "}
                <a href="/reportar" className="text-blue-600 underline">
                  reportar un lugar
                </a>
              </p>
            )}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((place) => (
              <PlaceCard key={place.id} place={place} lang={lang} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
