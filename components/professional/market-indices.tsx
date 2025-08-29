"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { Card } from "@/components/ui/card"

interface MarketIndex {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  isUp: boolean
}

const mockIndices: MarketIndex[] = [
  {
    symbol: 'SPX',
    name: 'S&P 500',
    price: 4185.47,
    change: 12.34,
    changePercent: 0.30,
    isUp: true
  },
  {
    symbol: 'IXIC',
    name: 'NASDAQ',
    price: 13045.11,
    change: -23.45,
    changePercent: -0.18,
    isUp: false
  },
  {
    symbol: 'DJI',
    name: 'Dow Jones',
    price: 33745.69,
    change: 45.67,
    changePercent: 0.14,
    isUp: true
  },
  {
    symbol: 'RUT',
    name: 'Russell 2000',
    price: 1876.23,
    change: -8.92,
    changePercent: -0.47,
    isUp: false
  },
  {
    symbol: 'VIX',
    name: 'Volatility Index',
    price: 18.45,
    change: 1.23,
    changePercent: 7.15,
    isUp: true
  }
]

export function MarketIndices() {
  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }

  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : ''
    return `${sign}${change.toFixed(2)}`
  }

  const formatPercentage = (percent: number) => {
    const sign = percent >= 0 ? '+' : ''
    return `${sign}${percent.toFixed(2)}%`
  }

  return (
    <Card className="w-72 bg-card border-border/20 soft-shadow">
      <div className="p-4">
        <h3 className="text-lg font-bold text-card-foreground mb-4 flex items-center gap-2">
          Market Indices
          <div className="w-2 h-2 rounded-full bg-positive animate-pulse" />
        </h3>
        
        <div className="space-y-3">
          {mockIndices.map((index) => (
            <div key={index.symbol} className="flex items-center justify-between py-2 border-b border-border/10 last:border-b-0">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-card-foreground font-financial">
                    {index.symbol}
                  </span>
                  {index.isUp ? (
                    <TrendingUp className="h-3 w-3 text-positive" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-negative" />
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  {index.name}
                </div>
              </div>
              
              <div className="text-right">
                <div className="financial-price text-sm text-card-foreground">
                  {formatPrice(index.price)}
                </div>
                <div className={`flex items-center gap-1 text-xs ${
                  index.isUp ? 'text-positive' : 'text-negative'
                }`}>
                  <span className="financial-percentage">
                    {formatChange(index.change)}
                  </span>
                  <span className="financial-percentage">
                    ({formatPercentage(index.changePercent)})
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-2 bg-muted/20 rounded-lg text-center">
          <div className="text-xs text-muted-foreground mb-1">Market Status</div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-positive animate-pulse" />
            <span className="text-sm font-semibold text-positive">Market Open</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Closes in 3h 24m
          </div>
        </div>
      </div>
    </Card>
  )
}