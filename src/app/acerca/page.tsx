"use client";

import { useLang } from "@/lib/LanguageProvider";

export default function AcercaPage() {
  const { t, lang } = useLang();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t("about.title")}</h1>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>{t("about.p1")}</p>
          <p>{t("about.p2")}</p>
          <p>{t("about.p3")}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            {t("about.join")}
          </h2>
          <p className="text-gray-600 text-sm mb-4">{t("about.join_text")}</p>
          <div className="space-y-2 text-sm">
            <a
              href="mailto:movidosporlafe@correo.com"
              className="flex items-center gap-2 text-blue-700 hover:underline"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              {t("about.email")}: manuelaalbertoguia@gmail.com
            </a>
            <a
              href="https://t.me/+gXKabrPnx-E5NmQx"
              target="_blank"
              className="flex items-center gap-2 text-blue-700 hover:underline"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zM5.5 11.5l11.2-4.4c.5-.2 1 .1 1.1.6l.1.1-.6 10.2c-.1.5-.5.8-1 .8-.4 0-.7-.2-.9-.4l-3.5-2.9-1.7 1.6c-.2.2-.4.3-.7.3l.3-3.8 6.5-5.9c.2-.2 0-.3-.2-.2l-8 5.1-3.6-1.2c-.5-.2-.5-.5-.1-.6z" />
              </svg>
              {t("about.telegram")}: @movidosporlafe
            </a>
          </div>
        </div>
      </div>

      {lang === "es" ? (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-12">
          <h2 className="font-bold text-lg text-blue-800 mb-4">Cómo funciona</h2>
          <div className="grid sm:grid-cols-3 gap-6 text-sm">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-3 text-red-600 font-bold text-lg">1</div>
              <h3 className="font-semibold text-gray-900 mb-1">Alguien reporta</h3>
              <p className="text-gray-600">Una persona reporta una comunidad que necesita ayuda desde la web.</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-3 text-blue-600 font-bold text-lg">2</div>
              <h3 className="font-semibold text-gray-900 mb-1">Llega a los grupos</h3>
              <p className="text-gray-600">El bot envía el reporte automáticamente a 30+ grupos de acopio en Telegram.</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-3 text-green-600 font-bold text-lg">3</div>
              <h3 className="font-semibold text-gray-900 mb-1">Se activan</h3>
              <p className="text-gray-600">Los centros de acopio coordinan y llevan la ayuda directamente.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-12">
          <h2 className="font-bold text-lg text-blue-800 mb-4">How it works</h2>
          <div className="grid sm:grid-cols-3 gap-6 text-sm">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-3 text-red-600 font-bold text-lg">1</div>
              <h3 className="font-semibold text-gray-900 mb-1">Someone reports</h3>
              <p className="text-gray-600">A person reports a community in need through the website.</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-3 text-blue-600 font-bold text-lg">2</div>
              <h3 className="font-semibold text-gray-900 mb-1">Groups receive it</h3>
              <p className="text-gray-600">The bot sends the report to 30+ relief center Telegram groups.</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-3 text-green-600 font-bold text-lg">3</div>
              <h3 className="font-semibold text-gray-900 mb-1">They activate</h3>
              <p className="text-gray-600">Relief centers coordinate and deliver help directly.</p>
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
