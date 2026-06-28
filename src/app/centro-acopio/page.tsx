"use client";

import { useLang } from "@/lib/LanguageProvider";

export default function CentroAcopioPage() {
  const { t, lang } = useLang();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
            <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">{t("acopio.title")}</h1>
      </div>

      <div className="space-y-4 text-gray-700 leading-relaxed mb-10">
        <p>{t("acopio.p1")}</p>
        <p>{t("acopio.p2")}</p>
        <p>{t("acopio.p3")}</p>
      </div>

      {lang === "es" ? (
        <>
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8">
            <h2 className="font-bold text-lg text-green-800 mb-4 flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {t("acopio.benefits_title")}
            </h2>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div className="bg-white rounded-xl p-4 shadow-sm text-gray-700">📍 {t("acopio.benefit1")}</div>
              <div className="bg-white rounded-xl p-4 shadow-sm text-gray-700">📲 {t("acopio.benefit2")}</div>
              <div className="bg-white rounded-xl p-4 shadow-sm text-gray-700">🤝 {t("acopio.benefit3")}</div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
            <h2 className="font-bold text-lg text-blue-800 mb-4">{t("acopio.how_title")}</h2>
            <ol className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-3">
                <span className="w-7 h-7 bg-blue-200 rounded-full flex items-center justify-center shrink-0 font-bold text-blue-800 text-xs">1</span>
                <span>{t("acopio.how1")}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-7 h-7 bg-blue-200 rounded-full flex items-center justify-center shrink-0 font-bold text-blue-800 text-xs">2</span>
                <span>{t("acopio.how2")}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-7 h-7 bg-blue-200 rounded-full flex items-center justify-center shrink-0 font-bold text-blue-800 text-xs">3</span>
                <span>{t("acopio.how3")}</span>
              </li>
            </ol>
          </div>
        </>
      ) : (
        <>
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8">
            <h2 className="font-bold text-lg text-green-800 mb-4 flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {t("acopio.benefits_title")}
            </h2>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div className="bg-white rounded-xl p-4 shadow-sm text-gray-700">📍 {t("acopio.benefit1")}</div>
              <div className="bg-white rounded-xl p-4 shadow-sm text-gray-700">📲 {t("acopio.benefit2")}</div>
              <div className="bg-white rounded-xl p-4 shadow-sm text-gray-700">🤝 {t("acopio.benefit3")}</div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
            <h2 className="font-bold text-lg text-blue-800 mb-4">{t("acopio.how_title")}</h2>
            <ol className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-3">
                <span className="w-7 h-7 bg-blue-200 rounded-full flex items-center justify-center shrink-0 font-bold text-blue-800 text-xs">1</span>
                <span>{t("acopio.how1")}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-7 h-7 bg-blue-200 rounded-full flex items-center justify-center shrink-0 font-bold text-blue-800 text-xs">2</span>
                <span>{t("acopio.how2")}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-7 h-7 bg-blue-200 rounded-full flex items-center justify-center shrink-0 font-bold text-blue-800 text-xs">3</span>
                <span>{t("acopio.how3")}</span>
              </li>
            </ol>
          </div>
        </>
      )}

      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
        <p className="text-gray-700 font-medium mb-3">{t("acopio.contact_text")}</p>
        <div className="flex flex-col sm:flex-row gap-3 text-sm">
          <a
            href="mailto:movidosporlafe@correo.com"
            className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            movidosporlafe@correo.com
          </a>
          <a
            href="https://t.me/movidosporlafe"
            target="_blank"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zM5.5 11.5l11.2-4.4c.5-.2 1 .1 1.1.6l.1.1-.6 10.2c-.1.5-.5.8-1 .8-.4 0-.7-.2-.9-.4l-3.5-2.9-1.7 1.6c-.2.2-.4.3-.7.3l.3-3.8 6.5-5.9c.2-.2 0-.3-.2-.2l-8 5.1-3.6-1.2c-.5-.2-.5-.5-.1-.6z" />
            </svg>
            @movidosporlafe
          </a>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-8 mt-8">
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
