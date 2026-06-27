import es from "@/i18n/es.json";
import en from "@/i18n/en.json";
import type { Language } from "@/lib/types";

const translations: Record<Language, Record<string, string>> = { es, en };

let currentLang: Language = "es";

const listeners: Array<(lang: Language) => void> = [];

export function setLanguage(lang: Language) {
  currentLang = lang;
  if (typeof window !== "undefined") {
    localStorage.setItem("lang", lang);
  }
  listeners.forEach((fn) => fn(lang));
}

export function getLanguage(): Language {
  return currentLang;
}

export function t(key: string): string {
  return translations[currentLang]?.[key] ?? key;
}

export function subscribeToLanguage(fn: (lang: Language) => void) {
  listeners.push(fn);
  return () => {
    const idx = listeners.indexOf(fn);
    if (idx >= 0) listeners.splice(idx, 1);
  };
}

export function initLanguage(): Language {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("lang") as Language | null;
    if (stored === "es" || stored === "en") {
      currentLang = stored;
    }
  }
  return currentLang;
}
