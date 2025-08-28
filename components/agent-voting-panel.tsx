import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Brain, Newspaper, TrendingUp, Building } from "lucide-react"
import { CircularGauge } from "@/components/ui/circular-gauge"

interface AgentVote {
  name: string
  icon: React.ReactNode
  sentiment: "Bullish" | "Bearish" | "Neutral"
  percentage: number
  reasoning: string
  color: string
}

export function AgentVotingPanel() {
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

  const getSentimentBadgeColor = (sentiment: string) => {
    switch (sentiment) {
      case "Bullish":
        return "bg-[var(--positive)]/10 text-[var(--positive)] border-[var(--positive)]/20"
      case "Bearish":
        return "bg-[var(--negative)]/10 text-[var(--negative)] border-[var(--negative)]/20"
      default:
        return "bg-[var(--neutral)]/10 text-[var(--neutral)] border-[var(--neutral)]/20"
    }
  }

  return (
    <Card className="w-full bg-card border-border/20 soft-shadow rounded-xl">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-foreground font-semibold">
          Agent Voting Panel
          <Badge variant="outline" className="ml-auto bg-[var(--highlight)]/10 text-[var(--highlight)] border-[var(--highlight)]/20">
            4 Agents Active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {agentVotes.map((agent, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="space-y-3 p-4 rounded-xl border border-border/10 bg-card hover:bg-accent/5 transition-all duration-200 cursor-pointer soft-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-[var(--highlight)]/10 text-[var(--highlight)]">{agent.icon}</div>
                        <div>
                          <h4 className="font-medium text-foreground">{agent.name}</h4>
                          <Badge
                            variant="outline"
                            className={`${getSentimentBadgeColor(agent.sentiment)} text-xs font-inter`}
                          >
                            {agent.sentiment}
                          </Badge>
                        </div>
                      </div>
                      <CircularGauge value={agent.percentage} size={64} strokeWidth={8} showPercentText={false} label={<span className="text-xs text-foreground font-semibold">{agent.percentage}%</span>} sublabel={<span className="text-[10px] text-muted-foreground">Vote</span>} />
                    </div>
                    <div className="relative">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-[var(--highlight)] to-[var(--highlight)]/80 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${agent.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-xs bg-card border-border/20 soft-shadow rounded-lg">
                  <p className="text-sm text-foreground">{agent.reasoning}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-6 p-4 bg-muted/30 rounded-xl border border-border/10 soft-shadow">
          <h4 className="font-semibold text-foreground mb-2">Consensus Summary</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Mixed sentiment with slight bullish bias (50% bullish vs 30% bearish). RL and Institutional agents show
            confidence in continued upward momentum, while News agent highlights regulatory concerns.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
