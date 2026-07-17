import { NextRequest, NextResponse } from "next/server";
import os from "os";

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
const CACHE_TTL = 2000; // 2 seconds

function getCpuUsage(): number {
  const cpus = os.cpus();
  const startMeasure = cpus.map((cpu) => ({
    idle: cpu.times.idle,
    total: Object.values(cpu.times).reduce((acc, val) => acc + val, 0),
  }));

  // Wait a bit to get a delta
  return new Promise((resolve) => {
    setTimeout(() => {
      const endMeasure = os.cpus().map((cpu, i) => ({
        idle: cpu.times.idle,
        total: Object.values(cpu.times).reduce((acc, val) => acc + val, 0),
      }));

      let totalIdle = 0;
      let total = 0;

      endMeasure.forEach((end, i) => {
        const idleDiff = end.idle - startMeasure[i].idle;
        const totalDiff = end.total - startMeasure[i].total;
        totalIdle += idleDiff;
        total += totalDiff;
      });

      const usage = 100 - (totalIdle / total) * 100;
      resolve(usage);
    }, 100);
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
    console.error("Failed to fetch metrics:", error);
    return NextResponse.json(
      { error: "Failed to fetch system metrics" },
      { status: 500 }
    );
  }
}
