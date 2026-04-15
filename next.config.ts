import type { NextConfig } from "next"

const isDev = process.env.NODE_ENV === "development"

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          ...(!isDev
            ? [
                {
                  key: "Content-Security-Policy",
                  value: [
                    "default-src 'self'",
                    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.tawk.to",
                    "style-src 'self' 'unsafe-inline' https://*.tawk.to",
                    "img-src 'self' data: https:",
                    "font-src 'self' https://fonts.gstatic.com https://*.tawk.to",
                    "connect-src 'self' https://*.tawk.to wss://*.tawk.to",
                    "media-src 'self'",
                    "frame-src https://*.tawk.to",
                    "frame-ancestors 'none'",
                  ].join("; "),
                },
              ]
            : []),
        ],
      },
    ]
  },
}

export default nextConfig
