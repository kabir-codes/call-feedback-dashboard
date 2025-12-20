"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Tower } from "@/lib/types"
import { MapPin, Signal, Users, Activity } from "lucide-react"
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

interface TowerMapProps {
  towers: Tower[]
}

export function TowerMap({ towers }: TowerMapProps) {
  const [selectedTower, setSelectedTower] = useState<Tower | null>(null)

  const congestionColors = {
    low: "bg-[var(--success)]",
    medium: "bg-[var(--warning)]",
    high: "bg-[var(--chart-5)]",
    critical: "bg-[var(--critical)]",
  }

  const congestionBadgeVariants = {
    low: "bg-[var(--success)]/20 text-[var(--success)] border-[var(--success)]/30",
    medium: "bg-[var(--warning)]/20 text-[var(--warning)] border-[var(--warning)]/30",
    high: "bg-[var(--chart-5)]/20 text-[var(--chart-5)] border-[var(--chart-5)]/30",
    critical: "bg-[var(--critical)]/20 text-[var(--critical)] border-[var(--critical)]/30",
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Tower Performance Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Tower Grid (simulated map) */}
          <div className="relative bg-secondary/30 rounded-lg p-4 min-h-[300px]">
            <div className="absolute inset-4 grid grid-cols-4 grid-rows-3 gap-2">
              {towers.map((tower, index) => (
                <button
                  key={tower.id}
                  onClick={() => setSelectedTower(tower)}
                  className={cn(
                    "relative flex flex-col items-center justify-center p-2 rounded-lg transition-all",
                    "hover:bg-secondary/50 cursor-pointer",
                    selectedTower?.id === tower.id && "ring-2 ring-primary bg-secondary/50",
                  )}
                  style={{
                    gridColumn: (index % 4) + 1,
                    gridRow: Math.floor(index / 4) + 1,
                  }}
                >
                  <div className={cn("w-3 h-3 rounded-full animate-pulse", congestionColors[tower.congestionLevel])} />
                  <span className="text-xs text-muted-foreground mt-1 truncate max-w-full">
                    {tower.name.split(" ")[0]}
                  </span>
                </button>
              ))}
            </div>
            {/* Legend */}
            <div className="absolute bottom-2 left-2 flex gap-3 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[var(--success)]" />
                <span className="text-muted-foreground">Low</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[var(--warning)]" />
                <span className="text-muted-foreground">Medium</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[var(--chart-5)]" />
                <span className="text-muted-foreground">High</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[var(--critical)]" />
                <span className="text-muted-foreground">Critical</span>
              </div>
            </div>
          </div>

          {/* Tower Details */}
          <div className="space-y-4">
            {selectedTower ? (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{selectedTower.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedTower.region} • {selectedTower.id}
                    </p>
                  </div>
                  <Badge variant="outline" className={cn(congestionBadgeVariants[selectedTower.congestionLevel])}>
                    {selectedTower.congestionLevel.toUpperCase()}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 p-3 bg-secondary/30 rounded-lg">
                    <Signal className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Avg MOS</p>
                      <p className="font-semibold text-foreground">{selectedTower.avgMos.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-secondary/30 rounded-lg">
                    <Users className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Active Calls</p>
                      <p className="font-semibold text-foreground">
                        {selectedTower.activeCalls} / {selectedTower.capacity}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-secondary/30 rounded-lg">
                    <Activity className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Technology</p>
                      <p className="font-semibold text-foreground">{selectedTower.technology}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-secondary/30 rounded-lg">
                    <MapPin className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Utilization</p>
                      <p className="font-semibold text-foreground">
                        {((selectedTower.activeCalls / selectedTower.capacity) * 100).toFixed(0)}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Performance Chart */}
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground mb-2">MOS History (12h)</p>
                  <ResponsiveContainer width="100%" height={100}>
                    <LineChart
                      data={selectedTower.performance.map((p) => ({
                        time: p.timestamp.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                        }),
                        mos: p.mos,
                      }))}
                    >
                      <XAxis
                        dataKey="time"
                        stroke="var(--muted-foreground)"
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        domain={[3, 5]}
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
                      <Line type="monotone" dataKey="mos" stroke="var(--chart-1)" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <MapPin className="h-12 w-12 mb-2 opacity-30" />
                <p>Select a tower to view details</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}