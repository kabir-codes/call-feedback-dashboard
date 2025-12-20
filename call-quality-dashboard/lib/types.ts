// Types for the Call Quality Intelligence Dashboard

export interface CallMetrics {
  timestamp: Date
  callSuccessRate: number
  droppedCallRate: number
  avgCallSetupTime: number // in milliseconds
  mosScore: number // 1-5 scale
  jitter: number // in ms
  latency: number // in ms
  totalCalls: number
  successfulCalls: number
  droppedCalls: number
}

export interface Tower {
  id: string
  name: string
  lat: number
  lng: number
  region: string
  avgMos: number
  congestionLevel: "low" | "medium" | "high" | "critical"
  activeCalls: number
  capacity: number
  technology: "5G" | "LTE" | "VoLTE"
  performance: TowerPerformance[]
}

export interface TowerPerformance {
  timestamp: Date
  mos: number
  congestion: number
  droppedCalls: number
  activeCalls: number
}

export interface TimelineDataPoint {
  timestamp: Date
  mos: number
  jitter: number
  latency: number
  droppedRate: number
  insight?: string
}

export interface SimulatorParams {
  location: string
  timeOfDay: "morning" | "afternoon" | "evening" | "night" | "peak"
  deviceType: "smartphone" | "tablet" | "iot" | "legacy"
  connectionType: "5G" | "LTE" | "VoLTE" | "3G"
}

export interface SimulatorResult {
  predictedReliability: number
  predictedMos: number
  predictedLatency: number
  predictedJitter: number
  recommendations: string[]
  riskLevel: "low" | "medium" | "high"
}

export interface FilterState {
  region: string
  timeRange: "1h" | "6h" | "12h" | "24h" | "7d"
  technology: "all" | "5G" | "LTE" | "VoLTE"
}
