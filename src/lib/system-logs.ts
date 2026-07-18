// In-memory log storage (for production, use a proper logging system)
const applicationLogs: Array<{
  timestamp: number;
  level: "info" | "warn" | "error";
  message: string;
}> = new Array(500);

// Maximum number of logs to keep in memory
const MAX_LOGS = 500;
let head = 0;
let size = 0;

// Helper function to add logs (O(1) insertion via ring buffer)
export function addLog(level: "info" | "warn" | "error", message: string) {
  applicationLogs[head] = {
    timestamp: Date.now(),
    level,
    message,
  };
  head = (head + 1) % MAX_LOGS;
  if (size < MAX_LOGS) {
    size++;
  }
}

// Initialize with startup log
addLog("info", "System logging initialized");

// Helper function to get logs in chronological order
export function getLogs() {
  if (size < MAX_LOGS) {
    return applicationLogs.slice(0, size);
  }
  // If buffer is full, the oldest log is at `head`, and the newest is at `head - 1`
  return [
    ...applicationLogs.slice(head, MAX_LOGS),
    ...applicationLogs.slice(0, head),
  ];
}
