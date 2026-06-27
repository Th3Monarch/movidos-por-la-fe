"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Language } from "@/lib/types";
import { setLanguage, getLanguage, t as translate, initLanguage } from "@/lib/i18n";

interface LangCtx {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: string) => string;
}

const LangContext = createContext<LangCtx>({
  lang: "es",
  setLang: () => {},
  t: translate,
});

export function useLang() {
  return useContext(LangContext);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("es");

  useEffect(() => {
    setLangState(initLanguage());
  }, []);

  const handleSetLang = (l: Language) => {
    setLanguage(l);
    setLangState(l);
  };

  const tFn = (key: string) => {
    const es = require("@/i18n/es.json");
    const en = require("@/i18n/en.json");
    const dict = lang === "es" ? es : en;
    return dict[key] ?? key;
  };

  return (
    <LangContext.Provider value={{ lang, setLang: handleSetLang, t: tFn }}>
      {children}
    </LangContext.Provider>
  );
}
