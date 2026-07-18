"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Cpu, MemoryStick, Activity, Shield, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface SystemMetrics {
  cpu: {
    usage: number;
    cores: number;
  };
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
  uptime: number;
  timestamp: number;
}

interface LogEntry {
  timestamp: number;
  level: "info" | "warn" | "error";
  message: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("admin-auth") === "true";
    }
    return false;
  });
  const [pemContent, setPemContent] = useState("");
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPolling, setIsPolling] = useState(false);
  const hasFetchedInitial = useRef(false);

  const fetchMetrics = useCallback(async () => {
    if (isPolling) return; // Prevent concurrent requests
    setIsPolling(true);

    try {
      const response = await fetch("/api/admin/metrics");
      if (response.ok) {
        const data = await response.json();
        setMetrics(data);
      }
    } catch (err) {
      console.error("Failed to fetch metrics:", err);
    } finally {
      setIsPolling(false);
    }
  }, [isPolling]);

  const fetchLogs = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/system-logs");
      if (response.ok) {
        const data = await response.json();
        setLogs(data.logs || []);
      }
    } catch (err) {
      console.error("Failed to fetch logs:", err);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pem: pemContent }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Authentication failed");
      }

      const data = await response.json();
      if (data.success) {
        setIsAuthenticated(true);
        localStorage.setItem("admin-auth", "true");
        fetchMetrics();
        fetchLogs();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPemContent("");
    setMetrics(null);
    setLogs([]);
    localStorage.removeItem("admin-auth");
  };

  useEffect(() => {
    if (isAuthenticated && !hasFetchedInitial.current) {
      fetchMetrics();
      fetchLogs();
      hasFetchedInitial.current = true;
    }

    const interval = setInterval(() => {
      if (isAuthenticated && !isPolling) {
        fetchMetrics();
      }
    }, 30000); // Update metrics every 30 seconds (reduced from 10s to save resources)

    return () => clearInterval(interval);
  }, [isAuthenticated, isPolling, fetchMetrics, fetchLogs]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-full bg-[var(--color-primary)]/10">
                <Shield className="h-6 w-6 text-[var(--color-primary)]" />
              </div>
              <h1 className="text-2xl font-bold text-[var(--color-foreground)]">
                Admin Access
              </h1>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="pem"
                  className="block text-sm font-medium text-[var(--color-foreground)] mb-2"
                >
                  PEM File Content
                </label>
                <textarea
                  id="pem"
                  value={pemContent}
                  onChange={(e) => setPemContent(e.target.value)}
                  placeholder="Paste your PEM file content here..."
                  className={cn(
                    "w-full h-32 px-4 py-3 rounded-lg",
                    "bg-[var(--color-surface)] border border-[var(--color-border)]",
                    "text-[var(--color-foreground)] placeholder:text-[var(--color-foreground-subtle)]",
                    "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent",
                    "resize-none font-mono text-sm"
                  )}
                  required
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="text-sm text-red-500">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={cn(
                  "w-full px-4 py-3 rounded-lg font-semibold",
                  "bg-[var(--color-primary)] text-white",
                  "hover:bg-[var(--color-primary-hover)]",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "transition-colors"
                )}
              >
                {loading ? "Verifying..." : "Access Admin Panel"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[var(--color-foreground)]">
            System Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg",
              "bg-[var(--color-surface)] border border-[var(--color-border)]",
              "text-[var(--color-foreground)] hover:bg-[var(--color-surface-2)]",
              "transition-colors"
            )}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Cpu className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="font-semibold text-[var(--color-foreground)]">
                CPU Usage
              </h3>
            </div>
            <p className="text-3xl font-bold text-[var(--color-foreground)]">
              {metrics?.cpu.usage.toFixed(1)}%
            </p>
            <p className="text-sm text-[var(--color-foreground-subtle)] mt-1">
              {metrics?.cpu.cores} cores
            </p>
          </div>

          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-green-500/10">
                <MemoryStick className="h-5 w-5 text-green-500" />
              </div>
              <h3 className="font-semibold text-[var(--color-foreground)]">
                Memory
              </h3>
            </div>
            <p className="text-3xl font-bold text-[var(--color-foreground)]">
              {metrics?.memory.percentage.toFixed(1)}%
            </p>
            <p className="text-sm text-[var(--color-foreground-subtle)] mt-1">
              {metrics?.memory.used ? (metrics.memory.used / 1024 / 1024 / 1024).toFixed(2) : "0"} GB /{" "}
              {metrics?.memory.total ? (metrics.memory.total / 1024 / 1024 / 1024).toFixed(2) : "0"} GB
            </p>
          </div>

          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Activity className="h-5 w-5 text-purple-500" />
              </div>
              <h3 className="font-semibold text-[var(--color-foreground)]">
                Uptime
              </h3>
            </div>
            <p className="text-3xl font-bold text-[var(--color-foreground)]">
              {metrics?.uptime ? Math.floor(metrics.uptime / 3600) : 0}h
            </p>
            <p className="text-sm text-[var(--color-foreground-subtle)] mt-1">
              {metrics?.uptime
                ? Math.floor((metrics.uptime % 3600) / 60)
                : 0}{" "}
              minutes
            </p>
          </div>

          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-orange-500/10">
                <Shield className="h-5 w-5 text-orange-500" />
              </div>
              <h3 className="font-semibold text-[var(--color-foreground)]">
                Status
              </h3>
            </div>
            <p className="text-3xl font-bold text-green-500">Healthy</p>
            <p className="text-sm text-[var(--color-foreground-subtle)] mt-1">
              All systems operational
            </p>
          </div>
        </div>

        {/* Logs Section */}
        <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-6">
          <h2 className="text-xl font-semibold text-[var(--color-foreground)] mb-4">
            System Logs
          </h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {logs.length === 0 ? (
              <p className="text-[var(--color-foreground-subtle)]">
                No logs available
              </p>
            ) : (
              logs.map((log, index) => (
                <div
                  key={index}
                  className={cn(
                    "p-3 rounded-lg font-mono text-sm",
                    log.level === "error" && "bg-red-500/10 border border-red-500/20",
                    log.level === "warn" && "bg-yellow-500/10 border border-yellow-500/20",
                    log.level === "info" && "bg-blue-500/10 border border-blue-500/20"
                  )}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-[var(--color-foreground-subtle)] shrink-0">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                    <span
                      className={cn(
                        "uppercase font-semibold shrink-0",
                        log.level === "error" && "text-red-500",
                        log.level === "warn" && "text-yellow-500",
                        log.level === "info" && "text-blue-500"
                      )}
                    >
                      [{log.level}]
                    </span>
                    <span className="text-[var(--color-foreground)]">
                      {log.message}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
