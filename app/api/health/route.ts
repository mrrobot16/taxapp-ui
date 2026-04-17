import { NextResponse } from "next/server";
import {
  API_ROUTES,
  DEFAULT_BACKEND_URL,
  HTTP_STATUS_SERVICE_UNAVAILABLE,
} from "@/config/constants";

// Use 127.0.0.1 explicitly to avoid IPv6 resolution issues with localhost
const BACKEND_URL = process.env.BACKEND_URL ?? DEFAULT_BACKEND_URL;

export async function GET() {
  try {
    const response = await fetch(`${BACKEND_URL}${API_ROUTES.health}`, { cache: "no-store" });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("[health proxy] Could not reach backend:", error);
    return NextResponse.json(
      { status: "offline", doc_count: 0 },
      { status: HTTP_STATUS_SERVICE_UNAVAILABLE }
    );
  }
}
