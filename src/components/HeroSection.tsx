"use client";

import { useLang } from "@/lib/LanguageProvider";
import EmergencyPhones from "@/components/EmergencyPhones";

export default function HeroSection() {
  const { t } = useLang();

  return (
    <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-red-700 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="flex items-center gap-2 text-yellow-300 text-xs font-semibold uppercase tracking-wider mb-4">
          <span className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse-dot" />
          {t("site.emergency_badge")}
        </div>

        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
          {t("site.tagline")}
        </h1>
        <p className="text-lg md:text-xl text-blue-100 max-w-2xl mb-8">
          {t("site.subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <a
            href="/reportar"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-blue-50 transition-all text-lg"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            {t("hero.cta")}
          </a>
          <p className="text-sm text-blue-200 max-w-xs">
            {t("hero.cta_hint")}
          </p>
        </div>

        <div className="mt-8">
          <EmergencyPhones />
        </div>
      </div>
    </section>
  );
}
