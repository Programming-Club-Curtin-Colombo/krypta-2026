import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("isDev:", isDev);

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Strips the X-Powered-By: Next.js response header.
  poweredByHeader: false,

  images: {
    unoptimized: true,
  },

  // Remove all console.* calls from the production bundle.
  ...(!isDev && {
    compiler: {
      removeConsole: true,
    },
  }),

  // Allow any LAN origin to connect to the dev server (e.g. mobile testing).
  // This is scoped strictly to development; production is unaffected.
  ...(isDev && {
    allowedDevOrigins: ["*", "*.ngrok-free.dev", "*.ngrok.io", "localhost"],
  }),
};

export default nextConfig;
