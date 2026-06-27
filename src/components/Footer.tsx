"use client";

import { useLang } from "@/lib/LanguageProvider";

import EmergencyPhones from "@/components/EmergencyPhones";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <p className="text-sm leading-relaxed max-w-3xl mx-auto text-center">
          {t("footer.mission")}
        </p>
        <div className="border-t border-gray-700 my-6" />
        <div className="max-w-xl mx-auto mb-6">
          <EmergencyPhones />
        </div>
        <div className="border-t border-gray-700 my-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-xs text-gray-500">
            Movidos por la Fe &copy; {new Date().getFullYear()}
          </p>
          <p className="text-xs text-gray-500 text-center">
            {t("footer.emergency")}
          </p>
          <p className="text-xs text-gray-500">
            {t("footer.problem")}{" "}
            <a
              href="mailto:movidosporlafe@correo.com"
              className="text-blue-400 hover:underline"
            >
              {t("footer.write_us")}
            </a>
            {" · "}
            <a href="/admin" className="text-gray-600 hover:text-gray-400">
              Admin
            </a>
          </p>
        </div>
        <div className="mt-6 text-center">
          <a
            href="/reportar"
            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            {t("footer.report_button")}
          </a>
        </div>
      </div>
    </footer>
  );
}
