"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Star, 
  Plus,
  BarChart3,
  Activity
} from "lucide-react"
import { getCardClasses, getSentimentColorClasses } from "@/lib/colors"
import { cn } from "@/lib/utils"

interface Stock {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  marketCap: string
  peRatio: number
  dividend: number
  sector: string
}

const marketData: Stock[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 185.25,
    change: 2.75,
    changePercent: 1.51,
    volume: 54230000,
    marketCap: "2.89T",
    peRatio: 28.5,
    dividend: 0.24,
    sector: "Technology"
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 374.50,
    change: -5.25,
    changePercent: -1.38,
    volume: 23180000,
    marketCap: "2.78T",
    peRatio: 32.1,
    dividend: 0.75,
    sector: "Technology"
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 142.80,
    change: 1.20,
    changePercent: 0.85,
    volume: 18450000,
    marketCap: "1.81T",
    peRatio: 26.8,
    dividend: 0.00,
    sector: "Technology"
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 155.35,
    change: -2.15,
    changePercent: -1.36,
    volume: 31200000,
    marketCap: "1.59T",
    peRatio: 54.2,
    dividend: 0.00,
    sector: "Consumer Discretionary"
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    price: 208.50,
    change: -8.75,
    changePercent: -4.03,
    volume: 89650000,
    marketCap: "653B",
    peRatio: 65.4,
    dividend: 0.00,
    sector: "Consumer Discretionary"
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    price: 875.30,
    change: 15.20,
    changePercent: 1.77,
    volume: 41280000,
    marketCap: "2.16T",
    peRatio: 71.2,
    dividend: 0.04,
    sector: "Technology"
  },
]

const indices = [
  { name: "S&P 500", symbol: "SPX", price: 4785.23, change: 15.45, changePercent: 0.32 },
  { name: "Dow Jones", symbol: "DJI", price: 38125.90, change: -125.30, changePercent: -0.33 },
  { name: "NASDAQ", symbol: "IXIC", price: 15892.56, change: 45.78, changePercent: 0.29 },
  { name: "Russell 2000", symbol: "RUT", price: 2089.45, change: 8.92, changePercent: 0.43 },
]

interface MarketDataProps {
  onStockSelect?: (stock: Stock) => void
}

export function MarketData({ onStockSelect }: MarketDataProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [watchlist, setWatchlist] = useState<string[]>(["AAPL", "MSFT", "NVDA"])
  const [isLive, setIsLive] = useState(true)

  // Simulate live updates
  useEffect(() => {
    if (!isLive) return
    
    const interval = setInterval(() => {
      // In a real app, this would fetch live data
      console.log("Fetching live market data...")
    }, 5000)

    return () => clearInterval(interval)
  }, [isLive])

  const filteredStocks = marketData.filter(stock =>
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const watchlistStocks = marketData.filter(stock => watchlist.includes(stock.symbol))

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(1)}M`
    } else if (volume >= 1000) {
      return `${(volume / 1000).toFixed(1)}K`
    }
    return volume.toString()
  }

  const toggleWatchlist = (symbol: string) => {
    setWatchlist(prev => 
      prev.includes(symbol) 
        ? prev.filter(s => s !== symbol)
        : [...prev, symbol]
    )
  }

  const StockRow = ({ stock, showWatchlist = false }: { stock: Stock, showWatchlist?: boolean }) => {
    const changeColor = getSentimentColorClasses(stock.change >= 0 ? "positive" : "negative")
    
    return (
      <TableRow 
        className="cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={() => onStockSelect?.(stock)}
      >
        <TableCell>
          <div className="flex items-center gap-3">
            {showWatchlist && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleWatchlist(stock.symbol)
                }}
                className="h-6 w-6 p-0"
              >
                <Star 
                  className={cn(
                    "h-3 w-3",
                    watchlist.includes(stock.symbol) 
                      ? "text-yellow-500 fill-yellow-500" 
                      : "text-muted-foreground"
                  )}
                />
              </Button>
            )}
            <div>
              <p className="font-semibold text-foreground">{stock.symbol}</p>
              <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                {stock.name}
              </p>
            </div>
          </div>
        </TableCell>
        <TableCell className="text-right">
          <p className="font-semibold">${stock.price.toFixed(2)}</p>
        </TableCell>
        <TableCell className="text-right">
          <div className={cn("flex items-center justify-end gap-1", changeColor.text)}>
            {stock.change >= 0 ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <div>
              <p className="font-medium text-sm">
                {stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)}
              </p>
              <p className="text-xs">
                {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
              </p>
            </div>
          </div>
        </TableCell>
        <TableCell className="text-right text-sm text-muted-foreground">
          {formatVolume(stock.volume)}
        </TableCell>
        <TableCell className="text-right">
          <Badge variant="secondary" className="text-xs">
            {stock.sector.split(' ')[0]}
          </Badge>
        </TableCell>
      </TableRow>
    )
  }

  return (
    <div className="space-y-6">
      {/* Market Indices */}
      <Card className={getCardClasses("default")}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Market Overview
              </CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <div className={cn(
                "w-2 h-2 rounded-full",
                isLive ? "bg-positive" : "bg-muted"
              )} />
              <span className="text-xs text-muted-foreground">
                {isLive ? "Live" : "Delayed"}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {indices.map((index) => {
              const changeColor = getSentimentColorClasses(index.change >= 0 ? "positive" : "negative")
              
              return (
                <div key={index.symbol} className="text-center p-3 rounded-lg bg-muted/20">
                  <p className="text-sm font-medium text-muted-foreground">{index.name}</p>
                  <p className="text-lg font-bold text-foreground">{index.price.toFixed(2)}</p>
                  <div className={cn("flex items-center justify-center gap-1 text-xs", changeColor.text)}>
                    {index.change >= 0 ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)} ({index.change >= 0 ? '+' : ''}{index.changePercent.toFixed(2)}%)
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Stock Data */}
      <Card className={getCardClasses("default")}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Market Data
              </CardTitle>
              <CardDescription>Real-time stock prices and market information</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="all">All Stocks</TabsTrigger>
                <TabsTrigger value="watchlist">
                  Watchlist ({watchlist.length})
                </TabsTrigger>
              </TabsList>
              
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search stocks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <TabsContent value="all">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Change</TableHead>
                      <TableHead className="text-right">Volume</TableHead>
                      <TableHead className="text-right">Sector</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStocks.map((stock) => (
                      <StockRow key={stock.symbol} stock={stock} showWatchlist />
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="watchlist">
              {watchlistStocks.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Symbol</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Change</TableHead>
                        <TableHead className="text-right">Volume</TableHead>
                        <TableHead className="text-right">Sector</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {watchlistStocks.map((stock) => (
                        <StockRow key={stock.symbol} stock={stock} />
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No stocks in your watchlist</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Click the star icon next to any stock to add it to your watchlist
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}