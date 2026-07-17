import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";

function isAuthenticated(request: NextRequest): boolean {
  const sessionCookie = request.cookies.get("admin-session");
  return sessionCookie?.value === "active";
}

// In-memory log storage (for production, use a proper logging system)
const applicationLogs: Array<{
  timestamp: number;
  level: "info" | "warn" | "error";
  message: string;
}> = [];

// Maximum number of logs to keep in memory (reduced from 1000 to save RAM)
const MAX_LOGS = 500;

// Initialize with startup log
applicationLogs.push({
  timestamp: Date.now(),
  level: "info",
  message: "System logging initialized",
});

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

    // Filter logs
    let filteredLogs = [...applicationLogs];

    if (level && (level === "info" || level === "warn" || level === "error")) {
      filteredLogs = filteredLogs.filter((log) => log.level === level);
    }

    // Sort by timestamp (newest first)
    filteredLogs.sort((a, b) => b.timestamp - a.timestamp);

    // Limit results
    const limitedLogs = filteredLogs.slice(0, limit);

    return NextResponse.json({ logs: limitedLogs, total: filteredLogs.length });
  } catch (error) {
    console.error("Failed to fetch logs:", error);
    return NextResponse.json(
      { error: "Failed to fetch system logs" },
      { status: 500 }
    );
  }
}

// Helper function to add logs (can be called from other parts of the app)
export function addLog(level: "info" | "warn" | "error", message: string) {
  applicationLogs.push({
    timestamp: Date.now(),
    level,
    message,
  });

  // Keep only the most recent logs
  if (applicationLogs.length > MAX_LOGS) {
    applicationLogs.shift();
  }
}
