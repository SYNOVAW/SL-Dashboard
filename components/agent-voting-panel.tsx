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
import { AgentDetailModal } from "@/components/agent-detail-modal"

interface AgentVote {
  name: string
  icon: React.ReactNode
  sentiment: "Positive" | "Negative" | "Neutral"
  percentage: number
  reasoning: string
  color: string
}

export function AgentVotingPanel() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [expandedView, setExpandedView] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedAgentForModal, setSelectedAgentForModal] = useState<AgentVote | null>(null)

  const handleRefreshVotes = async () => {
    setIsRefreshing(true)
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsRefreshing(false)
  }

  const handleAgentClick = (agent: AgentVote) => {
    setSelectedAgentForModal(agent)
    setModalOpen(true)
  }

  const agentVotes: AgentVote[] = [
    {
      name: "RL Agent",
      icon: <Brain className="h-4 w-4" />,
      sentiment: "Negative",
      percentage: 72,
      reasoning: "短期のモメンタム弱い、下降トレンド継続",
      color: "negative",
    },
    {
      name: "News Agent",
      icon: <Newspaper className="h-4 w-4" />,
      sentiment: "Neutral",
      percentage: 68,
      reasoning: "報道は分岐、やや慎重な見方が優勢",
      color: "neutral",
    },
    {
      name: "Financial Agent",
      icon: <TrendingUp className="h-4 w-4" />,
      sentiment: "Positive",
      percentage: 85,
      reasoning: "売上・純利益堅調、ファンダメンタルズ良好",
      color: "positive",
    },
    {
      name: "Institutional Agent",
      icon: <Building className="h-4 w-4" />,
      sentiment: "Positive",
      percentage: 78,
      reasoning: "目標株価平均 +15%、機関投資家は強気",
      color: "positive",
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
        <p className="text-base text-muted-foreground mt-2">4エージェントによるマルチモーダル分析</p>
      </CardHeader>
      <CardContent>
        {/* 4分割グリッドレイアウト */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {agentVotes.map((agent, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div 
                    className={`group p-6 rounded-2xl border bg-gradient-to-br from-card/90 to-card/70 hover-lift glass-morphism cursor-pointer transition-all duration-300 hover:shadow-lg scale-in border-border/20 hover:border-[var(--highlight)]/30`}
                    onClick={() => handleAgentClick(agent)}
                  >
                    {/* エージェント名とアイコン */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-[var(--highlight)]/15 to-[var(--highlight)]/10 text-[var(--highlight)] group-hover:glow-cyan transition-all duration-300 group-hover:scale-110">
                        {agent.icon}
                      </div>
                      <h4 className="font-bold text-lg text-card-foreground group-hover:text-[var(--highlight)] transition-colors duration-300">{agent.name}</h4>
                    </div>
                    
                    {/* センチメントと信頼度 */}
                    <div className="flex items-center justify-between mb-4">
                      <Badge
                        variant="outline"
                        className={getFinancialBadgeClasses('sentiment', agent.sentiment)}
                      >
                        {agent.sentiment}
                      </Badge>
                      <div className="hover-lift smooth-bounce">
                        <CircularGauge 
                          value={agent.percentage} 
                          size={56} 
                          strokeWidth={8} 
                          showPercentText={false} 
                          label={<span className="text-xs text-card-foreground font-bold">{agent.percentage}%</span>} 
                        />
                      </div>
                    </div>
                    
                    {/* 理由（8-12 words） */}
                    <div className="text-sm text-muted-foreground leading-relaxed">
                      {agent.reasoning}
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-sm bg-card/95 border-border/30 enhanced-shadow rounded-xl p-4 glass-morphism">
                  <div className="space-y-2">
                    <h5 className="font-semibold text-card-foreground">{agent.name} 詳細分析</h5>
                    <p className="text-sm text-muted-foreground leading-relaxed">{agent.reasoning}</p>
                    <div className="text-xs text-[var(--highlight)] font-medium">
                      クリックで詳細分析を表示 →
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        {/* コンセンサス要約 */}
        <div className="mt-8 p-6 bg-gradient-to-br from-muted/20 to-muted/10 rounded-2xl border border-border/20 hover-lift glass-morphism">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-full bg-[var(--highlight)]/10 mt-1">
              <TrendingUp className="h-5 w-5 text-[var(--highlight)]" />
            </div>
            <div className="space-y-3 flex-1">
              <h4 className="text-xl font-bold text-card-foreground">コンセンサス要約</h4>
              <p className="text-base text-muted-foreground leading-relaxed">
                エージェント間で意見分岐。ファンダメンタルズ派は強気、テクニカル派は弱気。
                ニュース解析は中立的評価で、慎重な判断が必要な局面。
              </p>
              <div className="flex items-center gap-3 pt-2 flex-wrap">
                <div className="px-4 py-2 bg-[var(--positive)]/10 rounded-full text-sm font-medium text-[var(--positive)] border border-[var(--positive)]/20">
                  50% Positive
                </div>
                <div className="px-4 py-2 bg-[var(--negative)]/10 rounded-full text-sm font-medium text-[var(--negative)] border border-[var(--negative)]/20">
                  25% Negative
                </div>
                <div className="px-4 py-2 bg-[var(--neutral)]/10 rounded-full text-sm font-medium text-[var(--neutral)] border border-[var(--neutral)]/20">
                  25% Neutral
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Detail Modal */}
        <AgentDetailModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          agent={selectedAgentForModal}
        />
      </CardContent>
    </Card>
  )
}
