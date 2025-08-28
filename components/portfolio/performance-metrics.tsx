"use client"

import React from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, DollarSign, Percent, Target, Activity } from "lucide-react"
import { getCardClasses } from "@/lib/colors"
import { cn } from "@/lib/utils"

// Sample performance data over time
const performanceData = [
  { date: "2023-01", value: 450000, benchmark: 440000 },
  { date: "2023-02", value: 465000, benchmark: 445000 },
  { date: "2023-03", value: 442000, benchmark: 438000 },
  { date: "2023-04", value: 478000, benchmark: 452000 },
  { date: "2023-05", value: 485000, benchmark: 458000 },
  { date: "2023-06", value: 492000, benchmark: 465000 },
  { date: "2023-07", value: 510000, benchmark: 472000 },
  { date: "2023-08", value: 495000, benchmark: 468000 },
  { date: "2023-09", value: 515000, benchmark: 480000 },
  { date: "2023-10", value: 525000, benchmark: 485000 },
  { date: "2023-11", value: 540000, benchmark: 495000 },
  { date: "2023-12", value: 575000, benchmark: 510000 },
]

interface MetricCardProps {
  title: string
  value: string
  change: string
  changePercent: number
  icon: React.ComponentType<{ className?: string }>
  period: string
}

function MetricCard({ title, value, change, changePercent, icon: Icon, period }: MetricCardProps) {
  const isPositive = changePercent >= 0

  return (
    <Card className={getCardClasses("default")}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              {title}
            </span>
          </div>
          <Badge variant="secondary" className="text-xs">
            {period}
          </Badge>
        </div>
        <div className="mt-3">
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <div className={cn(
            "flex items-center gap-1 mt-1",
            isPositive ? "text-positive" : "text-negative"
          )}>
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span className="text-sm font-medium">
              {change} ({changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function PerformanceMetrics() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value)
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-foreground mb-2">{label}</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">Portfolio:</span>
              <span className="text-sm font-medium text-foreground">
                {formatCurrency(payload[0].value)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-neutral" />
              <span className="text-sm text-muted-foreground">S&P 500:</span>
              <span className="text-sm font-medium text-foreground">
                {formatCurrency(payload[1].value)}
              </span>
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  const currentValue = performanceData[performanceData.length - 1].value
  const initialValue = performanceData[0].value
  const totalReturn = currentValue - initialValue
  const totalReturnPercent = (totalReturn / initialValue) * 100

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Portfolio Value"
          value={formatCurrency(currentValue)}
          change={formatCurrency(totalReturn)}
          changePercent={totalReturnPercent}
          icon={DollarSign}
          period="YTD"
        />
        <MetricCard
          title="Annual Return"
          value="12.4%"
          change="+2.1%"
          changePercent={2.1}
          icon={Percent}
          period="12M"
        />
        <MetricCard
          title="vs S&P 500"
          value="+4.2%"
          change="+1.3%"
          changePercent={1.3}
          icon={Target}
          period="YTD"
        />
        <MetricCard
          title="Volatility"
          value="18.5%"
          change="-0.8%"
          changePercent={-0.8}
          icon={Activity}
          period="30D"
        />
      </div>

      {/* Performance Chart */}
      <Card className={getCardClasses("default")}>
        <CardHeader>
          <CardTitle>Portfolio Performance</CardTitle>
          <CardDescription>
            Comparison with S&P 500 benchmark over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="1y" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="1m">1M</TabsTrigger>
              <TabsTrigger value="3m">3M</TabsTrigger>
              <TabsTrigger value="1y">1Y</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
            <TabsContent value="1y" className="space-y-4">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={performanceData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="benchmarkGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--neutral)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--neutral)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis 
                      dataKey="date" 
                      stroke="var(--muted-foreground)"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="var(--muted-foreground)"
                      fontSize={12}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="var(--primary)"
                      fillOpacity={1}
                      fill="url(#portfolioGradient)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="benchmark"
                      stroke="var(--neutral)"
                      fillOpacity={1}
                      fill="url(#benchmarkGradient)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="1m">
              <div className="h-80 flex items-center justify-center">
                <p className="text-muted-foreground">1 month view - Chart data not available</p>
              </div>
            </TabsContent>
            <TabsContent value="3m">
              <div className="h-80 flex items-center justify-center">
                <p className="text-muted-foreground">3 months view - Chart data not available</p>
              </div>
            </TabsContent>
            <TabsContent value="all">
              <div className="h-80 flex items-center justify-center">
                <p className="text-muted-foreground">All time view - Chart data not available</p>
              </div>
            </TabsContent>
          </Tabs>

          {/* Legend */}
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">Your Portfolio</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-neutral" />
              <span className="text-sm text-muted-foreground">S&P 500</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}