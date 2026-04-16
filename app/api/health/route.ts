import { NextResponse } from "next/server";
import {
  API_ROUTES,
  DEFAULT_BACKEND_URL,
  HTTP_STATUS_SERVICE_UNAVAILABLE,
} from "@/config";

// Use 127.0.0.1 explicitly to avoid IPv6 resolution issues with localhost
const BACKEND_URL = process.env.BACKEND_URL ?? DEFAULT_BACKEND_URL;

export async function GET() {
  console.log("BACKEND_URL", BACKEND_URL);
  try {
    const res = await fetch(`${BACKEND_URL}${API_ROUTES.health}`, { cache: "no-store" });
    const data = await res.json();
    return NextResponse.json({ status: "online", doc_count: 0 });
  } catch (err) {
    // console.error("[health proxy] Could not reach backend:", err);
    return NextResponse.json(
      { status: "offline", doc_count: 0 },
      { status: HTTP_STATUS_SERVICE_UNAVAILABLE }
    );
  }
}
