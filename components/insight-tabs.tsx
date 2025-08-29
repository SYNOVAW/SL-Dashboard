"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Newspaper, TrendingUp, Target, MessageSquare, ExternalLink, Calendar, DollarSign } from "lucide-react"

export function InsightTabs() {
  const [activeTab, setActiveTab] = useState("news")
  const [selectedNewsItem, setSelectedNewsItem] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleTabChange = async (tab: string) => {
    setIsLoading(true)
    setActiveTab(tab)
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 200))
    setIsLoading(false)
  }

  const handleNewsClick = (index: number) => {
    setSelectedNewsItem(selectedNewsItem === index ? null : index)
  }
  const newsItems = [
    {
      title: "Q4 Earnings Beat Expectations",
      sentiment: "Positive",
      date: "2025-03-24",
      summary: "Company reported strong quarterly results with revenue growth of 15% YoY",
    },
    {
      title: "Regulatory Concerns Emerge",
      sentiment: "Negative",
      date: "2025-03-23",
      summary: "New regulatory framework may impact future operations and profitability",
    },
    {
      title: "Strategic Partnership Announced",
      sentiment: "Positive",
      date: "2025-03-22",
      summary: "Major partnership deal expected to drive growth in emerging markets",
    },
  ]

  const financialMetrics = [
    { metric: "Revenue (Q4)", value: "$2.4B", change: "+15%", trend: "up" },
    { metric: "Net Income", value: "$480M", change: "+22%", trend: "up" },
    { metric: "Debt-to-Equity", value: "0.35", change: "-5%", trend: "down" },
    { metric: "ROE", value: "18.5%", change: "+2.1%", trend: "up" },
  ]

  const forecasts = [
    { analyst: "Goldman Sachs", target: "$680", timeframe: "Q3 2025" },
    { analyst: "Morgan Stanley", target: "$650", timeframe: "Q3 2025" },
    { analyst: "JP Morgan", target: "$620", timeframe: "Q2 2025" },
    { analyst: "Bank of America", target: "$700", timeframe: "Q4 2025" },
  ]

  const debateLog = [
    {
      agent: "RL Agent",
      point: "Technical indicators show strong momentum continuation",
      timestamp: "14:25",
    },
    {
      agent: "News Agent",
      point: "Regulatory headwinds could create significant downside risk",
      timestamp: "14:27",
    },
    {
      agent: "Financial Agent",
      point: "Balance sheet strength provides good downside protection",
      timestamp: "14:30",
    },
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Detailed Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger 
              value="news" 
              className="flex items-center gap-2 data-[state=active]:text-[var(--accent)] data-[state=active]:font-semibold data-[state=active]:underline underline-offset-8 transition-all duration-200"
            >
              <Newspaper className="h-4 w-4" />
              {isLoading && activeTab === "news" ? "Loading..." : "News"}
            </TabsTrigger>
            <TabsTrigger 
              value="financial" 
              className="flex items-center gap-2 data-[state=active]:text-[var(--accent)] data-[state=active]:font-semibold data-[state=active]:underline underline-offset-8 transition-all duration-200"
            >
              <TrendingUp className="h-4 w-4" />
              {isLoading && activeTab === "financial" ? "Loading..." : "Financial"}
            </TabsTrigger>
            <TabsTrigger 
              value="forecasts" 
              className="flex items-center gap-2 data-[state=active]:text-[var(--accent)] data-[state=active]:font-semibold data-[state=active]:underline underline-offset-8 transition-all duration-200"
            >
              <Target className="h-4 w-4" />
              {isLoading && activeTab === "forecasts" ? "Loading..." : "Forecasts"}
            </TabsTrigger>
            <TabsTrigger 
              value="debate" 
              className="flex items-center gap-2 data-[state=active]:text-[var(--accent)] data-[state=active]:font-semibold data-[state=active]:underline underline-offset-8 transition-all duration-200"
            >
              <MessageSquare className="h-4 w-4" />
              {isLoading && activeTab === "debate" ? "Loading..." : "Agent Debate"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="news" className="space-y-4">
            <div className="space-y-4">
              {newsItems.map((item, index) => (
                <div 
                  key={index} 
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedNewsItem === index 
                      ? 'border-[var(--accent)]/50 bg-[var(--accent)]/5' 
                      : 'border-border hover:border-[var(--accent)]/30'
                  }`}
                  onClick={() => handleNewsClick(index)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-card-foreground">{item.title}</h4>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={
                          item.sentiment === "Positive"
                            ? "bg-[var(--highlight)]/10 text-[var(--highlight)] border-[var(--highlight)]/20"
                            : "bg-[var(--neutral)]/10 text-[var(--neutral)] border-[var(--neutral)]/20"
                        }
                      >
                        {item.sentiment}
                      </Badge>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{item.summary}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {item.date}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="financial" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {financialMetrics.map((item, index) => (
                <div key={index} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-card-foreground">{item.metric}</h4>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-card-foreground">{item.value}</span>
                    <Badge
                      variant="outline"
                      className={
                        item.trend === "up"
                          ? "bg-chart-5/10 text-chart-5 border-chart-5/20"
                          : "bg-chart-4/10 text-chart-4 border-chart-4/20"
                      }
                    >
                      {item.change}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="forecasts" className="space-y-4">
            <div className="space-y-4">
              <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                <h4 className="font-medium text-card-foreground mb-2">Price Target Range</h4>
                <div className="text-2xl font-bold text-card-foreground">$620 - $700</div>
                <p className="text-sm text-muted-foreground">Average target: $662.50 (Q3 2025)</p>
              </div>

              {forecasts.map((forecast, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <h5 className="font-medium text-card-foreground">{forecast.analyst}</h5>
                    <p className="text-sm text-muted-foreground">{forecast.timeframe}</p>
                  </div>
                  <div className="text-lg font-bold text-card-foreground">{forecast.target}</div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="debate" className="space-y-4">
            <div className="space-y-4">
              {debateLog.map((entry, index) => (
                <div key={index}>
                  <div className="flex items-start gap-3 p-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-foreground text-sm">{entry.agent}</span>
                        <span className="text-xs text-muted-foreground">{entry.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{entry.point}</p>
                    </div>
                  </div>
                  {index < debateLog.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
