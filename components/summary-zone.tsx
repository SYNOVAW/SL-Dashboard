"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CircularGauge } from "@/components/ui/circular-gauge"
import { TrendingUp, TrendingDown, Minus, Clock, Shield, AlertTriangle, Database, Wifi, WifiOff } from "lucide-react"
import { getSentimentColorClasses, getFinancialBadgeClasses } from "@/lib/colors"
import { DataSource as DataSourceComponent } from "@/components/professional/data-source"
import { formatMarketTime, formatDataDelay, formatMarketStatus } from "@/lib/financial-utils"
import type { MarketSentiment, DataSourceInfo, MarketStatusInfo } from "@/types/financial"
import { ErrorBoundary } from "@/components/professional/error-boundary"
import { LoadingState, DataStatusIndicator } from "@/components/professional/loading-states"

interface SummaryZoneProps {
  isLoading?: boolean
  error?: string
  className?: string
}

export function SummaryZone({ isLoading = false, error, className }: SummaryZoneProps) {
  // Mock data - in real app, this would come from props or API
  const marketSentiment: MarketSentiment = {
    overallSentiment: "neutral",
    confidenceScore: 70,
    suggestedAction: "hold", 
    biasNote: "エージェント間で意見が分岐、慎重な評価が必要",
    consensusStrength: 62,
    volatilityIndex: 15.2,
    timestamp: new Date(),
    lastUpdated: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    dataSource: "Multi-agent consensus",
    confidence: 85,
    conflictDetected: true // New field for agent disagreement
  }

  const dataSource: DataSourceInfo = {
    source: "Bloomberg Terminal",
    lastUpdated: marketSentiment.lastUpdated,
    isRealTime: true,
    confidence: 85,
    delay: 0,
    status: "real-time",
    reliability: "high"
  }

  const marketStatus = formatMarketStatus()

  // Show loading state
  if (isLoading) {
    return (
      <LoadingState 
        variant="card"
        message="Loading market analysis..."
        showProgress
        progress={65}
        className={className}
      />
    )
  }

  // Show error state
  if (error) {
    return (
      <Card className={`w-full border-red-200 bg-red-50/50 ${className}`}>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center space-y-2">
            <AlertTriangle className="h-8 w-8 text-red-500 mx-auto" />
            <div className="text-sm font-medium text-red-700">Failed to load market data</div>
            <div className="text-xs text-red-600">{error}</div>
          </div>
        </CardContent>
      </Card>
    )
  }
  
  const getMonospaceClass = () => "font-financial"

  const getSentimentIcon = (sentiment: string) => {
    const colors = getSentimentColorClasses(sentiment)
    switch (sentiment.toLowerCase()) {
      case "positive":
      case "bullish":
        return <TrendingUp className={`h-5 w-5 ${colors.text}`} />
      case "negative":
      case "bearish":
        return <TrendingDown className={`h-5 w-5 ${colors.text}`} />
      default:
        return <Minus className={`h-5 w-5 ${colors.text}`} />
    }
  }

  return (
    <ErrorBoundary>
      <Card className={`w-full bg-card hover-lift enhanced-shadow fade-in gradient-bg border-2 border-border/20 ${className}`}>
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-3 text-3xl font-bold text-card-foreground">
                Summary Sentiment
                <div className="p-2 rounded-full bg-[var(--highlight)]/10 glow-cyan">
                  <Clock className="h-6 w-6 text-[var(--highlight)]" />
                </div>
                {marketSentiment.conflictDetected && (
                  <Badge variant="destructive" className="ml-2 text-xs px-2 py-1 bg-amber-500/10 text-amber-600 border-amber-500/30">
                    ⚠ Conflict
                  </Badge>
                )}
              </CardTitle>
              <p className="text-lg text-muted-foreground mt-2">
                マルチエージェント評価による市場センチメント分析
              </p>
            </div>
            <DataStatusIndicator 
              isRealTime={dataSource.isRealTime}
              lastUpdate={dataSource.lastUpdated}
            />
          </div>
        </CardHeader>
      <CardContent className="pt-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-8">
          {/* Judgment & Action */}
          <div className="space-y-4 scale-in">
            <div className="flex items-center gap-3 flex-wrap">
              <div className={`p-2 rounded-full bg-gradient-to-br ${getSentimentColorClasses(marketSentiment.overallSentiment).background}`}>
                {getSentimentIcon(marketSentiment.overallSentiment)}
              </div>
              <Badge variant="outline" className={getFinancialBadgeClasses('sentiment', marketSentiment.overallSentiment)}>
                {marketSentiment.overallSentiment.toUpperCase()}
              </Badge>
            </div>
            <Badge variant="outline" className={`${getFinancialBadgeClasses('status')} px-4 py-2 hover-lift glow-cyan`}>
              Suggested Action: {marketSentiment.suggestedAction.toUpperCase()}
            </Badge>
            <div className="text-base text-muted-foreground font-medium">
              Market Bias: {marketSentiment.biasNote}
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              Consensus Strength: <span className={`${getMonospaceClass()} font-semibold`}>
                {marketSentiment.consensusStrength}%
              </span>
              {marketSentiment.volatilityIndex && (
                <> • VIX: <span className={getMonospaceClass()}>{marketSentiment.volatilityIndex}</span></>
              )}
            </div>
          </div>

          {/* Confidence Ring */}
          <div className="flex justify-center scale-in">
            <div className="hover-lift pulse-glow">
              <CircularGauge 
                value={marketSentiment.confidenceScore} 
                size={140} 
                strokeWidth={12} 
                label={<span className="text-base font-semibold">Confidence</span>} 
                sublabel={
                  <span className="text-sm font-medium">
                    {marketSentiment.confidenceScore >= 80 ? 'High' : 
                     marketSentiment.confidenceScore >= 60 ? 'Medium' : 'Low'} Accuracy
                  </span>
                } 
              />
            </div>
          </div>

          {/* Time Context & Data Transparency */}
          <div className="space-y-4 scale-in">
            {/* Data Status Indicator */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-muted/20 to-muted/10 border border-border/30 hover-lift">
              <div className="flex items-center gap-2 mb-2">
                {dataSource.status === 'real-time' ? (
                  <Wifi className="h-4 w-4 text-[var(--positive)]" />
                ) : (
                  <WifiOff className="h-4 w-4 text-[var(--negative)]" />
                )}
                <span className="text-sm text-muted-foreground font-medium">Data Status</span>
              </div>
              <div className={`text-lg font-bold ${getMonospaceClass()} ${
                dataSource.status === 'real-time' ? 'text-positive' : 'text-neutral'
              }`}>
                {formatDataDelay(dataSource.delay || 0)}
              </div>
            </div>
            
            {/* Last Update */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-muted/20 to-muted/10 border border-border/30 hover-lift">
              <div className="text-sm text-muted-foreground font-medium mb-1">Last Update</div>
              <div className={`text-sm font-bold text-card-foreground ${getMonospaceClass()}`}>
                {formatMarketTime(dataSource.lastUpdated, { format: 'short' })}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {formatMarketTime(dataSource.lastUpdated, { format: 'relative' })}
              </div>
            </div>
            
            {/* Next Refresh */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-[var(--highlight)]/10 to-[var(--highlight)]/5 border border-[var(--highlight)]/20 hover-lift glow-cyan">
              <div className="text-sm text-muted-foreground font-medium mb-1">Market Status</div>
              <div className={`text-sm font-bold ${getMonospaceClass()} ${
                marketStatus.isOpen ? 'text-positive' : 'text-neutral'
              }`}>
                {marketStatus.status}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {marketStatus.nextEvent} in {marketStatus.timeUntilNext}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-r from-muted/20 to-muted/10 rounded-2xl border border-border/20 hover-lift glass-morphism">
          <div className="flex items-start gap-4">
            <div className="w-3 h-3 rounded-full bg-[var(--highlight)] mt-3 flex-shrink-0 pulse-glow" />
            <div className="flex-1">
              <h4 className="text-lg font-bold text-card-foreground mb-2">Market Analysis Summary</h4>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                {marketSentiment.biasNote}
              </p>
              
              {/* Data Source Attribution */}
              <div className="flex items-center justify-between flex-wrap gap-4 mt-4 pt-4 border-t border-border/20">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">Source:</span>
                    <span className={`text-sm font-semibold text-card-foreground ${getMonospaceClass()}`}>
                      {dataSource.source}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-[var(--positive)]" />
                    <span className="text-sm font-medium text-muted-foreground">Confidence:</span>
                    <Badge variant="outline" className={`text-xs px-2 py-1 ${
                      dataSource.reliability === 'high' ? 'bg-[var(--positive)]/10 text-[var(--positive)] border-[var(--positive)]/30' :
                      dataSource.reliability === 'medium' ? 'bg-[var(--neutral)]/10 text-[var(--neutral)] border-[var(--neutral)]/30' :
                      'bg-[var(--negative)]/10 text-[var(--negative)] border-[var(--negative)]/30'
                    }`}>
                      {dataSource.reliability?.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-[var(--highlight)]/10 rounded-full text-xs font-medium text-[var(--highlight)] border border-[var(--highlight)]/20">
                    AI-Powered
                  </div>
                  <div className="px-3 py-1 bg-muted/50 rounded-full text-xs font-medium text-muted-foreground">
                    {formatDataDelay(dataSource.delay || 0)}
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
                <span className={getMonospaceClass()}>
                  Last Updated: {formatMarketTime(dataSource.lastUpdated, { format: 'short' })}
                </span>
                <span>•</span>
                <span>© 2025 Financial Dashboard</span>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Data Source Attribution */}
        <DataSourceComponent
          source={dataSource.source}
          lastUpdated={dataSource.lastUpdated}
          isRealTime={dataSource.isRealTime}
          confidence={dataSource.confidence}
          delay={dataSource.delay}
        />
      </CardContent>
    </Card>
    </ErrorBoundary>
  )
}
