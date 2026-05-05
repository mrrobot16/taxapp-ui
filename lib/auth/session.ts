import "server-only";

import { cookies } from "next/headers";
import { DecodedIdToken } from "firebase-admin/auth";

import { getFirebaseAdminAuth } from "@/lib/firebase/admin";
import type { AuthUser } from "@/types";

const DEFAULT_SESSION_COOKIE_NAME = "taxapp_session";
const DEFAULT_SESSION_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 5; // 5 days

function getSessionCookieName(): string {
  return process.env.FIREBASE_SESSION_COOKIE_NAME || DEFAULT_SESSION_COOKIE_NAME;
}

function getSessionMaxAgeMs(): number {
  const raw = process.env.FIREBASE_SESSION_MAX_AGE_MS;
  if (!raw) return DEFAULT_SESSION_MAX_AGE_MS;

  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return DEFAULT_SESSION_MAX_AGE_MS;
  }

  return parsed;
}

export function getSessionCookieConfig() {
  const maxAgeMs = getSessionMaxAgeMs();

  return {
    name: getSessionCookieName(),
    maxAgeMs,
    maxAgeSeconds: Math.floor(maxAgeMs / 1000),
  };
}

export function toAuthUser(decoded: DecodedIdToken): AuthUser {
  return {
    uid: decoded.uid,
    email: decoded.email ?? null,
    name: decoded.name ?? null,
    picture: decoded.picture ?? null,
  };
}

export async function verifySessionFromCookies(): Promise<DecodedIdToken | null> {
  const cookieStore = await cookies();
  const { name } = getSessionCookieConfig();
  const sessionCookie = cookieStore.get(name)?.value;
  if (!sessionCookie) return null;

  try {
    const auth = getFirebaseAdminAuth();
    return await auth.verifySessionCookie(sessionCookie, true);
  } catch {
    return null;
  }
}
