import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Environment variable containing the expected PEM content
// Set this in your .env.local or Vercel environment variables
const ADMIN_PEM_HASH = process.env.ADMIN_PEM_HASH;

// Simple in-memory rate limiting (for production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_ATTEMPTS = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX_ATTEMPTS) {
    return false;
  }

  record.count++;
  return true;
}

function hashPem(pemContent: string): string {
  // Normalize PEM content (remove whitespace, standardize line endings)
  const normalized = pemContent
    .replace(/\r\n/g, "\n")
    .replace(/\s+/g, " ")
    .trim();
  return crypto.createHash("sha256").update(normalized).digest("hex");
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";

    // Rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many authentication attempts. Please try again later." },
        { status: 429 }
      );
    }

    const { pem } = await request.json();

    if (!pem || typeof pem !== "string") {
      return NextResponse.json(
        { error: "PEM content is required" },
        { status: 400 }
      );
    }

    // Verify ADMIN_PEM_HASH is configured
    if (!ADMIN_PEM_HASH) {
      console.error("ADMIN_PEM_HASH environment variable is not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Hash the provided PEM and compare with expected hash
    const providedHash = hashPem(pem);

    if (providedHash !== ADMIN_PEM_HASH) {
      return NextResponse.json(
        { error: "Invalid PEM file" },
        { status: 401 }
      );
    }

    // Authentication successful - set session cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set("admin-session", "active", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });
    return response;
  } catch (error) {
    console.error("Authentication error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
