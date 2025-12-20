"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { simulateCall } from "@/lib/mock-data"
import { Smartphone, Clock, MapPin, Wifi, Play, AlertCircle, CheckCircle, Gauge } from "lucide-react"

interface SimulatorResult {
  predictedReliability: number
  predictedMos: number
  predictedLatency: number
  predictedJitter: number
  recommendations: string[]
  riskLevel: "low" | "medium" | "high"
}

export function CallSimulator() {
  const [location, setLocation] = useState("")
  const [timeOfDay, setTimeOfDay] = useState("")
  const [deviceType, setDeviceType] = useState("")
  const [connectionType, setConnectionType] = useState("")
  const [result, setResult] = useState<SimulatorResult | null>(null)
  const [isSimulating, setIsSimulating] = useState(false)

  const handleSimulate = () => {
    if (!location || !timeOfDay || !deviceType || !connectionType) return

    setIsSimulating(true)
    // Simulate processing delay
    setTimeout(() => {
      const simResult = simulateCall({
        location,
        timeOfDay,
        deviceType,
        connectionType,
      })
      setResult(simResult)
      setIsSimulating(false)
    }, 800)
  }

  const riskColors = {
    low: "bg-[var(--success)]/20 text-[var(--success)] border-[var(--success)]/30",
    medium: "bg-[var(--warning)]/20 text-[var(--warning)] border-[var(--warning)]/30",
    high: "bg-[var(--critical)]/20 text-[var(--critical)] border-[var(--critical)]/30",
  }

  const getMosColor = (mos: number) => {
    if (mos >= 4) return "text-[var(--success)]"
    if (mos >= 3.5) return "text-[var(--warning)]"
    return "text-[var(--critical)]"
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Gauge className="h-5 w-5 text-primary" />
          Call Scenario Simulator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-foreground">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                Location
              </Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="bg-secondary/30 border-border text-foreground">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Toronto Downtown">Toronto Downtown</SelectItem>
                  <SelectItem value="Montreal Centre">Montreal Centre</SelectItem>
                  <SelectItem value="Vancouver">Vancouver</SelectItem>
                  <SelectItem value="Calgary">Calgary</SelectItem>
                  <SelectItem value="Ottawa">Ottawa</SelectItem>
                  <SelectItem value="Rural Ontario">Rural Ontario</SelectItem>
                  <SelectItem value="Rural Quebec">Rural Quebec</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-foreground">
                <Clock className="h-4 w-4 text-muted-foreground" />
                Time of Day
              </Label>
              <Select value={timeOfDay} onValueChange={setTimeOfDay}>
                <SelectTrigger className="bg-secondary/30 border-border text-foreground">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (6 AM - 12 PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12 PM - 5 PM)</SelectItem>
                  <SelectItem value="evening">Evening (5 PM - 9 PM)</SelectItem>
                  <SelectItem value="night">Night (9 PM - 6 AM)</SelectItem>
                  <SelectItem value="peak">Peak Hours (8-10 AM, 5-8 PM)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-foreground">
                <Smartphone className="h-4 w-4 text-muted-foreground" />
                Device Type
              </Label>
              <Select value={deviceType} onValueChange={setDeviceType}>
                <SelectTrigger className="bg-secondary/30 border-border text-foreground">
                  <SelectValue placeholder="Select device" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="smartphone">Modern Smartphone</SelectItem>
                  <SelectItem value="tablet">Tablet</SelectItem>
                  <SelectItem value="iot">IoT Device</SelectItem>
                  <SelectItem value="legacy">Legacy Device</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-foreground">
                <Wifi className="h-4 w-4 text-muted-foreground" />
                Connection Type
              </Label>
              <Select value={connectionType} onValueChange={setConnectionType}>
                <SelectTrigger className="bg-secondary/30 border-border text-foreground">
                  <SelectValue placeholder="Select connection" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5G">5G</SelectItem>
                  <SelectItem value="LTE">LTE</SelectItem>
                  <SelectItem value="VoLTE">VoLTE</SelectItem>
                  <SelectItem value="3G">3G</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleSimulate}
              disabled={!location || !timeOfDay || !deviceType || !connectionType || isSimulating}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isSimulating ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full" />
                  Simulating...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Run Simulation
                </>
              )}
            </Button>
          </div>

          {/* Results */}
          <div className="space-y-4">
            {result ? (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Prediction Results</h3>
                  <Badge variant="outline" className={cn(riskColors[result.riskLevel])}>
                    {result.riskLevel.toUpperCase()} RISK
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-secondary/30 rounded-lg">
                    <p className="text-xs text-muted-foreground">Reliability</p>
                    <p className="text-xl font-bold text-foreground">{result.predictedReliability.toFixed(1)}%</p>
                    <Progress value={result.predictedReliability} className="mt-2 h-1" />
                  </div>
                  <div className="p-3 bg-secondary/30 rounded-lg">
                    <p className="text-xs text-muted-foreground">Predicted MOS</p>
                    <p className={cn("text-xl font-bold", getMosColor(result.predictedMos))}>
                      {result.predictedMos.toFixed(2)}
                    </p>
                    <Progress value={(result.predictedMos / 5) * 100} className="mt-2 h-1" />
                  </div>
                  <div className="p-3 bg-secondary/30 rounded-lg">
                    <p className="text-xs text-muted-foreground">Est. Latency</p>
                    <p className="text-xl font-bold text-foreground">{result.predictedLatency.toFixed(0)}ms</p>
                  </div>
                  <div className="p-3 bg-secondary/30 rounded-lg">
                    <p className="text-xs text-muted-foreground">Est. Jitter</p>
                    <p className="text-xl font-bold text-foreground">{result.predictedJitter.toFixed(0)}ms</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Recommendations</p>
                  <div className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start gap-2 p-2 bg-secondary/30 rounded-lg text-sm">
                        {result.riskLevel === "low" ? (
                          <CheckCircle className="h-4 w-4 text-[var(--success)] shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-[var(--warning)] shrink-0 mt-0.5" />
                        )}
                        <span className="text-foreground">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-8 text-muted-foreground">
                <Gauge className="h-12 w-12 mb-2 opacity-30" />
                <p>Configure parameters and run simulation</p>
                <p className="text-xs mt-1">to see predicted call quality</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}