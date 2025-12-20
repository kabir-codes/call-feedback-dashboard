import type { CallMetrics, Tower, TimelineDataPoint, TowerPerformance } from "./types"

// Generate random number within range
const rand = (min: number, max: number) => Math.random() * (max - min) + min

// Generate hourly metrics for the past 24 hours
export function generateCallMetrics(): CallMetrics[] {
  const metrics: CallMetrics[] = []
  const now = new Date()

  for (let i = 24; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000)
    const hour = timestamp.getHours()

    // Peak hours have worse metrics (8-10 AM, 5-8 PM)
    const isPeakHour = (hour >= 8 && hour <= 10) || (hour >= 17 && hour <= 20)
    const peakModifier = isPeakHour ? 0.95 : 1

    const totalCalls = Math.floor(rand(5000, 15000) * (isPeakHour ? 1.5 : 1))
    const successRate = rand(96, 99.5) * peakModifier
    const successfulCalls = Math.floor(totalCalls * (successRate / 100))
    const droppedCalls = totalCalls - successfulCalls

    metrics.push({
      timestamp,
      callSuccessRate: successRate,
      droppedCallRate: 100 - successRate,
      avgCallSetupTime: rand(150, 400) / peakModifier,
      mosScore: rand(3.5, 4.8) * peakModifier,
      jitter: rand(5, 30) / peakModifier,
      latency: rand(20, 80) / peakModifier,
      totalCalls,
      successfulCalls,
      droppedCalls,
    })
  }

  return metrics
}

// Generate tower performance history
function generateTowerPerformance(): TowerPerformance[] {
  const performance: TowerPerformance[] = []
  const now = new Date()

  for (let i = 12; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000)
    performance.push({
      timestamp,
      mos: rand(3.2, 4.9),
      congestion: rand(20, 85),
      droppedCalls: Math.floor(rand(0, 15)),
      activeCalls: Math.floor(rand(50, 500)),
    })
  }

  return performance
}

// Cell towers across Canada (Bell network simulation)
export const towers: Tower[] = [
  {
    id: "TOR-001",
    name: "Toronto Downtown",
    lat: 43.6532,
    lng: -79.3832,
    region: "Ontario",
    avgMos: 4.2,
    congestionLevel: "medium",
    activeCalls: 342,
    capacity: 500,
    technology: "5G",
    performance: generateTowerPerformance(),
  },
  {
    id: "TOR-002",
    name: "Toronto Midtown",
    lat: 43.6896,
    lng: -79.3982,
    region: "Ontario",
    avgMos: 4.5,
    congestionLevel: "low",
    activeCalls: 189,
    capacity: 400,
    technology: "5G",
    performance: generateTowerPerformance(),
  },
  {
    id: "MTL-001",
    name: "Montreal Centre",
    lat: 45.5017,
    lng: -73.5673,
    region: "Quebec",
    avgMos: 4.1,
    congestionLevel: "high",
    activeCalls: 456,
    capacity: 500,
    technology: "LTE",
    performance: generateTowerPerformance(),
  },
  {
    id: "MTL-002",
    name: "Montreal East",
    lat: 45.5485,
    lng: -73.5493,
    region: "Quebec",
    avgMos: 3.8,
    congestionLevel: "critical",
    activeCalls: 478,
    capacity: 450,
    technology: "LTE",
    performance: generateTowerPerformance(),
  },
  {
    id: "VAN-001",
    name: "Vancouver Downtown",
    lat: 49.2827,
    lng: -123.1207,
    region: "British Columbia",
    avgMos: 4.4,
    congestionLevel: "low",
    activeCalls: 234,
    capacity: 450,
    technology: "5G",
    performance: generateTowerPerformance(),
  },
  {
    id: "CAL-001",
    name: "Calgary Central",
    lat: 51.0447,
    lng: -114.0719,
    region: "Alberta",
    avgMos: 4.3,
    congestionLevel: "medium",
    activeCalls: 267,
    capacity: 400,
    technology: "VoLTE",
    performance: generateTowerPerformance(),
  },
  {
    id: "OTT-001",
    name: "Ottawa Downtown",
    lat: 45.4215,
    lng: -75.6972,
    region: "Ontario",
    avgMos: 4.6,
    congestionLevel: "low",
    activeCalls: 156,
    capacity: 350,
    technology: "5G",
    performance: generateTowerPerformance(),
  },
  {
    id: "HAL-001",
    name: "Halifax Metro",
    lat: 44.6488,
    lng: -63.5752,
    region: "Nova Scotia",
    avgMos: 3.9,
    congestionLevel: "medium",
    activeCalls: 198,
    capacity: 300,
    technology: "LTE",
    performance: generateTowerPerformance(),
  },
]

// Generate timeline data with AI insights
export function generateTimelineData(): TimelineDataPoint[] {
  const data: TimelineDataPoint[] = []
  const now = new Date()

  for (let i = 60; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 1000) // minute by minute
    const hour = timestamp.getHours()
    const minute = timestamp.getMinutes()

    // Peak hours simulation
    const isPeakHour = (hour >= 8 && hour <= 10) || (hour >= 17 && hour <= 20)
    const peakModifier = isPeakHour ? 0.9 : 1

    const mos = rand(3.2, 4.8) * peakModifier
    const jitter = rand(5, 35) / peakModifier
    const latency = rand(20, 90) / peakModifier
    const droppedRate = rand(0.5, 4) / peakModifier

    // Generate AI insights for anomalies
    let insight: string | undefined

    if (mos < 3.5) {
      insight = `AI Insight: MOS dropped to ${mos.toFixed(1)} due to high network congestion`
    } else if (jitter > 28) {
      insight = `AI Insight: High jitter detected (${jitter.toFixed(0)}ms) - possible network instability`
    } else if (droppedRate > 3) {
      insight = `AI Insight: Elevated drop rate (${droppedRate.toFixed(1)}%) - recommend load balancing`
    } else if (isPeakHour && minute === 0) {
      insight = `AI Insight: Peak hour traffic detected - capacity at ${Math.floor(rand(75, 95))}%`
    }

    data.push({
      timestamp,
      mos,
      jitter,
      latency,
      droppedRate,
      insight,
    })
  }

  return data
}

// Simulator prediction logic (rule-based "AI")
export function simulateCall(params: {
  location: string
  timeOfDay: string
  deviceType: string
  connectionType: string
}): {
  predictedReliability: number
  predictedMos: number
  predictedLatency: number
  predictedJitter: number
  recommendations: string[]
  riskLevel: "low" | "medium" | "high"
} {
  let reliability = 98
  let mos = 4.5
  let latency = 30
  let jitter = 10
  const recommendations: string[] = []

  // Time of day impact
  if (params.timeOfDay === "peak") {
    reliability -= 3
    mos -= 0.5
    latency += 25
    jitter += 10
    recommendations.push("Consider scheduling calls outside peak hours (8-10 AM, 5-8 PM)")
  } else if (params.timeOfDay === "evening") {
    reliability -= 1.5
    mos -= 0.2
    latency += 10
    jitter += 5
  }

  // Connection type impact
  if (params.connectionType === "5G") {
    mos += 0.3
    latency -= 15
    jitter -= 3
  } else if (params.connectionType === "3G") {
    reliability -= 5
    mos -= 0.8
    latency += 40
    jitter += 15
    recommendations.push("Upgrade to LTE or 5G for better call quality")
  } else if (params.connectionType === "VoLTE") {
    mos += 0.2
    latency -= 10
  }

  // Device type impact
  if (params.deviceType === "legacy") {
    reliability -= 2
    mos -= 0.3
    recommendations.push("Consider upgrading to a newer device with HD Voice support")
  } else if (params.deviceType === "iot") {
    reliability -= 1
    mos -= 0.4
    latency += 20
  }

  // Location-based adjustments
  const urbanLocations = ["Toronto", "Montreal", "Vancouver", "Calgary", "Ottawa"]
  if (!urbanLocations.some((loc) => params.location.includes(loc))) {
    reliability -= 2
    mos -= 0.3
    latency += 15
    recommendations.push("Rural areas may experience reduced coverage - consider WiFi calling")
  }

  // Clamp values
  reliability = Math.max(85, Math.min(99.9, reliability))
  mos = Math.max(2.5, Math.min(5, mos))
  latency = Math.max(15, Math.min(150, latency))
  jitter = Math.max(3, Math.min(50, jitter))

  // Determine risk level
  let riskLevel: "low" | "medium" | "high" = "low"
  if (reliability < 92 || mos < 3.5) {
    riskLevel = "high"
  } else if (reliability < 96 || mos < 4) {
    riskLevel = "medium"
  }

  if (recommendations.length === 0) {
    recommendations.push("Current configuration is optimal for call quality")
  }

  return {
    predictedReliability: reliability,
    predictedMos: mos,
    predictedLatency: latency,
    predictedJitter: jitter,
    recommendations,
    riskLevel,
  }
}
