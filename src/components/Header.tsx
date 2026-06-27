"use client";

import { useLang } from "@/lib/LanguageProvider";
import type { Language } from "@/lib/types";

export default function Header() {
  const { lang, setLang, t } = useLang();

  const toggleLang = () => {
    setLang(lang === "es" ? "en" : "es");
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex h-1">
        <div className="flex-1 bg-yellow-400" />
        <div className="flex-1 bg-blue-600" />
        <div className="flex-1 bg-red-600" />
      </div>
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 font-bold text-lg text-blue-700">
          <span className="text-2xl">✝</span>
          Movidos por la Fe
        </a>
        <div className="flex items-center gap-3">
          <a
            href="/acerca"
            className="text-sm text-gray-600 hover:text-blue-700 transition-colors"
          >
            {t("nav.about")}
          </a>
          <button
            onClick={toggleLang}
            className="text-xs font-medium uppercase px-2 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            {lang === "es" ? "EN" : "ES"}
          </button>
          <a
            href="/reportar"
            className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            {t("nav.report")}
          </a>
        </div>
      </div>
    </header>
  );
}
