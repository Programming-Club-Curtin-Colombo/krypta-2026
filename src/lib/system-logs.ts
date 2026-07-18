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

// Helper function to get logs (for internal use)
export function getLogs() {
  return [...applicationLogs];
}
