-- Movidos por la Fe — Esquema de base de datos (Supabase)
-- Ejecuta esto en el SQL Editor de Supabase

-- Tabla principal de lugares que necesitan ayuda
CREATE TABLE places (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  state TEXT NOT NULL,
  city TEXT NOT NULL,
  address TEXT DEFAULT '',
  description TEXT DEFAULT '',
  help_types TEXT[] NOT NULL,
  urgency TEXT NOT NULL CHECK (urgency IN ('alta', 'media', 'baja')),
  status TEXT NOT NULL DEFAULT 'activo' CHECK (status IN ('activo', 'en_proceso', 'resuelto')),
  contact_name TEXT DEFAULT '',
  contact_phone TEXT DEFAULT '',
  photo_urls TEXT[] DEFAULT '{}',
  lat REAL,
  lng REAL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  reported_by TEXT DEFAULT ''
);

-- Índice para búsquedas rápidas
CREATE INDEX idx_places_state ON places (state);
CREATE INDEX idx_places_status ON places (status);
CREATE INDEX idx_places_urgency ON places (urgency);
CREATE INDEX idx_places_created_at ON places (created_at DESC);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar updated_at
CREATE TRIGGER trigger_places_updated_at
  BEFORE UPDATE ON places
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Políticas de seguridad (Row Level Security)
ALTER TABLE places ENABLE ROW LEVEL SECURITY;

-- Permitir lectura anónima
CREATE POLICY "Lectura pública"
  ON places FOR SELECT
  USING (true);

-- Permitir inserción anónima
CREATE POLICY "Inserción pública"
  ON places FOR INSERT
  WITH CHECK (true);

-- Permitir actualización anónima
CREATE POLICY "Actualización pública"
  ON places FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Permitir eliminación anónima
CREATE POLICY "Eliminación pública"
  ON places FOR DELETE
  USING (true);
