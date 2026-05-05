import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { getFirebaseAdminAuth } from "@/lib/firebase/admin";
import { getSessionCookieConfig } from "@/lib/auth/session";

type SessionRequestBody = {
  idToken?: string;
};

export async function POST(req: NextRequest) {
  let body: SessionRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body.idToken) {
    return NextResponse.json({ error: "Missing idToken." }, { status: 400 });
  }

  try {
    const auth = getFirebaseAdminAuth();
    const { name, maxAgeMs, maxAgeSeconds } = getSessionCookieConfig();
    await auth.verifyIdToken(body.idToken);
    const sessionCookie = await auth.createSessionCookie(body.idToken, { expiresIn: maxAgeMs });

    const cookieStore = await cookies();
    cookieStore.set(name, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: maxAgeSeconds,
      path: "/",
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not create session.";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
