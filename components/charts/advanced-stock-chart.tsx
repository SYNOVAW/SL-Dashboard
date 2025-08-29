"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { 
  ComposedChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  ReferenceLine
} from "recharts"
import { useState } from "react"
import { TrendingUp, TrendingDown, Activity, Volume2, BarChart3 } from "lucide-react"

// Mock candlestick data with OHLCV
const stockData = {
  "1D": [
    { time: "09:30", open: 485.2, high: 487.5, low: 484.8, close: 486.9, volume: 2100000, sma20: 485.0, sma50: 483.5, change: 1.7 },
    { time: "10:00", open: 486.9, high: 488.3, low: 486.5, close: 487.8, volume: 1800000, sma20: 485.2, sma50: 483.7, change: 2.6 },
    { time: "10:30", open: 487.8, high: 489.1, low: 487.2, close: 488.5, volume: 1600000, sma20: 485.5, sma50: 484.0, change: 3.3 },
    { time: "11:00", open: 488.5, high: 489.8, low: 488.0, close: 489.2, volume: 1900000, sma20: 485.8, sma50: 484.2, change: 4.0 },
    { time: "11:30", open: 489.2, high: 490.5, low: 488.9, close: 490.1, volume: 2200000, sma20: 486.1, sma50: 484.5, change: 4.9 },
    { time: "12:00", open: 490.1, high: 491.2, low: 489.8, close: 490.8, volume: 1700000, sma20: 486.4, sma50: 484.8, change: 5.6 },
    { time: "12:30", open: 490.8, high: 491.5, low: 490.3, close: 491.1, volume: 1500000, sma20: 486.7, sma50: 485.1, change: 5.9 },
    { time: "13:00", open: 491.1, high: 492.0, low: 490.9, close: 491.7, volume: 1800000, sma20: 487.0, sma50: 485.4, change: 6.5 },
    { time: "13:30", open: 491.7, high: 492.3, low: 491.4, close: 492.0, volume: 1600000, sma20: 487.3, sma50: 485.7, change: 6.8 },
    { time: "14:00", open: 492.0, high: 492.8, low: 491.8, close: 492.5, volume: 1900000, sma20: 487.6, sma50: 486.0, change: 7.3 }
  ],
  "5D": [
    { time: "Mon", open: 480.0, high: 485.2, low: 478.5, close: 485.2, volume: 15000000, sma20: 478.0, sma50: 475.0, change: 2.0 },
    { time: "Tue", open: 485.2, high: 487.8, low: 484.1, close: 486.5, volume: 12000000, sma20: 479.5, sma50: 476.2, change: 1.3 },
    { time: "Wed", open: 486.5, high: 489.3, low: 485.9, close: 488.7, volume: 14500000, sma20: 481.0, sma50: 477.5, change: 2.2 },
    { time: "Thu", open: 488.7, high: 491.2, low: 487.8, close: 490.3, volume: 16000000, sma20: 482.8, sma50: 478.8, change: 1.6 },
    { time: "Fri", open: 490.3, high: 492.5, low: 489.9, close: 492.5, volume: 13500000, sma20: 484.6, sma50: 480.1, change: 2.2 }
  ],
  "1M": [
    { time: "Week 1", open: 465.0, high: 470.5, low: 462.8, close: 468.2, volume: 75000000, sma20: 460.0, sma50: 455.0, change: 3.2 },
    { time: "Week 2", open: 468.2, high: 472.1, low: 466.5, close: 471.5, volume: 68000000, sma20: 463.5, sma50: 458.2, change: 3.3 },
    { time: "Week 3", open: 471.5, high: 476.8, low: 470.2, close: 475.3, volume: 72000000, sma20: 467.2, sma50: 461.5, change: 3.8 },
    { time: "Week 4", open: 475.3, high: 485.2, low: 474.1, close: 485.2, volume: 82000000, sma20: 471.5, sma50: 465.3, change: 9.9 }
  ],
  "3M": [
    { time: "Apr", open: 420.0, high: 445.2, low: 415.8, close: 442.1, volume: 280000000, sma20: 425.0, sma50: 410.0, change: 22.1 },
    { time: "May", open: 442.1, high: 468.5, low: 438.9, close: 465.8, volume: 320000000, sma20: 448.2, sma50: 430.5, change: 23.7 },
    { time: "Jun", open: 465.8, high: 492.5, low: 462.3, close: 485.2, volume: 295000000, sma20: 468.9, sma50: 452.1, change: 19.4 }
  ],
  "6M": [
    { time: "Jan", open: 380.0, high: 395.2, low: 375.5, close: 392.8, volume: 450000000, sma20: 385.0, sma50: 370.0, change: 12.8 },
    { time: "Feb", open: 392.8, high: 408.1, low: 388.9, close: 405.2, volume: 420000000, sma20: 395.5, sma50: 382.3, change: 12.4 },
    { time: "Mar", open: 405.2, high: 422.5, low: 401.8, close: 420.0, volume: 380000000, sma20: 408.8, sma50: 395.8, change: 14.8 },
    { time: "Apr", open: 420.0, high: 445.2, low: 415.8, close: 442.1, volume: 410000000, sma20: 425.5, sma50: 410.2, change: 22.1 },
    { time: "May", open: 442.1, high: 468.5, low: 438.9, close: 465.8, volume: 450000000, sma20: 448.8, sma50: 430.5, change: 23.7 },
    { time: "Jun", open: 465.8, high: 492.5, low: 462.3, close: 485.2, volume: 480000000, sma20: 468.9, sma50: 452.1, change: 19.4 }
  ]
}

interface StockDataPoint {
  time: string
  open: number
  high: number
  low: number
  close: number
  volume: number
  sma20: number
  sma50: number
  change: number
}

type TimeFrame = "1D" | "5D" | "1M" | "3M" | "6M"

interface AdvancedStockChartProps {
  symbol?: string
  companyName?: string
}

export function AdvancedStockChart({ symbol = "META", companyName = "Meta Platforms Inc" }: AdvancedStockChartProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeFrame>("5D")
  const [isLoading, setIsLoading] = useState(false)
  const [showVolume, setShowVolume] = useState(true)
  const [showMovingAverages, setShowMovingAverages] = useState(true)

  const timeframes: TimeFrame[] = ["1D", "5D", "1M", "3M", "6M"]
  
  const handleTimeframeChange = async (timeframe: TimeFrame) => {
    setIsLoading(true)
    // Simulate data loading
    await new Promise(resolve => setTimeout(resolve, 300))
    setSelectedTimeframe(timeframe)
    setIsLoading(false)
  }

  const currentData = stockData[selectedTimeframe]
  const currentPrice = currentData[currentData.length - 1]
  const priceChange = currentPrice.change
  const priceChangePercent = (priceChange / (currentPrice.close - priceChange)) * 100

  // Custom candlestick tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as StockDataPoint
      return (
        <div className="bg-card/95 border border-border/50 rounded-lg p-4 shadow-lg backdrop-blur-sm">
          <p className="font-medium text-card-foreground mb-2">{label}</p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Open:</span>
              <span className="font-financial text-card-foreground">${data.open.toFixed(2)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">High:</span>
              <span className="font-financial text-positive">${data.high.toFixed(2)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Low:</span>
              <span className="font-financial text-negative">${data.low.toFixed(2)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Close:</span>
              <span className="font-financial font-semibold text-card-foreground">${data.close.toFixed(2)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Volume:</span>
              <span className="font-financial text-card-foreground">{(data.volume / 1000000).toFixed(1)}M</span>
            </div>
            {showMovingAverages && (
              <>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">SMA20:</span>
                  <span className="font-financial text-card-foreground">${data.sma20.toFixed(2)}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">SMA50:</span>
                  <span className="font-financial text-card-foreground">${data.sma50.toFixed(2)}</span>
                </div>
              </>
            )}
          </div>
        </div>
      )
    }
    return null
  }

  // Custom volume bar shape component
  const VolumeBar = (props: any) => {
    const { payload, x, y, width, height } = props
    if (!payload) return null

    const { open, close } = payload
    const isUp = close > open
    const color = isUp ? "hsl(var(--positive))" : "hsl(var(--negative))"
    
    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={color}
        opacity={0.6}
        rx={1}
      />
    )
  }

  // Custom candlestick shape component
  const Candlestick = (props: any) => {
    const { payload, x, y, width, height } = props
    if (!payload) return null

    const { open, high, low, close } = payload
    const isUp = close > open
    const color = isUp ? "hsl(var(--positive))" : "hsl(var(--negative))"
    
    const candleWidth = Math.max(width * 0.6, 2)
    const centerX = x + width / 2

    return (
      <g>
        {/* Wick */}
        <line
          x1={centerX}
          y1={y + (1 - (high - Math.min(open, close)) / (high - low)) * height}
          x2={centerX}
          y2={y + (1 - (Math.max(open, close) - low) / (high - low)) * height}
          stroke={color}
          strokeWidth={1}
        />
        {/* Body */}
        <rect
          x={centerX - candleWidth / 2}
          y={y + (1 - (Math.max(open, close) - low) / (high - low)) * height}
          width={candleWidth}
          height={Math.abs((close - open) / (high - low)) * height}
          fill={isUp ? color : "transparent"}
          stroke={color}
          strokeWidth={1}
        />
      </g>
    )
  }

  return (
    <Card className="w-full bg-card border-border/20 enhanced-shadow rounded-2xl hover-lift gradient-bg">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-gradient-to-br from-[var(--highlight)]/20 to-[var(--highlight)]/10 glow-cyan">
                <BarChart3 className="h-5 w-5 text-[var(--highlight)]" />
              </div>
              <CardTitle className="text-2xl font-bold text-card-foreground">
                {symbol}
              </CardTitle>
              <Badge variant="outline" className="bg-gradient-to-r from-[var(--highlight)]/15 to-[var(--highlight)]/10 text-[var(--highlight)] border-[var(--highlight)]/30 px-3 py-1">
                Live
              </Badge>
            </div>
            <p className="text-muted-foreground font-medium">{companyName}</p>
            
            {/* Current Price Display */}
            <div className="flex items-center gap-4 mt-3">
              <div className="text-3xl font-bold font-financial text-card-foreground">
                ${currentPrice.close.toFixed(2)}
              </div>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                priceChange >= 0 
                  ? 'bg-[var(--positive)]/10 text-[var(--positive)]' 
                  : 'bg-[var(--negative)]/10 text-[var(--negative)]'
              }`}>
                {priceChange >= 0 ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span className="font-financial font-medium">
                  {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}
                </span>
                <span className="font-financial">
                  ({priceChangePercent >= 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              {timeframes.map((timeframe) => (
                <Button
                  key={timeframe}
                  variant={timeframe === selectedTimeframe ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleTimeframeChange(timeframe)}
                  disabled={isLoading}
                  className={
                    timeframe === selectedTimeframe
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                      : "border-border/50 hover:bg-accent/50 text-muted-foreground hover:text-foreground font-medium"
                  }
                >
                  {isLoading && timeframe === selectedTimeframe ? "..." : timeframe}
                </Button>
              ))}
            </div>
            
            <div className="flex gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={showVolume ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShowVolume(!showVolume)}
                      className="flex items-center gap-2"
                    >
                      <Volume2 className="h-4 w-4" />
                      Volume
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Toggle volume display</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={showMovingAverages ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShowMovingAverages(!showMovingAverages)}
                      className="flex items-center gap-2"
                    >
                      <Activity className="h-4 w-4" />
                      MA
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Toggle moving averages</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Main Chart */}
        <div className="h-96 bg-card/50 rounded-xl p-4 border border-border/30">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={currentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 12, fill: "hsl(var(--foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis
                yAxisId="price"
                orientation="right"
                tick={{ fontSize: 12, fill: "hsl(var(--foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                domain={['dataMin - 5', 'dataMax + 5']}
              />
              {showVolume && (
                <YAxis
                  yAxisId="volume"
                  orientation="left"
                  tick={{ fontSize: 12, fill: "hsl(var(--foreground))" }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                  domain={[0, 'dataMax * 4']}
                />
              )}
              <RechartsTooltip content={<CustomTooltip />} />
              
              {/* Volume bars */}
              {showVolume && (
                <Bar
                  yAxisId="volume"
                  dataKey="volume"
                  shape={<VolumeBar />}
                  radius={[1, 1, 0, 0]}
                />
              )}
              
              {/* Moving averages */}
              {showMovingAverages && (
                <>
                  <Line
                    yAxisId="price"
                    type="monotone"
                    dataKey="sma20"
                    stroke="hsl(var(--positive))"
                    strokeWidth={2}
                    strokeDasharray="2 4"
                    dot={false}
                  />
                  <Line
                    yAxisId="price"
                    type="monotone"
                    dataKey="sma50"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </>
              )}
              
              {/* Price line */}
              <Line
                yAxisId="price"
                type="monotone"
                dataKey="close"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-primary rounded-full" />
            <span className="text-muted-foreground">Price</span>
          </div>
          {showMovingAverages && (
            <>
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-[var(--positive)] rounded-full" />
                <span className="text-muted-foreground">SMA20</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-muted-foreground rounded-full" />
                <span className="text-muted-foreground">SMA50</span>
              </div>
            </>
          )}
          {showVolume && (
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-[var(--positive)] opacity-60 rounded-sm" />
                <div className="w-2 h-2 bg-[var(--negative)] opacity-60 rounded-sm" />
              </div>
              <span className="text-muted-foreground">Volume</span>
            </div>
          )}
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border/30">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Day Range</div>
            <div className="font-financial font-medium text-card-foreground">
              ${Math.min(...currentData.map(d => d.low)).toFixed(2)} - ${Math.max(...currentData.map(d => d.high)).toFixed(2)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Volume</div>
            <div className="font-financial font-medium text-card-foreground">
              {(currentData.reduce((sum, d) => sum + d.volume, 0) / 1000000).toFixed(1)}M
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Avg Volume</div>
            <div className="font-financial font-medium text-card-foreground">
              {(currentData.reduce((sum, d) => sum + d.volume, 0) / currentData.length / 1000000).toFixed(1)}M
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Volatility</div>
            <div className="font-financial font-medium text-card-foreground">
              {(Math.max(...currentData.map(d => d.high)) / Math.min(...currentData.map(d => d.low)) * 100 - 100).toFixed(1)}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}