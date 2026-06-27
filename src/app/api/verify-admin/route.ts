import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const ADMIN_SECRET = process.env.ADMIN_SECRET || "admin123";
  const { secret } = await request.json();
  return NextResponse.json({ ok: secret === ADMIN_SECRET });
}
