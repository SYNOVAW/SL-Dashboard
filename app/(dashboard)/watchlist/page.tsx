"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { TrendingUp, TrendingDown, Plus, Search, Star, Trash2 } from "lucide-react"
import { useState } from "react"

interface Stock {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  isUp: boolean
}

export default function WatchlistPage() {
  const [searchTerm, setSearchTerm] = useState("")
  
  const watchlistStocks: Stock[] = [
    { symbol: "AAPL", name: "Apple Inc.", price: 185.92, change: 2.34, changePercent: 1.28, volume: 45230000, isUp: true },
    { symbol: "MSFT", name: "Microsoft Corp", price: 342.56, change: -1.23, changePercent: -0.36, volume: 23450000, isUp: false },
    { symbol: "GOOGL", name: "Alphabet Inc", price: 128.45, change: 0.89, changePercent: 0.70, volume: 18920000, isUp: true },
    { symbol: "AMZN", name: "Amazon.com Inc", price: 145.67, change: -2.45, changePercent: -1.65, volume: 34560000, isUp: false },
    { symbol: "TSLA", name: "Tesla Inc", price: 248.90, change: 8.34, changePercent: 3.47, volume: 67890000, isUp: true },
  ]

  const formatPrice = (price: number) => `$${price.toFixed(2)}`
  const formatChange = (change: number) => change >= 0 ? `+${change.toFixed(2)}` : change.toFixed(2)
  const formatVolume = (volume: number) => {
    if (volume >= 1000000) return `${(volume / 1000000).toFixed(1)}M`
    if (volume >= 1000) return `${(volume / 1000).toFixed(1)}K`
    return volume.toString()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Watchlist</h1>
          <p className="text-muted-foreground">Track your favorite stocks and investments</p>
        </div>
        <Button className="bg-highlight hover:bg-highlight/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Stock
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search stocks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-highlight" />
            My Watchlist ({watchlistStocks.length} stocks)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {watchlistStocks.map((stock) => (
              <div key={stock.symbol} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold font-financial">{stock.symbol}</span>
                      {stock.isUp ? (
                        <TrendingUp className="h-4 w-4 text-positive" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-negative" />
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">{stock.name}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="font-bold font-financial text-lg">{formatPrice(stock.price)}</div>
                    <div className={`text-sm font-financial ${stock.isUp ? 'text-positive' : 'text-negative'}`}>
                      {formatChange(stock.change)} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                    </div>
                  </div>
                  
                  <div className="text-right text-sm text-muted-foreground">
                    <div>Vol: {formatVolume(stock.volume)}</div>
                  </div>
                  
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}