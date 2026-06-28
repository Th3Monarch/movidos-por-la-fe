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
          <a
            href="/acerca"
            className="inline-flex items-center gap-2 bg-transparent border-2 border-blue-200 text-blue-100 font-semibold px-5 py-2.5 rounded-xl hover:bg-white/10 transition-all text-base"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            ¿Y si soy centro de acopio?
          </a>
        </div>

        <div className="mt-8">
          <EmergencyPhones />
        </div>
      </div>
    </section>
  );
}
