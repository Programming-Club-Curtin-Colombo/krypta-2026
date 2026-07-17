import { NextRequest, NextResponse } from "next/server";

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

// Maximum number of logs to keep in memory
const MAX_LOGS = 1000;

// Initialize with some sample logs
applicationLogs.push(
  { timestamp: Date.now() - 3600000, level: "info", message: "Server started successfully" },
  { timestamp: Date.now() - 3000000, level: "info", message: "Database connection established" },
  { timestamp: Date.now() - 2400000, level: "warn", message: "High memory usage detected: 85%" },
  { timestamp: Date.now() - 1800000, level: "info", message: "User authentication system active" },
  { timestamp: Date.now() - 1200000, level: "error", message: "Failed to connect to external API: timeout" },
  { timestamp: Date.now() - 600000, level: "info", message: "Cache cleared successfully" },
  { timestamp: Date.now() - 300000, level: "info", message: "Scheduled backup completed" },
  { timestamp: Date.now() - 60000, level: "warn", message: "Rate limit threshold reached for IP 192.168.1.100" },
);

export async function GET(request: NextRequest) {
  // Check authentication
  if (!isAuthenticated(request)) {
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
