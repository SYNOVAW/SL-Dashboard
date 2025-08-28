"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { TrendingUp, TrendingDown, Minus, Globe, DollarSign, BarChart3, Clock, Wifi } from "lucide-react"
import { formatFinancialNumber, formatTimestamp, formatTimeAgo, getMonospaceClass } from "@/lib/formatters"
import { MarketIndex, MarketHours } from "@/lib/types"

// Mock data - in real app this would come from API
const marketIndices: MarketIndex[] = [
  {
    symbol: "SPX",
    name: "S&P 500",
    value: { value: 5234.18, timestamp: new Date(), source: 'Reuters', status: 'real-time', confidence: 'high' },
    change: { value: 28.42, timestamp: new Date(), source: 'Reuters', status: 'real-time', confidence: 'high' },
    changePercent: { value: 0.55, timestamp: new Date(), source: 'Reuters', status: 'real-time', confidence: 'high' }
  },
  {
    symbol: "DJI",
    name: "Dow Jones",
    value: { value: 38847.65, timestamp: new Date(), source: 'Reuters', status: 'real-time', confidence: 'high' },
    change: { value: -156.73, timestamp: new Date(), source: 'Reuters', status: 'real-time', confidence: 'high' },
    changePercent: { value: -0.40, timestamp: new Date(), source: 'Reuters', status: 'real-time', confidence: 'high' }
  },
  {
    symbol: "IXIC",
    name: "NASDAQ",
    value: { value: 16388.24, timestamp: new Date(), source: 'Reuters', status: 'real-time', confidence: 'high' },
    change: { value: 87.32, timestamp: new Date(), source: 'Reuters', status: 'real-time', confidence: 'high' },
    changePercent: { value: 0.54, timestamp: new Date(), source: 'Reuters', status: 'real-time', confidence: 'high' }
  },
  {
    symbol: "RUT",
    name: "Russell 2000",
    value: { value: 2234.67, timestamp: new Date(), source: 'Reuters', status: 'real-time', confidence: 'high' },
    change: { value: 12.45, timestamp: new Date(), source: 'Reuters', status: 'real-time', confidence: 'high' },
    changePercent: { value: 0.56, timestamp: new Date(), source: 'Reuters', status: 'real-time', confidence: 'high' }
  },
  {
    symbol: "VIX",
    name: "VIX",
    value: { value: 18.42, timestamp: new Date(), source: 'Reuters', status: 'real-time', confidence: 'high' },
    change: { value: -1.23, timestamp: new Date(), source: 'Reuters', status: 'real-time', confidence: 'high' },
    changePercent: { value: -6.27, timestamp: new Date(), source: 'Reuters', status: 'real-time', confidence: 'high' }
  },
  // International indices
  {
    symbol: "UKX",
    name: "FTSE 100",
    value: { value: 7834.50, timestamp: new Date(), source: 'Reuters', status: 'delayed', confidence: 'high' },
    change: { value: 45.30, timestamp: new Date(), source: 'Reuters', status: 'delayed', confidence: 'high' },
    changePercent: { value: 0.58, timestamp: new Date(), source: 'Reuters', status: 'delayed', confidence: 'high' }
  },
  {
    symbol: "DAX",
    name: "DAX",
    value: { value: 17892.43, timestamp: new Date(), source: 'Reuters', status: 'delayed', confidence: 'high' },
    change: { value: -87.65, timestamp: new Date(), source: 'Reuters', status: 'delayed', confidence: 'high' },
    changePercent: { value: -0.49, timestamp: new Date(), source: 'Reuters', status: 'delayed', confidence: 'high' }
  },
  {
    symbol: "NKY",
    name: "Nikkei 225",
    value: { value: 39654.85, timestamp: new Date(), source: 'Reuters', status: 'delayed', confidence: 'high' },
    change: { value: 234.67, timestamp: new Date(), source: 'Reuters', status: 'delayed', confidence: 'high' },
    changePercent: { value: 0.60, timestamp: new Date(), source: 'Reuters', status: 'delayed', confidence: 'high' }
  }
]

const marketHours: MarketHours = {
  market: "US Equity Markets",
  timezone: "EST",
  isOpen: true,
  openTime: "09:30",
  closeTime: "16:00",
  nextClose: new Date(Date.now() + 4 * 60 * 60 * 1000),
  preMarket: {
    isActive: false,
    openTime: "04:00",
    closeTime: "09:30"
  },
  afterHours: {
    isActive: false,
    openTime: "16:00",
    closeTime: "20:00"
  }
}

export function MarketIndicesSidebar() {
  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-[var(--positive)]" />
    if (change < 0) return <TrendingDown className="h-4 w-4 text-[var(--negative)]" />
    return <Minus className="h-4 w-4 text-[var(--neutral)]" />
  }

  const getChangeColor = (change: number) => {
    return change > 0 ? 'text-[var(--positive)]' : change < 0 ? 'text-[var(--negative)]' : 'text-[var(--neutral)]'
  }

  return (
    <div className="space-y-6">
      {/* Market Status */}
      <Card className="bg-card border-border/50 hover-lift soft-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <Globe className="h-5 w-5 text-[var(--highlight)]" />
            Market Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">US Markets</span>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${marketHours.isOpen ? 'bg-[var(--positive)] pulse-glow' : 'bg-[var(--negative)]'}`} />
              <span className={`text-sm font-semibold ${getMonospaceClass()} ${marketHours.isOpen ? 'text-[var(--positive)]' : 'text-[var(--negative)]'}`}>
                {marketHours.isOpen ? 'OPEN' : 'CLOSED'}
              </span>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span>Trading Hours:</span>
              <span className={getMonospaceClass()}>{marketHours.openTime} - {marketHours.closeTime} {marketHours.timezone}</span>
            </div>
            {marketHours.nextClose && (
              <div className="flex justify-between mt-1">
                <span>Closes in:</span>
                <span className={`${getMonospaceClass()} text-[var(--highlight)]`}>
                  {formatTimeAgo(new Date(marketHours.nextClose.getTime() - Date.now()))}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Major Indices */}
      <Card className="bg-card border-border/50 hover-lift soft-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <BarChart3 className="h-5 w-5 text-[var(--highlight)]" />
            Major Indices
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[400px] px-4">
            <div className="space-y-1">
              {marketIndices.slice(0, 5).map((index, i) => {
                const formattedValue = formatFinancialNumber(index.value.value, { type: 'number', decimals: 2, monospace: true })
                const formattedChange = formatFinancialNumber(index.change.value, { type: 'number', decimals: 2, showSign: true, monospace: true })
                const formattedPercent = formatFinancialNumber(index.changePercent.value, { type: 'percentage', decimals: 2, monospace: true })
                
                return (
                  <div key={index.symbol} className="py-3 hover:bg-muted/30 rounded-lg px-2 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        {getChangeIcon(index.change.value)}
                        <div>
                          <div className="text-sm font-semibold text-card-foreground">{index.symbol}</div>
                          <div className="text-xs text-muted-foreground">{index.name}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {index.value.status === 'real-time' ? (
                          <Wifi className="h-3 w-3 text-[var(--positive)]" />
                        ) : (
                          <Clock className="h-3 w-3 text-[var(--neutral)]" />
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-bold ${getMonospaceClass()}`}>
                        {formattedValue.formatted}
                      </span>
                      <div className="text-right">
                        <div className={`text-sm font-semibold ${getMonospaceClass()} ${getChangeColor(index.change.value)}`}>
                          {formattedChange.formatted}
                        </div>
                        <div className={`text-xs ${getMonospaceClass()} ${getChangeColor(index.change.value)}`}>
                          ({formattedPercent.formatted})
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* International Markets */}
      <Card className="bg-card border-border/50 hover-lift soft-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <Globe className="h-5 w-5 text-[var(--highlight)]" />
            International
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="px-4 pb-4 space-y-1">
            {marketIndices.slice(5).map((index, i) => {
              const formattedValue = formatFinancialNumber(index.value.value, { type: 'number', decimals: 2, monospace: true })
              const formattedChange = formatFinancialNumber(index.change.value, { type: 'number', decimals: 2, showSign: true, monospace: true })
              const formattedPercent = formatFinancialNumber(index.changePercent.value, { type: 'percentage', decimals: 2, monospace: true })
              
              return (
                <div key={index.symbol} className="py-3 hover:bg-muted/30 rounded-lg px-2 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      {getChangeIcon(index.change.value)}
                      <div>
                        <div className="text-sm font-semibold text-card-foreground">{index.symbol}</div>
                        <div className="text-xs text-muted-foreground">{index.name}</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs px-2 py-0.5 bg-[var(--neutral)]/10 text-[var(--neutral)] border-[var(--neutral)]/30">
                      {index.value.status === 'delayed' ? '15min' : 'LIVE'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-bold ${getMonospaceClass()}`}>
                      {formattedValue.shorthand}
                    </span>
                    <div className="text-right">
                      <div className={`text-sm font-semibold ${getMonospaceClass()} ${getChangeColor(index.change.value)}`}>
                        {formattedChange.formatted}
                      </div>
                      <div className={`text-xs ${getMonospaceClass()} ${getChangeColor(index.change.value)}`}>
                        ({formattedPercent.formatted})
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Data Attribution */}
      <Card className="bg-card border-border/50">
        <CardContent className="p-4">
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <DollarSign className="h-3 w-3" />
              <span>Data provided by Reuters</span>
            </div>
            <div className={`${getMonospaceClass()}`}>
              Updated: {formatTimestamp(new Date(), { includeSeconds: true, format: 'time-only' })} EST
            </div>
            <div>
              US markets: Real-time • International: 15min delay
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}