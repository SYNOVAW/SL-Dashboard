import { SummaryZone } from "@/components/summary-zone"
import { AgentVotingPanel } from "@/components/agent-voting-panel"
import { VisualDataLayer } from "@/components/visual-data-layer"
import { InsightTabs } from "@/components/insight-tabs"
import { UserSidebar } from "@/components/user-sidebar"
import { TrendingUp, Clock, Brain } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <header className="fade-in">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[var(--highlight)]/20 to-[var(--highlight)]/10 glow-cyan">
            <TrendingUp className="h-8 w-8 text-[var(--highlight)]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2 bg-gradient-to-r from-foreground to-[var(--highlight)] bg-clip-text">
              Market Dashboard
            </h1>
            <p className="text-lg text-muted-foreground font-medium">
              Multi-Agent AI Analysis & Real-time Sentiment Visualization
            </p>
          </div>
        </div>
        
        {/* Status Bar */}
        <div className="flex items-center gap-6 p-4 rounded-2xl bg-gradient-to-r from-muted/20 to-muted/10 border border-border/20 hover-lift">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[var(--positive)] pulse-glow" />
            <span className="text-sm font-medium text-muted-foreground">System Online</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-[var(--highlight)]" />
            <span className="text-sm font-medium text-muted-foreground">Last Update: 2 min ago</span>
          </div>
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-[var(--highlight)]" />
            <span className="text-sm font-medium text-muted-foreground">4 AI Agents Active</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Dashboard Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Summary Zone - Hero Section */}
          <div className="slide-up">
            <SummaryZone />
          </div>

          {/* Agent Voting Panel */}
          <div className="slide-up" style={{ animationDelay: "0.2s" }}>
            <AgentVotingPanel />
          </div>

          {/* Visual Data Layer */}
          <div className="slide-up" style={{ animationDelay: "0.4s" }}>
            <VisualDataLayer />
          </div>

          {/* Insight Tabs */}
          <div className="slide-up" style={{ animationDelay: "0.6s" }}>
            <InsightTabs />
          </div>
        </div>

        {/* Enhanced Sidebar */}
        <div className="lg:col-span-1">
          <div className="slide-up" style={{ animationDelay: "0.3s" }}>
            <UserSidebar />
          </div>
        </div>
      </div>
    </div>
  )
}