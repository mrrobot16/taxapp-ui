import type { NextConfig } from "next";

import { envConfig } from "@/config/env";

const nextConfig: NextConfig = {
  // NOTE: Hides the Next.js on-screen dev indicator/devtools widget in development.
  devIndicators: false,
  async rewrites() {
    return [
      {
        source: "/python-api/:path*",
        destination: `${envConfig.backendUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
