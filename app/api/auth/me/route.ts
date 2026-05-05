import { NextResponse } from "next/server";

import { toAuthUser, verifySessionFromCookies } from "@/lib/auth/session";

export async function GET() {
  const decoded = await verifySessionFromCookies();
  if (!decoded) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: toAuthUser(decoded),
  });
}
