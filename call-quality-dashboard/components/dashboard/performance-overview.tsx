"use client"

import { useMemo } from "react"
import { MetricCard } from "./metric-card"
import type { CallMetrics } from "@/lib/types"

interface PerformanceOverviewProps {
  metrics: CallMetrics[]
}

export function PerformanceOverview({ metrics }: PerformanceOverviewProps) {
  const currentMetrics = metrics[metrics.length - 1]
  const previousMetrics = metrics[metrics.length - 2]

  const trends = useMemo(() => {
    if (!previousMetrics) return {}

    return {
      successRate:
        currentMetrics.callSuccessRate > previousMetrics.callSuccessRate
          ? "up"
          : currentMetrics.callSuccessRate < previousMetrics.callSuccessRate
            ? "down"
            : "neutral",
      droppedRate:
        currentMetrics.droppedCallRate < previousMetrics.droppedCallRate
          ? "up"
          : currentMetrics.droppedCallRate > previousMetrics.droppedCallRate
            ? "down"
            : "neutral",
      setupTime:
        currentMetrics.avgCallSetupTime < previousMetrics.avgCallSetupTime
          ? "up"
          : currentMetrics.avgCallSetupTime > previousMetrics.avgCallSetupTime
            ? "down"
            : "neutral",
      mos:
        currentMetrics.mosScore > previousMetrics.mosScore
          ? "up"
          : currentMetrics.mosScore < previousMetrics.mosScore
            ? "down"
            : "neutral",
      jitter:
        currentMetrics.jitter < previousMetrics.jitter
          ? "up"
          : currentMetrics.jitter > previousMetrics.jitter
            ? "down"
            : "neutral",
      latency:
        currentMetrics.latency < previousMetrics.latency
          ? "up"
          : currentMetrics.latency > previousMetrics.latency
            ? "down"
            : "neutral",
    }
  }, [currentMetrics, previousMetrics])

  const getStatus = (metric: string, value: number): "good" | "warning" | "critical" => {
    switch (metric) {
      case "successRate":
        return value >= 98 ? "good" : value >= 95 ? "warning" : "critical"
      case "droppedRate":
        return value <= 2 ? "good" : value <= 4 ? "warning" : "critical"
      case "setupTime":
        return value <= 250 ? "good" : value <= 400 ? "warning" : "critical"
      case "mos":
        return value >= 4 ? "good" : value >= 3.5 ? "warning" : "critical"
      case "jitter":
        return value <= 15 ? "good" : value <= 25 ? "warning" : "critical"
      case "latency":
        return value <= 50 ? "good" : value <= 80 ? "warning" : "critical"
      default:
        return "good"
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <MetricCard
        title="Call Success Rate"
        value={currentMetrics.callSuccessRate.toFixed(2)}
        unit="%"
        icon="calls"
        trend={trends.successRate as "up" | "down" | "neutral"}
        trendValue={`${Math.abs(currentMetrics.callSuccessRate - (previousMetrics?.callSuccessRate || 0)).toFixed(2)}% from last hour`}
        status={getStatus("successRate", currentMetrics.callSuccessRate)}
      />
      <MetricCard
        title="Dropped Call Rate"
        value={currentMetrics.droppedCallRate.toFixed(2)}
        unit="%"
        icon="dropped"
        trend={trends.droppedRate as "up" | "down" | "neutral"}
        trendValue={`${Math.abs(currentMetrics.droppedCallRate - (previousMetrics?.droppedCallRate || 0)).toFixed(2)}% from last hour`}
        status={getStatus("droppedRate", currentMetrics.droppedCallRate)}
      />
      <MetricCard
        title="Avg Setup Time"
        value={currentMetrics.avgCallSetupTime.toFixed(0)}
        unit="ms"
        icon="setup"
        trend={trends.setupTime as "up" | "down" | "neutral"}
        trendValue={`${Math.abs(currentMetrics.avgCallSetupTime - (previousMetrics?.avgCallSetupTime || 0)).toFixed(0)}ms from last hour`}
        status={getStatus("setupTime", currentMetrics.avgCallSetupTime)}
      />
      <MetricCard
        title="MOS Score"
        value={currentMetrics.mosScore.toFixed(2)}
        unit="/ 5"
        icon="mos"
        trend={trends.mos as "up" | "down" | "neutral"}
        trendValue={`${Math.abs(currentMetrics.mosScore - (previousMetrics?.mosScore || 0)).toFixed(2)} from last hour`}
        status={getStatus("mos", currentMetrics.mosScore)}
      />
      <MetricCard
        title="Network Jitter"
        value={currentMetrics.jitter.toFixed(1)}
        unit="ms"
        icon="jitter"
        trend={trends.jitter as "up" | "down" | "neutral"}
        trendValue={`${Math.abs(currentMetrics.jitter - (previousMetrics?.jitter || 0)).toFixed(1)}ms from last hour`}
        status={getStatus("jitter", currentMetrics.jitter)}
      />
      <MetricCard
        title="Latency"
        value={currentMetrics.latency.toFixed(1)}
        unit="ms"
        icon="latency"
        trend={trends.latency as "up" | "down" | "neutral"}
        trendValue={`${Math.abs(currentMetrics.latency - (previousMetrics?.latency || 0)).toFixed(1)}ms from last hour`}
        status={getStatus("latency", currentMetrics.latency)}
      />
    </div>
  )
}
