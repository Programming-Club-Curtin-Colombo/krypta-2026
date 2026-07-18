// ── Centralized Logging Utility ───────────────────────────────────────────────
// This module provides a centralized logging system that integrates with the
// admin panel's log viewer. All application logs are stored in memory and
// accessible via the admin dashboard.

import { addLog as addSystemLog } from "@/lib/system-logs";

export type LogLevel = "info" | "warn" | "error";

/**
 * Centralized logging function that adds logs to the admin panel.
 * 
 * @param level - Log level (info, warn, error)
 * @param message - Log message
 * @param context - Optional additional context data
 */
export function log(level: LogLevel, message: string, context?: Record<string, unknown>) {
  // Add to admin panel logs (only stringify context if it exists and not empty)
  const fullMessage = context && Object.keys(context).length > 0
    ? `${message} ${JSON.stringify(context)}`
    : message;
  addSystemLog(level, fullMessage);

  // Also log to console for development only
  if (process.env.NODE_ENV === "development") {
    const timestamp = new Date().toISOString();
    const consoleMessage = `[${timestamp}] [${level.toUpperCase()}] ${fullMessage}`;

    switch (level) {
      case "info":
        console.info(consoleMessage);
        break;
      case "warn":
        console.warn(consoleMessage);
        break;
      case "error":
        console.error(consoleMessage);
        break;
    }
  }
}

/**
 * Convenience functions for specific log levels
 */
export const logger = {
  info: (message: string, context?: Record<string, unknown>) => log("info", message, context),
  warn: (message: string, context?: Record<string, unknown>) => log("warn", message, context),
  error: (message: string, context?: Record<string, unknown>) => log("error", message, context),
};

/**
 * Log API request/response
 */
export function logApiRequest(
  method: string,
  path: string,
  statusCode: number,
  duration?: number
) {
  const level = statusCode >= 500 ? "error" : statusCode >= 400 ? "warn" : "info";
  const message = `${method} ${path} - ${statusCode}`;
  const context = duration ? { duration: `${duration}ms` } : undefined;
  log(level, message, context);
}

/**
 * Log authentication events
 */
export function logAuthEvent(event: "login" | "logout" | "failed_attempt", ip?: string) {
  const level = event === "failed_attempt" ? "warn" : "info";
  const message = `Auth event: ${event}`;
  const context = ip ? { ip } : undefined;
  log(level, message, context);
}

/**
 * Log system metrics events
 */
export function logSystemEvent(event: string, data?: Record<string, unknown>) {
  log("info", `System: ${event}`, data);
}
