"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardAction } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Globe, BarChart3, Activity, Clock, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

interface MarketIndex {
  symbol: string
  name: string
  value: number
  change: number
  changePercent: number
  high: number
  low: number
  volume: string
}

interface SectorData {
  name: string
  change: number
  changePercent: number
  marketCap: string
  leadingStock: string
  leadingChange: number
}

interface TopMover {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: string
  sector: string
}

interface EconomicIndicator {
  name: string
  value: string
  change: number
  impact: "high" | "medium" | "low"
  nextRelease: string
}

// Mock data
const marketIndices: MarketIndex[] = [
  {
    symbol: "^GSPC",
    name: "S&P 500",
    value: 4756.50,
    change: 28.75,
    changePercent: 0.61,
    high: 4762.30,
    low: 4728.90,
    volume: "3.2B"
  },
  {
    symbol: "^DJI",
    name: "Dow Jones",
    value: 37863.80,
    change: -45.20,
    changePercent: -0.12,
    high: 37920.50,
    low: 37801.20,
    volume: "285M"
  },
  {
    symbol: "^IXIC",
    name: "NASDAQ",
    value: 14968.78,
    change: 85.40,
    changePercent: 0.57,
    high: 15001.20,
    low: 14891.50,
    volume: "4.1B"
  },
  {
    symbol: "^RUT",
    name: "Russell 2000",
    value: 2042.18,
    change: 12.34,
    changePercent: 0.61,
    high: 2048.90,
    low: 2028.40,
    volume: "1.8B"
  }
]

const sectorData: SectorData[] = [
  {
    name: "Technology",
    change: 45.2,
    changePercent: 1.24,
    marketCap: "$12.8T",
    leadingStock: "NVDA",
    leadingChange: 3.45
  },
  {
    name: "Healthcare",
    change: -12.8,
    changePercent: -0.43,
    marketCap: "$6.2T",
    leadingStock: "JNJ",
    leadingChange: -1.20
  },
  {
    name: "Financial",
    change: 28.9,
    changePercent: 0.89,
    marketCap: "$8.4T",
    leadingStock: "JPM",
    leadingChange: 2.15
  },
  {
    name: "Energy",
    change: -35.4,
    changePercent: -1.87,
    marketCap: "$4.1T",
    leadingStock: "XOM",
    leadingChange: -2.34
  },
  {
    name: "Consumer Disc.",
    change: 18.7,
    changePercent: 0.67,
    marketCap: "$5.9T",
    leadingStock: "TSLA",
    leadingChange: 1.89
  },
  {
    name: "Industrials",
    change: 22.1,
    changePercent: 0.78,
    marketCap: "$4.7T",
    leadingStock: "BA",
    leadingChange: 2.45
  }
]

const topGainers: TopMover[] = [
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    price: 875.28,
    change: 28.45,
    changePercent: 3.36,
    volume: "41.6M",
    sector: "Technology"
  },
  {
    symbol: "META",
    name: "Meta Platforms Inc",
    price: 484.20,
    change: 18.75,
    changePercent: 4.03,
    volume: "28.9M",
    sector: "Technology"
  },
  {
    symbol: "AMD",
    name: "Advanced Micro Devices",
    price: 188.95,
    change: 12.80,
    changePercent: 7.27,
    volume: "62.4M",
    sector: "Technology"
  }
]

const topLosers: TopMover[] = [
  {
    symbol: "NFLX",
    name: "Netflix Inc",
    price: 445.60,
    change: -22.40,
    changePercent: -4.79,
    volume: "8.2M",
    sector: "Communication"
  },
  {
    symbol: "PYPL",
    name: "PayPal Holdings Inc",
    price: 58.75,
    change: -4.25,
    changePercent: -6.74,
    volume: "15.8M",
    sector: "Financial"
  },
  {
    symbol: "SNAP",
    name: "Snap Inc",
    price: 12.45,
    change: -1.85,
    changePercent: -12.94,
    volume: "45.2M",
    sector: "Communication"
  }
]

const economicIndicators: EconomicIndicator[] = [
  {
    name: "Federal Funds Rate",
    value: "5.25-5.50%",
    change: 0,
    impact: "high",
    nextRelease: "Dec 13, 2024"
  },
  {
    name: "Unemployment Rate",
    value: "3.8%",
    change: 0.1,
    impact: "high",
    nextRelease: "Dec 8, 2024"
  },
  {
    name: "Inflation (CPI)",
    value: "3.2%",
    change: -0.1,
    impact: "high",
    nextRelease: "Dec 12, 2024"
  },
  {
    name: "GDP Growth",
    value: "2.1%",
    change: 0.3,
    impact: "medium",
    nextRelease: "Dec 21, 2024"
  }
]

export default function MarketPage() {
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLastUpdate(new Date())
    setIsRefreshing(false)
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-red-500"
      case "medium":
        return "text-yellow-500"
      case "low":
        return "text-green-500"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-[var(--highlight)]/20 to-[var(--highlight)]/10">
            <Globe className="h-6 w-6 text-[var(--highlight)]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">Market Overview</h1>
            <p className="text-lg text-muted-foreground">Global markets and economic indicators</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Last updated</p>
            <p className="text-sm font-medium flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {lastUpdate.toLocaleTimeString()}
            </p>
          </div>
          <Button onClick={handleRefresh} disabled={isRefreshing} size="sm">
            <RefreshCw className={cn("h-4 w-4 mr-2", isRefreshing && "animate-spin")} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Market Status Banner */}
      <Card className="bg-gradient-to-r from-[var(--positive)]/10 to-[var(--positive)]/5">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[var(--positive)] animate-pulse" />
              <span className="font-medium">Markets are open</span>
              <Badge variant="secondary">NYSE • NASDAQ</Badge>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div>Market opens: 9:30 AM EST</div>
              <div>Market closes: 4:00 PM EST</div>
              <div className="flex items-center gap-1">
                <Activity className="h-4 w-4" />
                High volume day
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Major Indices */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {marketIndices.map((index) => (
          <Card key={index.symbol}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">{index.name}</CardTitle>
                <Badge variant="outline" className="text-xs">{index.symbol}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold">{index.value.toLocaleString()}</div>
                <div className={cn(
                  "flex items-center gap-1 text-sm",
                  index.change >= 0 ? "text-[var(--positive)]" : "text-[var(--negative)]"
                )}>
                  {index.change >= 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {index.change >= 0 ? "+" : ""}{index.change.toFixed(2)} ({index.changePercent >= 0 ? "+" : ""}{index.changePercent.toFixed(2)}%)
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>H: {index.high.toLocaleString()}</span>
                  <span>L: {index.low.toLocaleString()}</span>
                  <span>Vol: {index.volume}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="sectors" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sectors">Sectors</TabsTrigger>
          <TabsTrigger value="movers">Top Movers</TabsTrigger>
          <TabsTrigger value="economic">Economic Data</TabsTrigger>
          <TabsTrigger value="international">International</TabsTrigger>
        </TabsList>

        <TabsContent value="sectors">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Sector Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sectorData.map((sector) => (
                  <div key={sector.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-medium min-w-[120px]">{sector.name}</span>
                        <Badge variant="secondary">{sector.marketCap}</Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "text-sm font-mono",
                          sector.changePercent >= 0 ? "text-[var(--positive)]" : "text-[var(--negative)]"
                        )}>
                          {sector.changePercent >= 0 ? "+" : ""}{sector.changePercent.toFixed(2)}%
                        </div>
                        <div className="text-xs text-muted-foreground min-w-[100px] text-right">
                          Leader: {sector.leadingStock} ({sector.leadingChange >= 0 ? "+" : ""}{sector.leadingChange.toFixed(2)}%)
                        </div>
                      </div>
                    </div>
                    <Progress 
                      value={Math.abs(sector.changePercent) * 20} 
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movers">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[var(--positive)]">
                  <TrendingUp className="h-5 w-5" />
                  Top Gainers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Change</TableHead>
                      <TableHead>Volume</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topGainers.map((stock) => (
                      <TableRow key={stock.symbol}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{stock.symbol}</div>
                            <div className="text-xs text-muted-foreground">{stock.sector}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono">${stock.price.toFixed(2)}</TableCell>
                        <TableCell className="text-[var(--positive)] font-mono">
                          +{stock.change.toFixed(2)} (+{stock.changePercent.toFixed(2)}%)
                        </TableCell>
                        <TableCell className="font-mono text-sm">{stock.volume}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[var(--negative)]">
                  <TrendingDown className="h-5 w-5" />
                  Top Losers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Change</TableHead>
                      <TableHead>Volume</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topLosers.map((stock) => (
                      <TableRow key={stock.symbol}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{stock.symbol}</div>
                            <div className="text-xs text-muted-foreground">{stock.sector}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono">${stock.price.toFixed(2)}</TableCell>
                        <TableCell className="text-[var(--negative)] font-mono">
                          {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                        </TableCell>
                        <TableCell className="font-mono text-sm">{stock.volume}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="economic">
          <Card>
            <CardHeader>
              <CardTitle>Economic Indicators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {economicIndicators.map((indicator) => (
                  <Card key={indicator.name}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{indicator.name}</h3>
                        <Badge 
                          variant="outline" 
                          className={getImpactColor(indicator.impact)}
                        >
                          {indicator.impact} impact
                        </Badge>
                      </div>
                      <div className="text-2xl font-bold mb-1">{indicator.value}</div>
                      {indicator.change !== 0 && (
                        <div className={cn(
                          "text-sm flex items-center gap-1",
                          indicator.change > 0 ? "text-[var(--positive)]" : "text-[var(--negative)]"
                        )}>
                          {indicator.change > 0 ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          {indicator.change > 0 ? "+" : ""}{indicator.change.toFixed(1)}% from previous
                        </div>
                      )}
                      <div className="text-xs text-muted-foreground mt-2">
                        Next release: {indicator.nextRelease}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="international">
          <Card>
            <CardHeader>
              <CardTitle>International Markets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Nikkei 225</span>
                    <Badge variant="outline">Closed</Badge>
                  </div>
                  <div className="text-xl font-bold">33,486.89</div>
                  <div className="text-sm text-[var(--positive)] flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +287.50 (+0.87%)
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">FTSE 100</span>
                    <Badge variant="outline">Closed</Badge>
                  </div>
                  <div className="text-xl font-bold">7,489.63</div>
                  <div className="text-sm text-[var(--negative)] flex items-center gap-1">
                    <TrendingDown className="h-3 w-3" />
                    -34.20 (-0.45%)
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">DAX</span>
                    <Badge variant="outline">Closed</Badge>
                  </div>
                  <div className="text-xl font-bold">16,794.45</div>
                  <div className="text-sm text-[var(--positive)] flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +156.78 (+0.94%)
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}