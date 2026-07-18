import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { getLogs } from "@/lib/system-logs";

function isAuthenticated(request: NextRequest): boolean {
  const sessionCookie = request.cookies.get("admin-session");
  return sessionCookie?.value === "active";
}

export async function GET(request: NextRequest) {
  // Check authentication
  if (!isAuthenticated(request)) {
    logger.warn("Unauthorized logs access attempt");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "100");
    const level = searchParams.get("level");

    // Get logs from storage
    let filteredLogs = getLogs();

    // Filter logs
    if (level && (level === "info" || level === "warn" || level === "error")) {
      filteredLogs = filteredLogs.filter((log) => log.level === level);
    }

    // Sort by timestamp (newest first)
    filteredLogs.sort((a, b) => b.timestamp - a.timestamp);

    // Limit results
    const limitedLogs = filteredLogs.slice(0, limit);

    return NextResponse.json({ logs: limitedLogs, total: filteredLogs.length });
  } catch (error) {
    logger.error("Failed to fetch logs:", { error: error instanceof Error ? error.message : String(error) });
    return NextResponse.json(
      { error: "Failed to fetch system logs" },
      { status: 500 }
    );
  }
}
