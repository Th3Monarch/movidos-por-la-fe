"use client";

import { useLang } from "@/lib/LanguageProvider";

export default function AcercaPage() {
  const { t } = useLang();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{t("about.title")}</h1>

      <div className="space-y-4 text-gray-700 leading-relaxed">
        <p>{t("about.p1")}</p>
        <p>{t("about.p2")}</p>
        <p>{t("about.p3")}</p>
      </div>

      <div className="mt-10 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h2 className="font-bold text-lg text-blue-800 mb-3">{t("about.contact")}</h2>
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-semibold">{t("about.email")}:</span>{" "}
            <a href="mailto:movidosporlafe@correo.com" className="text-blue-700 hover:underline">
              movidosporlafe@correo.com
            </a>
          </p>
          <p className="text-gray-500 text-xs mt-2">
            También puedes encontrarnos en redes sociales como @MovidosPorLaFe
          </p>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-200 pt-6">
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
