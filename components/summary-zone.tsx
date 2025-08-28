import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Minus, Clock } from "lucide-react"

export function SummaryZone() {
  const overallSentiment = "Neutral"
  const confidenceScore = 68
  const biasNote = "Mixed signals from earnings vs market conditions"
  const lastUpdate = "2025-03-25 14:30"
  const nextRefresh = "+6h"

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "Positive":
        return <TrendingUp className="h-5 w-5 text-[var(--positive)]" />
      case "Negative":
        return <TrendingDown className="h-5 w-5 text-[var(--negative)]" />
      default:
        return <Minus className="h-5 w-5 text-[var(--neutral)]" />
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "Positive":
        return "text-[var(--positive)] border-[var(--positive)] bg-transparent"
      case "Negative":
        return "text-[var(--negative)] border-[var(--negative)] bg-transparent"
      default:
        return "text-[var(--neutral)] border-[var(--neutral)] bg-transparent"
    }
  }

  return (
    <Card className="w-full bg-primary text-primary-foreground soft-shadow fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold">
          Market Summary
          <Clock className="h-5 w-5 text-white/70" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Overall Sentiment */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium text-white/70">Overall Sentiment</h3>
            </div>
            <div className="flex items-center gap-3">
              {getSentimentIcon(overallSentiment)}
              <Badge variant="outline" className={`${getSentimentColor(overallSentiment)} font-medium border-2`}>
                {overallSentiment}
              </Badge>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-white/70">Confidence Score</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold text-white">{confidenceScore}%</span>
                <span className="text-sm text-white/70">High Confidence</span>
              </div>
              <div className="relative">
                <Progress value={confidenceScore} className="h-3 bg-white/20 glow-cyan" />
                <div
                  className="absolute top-0 left-0 h-3 bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] rounded-full transition-all duration-700"
                  style={{ width: `${confidenceScore}%` }}
                />
              </div>
            </div>
          </div>

          {/* Time Context */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-white/70">Update Status</h3>
            <div className="space-y-1">
              <div className="text-sm">
                <span className="text-white/70">Last update:</span>
                <br />
                <span className="font-medium text-white">{lastUpdate}</span>
              </div>
              <div className="text-sm">
                <span className="text-white/70">Next refresh:</span>
                <br />
                <span className="font-medium text-[var(--accent)]">{nextRefresh}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-white/10 rounded-xl border border-[#29ABE2]/30 backdrop-blur-sm">
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 rounded-full bg-[var(--accent)] mt-2 flex-shrink-0 glow-cyan" />
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">Market Bias</h4>
              <p className="text-sm text-white/80">{biasNote}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
