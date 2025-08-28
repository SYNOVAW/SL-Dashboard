"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { 
  Newspaper, 
  AlertCircle, 
  TrendingUp, 
  Clock,
  ExternalLink,
  Volume2,
  VolumeX,
  Play,
  Pause
} from "lucide-react"
import { formatTimestamp, getMonospaceClass } from "@/lib/formatters"
import { NewsItem } from "@/lib/types"
import { useState, useEffect } from "react"

// Mock news data - in real app this would come from API
const mockNews: NewsItem[] = [
  {
    id: "1",
    headline: "Federal Reserve signals potential rate cut in Q4 2025 amid cooling inflation data",
    summary: "FOMC minutes reveal growing consensus for monetary policy adjustment",
    source: "Reuters",
    author: "Janet Morrison",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    impact: "high",
    category: "economic",
    symbols: ["SPX", "DJI", "IXIC"],
    sentiment: 0.3
  },
  {
    id: "2", 
    headline: "Apple (AAPL) beats Q3 earnings expectations, raises full-year guidance",
    summary: "iPhone sales surge 8% YoY driven by AI features adoption",
    source: "Bloomberg",
    author: "Mark Thompson",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    impact: "high",
    category: "earnings", 
    symbols: ["AAPL"],
    sentiment: 0.7
  },
  {
    id: "3",
    headline: "Oil prices jump 3.2% on Middle East supply concerns",
    summary: "Brent crude tops $88/barrel as geopolitical tensions escalate",
    source: "MarketWatch",
    timestamp: new Date(Date.now() - 28 * 60 * 1000),
    impact: "medium",
    category: "geopolitical",
    symbols: ["CL1", "XOM", "CVX"],
    sentiment: -0.2
  },
  {
    id: "4",
    headline: "Tesla (TSLA) announces breakthrough in solid-state battery technology",
    summary: "New battery tech promises 50% longer range, 40% faster charging",
    source: "Reuters",
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    impact: "high",
    category: "company",
    symbols: ["TSLA"],
    sentiment: 0.8
  },
  {
    id: "5",
    headline: "European Central Bank maintains rates at 4.25% despite economic slowdown",
    summary: "ECB President emphasizes continued vigilance against inflation",
    source: "Financial Times",
    timestamp: new Date(Date.now() - 67 * 60 * 1000),
    impact: "medium",
    category: "economic",
    symbols: ["UKX", "DAX"],
    sentiment: 0.1
  },
  {
    id: "6",
    headline: "US jobless claims fall to 18-month low, signaling robust labor market",
    summary: "Initial claims drop to 201,000, beating economist expectations",
    source: "Wall Street Journal",
    timestamp: new Date(Date.now() - 89 * 60 * 1000),
    impact: "medium",
    category: "economic",
    symbols: ["SPX", "DJI"],
    sentiment: 0.6
  }
]

export function NewsTicker() {
  const [isScrolling, setIsScrolling] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isMuted, setIsMuted] = useState(false)

  const categories = ["all", "earnings", "economic", "geopolitical", "company", "regulatory"]
  
  const filteredNews = selectedCategory && selectedCategory !== "all" 
    ? mockNews.filter(news => news.category === selectedCategory)
    : mockNews

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-[var(--negative)]/10 text-[var(--negative)] border-[var(--negative)]/30'
      case 'medium':
        return 'bg-[var(--neutral)]/10 text-[var(--neutral)] border-[var(--neutral)]/30'
      default:
        return 'bg-muted/50 text-muted-foreground border-border'
    }
  }

  const getSentimentColor = (sentiment?: number) => {
    if (!sentiment) return 'text-muted-foreground'
    return sentiment > 0 ? 'text-[var(--positive)]' : sentiment < 0 ? 'text-[var(--negative)]' : 'text-[var(--neutral)]'
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'earnings':
        return <TrendingUp className="h-3 w-3" />
      case 'economic':
        return <AlertCircle className="h-3 w-3" />
      default:
        return <Newspaper className="h-3 w-3" />
    }
  }

  return (
    <div className="space-y-4">
      {/* News Ticker Header */}
      <Card className="bg-card border-border/50">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-[var(--highlight)]/10">
                <Newspaper className="h-5 w-5 text-[var(--highlight)]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">Market News</h3>
                <p className="text-sm text-muted-foreground">Real-time financial news feed</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMuted(!isMuted)}
                className="h-8 w-8 p-0"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsScrolling(!isScrolling)}
                className="h-8 w-8 p-0"
              >
                {isScrolling ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="flex-shrink-0 text-xs h-7"
              >
                {category === "all" ? "All" : category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* News Feed */}
      <Card className="bg-card border-border/50">
        <ScrollArea className="h-[500px]">
          <div className="p-4 space-y-4">
            {filteredNews.map((news, index) => (
              <div key={news.id}>
                <div className="space-y-3 hover:bg-muted/20 p-3 rounded-lg transition-colors">
                  {/* News Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {getCategoryIcon(news.category)}
                      <Badge variant="outline" className={`text-xs px-2 py-0.5 ${getImpactColor(news.impact)}`}>
                        {news.impact.toUpperCase()}
                      </Badge>
                      <span className={`text-xs ${getMonospaceClass()} text-muted-foreground`}>
                        {formatTimestamp(news.timestamp, { format: 'time-only', includeSeconds: false })}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {news.symbols && (
                        <div className="flex items-center gap-1">
                          {news.symbols.slice(0, 2).map((symbol) => (
                            <Badge key={symbol} variant="secondary" className="text-xs px-2 py-0.5">
                              {symbol}
                            </Badge>
                          ))}
                          {news.symbols.length > 2 && (
                            <Badge variant="secondary" className="text-xs px-2 py-0.5">
                              +{news.symbols.length - 2}
                            </Badge>
                          )}
                        </div>
                      )}
                      <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer" />
                    </div>
                  </div>

                  {/* News Content */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-card-foreground leading-tight line-clamp-2">
                      {news.headline}
                    </h4>
                    {news.summary && (
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {news.summary}
                      </p>
                    )}
                  </div>

                  {/* News Footer */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground font-medium">{news.source}</span>
                      {news.author && (
                        <>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground">{news.author}</span>
                        </>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className={`${getMonospaceClass()} text-muted-foreground`}>
                        {formatTimestamp(news.timestamp, { format: 'short' })}
                      </span>
                      {news.sentiment !== undefined && (
                        <div className={`flex items-center gap-1 ${getSentimentColor(news.sentiment)}`}>
                          <div className={`w-2 h-2 rounded-full ${
                            news.sentiment > 0 ? 'bg-[var(--positive)]' : 
                            news.sentiment < 0 ? 'bg-[var(--negative)]' : 'bg-[var(--neutral)]'
                          }`} />
                          <span className={`${getMonospaceClass()} text-xs`}>
                            {news.sentiment > 0 ? '+' : ''}{(news.sentiment * 100).toFixed(0)}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {index < filteredNews.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </ScrollArea>
        
        {/* News Footer */}
        <div className="px-4 py-3 border-t border-border/20 bg-muted/20">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--positive)] pulse-glow" />
              <span>Live feed active</span>
            </div>
            <span className={getMonospaceClass()}>
              Last updated: {formatTimestamp(new Date(), { format: 'time-only', includeSeconds: true })}
            </span>
          </div>
        </div>
      </Card>
    </div>
  )
}