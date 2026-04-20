import { NextRequest } from "next/server";
import {
  API_ROUTES,
  BACKEND_UNREACHABLE_ERROR_MESSAGE,
  envConfig,
  HTTP_STATUS_SERVICE_UNAVAILABLE,
} from "@/config";

const BACKEND_URL = envConfig.backendUrl;

export async function POST(req: NextRequest) {
  console.log('--------------------------------')
  console.log(`${BACKEND_URL}${API_ROUTES.chat}`)
  console.log('--------------------------------')
  const body = await req.json();

  let upstream: Response;
  try {
    upstream = await fetch(`${BACKEND_URL}${API_ROUTES.chat}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
