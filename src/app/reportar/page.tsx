"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [locating, setLocating] = useState(false);
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
    lat: null as number | null,
    lng: null as number | null,
  });

  const handleHelpTypeToggle = (type: HelpType) => {
    setForm((prev) => ({
      ...prev,
      help_types: prev.help_types.includes(type)
        ? prev.help_types.filter((t) => t !== type)
        : [...prev.help_types, type],
    }));
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError("Tu dispositivo no soporta geolocalización");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm((prev) => ({ ...prev, lat: pos.coords.latitude, lng: pos.coords.longitude }));
        setLocating(false);
      },
      () => {
        setError("No se pudo obtener la ubicación. Activa el GPS.");
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.state || !form.city || form.help_types.length === 0) {
      setError("Completa los campos obligatorios.");
      return;
    }
    setSubmitting(true);
    setError("");

    let uploadedPhotos: string[] = [];

    if (files.length > 0) {
      setUploading(true);
      for (const file of files) {
        const ext = file.name.split(".").pop();
        const path = `fotos/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;

        const { data, error: upErr } = await supabase.storage
          .from("reportes")
          .upload(path, file);

        if (upErr) {
          setError("Error al subir " + file.name);
          setSubmitting(false);
          setUploading(false);
          return;
        }

        const { data: publicUrl } = supabase.storage
          .from("reportes")
          .getPublicUrl(path);

        uploadedPhotos.push(publicUrl.publicUrl);
      }
      setUploading(false);
    }

    const res = await fetch("/api/reportar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        photo_urls: uploadedPhotos,
      }),
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

        <div className="flex gap-2 items-start">
          <div className="flex-1">
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
          <button
            type="button"
            onClick={handleGetLocation}
            disabled={locating}
            className="mt-5 px-3 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white text-sm rounded-lg transition-colors flex items-center gap-1.5"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {locating ? "..." : "GPS"}
          </button>
        </div>
        {form.lat && form.lng && (
          <p className="text-xs text-green-600">
            ✅ Ubicación: {form.lat.toFixed(5)}, {form.lng.toFixed(5)}
          </p>
        )}

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

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Fotos del lugar
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors w-full"
          >
            + Agregar fotos
          </button>
          {files.length > 0 && (
            <div className="mt-2 space-y-1">
              {files.map((f, i) => (
                <div key={i} className="flex items-center justify-between bg-gray-50 rounded px-3 py-1.5 text-xs">
                  <span className="truncate text-gray-600">{f.name}</span>
                  <button type="button" onClick={() => removeFile(i)} className="text-red-500 hover:text-red-700 ml-2 shrink-0">
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
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
          disabled={submitting || uploading}
          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-xl transition-colors text-lg"
        >
          {uploading ? "Subiendo archivos..." : submitting ? t("form.submitting") : t("form.submit")}
        </button>
      </form>
    </div>
  );
}
