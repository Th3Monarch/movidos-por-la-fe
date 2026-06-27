"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Place } from "@/lib/types";
import { getStatusColor, formatDate } from "@/lib/helpers";

const ADMIN_SECRET = "admin123";

const statusLabels: Record<string, string> = {
  activo: "Activo",
  en_proceso: "En proceso",
  resuelto: "Resuelto",
};

export default function AdminPage() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [secret, setSecret] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authed) fetchPlaces();
  }, [authed]);

  async function fetchPlaces() {
    const { data } = await supabase
      .from("places")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setPlaces(data as Place[]);
    setLoading(false);
  }

  async function handleAction(id: string, action: "resolve" | "activate" | "delete") {
    if (action === "delete") {
      if (!confirm("¿Eliminar este reporte permanentemente?")) return;
    }

    const isDelete = action === "delete";
    const res = await fetch(`/api/places/${id}`, {
      method: isDelete ? "DELETE" : "PATCH",
      headers: {
        ...(isDelete ? {} : { "Content-Type": "application/json" }),
        "x-admin-secret": secret,
      },
      body: isDelete ? undefined : JSON.stringify({
        status: action === "resolve" ? "resuelto" : "activo",
      }),
    });

    const result = await res.json().catch(() => ({ ok: false, error: "Error de conexión" }));
    if (result.ok) {
      fetchPlaces();
    } else {
      alert("Error: " + (result.error || "desconocido"));
    }
  }

  if (!authed) {
    return (
      <div className="max-w-sm mx-auto px-4 py-20">
        <h1 className="text-2xl font-bold mb-4">Administración</h1>
        <div className="relative mb-3">
          <input
            type={showPwd ? "text" : "password"}
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Clave de administrador"
            className="w-full px-4 py-2 pr-10 border rounded-lg"
          />
          <button
            type="button"
            onClick={() => setShowPwd(!showPwd)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPwd ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>
        <button
          onClick={async () => {
            setError("");
            setChecking(true);
            const res = await fetch("/api/verify-admin", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ secret }),
            });
            const data = await res.json();
            setChecking(false);
            if (data.ok) {
              setAuthed(true);
            } else {
              setError("Clave incorrecta");
            }
          }}
          disabled={checking}
          className="w-full bg-gray-900 text-white py-2 rounded-lg font-semibold hover:bg-gray-800 disabled:bg-gray-400"
        >
          {checking ? "Verificando..." : "Entrar"}
        </button>
        {error && <p className="text-red-600 text-sm mt-2 text-center">{error}</p>}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Administrar reportes</h1>
        <span className="text-sm text-gray-500">{places.length} reportes</span>
      </div>

      {loading ? (
        <p className="text-gray-400">Cargando...</p>
      ) : places.length === 0 ? (
        <p className="text-gray-500">No hay reportes.</p>
      ) : (
        <div className="space-y-3">
          {places.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col sm:flex-row sm:items-center gap-3"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 truncate">{p.name}</h3>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${getStatusColor(p.status)}`}>
                    {statusLabels[p.status]}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                    {p.urgency === "alta" ? "🔴" : p.urgency === "media" ? "🟡" : "🟢"}
                  </span>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {p.city}, {p.state} — {formatDate(p.created_at)}
                </p>
                <p className="text-xs text-gray-400 truncate">{p.id}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                {p.status !== "resuelto" && (
                  <button
                    onClick={() => handleAction(p.id, "resolve")}
                    className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Resolver
                  </button>
                )}
                {p.status === "resuelto" && (
                  <button
                    onClick={() => handleAction(p.id, "activate")}
                    className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Reactivar
                  </button>
                )}
                <button
                  onClick={() => handleAction(p.id, "delete")}
                  className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
