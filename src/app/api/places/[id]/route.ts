import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const ADMIN_SECRET = process.env.ADMIN_SECRET || "admin123";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const auth = request.headers.get("x-admin-secret");
  if (auth !== ADMIN_SECRET) {
    return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { error } = await createClient(supabaseUrl, supabaseKey)
      .from("places")
      .update(body)
      .eq("id", id);

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const auth = request.headers.get("x-admin-secret");
  if (auth !== ADMIN_SECRET) {
    return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  }

  try {
    const { error } = await createClient(supabaseUrl, supabaseKey)
      .from("places")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
