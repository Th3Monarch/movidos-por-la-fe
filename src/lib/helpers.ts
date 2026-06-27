export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("es-VE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getUrgencyColor(urgency: string): string {
  switch (urgency) {
    case "alta":
      return "bg-red-500";
    case "media":
      return "bg-yellow-500";
    case "baja":
      return "bg-green-500";
    default:
      return "bg-gray-400";
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "activo":
      return "bg-red-100 text-red-800 border-red-200";
    case "en_proceso":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "resuelto":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

export const WORK_STATES = [
  "Distrito Capital",
  "Miranda",
  "La Guaira",
];

export const WORK_CITIES: Record<string, string[]> = {
  "Distrito Capital": ["Caracas (Catia)", "Caracas (Centro)", "Caracas (Este)", "Caracas (Oeste)", "Caracas (Sur)"],
  "Miranda": ["Baruta", "Chacao", "El Hatillo", "Los Teques", "Petare", "Sucre", "Otro"],
  "La Guaira": ["Catia La Mar", "La Guaira", "Maiquetía", "Otro"],
};
