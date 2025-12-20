"use client"

import { useState, useEffect, useCallback } from "react"
import { Header } from "@/components/dashboard/header"
import { PerformanceOverview } from "@/components/dashboard/performance-overview"
import { CallVolumeChart } from "@/components/dashboard/call-volume-chart"
import { TowerMap } from "@/components/dashboard/tower-map"
import { QualityTimeline } from "@/components/dashboard/quality-timeline"
import { CallSimulator } from "@/components/dashboard/call-simulator"
import { generateCallMetrics, towers, generateTimelineData } from "@/lib/mock-data"
import type { CallMetrics, TimelineDataPoint, FilterState } from "@/lib/types"

export default function Dashboard() {
  const [metrics, setMetrics] = useState<CallMetrics[]>([])
  const [timelineData, setTimelineData] = useState<TimelineDataPoint[]>([])
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [filters, setFilters] = useState<FilterState>({
    region: "all",
    timeRange: "24h",
    technology: "all",
  })

  const refreshData = useCallback(() => {
    setMetrics(generateCallMetrics())
    setTimelineData(generateTimelineData())
    setLastUpdated(new Date())
  }, [])

  useEffect(() => {
    refreshData()
    // Auto-refresh every 30 seconds
    const interval = setInterval(refreshData, 30000)
    return () => clearInterval(interval)
  }, [refreshData])

  // Filter towers based on selected filters
  const filteredTowers = towers.filter((tower) => {
    if (filters.region !== "all" && tower.region !== filters.region) return false
    if (filters.technology !== "all" && tower.technology !== filters.technology) return false
    return true
  })

  if (metrics.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header filters={filters} onFilterChange={setFilters} onRefresh={refreshData} lastUpdated={lastUpdated} />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Performance Overview Cards */}
        <section>
          <PerformanceOverview metrics={metrics} />
        </section>

        {/* Charts Row */}
        <section className="grid lg:grid-cols-2 gap-6">
          <CallVolumeChart metrics={metrics} />
          <QualityTimeline data={timelineData} />
        </section>

        {/* Tower Map & Simulator */}
        <section className="grid lg:grid-cols-2 gap-6">
          <TowerMap towers={filteredTowers} />
          <CallSimulator />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          Call Quality Intelligence Dashboard • Simulated Data for Demonstration
        </div>
      </footer>
    </div>
  )
}
