"use client";

import { useLang } from "@/lib/LanguageProvider";

export default function AcercaPage() {
  const { t, lang } = useLang();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{t("about.title")}</h1>

      <div className="space-y-4 text-gray-700 leading-relaxed mb-10">
        <p>{t("about.p1")}</p>
        <p>{t("about.p2")}</p>
        <p>{t("about.p3")}</p>
      </div>

      {lang === "es" ? (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-10">
          <h2 className="font-bold text-lg text-blue-800 mb-4">Cómo funciona</h2>
          <div className="grid sm:grid-cols-3 gap-6 text-sm">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-3 text-red-600 font-bold text-lg">1</div>
              <h3 className="font-semibold text-gray-900 mb-1">Reportas</h3>
              <p className="text-gray-600">Una persona reporta una comunidad que necesita ayuda desde la web.</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-3 text-blue-600 font-bold text-lg">2</div>
              <h3 className="font-semibold text-gray-900 mb-1">Difundimos</h3>
              <p className="text-gray-600">El bot envía el reporte a los grupos de Telegram de los centros de acopio aliados.</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-3 text-green-600 font-bold text-lg">3</div>
              <h3 className="font-semibold text-gray-900 mb-1">Actúan</h3>
              <p className="text-gray-600">Los centros de acopio se activan y llevan la ayuda directamente.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-10">
          <h2 className="font-bold text-lg text-blue-800 mb-4">How it works</h2>
          <div className="grid sm:grid-cols-3 gap-6 text-sm">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-3 text-red-600 font-bold text-lg">1</div>
              <h3 className="font-semibold text-gray-900 mb-1">Report</h3>
              <p className="text-gray-600">Someone reports a community in need through the website.</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-3 text-blue-600 font-bold text-lg">2</div>
              <h3 className="font-semibold text-gray-900 mb-1">Broadcast</h3>
              <p className="text-gray-600">The bot sends the report to all allied relief center Telegram groups.</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-3 text-green-600 font-bold text-lg">3</div>
              <h3 className="font-semibold text-gray-900 mb-1">Act</h3>
              <p className="text-gray-600">Relief centers mobilize to deliver help directly.</p>
            </div>
          </div>
        </div>
      )}

      <div className="border-t border-gray-200 pt-8">
        <a
          href="/reportar"
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          {t("hero.cta")}
        </a>
      </div>
    </div>
  );
}
