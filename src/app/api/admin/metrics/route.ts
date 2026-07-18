import { NextRequest, NextResponse } from "next/server";
import os from "os";
import { logger } from "@/lib/logger";

function isAuthenticated(request: NextRequest): boolean {
  const sessionCookie = request.cookies.get("admin-session");
  return sessionCookie?.value === "active";
}

// Simple in-memory cache to avoid excessive system calls
let cachedMetrics: {
  cpu: { usage: number; cores: number };
  memory: { used: number; total: number; percentage: number };
  uptime: number;
  timestamp: number;
} | null = null;
const CACHE_TTL = 10000; // 10 seconds (increased from 5s to reduce CPU load)

function getCpuUsage(): Promise<number> {
  const cpus = os.cpus();
  const numCpus = cpus.length;
  const startIdle: number[] = [];
  const startTotal: number[] = [];

  // Initialize start measurements
  for (let i = 0; i < numCpus; i++) {
    const times = cpus[i]?.times;
    if (times) {
      startIdle[i] = times.idle;
      startTotal[i] = (times.user || 0) + (times.nice || 0) + (times.sys || 0) + times.idle + (times.irq || 0);
    } else {
      startIdle[i] = 0;
      startTotal[i] = 0;
    }
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      let totalIdle = 0;
      let total = 0;

      for (let i = 0; i < numCpus; i++) {
        const times = cpus[i]?.times;
        if (times) {
          const endIdle = times.idle;
          const endTotal = (times.user || 0) + (times.nice || 0) + (times.sys || 0) + times.idle + (times.irq || 0);

          const idleDiff = endIdle - (startIdle[i] || 0);
          const totalDiff = endTotal - (startTotal[i] || 0);

          totalIdle += idleDiff;
          total += totalDiff;
        }
      }

      const usage = total > 0 ? 100 - (totalIdle / total) * 100 : 0;
      resolve(usage);
    }, 50);
  });
}

function getMemoryUsage() {
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  const percentage = (usedMem / totalMem) * 100;

  return {
    used: usedMem,
    total: totalMem,
    percentage,
  };
}

export async function GET(request: NextRequest) {
  // Check authentication
  if (!isAuthenticated(request)) {
    logger.warn("Unauthorized metrics access attempt");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = Date.now();

    // Return cached metrics if still valid
    if (cachedMetrics && now - cachedMetrics.timestamp < CACHE_TTL) {
      return NextResponse.json(cachedMetrics);
    }

    // Get CPU usage (async)
    const cpuUsage = await getCpuUsage();
    const cpuCores = os.cpus().length;

    // Get memory usage
    const memory = getMemoryUsage();

    // Get uptime
    const uptime = process.uptime();

    cachedMetrics = {
      cpu: {
        usage: cpuUsage as number,
        cores: cpuCores,
      },
      memory,
      uptime,
      timestamp: now,
    };

    return NextResponse.json(cachedMetrics);
  } catch (error) {
    logger.error("Failed to fetch system metrics", { error: error instanceof Error ? error.message : String(error) });
    return NextResponse.json(
      { error: "Failed to fetch system metrics" },
      { status: 500 }
    );
  }
}
