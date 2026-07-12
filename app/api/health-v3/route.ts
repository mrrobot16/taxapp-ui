import { NextResponse } from "next/server";

import {
  API_ROUTES,
  envConfig,
} from "@/config";

const BACKEND_URL = envConfig.backendUrl;
export async function GET() {
  try {
    console.log('--------------------------------')
    console.log(`${BACKEND_URL}${API_ROUTES.healthV3}`)
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
