"use client"
import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Brain, Newspaper, TrendingUp, Building, RefreshCw, MoreVertical } from "lucide-react"
import { CircularGauge } from "@/components/ui/circular-gauge"
import { getSentimentColorClasses, getFinancialBadgeClasses } from "@/lib/colors"

interface AgentVote {
  name: string
  icon: React.ReactNode
  sentiment: "Bullish" | "Bearish" | "Neutral"
  percentage: number
  reasoning: string
  color: string
}

export function AgentVotingPanel() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [expandedView, setExpandedView] = useState(false)

  const handleRefreshVotes = async () => {
    setIsRefreshing(true)
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsRefreshing(false)
  }

  const handleAgentClick = (agentName: string) => {
    setSelectedAgent(selectedAgent === agentName ? null : agentName)
  }

  const agentVotes: AgentVote[] = [
    {
      name: "RL Agent",
      icon: <Brain className="h-4 w-4" />,
      sentiment: "Bullish",
      percentage: 40,
      reasoning: "Upward trend continues, but volatility increasing",
      color: "highlight",
    },
    {
      name: "News Agent",
      icon: <Newspaper className="h-4 w-4" />,
      sentiment: "Bearish",
      percentage: 30,
      reasoning: "Legal risks emphasized, negative sentiment in recent coverage",
      color: "negative",
    },
    {
      name: "Financial Agent",
      icon: <TrendingUp className="h-4 w-4" />,
      sentiment: "Neutral",
      percentage: 20,
      reasoning: "Mixed signals from earnings data and market indicators",
      color: "neutral",
    },
    {
      name: "Institutional Agent",
      icon: <Building className="h-4 w-4" />,
      sentiment: "Bullish",
      percentage: 10,
      reasoning: "Institutional buying patterns show continued confidence",
      color: "highlight",
    },
  ]


  return (
    <Card className="w-full bg-card border-border/20 enhanced-shadow rounded-2xl hover-lift slide-up gradient-bg">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-2xl font-bold text-card-foreground">
            <div className="p-2 rounded-full bg-gradient-to-br from-[var(--highlight)]/20 to-[var(--highlight)]/10 glow-cyan">
              <Brain className="h-5 w-5 text-[var(--highlight)]" />
            </div>
            Agent Voting Panel
            <Badge variant="outline" className="bg-gradient-to-r from-[var(--highlight)]/15 to-[var(--highlight)]/10 text-[var(--highlight)] border-[var(--highlight)]/30 px-4 py-2 font-semibold hover-lift pulse-glow">
              4 Agents Active
            </Badge>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefreshVotes}
              disabled={isRefreshing}
              className="border-border/50 hover:bg-accent/50 transition-all duration-200"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Updating...' : 'Refresh'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setExpandedView(!expandedView)}
              className="border-border/50 hover:bg-accent/50 transition-all duration-200"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="text-base text-muted-foreground mt-2">Real-time consensus from AI trading agents</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {agentVotes.map((agent, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div 
                    className={`group space-y-4 p-6 rounded-2xl border bg-gradient-to-br from-card/80 to-card/60 hover-lift glass-morphism cursor-pointer transition-all duration-300 hover:shadow-lg scale-in ${
                      selectedAgent === agent.name 
                        ? 'border-[var(--highlight)]/50 bg-gradient-to-br from-[var(--highlight)]/5 to-[var(--highlight)]/10' 
                        : 'border-border/20 hover:border-[var(--highlight)]/30'
                    }`}
                    onClick={() => handleAgentClick(agent.name)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-[var(--highlight)]/15 to-[var(--highlight)]/10 text-[var(--highlight)] group-hover:glow-cyan transition-all duration-300 group-hover:scale-110">
                          {agent.icon}
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-bold text-lg text-card-foreground group-hover:text-[var(--highlight)] transition-colors duration-300">{agent.name}</h4>
                          <Badge
                            variant="outline"
                            className={getFinancialBadgeClasses('sentiment', agent.sentiment)}
                          >
                            {agent.sentiment}
                          </Badge>
                        </div>
                      </div>
                      <div className="hover-lift smooth-bounce">
                        <CircularGauge 
                          value={agent.percentage} 
                          size={72} 
                          strokeWidth={10} 
                          showPercentText={false} 
                          label={<span className="text-sm text-card-foreground font-bold">{agent.percentage}%</span>} 
                          sublabel={<span className="text-xs text-muted-foreground font-medium">Vote Weight</span>} 
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-muted/50 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-[var(--highlight)] via-[var(--highlight)]/90 to-[var(--highlight)]/70 h-3 rounded-full transition-all duration-500 ease-out group-hover:shadow-lg"
                          style={{ width: `${agent.percentage}%` }}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-sm bg-card/95 border-border/30 enhanced-shadow rounded-xl p-4 glass-morphism">
                  <div className="space-y-2">
                    <h5 className="font-semibold text-card-foreground">{agent.name} Analysis</h5>
                    <p className="text-sm text-muted-foreground leading-relaxed">{agent.reasoning}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        {/* Enhanced Summary */}
        <div className="mt-8 p-6 bg-gradient-to-br from-muted/20 to-muted/10 rounded-2xl border border-border/20 hover-lift glass-morphism">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-full bg-[var(--highlight)]/10 mt-1">
              <TrendingUp className="h-5 w-5 text-[var(--highlight)]" />
            </div>
            <div className="space-y-3 flex-1">
              <h4 className="text-xl font-bold text-card-foreground">Consensus Summary</h4>
              <p className="text-base text-muted-foreground leading-relaxed">
                Mixed sentiment with slight bullish bias (50% bullish vs 30% bearish). RL and Institutional agents show
                confidence in continued upward momentum, while News agent highlights regulatory concerns.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="px-4 py-2 bg-[var(--positive)]/10 rounded-full text-sm font-medium text-[var(--positive)] border border-[var(--positive)]/20">
                  50% Bullish
                </div>
                <div className="px-4 py-2 bg-[var(--negative)]/10 rounded-full text-sm font-medium text-[var(--negative)] border border-[var(--negative)]/20">
                  30% Bearish
                </div>
                <div className="px-4 py-2 bg-[var(--neutral)]/10 rounded-full text-sm font-medium text-[var(--neutral)] border border-[var(--neutral)]/20">
                  20% Neutral
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
