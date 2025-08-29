"use client"

import { SummaryZone } from "@/components/summary-zone"
import { AgentVotingPanel } from "@/components/agent-voting-panel"
import { VisualDataLayer } from "@/components/visual-data-layer"
import { InsightTabs } from "@/components/insight-tabs"
import { UserSidebar } from "@/components/user-sidebar"
import { KPISnapshot } from "@/components/kpi-snapshot"
import { NewsTicker } from "@/components/professional/news-ticker"
import { MarketIndices } from "@/components/professional/market-indices"
import { KeyboardShortcuts } from "@/components/professional/keyboard-shortcuts"
import { ErrorBoundary } from "@/components/professional/error-boundary"
import { IntegrationTest } from "@/components/professional/integration-test"
import { TrendingUp, Clock, Brain } from "lucide-react"

export default function DashboardPage() {
  const handleRefreshData = () => {
    // In a real app, this would trigger data refresh
    window.location.reload()
  }

  const handleToggleTheme = () => {
    document.documentElement.classList.toggle('dark')
  }

  const handleOpenSearch = () => {
    // Focus search input or open search modal
    const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement
    searchInput?.focus()
  }

  return (
    <ErrorBoundary>
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

      {/* News Ticker */}
      <div className="fade-in">
        <NewsTicker />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
        {/* Main Dashboard Content */}
        <div className="xl:col-span-3 space-y-8">
          {/* Summary Zone - Hero Section */}
          <div className="slide-up">
            <ErrorBoundary>
              <SummaryZone />
            </ErrorBoundary>
          </div>

          {/* Agent Voting Panel */}
          <div className="slide-up" style={{ animationDelay: "0.2s" }}>
            <ErrorBoundary>
              <AgentVotingPanel />
            </ErrorBoundary>
          </div>

          {/* KPI Snapshot */}
          <div className="slide-up" style={{ animationDelay: "0.3s" }}>
            <ErrorBoundary>
              <KPISnapshot />
            </ErrorBoundary>
          </div>

          {/* Visual Data Layer */}
          <div className="slide-up" style={{ animationDelay: "0.4s" }}>
            <ErrorBoundary>
              <VisualDataLayer />
            </ErrorBoundary>
          </div>

          {/* Insight Tabs */}
          <div className="slide-up" style={{ animationDelay: "0.6s" }}>
            <ErrorBoundary>
              <InsightTabs />
            </ErrorBoundary>
          </div>
          
          {/* Integration Test - Remove in production */}
          <div className="slide-up" style={{ animationDelay: "0.8s" }}>
            <ErrorBoundary>
              <IntegrationTest />
            </ErrorBoundary>
          </div>
        </div>

        {/* Market Indices Sidebar */}
        <div className="xl:col-span-1 space-y-6">
          <div className="slide-up" style={{ animationDelay: "0.3s" }}>
            <ErrorBoundary>
              <MarketIndices />
            </ErrorBoundary>
          </div>
        </div>

        {/* Enhanced User Sidebar */}
        <div className="xl:col-span-1">
          <div className="slide-up" style={{ animationDelay: "0.4s" }}>
            <ErrorBoundary>
              <UserSidebar />
            </ErrorBoundary>
          </div>
        </div>
      </div>
      
      {/* Professional Keyboard Shortcuts */}
      <KeyboardShortcuts
        onRefreshData={handleRefreshData}
        onToggleTheme={handleToggleTheme}
        onOpenSearch={handleOpenSearch}
      />
    </div>
    </ErrorBoundary>
  )
}