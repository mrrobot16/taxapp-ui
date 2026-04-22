import { NextResponse } from "next/server";

import {
  API_ROUTES,
  envConfig,
  HTTP_STATUS_SERVICE_UNAVAILABLE,
} from "@/config";

const BACKEND_URL = envConfig.backendUrl;
export async function GET() {
  try {
    console.log('--------------------------------')
    console.log(`${BACKEND_URL}${API_ROUTES.health}`)
    console.log('--------------------------------')
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
