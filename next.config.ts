import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // NOTE: Hides the Next.js on-screen dev indicator/devtools widget in development.
  devIndicators: false,
  turbopack: {
    resolveAlias: {
      // Turbopack currently can't resolve filesystem-absolute aliases here.
      // Use a project-relative specifier instead.
      "globals.css": "./app/globals.css",
    },
  },
};

export default nextConfig;
