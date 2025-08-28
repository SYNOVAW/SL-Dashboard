import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CircularGauge } from "@/components/ui/circular-gauge"
import { TrendingUp, TrendingDown, Minus, Clock } from "lucide-react"
import { getSentimentColorClasses, getFinancialBadgeClasses } from "@/lib/colors"

export function SummaryZone() {
  const overallSentiment = "Neutral"
  const confidenceScore = 68
  const biasNote = "Mixed signals from earnings vs market conditions"
  const lastUpdate = "2025-03-25 14:30"
  const nextRefresh = "+6h"

  const getSentimentIcon = (sentiment: string) => {
    const colors = getSentimentColorClasses(sentiment)
    switch (sentiment) {
      case "Positive":
        return <TrendingUp className={`h-5 w-5 ${colors.text}`} />
      case "Negative":
        return <TrendingDown className={`h-5 w-5 ${colors.text}`} />
      default:
        return <Minus className={`h-5 w-5 ${colors.text}`} />
    }
  }

  return (
    <Card className="w-full bg-card hover-lift enhanced-shadow fade-in gradient-bg border-2 border-border/20">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-3xl font-bold text-card-foreground">
          Market Overview
          <div className="p-2 rounded-full bg-[var(--highlight)]/10 glow-cyan">
            <Clock className="h-6 w-6 text-[var(--highlight)]" />
          </div>
        </CardTitle>
        <p className="text-lg text-muted-foreground mt-2">Real-time AI sentiment analysis and market insights</p>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-8">
          {/* Judgment & Action */}
          <div className="space-y-4 scale-in">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="p-2 rounded-full bg-gradient-to-br from-[var(--neutral)]/20 to-[var(--neutral)]/10">
                {getSentimentIcon(overallSentiment)}
              </div>
              <Badge variant="outline" className={getFinancialBadgeClasses('sentiment', overallSentiment)}>
                {overallSentiment}
              </Badge>
            </div>
            <Badge variant="outline" className={`${getFinancialBadgeClasses('status')} px-4 py-2 hover-lift glow-cyan`}>
              Suggested Action: Hold
            </Badge>
            <div className="text-base text-muted-foreground font-medium">Market Bias: {biasNote}</div>
          </div>

          {/* Confidence Ring */}
          <div className="flex justify-center scale-in">
            <div className="hover-lift pulse-glow">
              <CircularGauge 
                value={confidenceScore} 
                size={140} 
                strokeWidth={12} 
                label={<span className="text-base font-semibold">Confidence</span>} 
                sublabel={<span className="text-sm font-medium">High Accuracy</span>} 
              />
            </div>
          </div>

          {/* Time Context */}
          <div className="space-y-4 scale-in">
            <div className="p-4 rounded-xl bg-gradient-to-br from-muted/20 to-muted/10 border border-border/30 hover-lift">
              <div className="text-sm text-muted-foreground font-medium mb-1">Last Update</div>
              <div className="text-lg font-bold text-card-foreground">{lastUpdate}</div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-[var(--highlight)]/10 to-[var(--highlight)]/5 border border-[var(--highlight)]/20 hover-lift glow-cyan">
              <div className="text-sm text-muted-foreground font-medium mb-1">Next Refresh</div>
              <div className="text-lg font-bold text-[var(--highlight)]">{nextRefresh}</div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-r from-muted/20 to-muted/10 rounded-2xl border border-border/20 hover-lift glass-morphism">
          <div className="flex items-start gap-4">
            <div className="w-3 h-3 rounded-full bg-[var(--highlight)] mt-3 flex-shrink-0 pulse-glow" />
            <div>
              <h4 className="text-lg font-bold text-card-foreground mb-2">Market Analysis Summary</h4>
              <p className="text-base text-muted-foreground leading-relaxed">{biasNote}</p>
              <div className="flex items-center gap-2 mt-4">
                <div className="px-3 py-1 bg-[var(--highlight)]/10 rounded-full text-xs font-medium text-[var(--highlight)] border border-[var(--highlight)]/20">
                  AI-Powered
                </div>
                <div className="px-3 py-1 bg-muted/50 rounded-full text-xs font-medium text-muted-foreground">
                  Real-time Analysis
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
