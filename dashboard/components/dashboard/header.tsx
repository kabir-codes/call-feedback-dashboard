"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { FilterState } from "@/lib/types"
import { Phone, RefreshCw, Bell } from "lucide-react"

interface HeaderProps {
  filters: FilterState
  onFilterChange: (filters: FilterState) => void
  onRefresh: () => void
  lastUpdated: Date
}

export function Header({ filters, onFilterChange, onRefresh, lastUpdated }: HeaderProps) {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Call Quality Intelligence</h1>
              <p className="text-xs text-muted-foreground">Real-time Network Performance Dashboard</p>
            </div>
            <Badge variant="outline" className="ml-2 border-primary/30 text-primary hidden sm:inline-flex">
              LIVE
            </Badge>
          </div>

          {/* Filters & Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <Select value={filters.region} onValueChange={(value: any) => onFilterChange({ ...filters, region: value })}>
              <SelectTrigger className="w-[140px] bg-secondary/30 border-border text-foreground">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="Ontario">Ontario</SelectItem>
                <SelectItem value="Quebec">Quebec</SelectItem>
                <SelectItem value="British Columbia">British Columbia</SelectItem>
                <SelectItem value="Alberta">Alberta</SelectItem>
                <SelectItem value="Nova Scotia">Nova Scotia</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.timeRange}
              onValueChange={(value: string) => onFilterChange({ ...filters, timeRange: value as FilterState["timeRange"] })}
            >
              <SelectTrigger className="w-[130px] bg-secondary/30 border-border text-foreground">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Last 1 hour</SelectItem>
                <SelectItem value="6h">Last 6 hours</SelectItem>
                <SelectItem value="12h">Last 12 hours</SelectItem>
                <SelectItem value="24h">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.technology}
              onValueChange={(value: string) => onFilterChange({ ...filters, technology: value as FilterState["technology"] })}
            >
              <SelectTrigger className="w-[100px] bg-secondary/30 border-border text-foreground">
                <SelectValue placeholder="Tech" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tech</SelectItem>
                <SelectItem value="5G">5G</SelectItem>
                <SelectItem value="LTE">LTE</SelectItem>
                <SelectItem value="VoLTE">VoLTE</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={onRefresh}
                className="border-border bg-secondary/30 text-foreground hover:bg-secondary/50"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-border bg-secondary/30 text-foreground hover:bg-secondary/50 relative"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--critical)] rounded-full" />
              </Button>
            </div>

            <span className="text-xs text-muted-foreground hidden lg:inline">
              Updated {lastUpdated.toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}