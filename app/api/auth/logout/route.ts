import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getFirebaseAdminAuth } from "@/lib/firebase/admin";
import { getSessionCookieConfig, verifySessionFromCookies } from "@/lib/auth/session";

export async function POST() {
  const decoded = await verifySessionFromCookies();
  const { name } = getSessionCookieConfig();
  const cookieStore = await cookies();

  cookieStore.delete(name);

  if (decoded) {
    try {
      const auth = getFirebaseAdminAuth();
      await auth.revokeRefreshTokens(decoded.uid);
    } catch {
      // Best effort; cookie is already removed.
    }
  }

  return NextResponse.json({ ok: true });
}
