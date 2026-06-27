"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/lib/LanguageProvider";
import { WORK_STATES, WORK_CITIES } from "@/lib/helpers";
import type { HelpType, Urgency } from "@/lib/types";

const HELP_TYPE_OPTIONS: { value: HelpType; labelKey: string }[] = [
  { value: "food", labelKey: "help_type.food" },
  { value: "water", labelKey: "help_type.water" },
  { value: "medicine", labelKey: "help_type.medicine" },
  { value: "clothing", labelKey: "help_type.clothing" },
  { value: "shelter", labelKey: "help_type.shelter" },
  { value: "rescue", labelKey: "help_type.rescue" },
  { value: "heavy_machinery", labelKey: "help_type.heavy_machinery" },
  { value: "electricity", labelKey: "help_type.electricity" },
  { value: "communications", labelKey: "help_type.communications" },
  { value: "other", labelKey: "help_type.other" },
];

const URGENCY_OPTIONS: { value: Urgency; labelKey: string }[] = [
  { value: "alta", labelKey: "urgency.alta" },
  { value: "media", labelKey: "urgency.media" },
  { value: "baja", labelKey: "urgency.baja" },
];

export default function ReportarPage() {
  const { t } = useLang();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    state: "",
    city: "",
    address: "",
    description: "",
    help_types: [] as HelpType[],
    urgency: "media" as Urgency,
    contact_name: "",
    contact_phone: "",
  });

  const handleHelpTypeToggle = (type: HelpType) => {
    setForm((prev) => ({
      ...prev,
      help_types: prev.help_types.includes(type)
        ? prev.help_types.filter((t) => t !== type)
        : [...prev.help_types, type],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.state || !form.city || form.help_types.length === 0) {
      setError("Completa los campos obligatorios.");
      return;
    }
    setSubmitting(true);
    setError("");

    const res = await fetch("/api/reportar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const result = await res.json();
    setSubmitting(false);

    if (!result.ok) {
      setError(result.error || "Ocurrió un error al enviar el reporte. Intenta de nuevo.");
    } else {
      setSuccess(true);
      setTimeout(() => router.push("/"), 2000);
    }
  };

  if (success) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t("form.success")}</h2>
        <p className="text-gray-500">Redirigiendo al inicio...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">{t("form.title")}</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            {t("form.name")} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder={t("form.name_placeholder")}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              {t("form.state")} <span className="text-red-500">*</span>
            </label>
            <select
              value={form.state}
              onChange={(e) => { setForm({ ...form, state: e.target.value, city: "" }) }}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              required
            >
              <option value="">Selecciona...</option>
              {WORK_STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              {t("form.city")} <span className="text-red-500">*</span>
            </label>
            <select
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              required
            >
              <option value="">Selecciona...</option>
              {form.state && WORK_CITIES[form.state]?.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            {t("form.address")}
          </label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            placeholder={t("form.address_placeholder")}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            {t("form.description")}
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder={t("form.description_placeholder")}
            rows={4}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t("form.help_types")} <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {HELP_TYPE_OPTIONS.map((opt) => {
              const selected = form.help_types.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleHelpTypeToggle(opt.value)}
                  className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                    selected
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {t(opt.labelKey)}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t("form.urgency")}
          </label>
          <div className="flex gap-2">
            {URGENCY_OPTIONS.map((opt) => {
              const selected = form.urgency === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setForm({ ...form, urgency: opt.value })}
                  className={`text-sm px-4 py-2 rounded-lg border transition-colors ${
                    selected
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {t(opt.labelKey)}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              {t("form.contact_name")}
            </label>
            <input
              type="text"
              value={form.contact_name}
              onChange={(e) => setForm({ ...form, contact_name: e.target.value })}
              placeholder={t("form.contact_name_placeholder")}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              {t("form.contact_phone")}
            </label>
            <input
              type="tel"
              value={form.contact_phone}
              onChange={(e) => setForm({ ...form, contact_phone: e.target.value })}
              placeholder={t("form.contact_phone_placeholder")}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-xl transition-colors text-lg"
        >
          {submitting ? t("form.submitting") : t("form.submit")}
        </button>
      </form>
    </div>
  );
}
