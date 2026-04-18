import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Raise the dev-server proxy timeout to 120 s.
  // The local LLM (Llama 3.2 3B on RTX 3050) can take 40-60 s to generate
  // a full study schedule; the default 30 s proxy timeout kills the
  // connection before the response arrives, producing a 500 on the frontend.
  experimental: {
    proxyTimeout: 120_000,
  },

  async rewrites() {
    return [
      {
        // Proxy all /api/* calls from the Next.js dev server to the
        // FastAPI backend running on port 8000.  This eliminates CORS
        // entirely — the browser only ever talks to localhost:3000.
        source: "/api/:path*",
        destination: "http://localhost:8000/api/:path*",
      },
    ];
  },
};

export default nextConfig;
