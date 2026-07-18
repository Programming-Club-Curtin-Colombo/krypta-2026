import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { headers } from "next/headers";

export async function proxy(request: NextRequest) {
  const isDev = process.env.NODE_ENV === "development";

  if (isDev) {
    const h = await headers();

    // Get client IP from various headers (ngrok, proxies, etc.)
    const forwarded = h.get("x-forwarded-for");
    const realIP = h.get("x-real-ip");
    const cfConnectingIP = h.get("cf-connecting-ip");
    const rawIP = forwarded?.split(",")[0] || realIP || cfConnectingIP || "unknown";

    // Convert IPv4-mapped IPv6 addresses to IPv4 format
    // e.g., ::ffff:127.0.0.1 → 127.0.0.1
    let clientIP = rawIP;
    if (rawIP.startsWith("::ffff:")) {
      clientIP = rawIP.replace("::ffff:", "");
    }

    // Detect IP version
    const isIPv6 = clientIP.includes(":");
    const ipVersion = isIPv6 ? "IPv6" : "IPv4";

    // Filter out health check/monitoring requests to reduce log spam
    const userAgent = h.get("user-agent") || "";
    const isHealthCheck = userAgent.includes("axios") || userAgent.includes("curl") || userAgent.includes("wget");

    // Skip logging for health checks from localhost
    if (isHealthCheck && (clientIP === "::1" || clientIP === "127.0.0.1")) {
      return NextResponse.next();
    }

    // Log request details with client IP and version
    console.log(`[${new Date().toISOString()}] ${request.method} ${request.url}`);
    console.log(`  Client IP (${ipVersion}): ${clientIP}`);
    console.log(`  User-Agent: ${userAgent}`);
    console.log(`  Referer: ${h.get("referer") || "none"}`);
    console.log(`  Forwarded-For: ${forwarded}`);
    console.log(`  Real-IP: ${realIP}`);
    console.log(`  Conn-IP: ${cfConnectingIP}`);
    console.log(`  Forwarded-Proto: ${h.get("x-forwarded-proto")}`);
    console.log(`  Forwarded-Host: ${h.get("x-forwarded-host")}`);
    console.log("---");
  }

  return NextResponse.next();
}

// Configure which paths the proxy should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
