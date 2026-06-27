"use client";

import { useState } from "react";
import { useLang } from "@/lib/LanguageProvider";
import { emergencyData } from "@/lib/emergencyData";

const SECTIONS = [
  "shortlines",
  "rescue",
  "police",
  "civilProtection",
  "firefighters",
  "ambulances",
] as const;

export default function EmergencyPhones() {
  const { lang } = useLang();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggle = (key: string) => {
    setOpenSection(openSection === key ? null : key);
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 md:p-6 text-white">
      <div className="flex items-center gap-2 font-bold text-sm mb-4">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
        </svg>
        {lang === "es" ? "Teléfonos de emergencia" : "Emergency phones"}
        <span className="text-xs font-normal text-white/60 ml-1">
          {lang === "es" ? "· Caracas, Miranda y Catia" : "· Caracas, Miranda & Catia"}
        </span>
      </div>

      <div className="space-y-2">
        {SECTIONS.map((key) => {
          const section = emergencyData[key];
          const data = section[lang];
          const isOpen = openSection === key;

          return (
            <div key={key} className="bg-white/10 rounded-lg overflow-hidden">
              <button
                onClick={() => toggle(key)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-left hover:bg-white/10 transition-colors"
              >
                {data.title}
                <svg
                  className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {isOpen && (
                <div className="px-3 pb-2 space-y-1">
                  {data.items.map((item, i) => (
                    <div key={i} className="flex items-start justify-between gap-2 text-xs py-1 border-t border-white/10">
                      <span className="text-white/80">{item.label}</span>
                      <a
                        href={`tel:${item.number.replace(/[^+\d]/g, "")}`}
                        className="text-yellow-300 font-semibold whitespace-nowrap hover:text-yellow-200 shrink-0"
                      >
                        {item.number}
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
