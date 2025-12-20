"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from "recharts"
import type { TimelineDataPoint } from "@/lib/types"
import { AlertTriangle, Lightbulb } from "lucide-react"

interface QualityTimelineProps {
  data: TimelineDataPoint[]
}

export function QualityTimeline({ data }: QualityTimelineProps) {
  const chartData = data.map((d) => ({
    time: d.timestamp.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    mos: d.mos,
    jitter: d.jitter,
    latency: d.latency,
    droppedRate: d.droppedRate,
  }))

  // Get insights from data
  const insights = data.filter((d) => d.insight).slice(-5)

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <span>Call Quality Timeline</span>
          <Badge variant="outline" className="ml-auto text-xs border-primary/30 text-primary">
            Last 60 minutes
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* MOS Chart */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">MOS Score</p>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="time"
                stroke="var(--muted-foreground)"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                domain={[2.5, 5]}
                stroke="var(--muted-foreground)"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  color: "var(--foreground)",
                }}
              />
              <ReferenceLine
                y={3.5}
                stroke="var(--warning)"
                strokeDasharray="5 5"
                label={{
                  value: "Min Threshold",
                  position: "right",
                  fill: "var(--warning)",
                  fontSize: 10,
                }}
              />
              <Line type="monotone" dataKey="mos" stroke="var(--chart-1)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Jitter & Latency Chart */}
        <div>
          <div className="flex items-center gap-4 mb-2">
            <p className="text-sm text-muted-foreground">Jitter & Latency</p>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[var(--chart-3)]" />
                <span className="text-muted-foreground">Jitter</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[var(--chart-4)]" />
                <span className="text-muted-foreground">Latency</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="time"
                stroke="var(--muted-foreground)"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
              />
              <YAxis stroke="var(--muted-foreground)" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  color: "var(--foreground)",
                }}
              />
              <Line type="monotone" dataKey="jitter" stroke="var(--chart-3)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="latency" stroke="var(--chart-4)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* AI Insights */}
        {insights.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lightbulb className="h-4 w-4 text-primary" />
              <span>AI Insights</span>
            </div>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {insights.map((insight, index) => (
                <div key={index} className="flex items-start gap-2 p-2 bg-secondary/30 rounded-lg text-sm">
                  <AlertTriangle className="h-4 w-4 text-[var(--warning)] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-foreground">{insight.insight}</p>
                    <p className="text-xs text-muted-foreground">{insight.timestamp.toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
