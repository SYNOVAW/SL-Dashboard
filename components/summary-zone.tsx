import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CircularGauge } from "@/components/ui/circular-gauge"
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
    <Card className="w-full bg-card soft-shadow fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold">
          Market Overview
          <Clock className="h-5 w-5 text-muted-foreground" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Judgment & Action */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              {getSentimentIcon(overallSentiment)}
              <Badge variant="outline" className={`${getSentimentColor(overallSentiment)} font-medium`}>
                {overallSentiment}
              </Badge>
              <Badge className="bg-[var(--highlight)]/10 text-[var(--highlight)] border-[var(--highlight)]/20" variant="outline">
                Suggested: Hold
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">Bias: {biasNote}</div>
          </div>

          {/* Confidence Ring */}
          <div className="flex justify-center">
            <CircularGauge value={confidenceScore} size={120} strokeWidth={10} label={<span className="text-sm">Confidence</span>} sublabel={<span className="text-xs">High</span>} />
          </div>

          {/* Time Context */}
          <div className="space-y-3">
            <div className="text-sm">
              <span className="text-muted-foreground">Last update:</span>
              <br />
              <span className="font-medium text-card-foreground">{lastUpdate}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Next refresh:</span>
              <br />
              <span className="font-medium text-[var(--highlight)]">{nextRefresh}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted/30 rounded-xl border border-border/30">
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 rounded-full bg-[var(--highlight)] mt-2 flex-shrink-0 glow-cyan" />
            <div>
              <h4 className="text-sm font-semibold text-card-foreground mb-1">Market Bias</h4>
              <p className="text-sm text-muted-foreground">{biasNote}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
