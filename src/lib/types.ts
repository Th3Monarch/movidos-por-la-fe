export type HelpType =
  | "food"
  | "water"
  | "medicine"
  | "clothing"
  | "shelter"
  | "rescue"
  | "heavy_machinery"
  | "electricity"
  | "communications"
  | "other";

export type Urgency = "alta" | "media" | "baja";

export type PlaceStatus = "activo" | "en_proceso" | "resuelto";

export type Language = "es" | "en";

export interface Place {
  id: string;
  name: string;
  state: string;
  city: string;
  address: string;
  description: string;
  help_types: HelpType[];
  urgency: Urgency;
  status: PlaceStatus;
  contact_name: string;
  contact_phone: string;
  photo_urls: string[];
  lat: number | null;
  lng: number | null;
  created_at: string;
  updated_at: string;
  reported_by: string;
}

export interface PlaceFormData {
  name: string;
  state: string;
  city: string;
  address: string;
  description: string;
  help_types: HelpType[];
  urgency: Urgency;
  contact_name: string;
  contact_phone: string;
  photo_urls: string[];
  reported_by: string;
}
