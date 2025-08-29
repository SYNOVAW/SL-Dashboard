"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Star, 
  BarChart3, 
  Target,
  Info,
  ExternalLink,
  Calendar,
  DollarSign
} from "lucide-react"
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts"
import { useState } from "react"

interface StockAnalysisData {
  symbol: string
  companyName: string
  currentPrice: number
  priceChange: number
  priceChangePercent: number
  marketCap: string
  recommendation: "Strong Buy" | "Buy" | "Hold" | "Sell" | "Strong Sell"
  confidence: number
  targetPrice: number
  analystCount: number
  lastEarnings: {
    date: string
    eps: number
    estimate: number
    surprise: number
  }
  keyMetrics: {
    pe: number
    pb: number
    roe: number
    divYield: number
  }
  chartData: Array<{
    time: string
    price: number
  }>
  tags: string[]
  riskScore: number
  nextEarnings: string
}

interface StockAnalysisCardProps {
  stockData?: StockAnalysisData
  featured?: boolean
  compact?: boolean
}

const defaultStockData: StockAnalysisData = {
  symbol: "META",
  companyName: "Meta Platforms Inc",
  currentPrice: 492.50,
  priceChange: 7.32,
  priceChangePercent: 1.51,
  marketCap: "$1.25T",
  recommendation: "Buy",
  confidence: 82,
  targetPrice: 520.00,
  analystCount: 47,
  lastEarnings: {
    date: "2024-07-24",
    eps: 5.16,
    estimate: 4.73,
    surprise: 9.1
  },
  keyMetrics: {
    pe: 24.2,
    pb: 6.8,
    roe: 18.5,
    divYield: 0.0
  },
  chartData: [
    { time: "1M", price: 465 },
    { time: "3W", price: 478 },
    { time: "2W", price: 485 },
    { time: "1W", price: 492 },
    { time: "3D", price: 488 },
    { time: "1D", price: 492.50 }
  ],
  tags: ["AI Leader", "Metaverse", "Social Media", "Large Cap"],
  riskScore: 3.2,
  nextEarnings: "2024-10-25"
}

export function StockAnalysisCard({ 
  stockData = defaultStockData, 
  featured = false,
  compact = false 
}: StockAnalysisCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  
  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case "Strong Buy":
        return "bg-[var(--positive)] text-white"
      case "Buy":
        return "bg-[var(--positive)]/80 text-white"
      case "Hold":
        return "bg-[var(--neutral)] text-white"
      case "Sell":
        return "bg-[var(--negative)]/80 text-white"
      case "Strong Sell":
        return "bg-[var(--negative)] text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case "Strong Buy":
      case "Buy":
        return <TrendingUp className="h-4 w-4" />
      case "Hold":
        return <Activity className="h-4 w-4" />
      case "Sell":
      case "Strong Sell":
        return <TrendingDown className="h-4 w-4" />
      default:
        return <Target className="h-4 w-4" />
    }
  }

  const getRiskColor = (score: number) => {
    if (score <= 2) return "text-[var(--positive)]"
    if (score <= 4) return "text-[var(--neutral)]"
    return "text-[var(--negative)]"
  }

  const getRiskLevel = (score: number) => {
    if (score <= 2) return "Low"
    if (score <= 4) return "Medium"
    return "High"
  }

  const upside = ((stockData.targetPrice - stockData.currentPrice) / stockData.currentPrice) * 100

  if (compact) {
    return (
      <Card className="w-full bg-card border-border/20 soft-shadow rounded-xl hover-lift">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-[var(--highlight)]/20 to-[var(--highlight)]/10">
                <BarChart3 className="h-4 w-4 text-[var(--highlight)]" />
              </div>
              <div>
                <div className="font-bold text-card-foreground">{stockData.symbol}</div>
                <div className="text-sm text-muted-foreground">${stockData.currentPrice.toFixed(2)}</div>
              </div>
            </div>
            
            <div className="text-right">
              <Badge className={`${getRecommendationColor(stockData.recommendation)} text-xs px-2 py-1`}>
                {stockData.recommendation}
              </Badge>
              <div className="text-xs text-muted-foreground mt-1">
                {stockData.confidence}% confident
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`w-full bg-card border-border/20 enhanced-shadow rounded-2xl hover-lift gradient-bg transition-all duration-300 ${
      featured ? 'ring-2 ring-[var(--highlight)]/30 glow-cyan' : ''
    }`}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              {featured && (
                <div className="p-1.5 rounded-full bg-gradient-to-br from-yellow-400/20 to-yellow-600/10">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                </div>
              )}
              <div className="p-2 rounded-lg bg-gradient-to-br from-[var(--highlight)]/20 to-[var(--highlight)]/10">
                <BarChart3 className="h-5 w-5 text-[var(--highlight)]" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-card-foreground flex items-center gap-2">
                  {stockData.symbol}
                  {featured && <Badge variant="outline" className="text-xs">Featured</Badge>}
                </CardTitle>
                <p className="text-muted-foreground text-sm">{stockData.companyName}</p>
              </div>
            </div>
            
            {/* Price Display */}
            <div className="flex items-baseline gap-4">
              <div className="text-2xl font-bold font-financial text-card-foreground">
                ${stockData.currentPrice.toFixed(2)}
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${
                stockData.priceChange >= 0 
                  ? 'bg-[var(--positive)]/10 text-[var(--positive)]' 
                  : 'bg-[var(--negative)]/10 text-[var(--negative)]'
              }`}>
                {stockData.priceChange >= 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span className="font-financial">
                  {stockData.priceChange >= 0 ? '+' : ''}{stockData.priceChange.toFixed(2)}
                </span>
                <span className="font-financial">
                  ({stockData.priceChangePercent >= 0 ? '+' : ''}{stockData.priceChangePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>

          {/* Mini Chart */}
          <div className="h-16 w-24 bg-[var(--chart-background)] rounded-lg p-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stockData.chartData}>
                <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke={stockData.priceChange >= 0 ? "hsl(var(--positive))" : "hsl(var(--negative))"}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Recommendation Section */}
        <div className="p-4 bg-gradient-to-br from-muted/20 to-muted/10 rounded-xl border border-border/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Badge className={`${getRecommendationColor(stockData.recommendation)} px-3 py-2 text-sm font-semibold`}>
                {getRecommendationIcon(stockData.recommendation)}
                {stockData.recommendation}
              </Badge>
              <div className="text-sm text-muted-foreground">
                {stockData.confidence}% Confidence
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-[var(--highlight)]" />
                <div>
                  <div className="font-financial font-semibold">${stockData.targetPrice.toFixed(2)}</div>
                  <div className="text-xs text-muted-foreground">Target Price</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Upside:</span>
              <span className={`font-medium ${upside >= 0 ? 'text-[var(--positive)]' : 'text-[var(--negative)]'}`}>
                {upside >= 0 ? '+' : ''}{upside.toFixed(1)}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Analysts:</span>
              <span className="font-medium">{stockData.analystCount}</span>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="p-3 bg-card/50 rounded-lg border border-border/30 text-center">
                  <div className="text-xs text-muted-foreground mb-1">P/E Ratio</div>
                  <div className="font-financial font-semibold">{stockData.keyMetrics.pe}</div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Price-to-Earnings Ratio</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="p-3 bg-card/50 rounded-lg border border-border/30 text-center">
                  <div className="text-xs text-muted-foreground mb-1">P/B Ratio</div>
                  <div className="font-financial font-semibold">{stockData.keyMetrics.pb}</div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Price-to-Book Ratio</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="p-3 bg-card/50 rounded-lg border border-border/30 text-center">
                  <div className="text-xs text-muted-foreground mb-1">ROE</div>
                  <div className="font-financial font-semibold">{stockData.keyMetrics.roe}%</div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Return on Equity</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="p-3 bg-card/50 rounded-lg border border-border/30 text-center">
                  <div className="text-xs text-muted-foreground mb-1">Dividend</div>
                  <div className="font-financial font-semibold">
                    {stockData.keyMetrics.divYield > 0 ? `${stockData.keyMetrics.divYield}%` : 'N/A'}
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Dividend Yield</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {stockData.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs px-2 py-1 bg-muted/20">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Expandable Details */}
        {showDetails && (
          <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
            {/* Last Earnings */}
            <div className="p-4 bg-card/50 rounded-lg border border-border/30">
              <h4 className="font-semibold text-card-foreground mb-3 flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Last Earnings ({stockData.lastEarnings.date})
              </h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Actual EPS</div>
                  <div className="font-financial font-semibold">${stockData.lastEarnings.eps.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Estimate</div>
                  <div className="font-financial">${stockData.lastEarnings.estimate.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Surprise</div>
                  <div className={`font-financial font-semibold ${
                    stockData.lastEarnings.surprise >= 0 ? 'text-[var(--positive)]' : 'text-[var(--negative)]'
                  }`}>
                    {stockData.lastEarnings.surprise >= 0 ? '+' : ''}{stockData.lastEarnings.surprise.toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="p-4 bg-card/50 rounded-lg border border-border/30">
              <h4 className="font-semibold text-card-foreground mb-3 flex items-center gap-2">
                <Info className="h-4 w-4" />
                Risk Assessment
              </h4>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">Risk Score</div>
                  <div className={`text-lg font-bold ${getRiskColor(stockData.riskScore)}`}>
                    {stockData.riskScore.toFixed(1)}/5.0
                  </div>
                </div>
                <Badge variant="outline" className={`${getRiskColor(stockData.riskScore)} border-current`}>
                  {getRiskLevel(stockData.riskScore)} Risk
                </Badge>
              </div>
            </div>

            {/* Next Earnings */}
            <div className="p-4 bg-card/50 rounded-lg border border-border/30">
              <h4 className="font-semibold text-card-foreground mb-2 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Next Earnings
              </h4>
              <div className="text-sm">
                <span className="text-muted-foreground">Expected: </span>
                <span className="font-medium">{stockData.nextEarnings}</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-border/30">
          <Button
            variant="outline"
            onClick={() => setShowDetails(!showDetails)}
            className="flex-1 border-border/50 hover:bg-accent/50"
          >
            {showDetails ? 'Less Details' : 'More Details'}
          </Button>
          <Button className="flex-1 bg-[var(--highlight)] hover:bg-[var(--highlight)]/90 text-white">
            <ExternalLink className="h-4 w-4 mr-2" />
            View Full Analysis
          </Button>
        </div>

        {/* Market Cap */}
        <div className="flex items-center justify-between text-sm pt-2">
          <span className="text-muted-foreground">Market Cap:</span>
          <span className="font-financial font-semibold">{stockData.marketCap}</span>
        </div>
      </CardContent>
    </Card>
  )
}