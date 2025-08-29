"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { 
  Brain, 
  Newspaper, 
  TrendingUp, 
  Building2, 
  RefreshCw, 
  Target, 
  CheckCircle, 
  AlertTriangle,
  XCircle,
  Info
} from "lucide-react"
import { useState } from "react"
import { CircularGauge } from "@/components/ui/circular-gauge"

interface AgentAnalysis {
  id: string
  name: string
  type: "RL" | "News" | "Financial" | "Institutional"
  icon: React.ReactNode
  recommendation: "Strong Buy" | "Buy" | "Hold" | "Sell" | "Strong Sell"
  confidence: number
  sentiment: "Positive" | "Negative" | "Neutral"
  reasoning: string
  detailedAnalysis: string
  keyFactors: string[]
  riskLevel: "Low" | "Medium" | "High"
  timeHorizon: "Short" | "Medium" | "Long"
  lastUpdated: string
  dataPoints: number
}

interface MultiAgentAnalysisPanelProps {
  symbol?: string
  companyName?: string
}

export function MultiAgentAnalysisPanel({ 
  symbol = "META", 
  companyName = "Meta Platforms Inc" 
}: MultiAgentAnalysisPanelProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)

  const agentAnalyses: AgentAnalysis[] = [
    {
      id: "rl-agent",
      name: "Reinforcement Learning Agent",
      type: "RL",
      icon: <Brain className="h-5 w-5" />,
      recommendation: "Hold",
      confidence: 72,
      sentiment: "Neutral",
      reasoning: "Technical patterns show consolidation phase with mixed momentum signals",
      detailedAnalysis: "RL model trained on 5 years of price action identifies current range-bound behavior. Algorithm suggests waiting for breakout confirmation above $495 resistance or support break below $480.",
      keyFactors: [
        "Price consolidation pattern detected",
        "Volume declining trend",
        "RSI in neutral territory (45-55)",
        "Moving averages converging"
      ],
      riskLevel: "Medium",
      timeHorizon: "Short",
      lastUpdated: "2 min ago",
      dataPoints: 50000
    },
    {
      id: "news-agent",
      name: "News Sentiment Agent",
      type: "News",
      icon: <Newspaper className="h-5 w-5" />,
      recommendation: "Buy",
      confidence: 78,
      sentiment: "Positive",
      reasoning: "Recent earnings beat expectations, positive AI revenue guidance, regulatory concerns easing",
      detailedAnalysis: "NLP analysis of 1,200+ news articles in past 48 hours shows improving sentiment around AI capabilities and metaverse investments. Regulatory sentiment improving in EU markets.",
      keyFactors: [
        "Q2 earnings beat by 12%",
        "AI revenue up 156% YoY",
        "Reduced regulatory fines",
        "Positive analyst revisions"
      ],
      riskLevel: "Low",
      timeHorizon: "Medium",
      lastUpdated: "5 min ago",
      dataPoints: 1247
    },
    {
      id: "financial-agent",
      name: "Financial Analysis Agent",
      type: "Financial",
      icon: <TrendingUp className="h-5 w-5" />,
      recommendation: "Strong Buy",
      confidence: 85,
      sentiment: "Positive",
      reasoning: "Strong fundamentals: 23% revenue growth, improving margins, solid balance sheet",
      detailedAnalysis: "DCF model values stock at $520-540 range. Revenue diversification reducing Meta's advertising dependency. Operating margins expanding due to efficiency improvements.",
      keyFactors: [
        "P/E ratio at 24.2x (vs industry 28.5x)",
        "FCF yield of 6.2%",
        "ROIC improved to 18.5%",
        "Debt-to-equity at healthy 0.12"
      ],
      riskLevel: "Low",
      timeHorizon: "Long",
      lastUpdated: "1 min ago",
      dataPoints: 847
    },
    {
      id: "institutional-agent",
      name: "Institutional Flow Agent",
      type: "Institutional",
      icon: <Building2 className="h-5 w-5" />,
      recommendation: "Buy",
      confidence: 81,
      sentiment: "Positive",
      reasoning: "Net institutional buying, 12 analyst upgrades this quarter, avg. price target $510",
      detailedAnalysis: "Smart money flow shows consistent accumulation. Hedge fund positioning increased 15% in Q2. Options flow indicates bullish positioning in 3-6 month timeframe.",
      keyFactors: [
        "Institutional ownership at 65.2%",
        "Average analyst PT: $510 (+4.2%)",
        "Insider selling decreased 40%",
        "ETF inflows of $2.1B this month"
      ],
      riskLevel: "Low",
      timeHorizon: "Medium",
      lastUpdated: "3 min ago",
      dataPoints: 324
    }
  ]

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsRefreshing(false)
  }

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case "Strong Buy":
        return "text-[var(--positive)] bg-[var(--positive)]/10 border-[var(--positive)]/30"
      case "Buy":
        return "text-[var(--positive)] bg-[var(--positive)]/10 border-[var(--positive)]/30"
      case "Hold":
        return "text-[var(--neutral)] bg-[var(--neutral)]/10 border-[var(--neutral)]/30"
      case "Sell":
        return "text-[var(--negative)] bg-[var(--negative)]/10 border-[var(--negative)]/30"
      case "Strong Sell":
        return "text-[var(--negative)] bg-[var(--negative)]/10 border-[var(--negative)]/30"
      default:
        return "text-muted-foreground bg-muted/10 border-muted/30"
    }
  }

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case "Strong Buy":
      case "Buy":
        return <CheckCircle className="h-4 w-4" />
      case "Hold":
        return <AlertTriangle className="h-4 w-4" />
      case "Sell":
      case "Strong Sell":
        return <XCircle className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "text-[var(--positive)]"
      case "Medium":
        return "text-[var(--neutral)]"
      case "High":
        return "text-[var(--negative)]"
      default:
        return "text-muted-foreground"
    }
  }

  // Calculate consensus
  const recommendations = agentAnalyses.map(agent => agent.recommendation)
  const avgConfidence = agentAnalyses.reduce((sum, agent) => sum + agent.confidence, 0) / agentAnalyses.length
  
  const consensusRecommendation = (() => {
    const buyCount = recommendations.filter(r => r === "Strong Buy" || r === "Buy").length
    const holdCount = recommendations.filter(r => r === "Hold").length
    const sellCount = recommendations.filter(r => r === "Sell" || r === "Strong Sell").length
    
    if (buyCount > holdCount && buyCount > sellCount) return "Buy"
    if (sellCount > buyCount && sellCount > holdCount) return "Sell"
    return "Hold"
  })()

  return (
    <Card className="w-full bg-card border-border/20 enhanced-shadow rounded-2xl hover-lift gradient-bg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-gradient-to-br from-[var(--highlight)]/20 to-[var(--highlight)]/10 glow-cyan">
                <Target className="h-5 w-5 text-[var(--highlight)]" />
              </div>
              <CardTitle className="text-2xl font-bold text-card-foreground">
                Multi-Agent Analysis
              </CardTitle>
              <Badge variant="outline" className="bg-gradient-to-r from-[var(--highlight)]/15 to-[var(--highlight)]/10 text-[var(--highlight)] border-[var(--highlight)]/30 px-3 py-1">
                {symbol}
              </Badge>
            </div>
            <p className="text-muted-foreground">{companyName} - Comprehensive AI Assessment</p>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="border-border/50 hover:bg-accent/50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Analyzing...' : 'Refresh'}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Consensus Summary */}
        <div className="p-6 bg-gradient-to-br from-muted/20 to-muted/10 rounded-2xl border border-border/20 glass-morphism">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-[var(--highlight)]/10">
              <Target className="h-6 w-6 text-[var(--highlight)]" />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-xl font-bold text-card-foreground mb-2">Consensus Recommendation</h3>
                <div className="flex items-center gap-4">
                  <Badge className={`${getRecommendationColor(consensusRecommendation)} text-lg px-4 py-2 font-semibold`}>
                    {getRecommendationIcon(consensusRecommendation)}
                    {consensusRecommendation}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Avg. Confidence:</span>
                    <span className="font-financial font-bold text-lg">{avgConfidence.toFixed(0)}%</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--positive)]">
                    {recommendations.filter(r => r === "Strong Buy" || r === "Buy").length}
                  </div>
                  <div className="text-sm text-muted-foreground">Buy Signals</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--neutral)]">
                    {recommendations.filter(r => r === "Hold").length}
                  </div>
                  <div className="text-sm text-muted-foreground">Hold Signals</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--negative)]">
                    {recommendations.filter(r => r === "Sell" || r === "Strong Sell").length}
                  </div>
                  <div className="text-sm text-muted-foreground">Sell Signals</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Analysis Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {agentAnalyses.map((agent, index) => (
            <div
              key={agent.id}
              className="group p-6 rounded-2xl border bg-gradient-to-br from-card/90 to-card/70 hover-lift glass-morphism cursor-pointer transition-all duration-300 hover:shadow-lg scale-in border-border/20 hover:border-[var(--highlight)]/30"
              onClick={() => setSelectedAgent(selectedAgent === agent.id ? null : agent.id)}
            >
              {/* Agent Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-[var(--highlight)]/15 to-[var(--highlight)]/10 text-[var(--highlight)] group-hover:glow-cyan transition-all duration-300">
                    {agent.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-card-foreground group-hover:text-[var(--highlight)] transition-colors duration-300">
                      {agent.name}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Updated {agent.lastUpdated}</span>
                      <span>•</span>
                      <span>{agent.dataPoints.toLocaleString()} data points</span>
                    </div>
                  </div>
                </div>
                <CircularGauge 
                  value={agent.confidence} 
                  size={50} 
                  strokeWidth={6} 
                  showPercentText={false}
                  label={<span className="text-xs font-bold">{agent.confidence}%</span>}
                />
              </div>

              {/* Recommendation & Risk */}
              <div className="flex items-center justify-between mb-4">
                <Badge className={`${getRecommendationColor(agent.recommendation)} px-3 py-1 font-semibold`}>
                  {getRecommendationIcon(agent.recommendation)}
                  {agent.recommendation}
                </Badge>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Risk:</span>
                  <span className={`font-medium ${getRiskColor(agent.riskLevel)}`}>
                    {agent.riskLevel}
                  </span>
                </div>
              </div>

              {/* Reasoning */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {agent.reasoning}
              </p>

              {/* Expanded Details */}
              {selectedAgent === agent.id && (
                <div className="space-y-4 pt-4 border-t border-border/30 animate-in slide-in-from-top-2 duration-300">
                  {/* Detailed Analysis */}
                  <div>
                    <h5 className="font-semibold text-card-foreground mb-2">Detailed Analysis</h5>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {agent.detailedAnalysis}
                    </p>
                  </div>

                  {/* Key Factors */}
                  <div>
                    <h5 className="font-semibold text-card-foreground mb-2">Key Factors</h5>
                    <ul className="space-y-1">
                      {agent.keyFactors.map((factor, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-[var(--positive)] mt-0.5 flex-shrink-0" />
                          {factor}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Additional Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground">Time Horizon</div>
                      <div className="font-medium">{agent.timeHorizon}-term</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Sentiment</div>
                      <div className={`font-medium ${
                        agent.sentiment === 'Positive' ? 'text-[var(--positive)]' :
                        agent.sentiment === 'Negative' ? 'text-[var(--negative)]' :
                        'text-[var(--neutral)]'
                      }`}>
                        {agent.sentiment}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Click to expand indicator */}
              <div className="text-xs text-[var(--highlight)] font-medium mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {selectedAgent === agent.id ? 'Click to collapse ↑' : 'Click for details →'}
              </div>
            </div>
          ))}
        </div>

        {/* Overall Confidence Meter */}
        <div className="p-4 bg-gradient-to-r from-muted/10 to-muted/5 rounded-xl border border-border/20">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-card-foreground">Overall Confidence</span>
            <span className="font-financial font-bold text-lg">{avgConfidence.toFixed(1)}%</span>
          </div>
          <Progress value={avgConfidence} className="h-3" />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Conservative</span>
            <span>Moderate</span>
            <span>Aggressive</span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-xs text-muted-foreground opacity-70 text-center bg-muted/10 p-3 rounded-lg border border-border/20">
          AI-generated analysis for informational purposes only. Not investment advice. 
          Past performance does not guarantee future results. Please consult with financial professionals.
        </div>
      </CardContent>
    </Card>
  )
}