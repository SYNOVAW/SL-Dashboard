"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Brain, Newspaper, TrendingUp, Building, Settings, Activity, Play, Pause, RotateCcw, Search, Filter, MoreVertical, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { useState } from "react"
import { CircularGauge } from "@/components/ui/circular-gauge"

interface Agent {
  id: string
  name: string
  type: "RL Agent" | "News Agent" | "Financial Agent" | "Institutional Agent"
  icon: React.ReactNode
  status: "active" | "idle" | "error" | "training"
  sentiment: "Positive" | "Negative" | "Neutral"
  confidence: number
  lastUpdated: Date
  reasoning: string
  performance: {
    accuracy: number
    trades: number
    winRate: number
    roi: number
  }
  settings: {
    enabled: boolean
    weight: number
    updateFrequency: number
  }
  metrics: {
    totalAnalyses: number
    avgResponseTime: number
    dataPoints: number
  }
}

export default function AgentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)

  const agents: Agent[] = [
    {
      id: "rl-001",
      name: "RL Agent Alpha",
      type: "RL Agent",
      icon: <Brain className="h-5 w-5" />,
      status: "active",
      sentiment: "Negative",
      confidence: 72,
      lastUpdated: new Date(Date.now() - 2 * 60 * 1000),
      reasoning: "短期のモメンタム弱い、下降トレンド継続",
      performance: {
        accuracy: 84.2,
        trades: 1247,
        winRate: 68.5,
        roi: 12.4
      },
      settings: {
        enabled: true,
        weight: 0.25,
        updateFrequency: 5
      },
      metrics: {
        totalAnalyses: 15642,
        avgResponseTime: 0.8,
        dataPoints: 45230
      }
    },
    {
      id: "news-001", 
      name: "News Sentiment Engine",
      type: "News Agent",
      icon: <Newspaper className="h-5 w-5" />,
      status: "active",
      sentiment: "Neutral",
      confidence: 68,
      lastUpdated: new Date(Date.now() - 5 * 60 * 1000),
      reasoning: "報道は分岐、やや慎重な見方が優勢",
      performance: {
        accuracy: 76.8,
        trades: 892,
        winRate: 72.1,
        roi: 8.9
      },
      settings: {
        enabled: true,
        weight: 0.2,
        updateFrequency: 10
      },
      metrics: {
        totalAnalyses: 8934,
        avgResponseTime: 1.2,
        dataPoints: 23451
      }
    },
    {
      id: "financial-001",
      name: "Financial Analysis Bot",
      type: "Financial Agent",
      icon: <TrendingUp className="h-5 w-5" />,
      status: "active", 
      sentiment: "Positive",
      confidence: 85,
      lastUpdated: new Date(Date.now() - 1 * 60 * 1000),
      reasoning: "売上・純利益堅調、ファンダメンタルズ良好",
      performance: {
        accuracy: 89.1,
        trades: 2156,
        winRate: 74.3,
        roi: 18.7
      },
      settings: {
        enabled: true,
        weight: 0.3,
        updateFrequency: 15
      },
      metrics: {
        totalAnalyses: 12678,
        avgResponseTime: 2.1,
        dataPoints: 34782
      }
    },
    {
      id: "institutional-001",
      name: "Institutional Flow Tracker",
      type: "Institutional Agent", 
      icon: <Building className="h-5 w-5" />,
      status: "training",
      sentiment: "Positive",
      confidence: 78,
      lastUpdated: new Date(Date.now() - 8 * 60 * 1000),
      reasoning: "目標株価平均 +15%、機関投資家は強気",
      performance: {
        accuracy: 81.5,
        trades: 1789,
        winRate: 69.8,
        roi: 15.2
      },
      settings: {
        enabled: true,
        weight: 0.25,
        updateFrequency: 30
      },
      metrics: {
        totalAnalyses: 9876,
        avgResponseTime: 3.4,
        dataPoints: 18942
      }
    }
  ]

  const getStatusIcon = (status: Agent['status']) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-positive" />
      case "idle": 
        return <Clock className="h-4 w-4 text-neutral" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-negative" />
      case "training":
        return <Activity className="h-4 w-4 text-highlight animate-pulse" />
    }
  }

  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case "active":
        return "bg-positive/10 text-positive border-positive/30"
      case "idle":
        return "bg-neutral/10 text-neutral border-neutral/30"
      case "error":
        return "bg-negative/10 text-negative border-negative/30" 
      case "training":
        return "bg-highlight/10 text-highlight border-highlight/30"
    }
  }

  const getSentimentColor = (sentiment: Agent['sentiment']) => {
    switch (sentiment) {
      case "Positive":
        return "text-positive"
      case "Negative": 
        return "text-negative"
      case "Neutral":
        return "text-neutral"
    }
  }

  const toggleAgent = (agentId: string) => {
    // Handle agent toggle
  }

  const restartAgent = (agentId: string) => {
    // Handle agent restart
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Agent Management</h1>
          <p className="text-muted-foreground">Monitor and control your financial analysis agents</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-highlight hover:bg-highlight/90">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search agents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Agent Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-positive/10">
                <CheckCircle className="h-5 w-5 text-positive" />
              </div>
              <div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-muted-foreground">Active</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-highlight/10">
                <Activity className="h-5 w-5 text-highlight" />
              </div>
              <div>
                <div className="text-2xl font-bold">1</div>
                <div className="text-sm text-muted-foreground">Training</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-positive/10">
                <TrendingUp className="h-5 w-5 text-positive" />
              </div>
              <div>
                <div className="text-2xl font-bold font-financial">82.1%</div>
                <div className="text-sm text-muted-foreground">Avg Accuracy</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-positive/10">
                <Brain className="h-5 w-5 text-positive" />
              </div>
              <div>
                <div className="text-2xl font-bold font-financial">13.8%</div>
                <div className="text-sm text-muted-foreground">Avg ROI</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {agents.map((agent) => (
              <Card key={agent.id} className="hover-lift transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-highlight/15 to-highlight/10 text-highlight">
                        {agent.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{agent.name}</CardTitle>
                        <div className="text-sm text-muted-foreground">{agent.type}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(agent.status)}>
                        {getStatusIcon(agent.status)}
                        {agent.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Badge variant="outline" className={getSentimentColor(agent.sentiment)}>
                        {agent.sentiment}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <div>
                        <CircularGauge 
                          value={agent.confidence} 
                          size={64} 
                          strokeWidth={6} 
                          label={<span className="text-xs font-bold">{agent.confidence}%</span>}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground leading-relaxed">
                    {agent.reasoning}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Accuracy</div>
                      <div className="font-financial font-bold">{agent.performance.accuracy}%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Win Rate</div>
                      <div className="font-financial font-bold">{agent.performance.winRate}%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Total Trades</div>
                      <div className="font-financial font-bold">{agent.performance.trades.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">ROI</div>
                      <div className="font-financial font-bold text-positive">+{agent.performance.roi}%</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border/20">
                    <div className="text-xs text-muted-foreground">
                      Updated {agent.lastUpdated.toLocaleTimeString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => restartAgent(agent.id)}
                      >
                        <RotateCcw className="h-3 w-3 mr-1" />
                        Restart
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toggleAgent(agent.id)}
                      >
                        {agent.status === "active" ? (
                          <>
                            <Pause className="h-3 w-3 mr-1" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="h-3 w-3 mr-1" />
                            Start
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {agents.map((agent) => (
                  <div key={agent.id} className="p-4 rounded-xl border bg-card/50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-highlight/15 to-highlight/10 text-highlight">
                          {agent.icon}
                        </div>
                        <div>
                          <div className="font-bold">{agent.name}</div>
                          <div className="text-sm text-muted-foreground">{agent.type}</div>
                        </div>
                      </div>
                      <Badge className={getStatusColor(agent.status)}>
                        {agent.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Accuracy</div>
                        <div className="text-xl font-bold font-financial">{agent.performance.accuracy}%</div>
                        <Progress value={agent.performance.accuracy} className="h-2 mt-2" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Win Rate</div>
                        <div className="text-xl font-bold font-financial">{agent.performance.winRate}%</div>
                        <Progress value={agent.performance.winRate} className="h-2 mt-2" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Total Analyses</div>
                        <div className="text-xl font-bold font-financial">{agent.metrics.totalAnalyses.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Avg Response Time</div>
                        <div className="text-xl font-bold font-financial">{agent.metrics.avgResponseTime}s</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Agent Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {agents.map((agent) => (
                  <div key={agent.id} className="p-4 rounded-xl border bg-card/50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-highlight/15 to-highlight/10 text-highlight">
                          {agent.icon}
                        </div>
                        <div>
                          <div className="font-bold">{agent.name}</div>
                          <div className="text-sm text-muted-foreground">{agent.type}</div>
                        </div>
                      </div>
                      <Switch checked={agent.settings.enabled} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Weight in Consensus</div>
                        <div className="text-lg font-bold font-financial">{(agent.settings.weight * 100)}%</div>
                        <Progress value={agent.settings.weight * 100} className="h-2 mt-2" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Update Frequency</div>
                        <div className="text-lg font-bold font-financial">Every {agent.settings.updateFrequency}min</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Data Points</div>
                        <div className="text-lg font-bold font-financial">{agent.metrics.dataPoints.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}