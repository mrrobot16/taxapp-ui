import { NextRequest } from "next/server";
import {
  API_ROUTES,
  BACKEND_UNREACHABLE_ERROR_MESSAGE,
  envConfig,
  HTTP_STATUS_SERVICE_UNAVAILABLE,
} from "@/config";
import { toAuthUser, verifySessionFromCookies } from "@/lib/auth/session";

const BACKEND_URL = envConfig.backendUrl;

export async function POST(req: NextRequest) {
  const session = await verifySessionFromCookies();
  if (!session) {
    return new Response(
      JSON.stringify({ error: "Authentication required." }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const user = toAuthUser(session);
  const body = await req.json();

  let upstream: Response;
  try {
    upstream = await fetch(`${BACKEND_URL}${API_ROUTES.chat}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-User-Uid": user.uid,
        "X-Auth-User-Email": user.email ?? "",
        "X-Auth-User-Name": user.name ?? "",
      },
      body: JSON.stringify(body),
    });
  } catch (error: unknown | Error) {
    console.log("Error fetching chat", error instanceof Error ? error.message : "Unknown error");
    return new Response(
      JSON.stringify({ error: BACKEND_UNREACHABLE_ERROR_MESSAGE }),
      { status: HTTP_STATUS_SERVICE_UNAVAILABLE, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!upstream.ok) {
    const text = await upstream.text();
    return new Response(text, {
      status: upstream.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Stream SSE response straight back to the browser
  return new Response(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
