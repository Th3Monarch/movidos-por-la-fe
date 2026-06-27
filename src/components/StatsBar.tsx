"use client";

interface StatsBarProps {
  total: number;
  active: number;
  resolved: number;
  statesCount: number;
}

export default function StatsBar({ total, active, resolved, statesCount }: StatsBarProps) {
  const stats = [
    { value: total, label: "Lugares reportados", color: "text-gray-900" },
    { value: active, label: "Necesidades activas", color: "text-red-600" },
    { value: resolved, label: "Necesidades resueltas", color: "text-green-600" },
    { value: statesCount, label: "Zonas alcanzadas", color: "text-gray-900" },
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className={`text-3xl md:text-4xl font-bold ${s.color}`}>
                {s.value}
              </div>
              <div className="text-xs md:text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 text-center mt-4">
          Las cifras se actualizan en tiempo real a medida que recibimos nuevos reportes.
        </p>
      </div>
    </div>
  );
}
