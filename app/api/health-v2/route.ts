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
    return NextResponse.json({
      message: "online",
      status: 200
    });
  } catch (error) {
    console.error("[health proxy] Could not reach backend:", error);
    return NextResponse.json(
      { 
        message: "offline", 
        status: 500 
      }
    );
  }
}
