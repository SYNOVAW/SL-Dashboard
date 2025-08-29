"use client"

import { Badge } from "@/components/ui/badge"

interface NewsItem {
  id: string
  headline: string
  source: string
  timestamp: string
  sentiment: 'positive' | 'negative' | 'neutral'
  importance: 'high' | 'medium' | 'low'
}

const mockNews: NewsItem[] = [
  {
    id: '1',
    headline: 'Fed signals potential rate cut in Q4 2025',
    source: 'Reuters',
    timestamp: '14:30',
    sentiment: 'positive',
    importance: 'high'
  },
  {
    id: '2', 
    headline: 'Tech stocks rally on AI investment surge',
    source: 'Bloomberg',
    timestamp: '14:28',
    sentiment: 'positive',
    importance: 'medium'
  },
  {
    id: '3',
    headline: 'European markets mixed ahead of ECB decision',
    source: 'Financial Times',
    timestamp: '14:25',
    sentiment: 'neutral',
    importance: 'medium'
  },
  {
    id: '4',
    headline: 'Oil prices decline on oversupply concerns',
    source: 'WSJ',
    timestamp: '14:20',
    sentiment: 'negative',
    importance: 'low'
  },
  {
    id: '5',
    headline: 'Cryptocurrency regulation framework proposed by EU',
    source: 'Reuters',
    timestamp: '14:15',
    sentiment: 'neutral',
    importance: 'high'
  }
]

export function NewsTicker() {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-positive'
      case 'negative':
        return 'text-negative'
      default:
        return 'text-muted-foreground'
    }
  }

  const getImportanceIndicator = (importance: string) => {
    switch (importance) {
      case 'high':
        return '🔴'
      case 'medium':
        return '🟡'
      default:
        return '🟢'
    }
  }

  return (
    <div className="bg-card border-y border-border/20">
      <div className="flex items-center px-4 py-2">
        <Badge variant="outline" className="mr-3 bg-highlight/10 text-highlight border-highlight/20 font-semibold">
          LIVE NEWS
        </Badge>
        <div className="news-ticker flex-1 h-8 flex items-center">
          <div className="ticker-content flex items-center gap-8 whitespace-nowrap">
            {mockNews.concat(mockNews).map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs">{getImportanceIndicator(item.importance)}</span>
                <span className="text-xs text-muted-foreground font-financial">{item.timestamp}</span>
                <span className="text-xs font-medium text-muted-foreground">{item.source}:</span>
                <span className={`text-sm font-medium ${getSentimentColor(item.sentiment)}`}>
                  {item.headline}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}