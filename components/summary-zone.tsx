import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CircularGauge } from "@/components/ui/circular-gauge"
import { TrendingUp, TrendingDown, Minus, Clock, Shield, AlertTriangle, Database, Wifi, WifiOff } from "lucide-react"
import { getSentimentColorClasses, getFinancialBadgeClasses } from "@/lib/colors"
import { formatTimestamp, formatTimeAgo, formatDataDelay, getMonospaceClass } from "@/lib/formatters"
import { DataSource, DataStatus, ConfidenceLevel } from "@/lib/types"

export function SummaryZone() {
  const overallSentiment = "Neutral"
  const confidenceScore = 68
  const biasNote = "Mixed signals from earnings vs market conditions"
  const lastUpdate = new Date(Date.now() - 2 * 60 * 1000) // 2 minutes ago
  const nextRefresh = new Date(Date.now() + 6 * 60 * 60 * 1000) // 6 hours from now
  const dataSource: DataSource = 'Reuters'
  const dataStatus: DataStatus = 'real-time'
  const confidence: ConfidenceLevel = 'high'
  const delayMinutes = 0

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

          {/* Time Context & Data Transparency */}
          <div className="space-y-4 scale-in">
            {/* Data Status Indicator */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-muted/20 to-muted/10 border border-border/30 hover-lift">
              <div className="flex items-center gap-2 mb-2">
                {dataStatus === 'real-time' ? (
                  <Wifi className="h-4 w-4 text-[var(--positive)]" />
                ) : (
                  <WifiOff className="h-4 w-4 text-[var(--negative)]" />
                )}
                <span className="text-sm text-muted-foreground font-medium">Data Status</span>
              </div>
              <div className={`text-lg font-bold ${getMonospaceClass()}`}>
                {formatDataDelay(delayMinutes)}
              </div>
            </div>
            
            {/* Last Update */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-muted/20 to-muted/10 border border-border/30 hover-lift">
              <div className="text-sm text-muted-foreground font-medium mb-1">Last Update</div>
              <div className={`text-sm font-bold text-card-foreground ${getMonospaceClass()}`}>
                {formatTimestamp(lastUpdate, { includeSeconds: true })}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {formatTimeAgo(lastUpdate)}
              </div>
            </div>
            
            {/* Next Refresh */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-[var(--highlight)]/10 to-[var(--highlight)]/5 border border-[var(--highlight)]/20 hover-lift glow-cyan">
              <div className="text-sm text-muted-foreground font-medium mb-1">Next Refresh</div>
              <div className={`text-sm font-bold text-[var(--highlight)] ${getMonospaceClass()}`}>
                {formatTimestamp(nextRefresh, { format: 'time-only' })}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-r from-muted/20 to-muted/10 rounded-2xl border border-border/20 hover-lift glass-morphism">
          <div className="flex items-start gap-4">
            <div className="w-3 h-3 rounded-full bg-[var(--highlight)] mt-3 flex-shrink-0 pulse-glow" />
            <div className="flex-1">
              <h4 className="text-lg font-bold text-card-foreground mb-2">Market Analysis Summary</h4>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">{biasNote}</p>
              
              {/* Data Source Attribution */}
              <div className="flex items-center justify-between flex-wrap gap-4 mt-4 pt-4 border-t border-border/20">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">Source:</span>
                    <span className={`text-sm font-semibold text-card-foreground ${getMonospaceClass()}`}>{dataSource}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-[var(--positive)]" />
                    <span className="text-sm font-medium text-muted-foreground">Confidence:</span>
                    <Badge variant="outline" className={`text-xs px-2 py-1 ${
                      confidence === 'high' ? 'bg-[var(--positive)]/10 text-[var(--positive)] border-[var(--positive)]/30' :
                      confidence === 'medium' ? 'bg-[var(--neutral)]/10 text-[var(--neutral)] border-[var(--neutral)]/30' :
                      'bg-[var(--negative)]/10 text-[var(--negative)] border-[var(--negative)]/30'
                    }`}>
                      {confidence.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-[var(--highlight)]/10 rounded-full text-xs font-medium text-[var(--highlight)] border border-[var(--highlight)]/20">
                    AI-Powered
                  </div>
                  <div className="px-3 py-1 bg-muted/50 rounded-full text-xs font-medium text-muted-foreground">
                    {formatDataDelay(delayMinutes)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Professional Disclaimer */}
        <div className="mt-6 p-4 bg-gradient-to-r from-amber-50/50 to-amber-100/30 dark:from-amber-950/20 dark:to-amber-900/10 rounded-xl border border-amber-200/50 dark:border-amber-800/30">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <h5 className="text-sm font-semibold text-amber-800 dark:text-amber-200 mb-1">
                Risk Disclosure
              </h5>
              <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
                This analysis is for informational purposes only and should not be considered as investment advice. 
                Market data may be delayed. Past performance does not guarantee future results. 
                Trading involves substantial risk of loss.
              </p>
              <div className="flex items-center gap-2 mt-2 text-xs text-amber-600 dark:text-amber-400">
                <span className={getMonospaceClass()}>Last Updated: {formatTimestamp(new Date(), { format: 'short' })}</span>
                <span>•</span>
                <span>© 2025 Financial Dashboard</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
