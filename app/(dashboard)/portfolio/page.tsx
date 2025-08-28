import React from "react"
import { AssetAllocationChart } from "@/components/portfolio/asset-allocation-chart"
import { HoldingsTable } from "@/components/portfolio/holdings-table"
import { PerformanceMetrics } from "@/components/portfolio/performance-metrics"
import { PieChart, Briefcase, TrendingUp } from "lucide-react"

export default function PortfolioPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="fade-in">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[var(--highlight)]/20 to-[var(--highlight)]/10 glow-cyan">
            <Briefcase className="h-8 w-8 text-[var(--highlight)]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2 bg-gradient-to-r from-foreground to-[var(--highlight)] bg-clip-text">
              Portfolio Overview
            </h1>
            <p className="text-lg text-muted-foreground font-medium">
              Track your investments, performance, and asset allocation
            </p>
          </div>
        </div>
      </header>

      {/* Performance Metrics */}
      <div className="slide-up">
        <PerformanceMetrics />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Asset Allocation Chart */}
        <div className="lg:col-span-1 slide-up" style={{ animationDelay: "0.2s" }}>
          <AssetAllocationChart />
        </div>

        {/* Holdings Table */}
        <div className="lg:col-span-2 slide-up" style={{ animationDelay: "0.4s" }}>
          <HoldingsTable />
        </div>
      </div>
    </div>
  )
}