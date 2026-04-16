import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // NOTE: Hides the Next.js on-screen dev indicator/devtools widget in development.
  devIndicators: false,
  async rewrites() {
    return [
      {
        source: "/python-api/:path*",
        destination: "http://localhost:8000/:path*",
      },
    ];
  },
};

export default nextConfig;
