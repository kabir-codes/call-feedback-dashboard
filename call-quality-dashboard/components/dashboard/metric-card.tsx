"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus, Phone, PhoneOff, Clock, Activity, Waves, Gauge } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string | number
  unit?: string
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  icon: "calls" | "dropped" | "setup" | "mos" | "jitter" | "latency"
  status?: "good" | "warning" | "critical"
}

const iconMap = {
  calls: Phone,
  dropped: PhoneOff,
  setup: Clock,
  mos: Gauge,
  jitter: Waves,
  latency: Activity,
}

export function MetricCard({ title, value, unit, trend, trendValue, icon, status = "good" }: MetricCardProps) {
  const Icon = iconMap[icon]

  const statusColors = {
    good: "text-[var(--success)]",
    warning: "text-[var(--warning)]",
    critical: "text-[var(--critical)]",
  }

  const trendColors = {
    up: "text-[var(--success)]",
    down: "text-[var(--critical)]",
    neutral: "text-muted-foreground",
  }

  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className={cn("h-4 w-4", statusColors[status])} />
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-foreground">{value}</span>
          {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
        </div>
        {trend && trendValue && (
          <div className={cn("flex items-center gap-1 mt-1 text-xs", trendColors[trend])}>
            <TrendIcon className="h-3 w-3" />
            <span>{trendValue}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
