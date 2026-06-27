import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

function createSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return {
      from: () => ({
        select: () => Promise.resolve({ data: null, error: null }),
        insert: () => Promise.resolve({ data: null, error: null }),
        update: () => Promise.resolve({ data: null, error: null }),
        delete: () => Promise.resolve({ data: null, error: null }),
        eq: () => ({ single: () => Promise.resolve({ data: null, error: null }) }),
        order: () => Promise.resolve({ data: null, error: null }),
      }),
      channel: () => ({ on: () => ({ subscribe: () => {} }) }),
    } as unknown as ReturnType<typeof createClient>;
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = createSupabaseClient();
