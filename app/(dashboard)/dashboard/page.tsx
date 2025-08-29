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
import { AdvancedStockChart } from "@/components/charts/advanced-stock-chart"
import { MultiAgentAnalysisPanel } from "@/components/analysis/multi-agent-panel"
import { StockAnalysisCard } from "@/components/analysis/stock-analysis-card"
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

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
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

          {/* Featured Stock Analysis */}
          <div className="slide-up" style={{ animationDelay: "0.4s" }}>
            <ErrorBoundary>
              <StockAnalysisCard featured={true} />
            </ErrorBoundary>
          </div>

          {/* Advanced Stock Chart */}
          <div className="slide-up" style={{ animationDelay: "0.5s" }}>
            <ErrorBoundary>
              <AdvancedStockChart />
            </ErrorBoundary>
          </div>

          {/* Multi-Agent Analysis Panel */}
          <div className="slide-up" style={{ animationDelay: "0.6s" }}>
            <ErrorBoundary>
              <MultiAgentAnalysisPanel />
            </ErrorBoundary>
          </div>

          {/* Visual Data Layer (moved down) */}
          <div className="slide-up" style={{ animationDelay: "0.7s" }}>
            <ErrorBoundary>
              <VisualDataLayer />
            </ErrorBoundary>
          </div>

          {/* Insight Tabs */}
          <div className="slide-up" style={{ animationDelay: "0.8s" }}>
            <ErrorBoundary>
              <InsightTabs />
            </ErrorBoundary>
          </div>
          
          {/* Integration Test - Remove in production */}
          <div className="slide-up" style={{ animationDelay: "0.9s" }}>
            <ErrorBoundary>
              <IntegrationTest />
            </ErrorBoundary>
          </div>
        </div>

        {/* Right Sidebar - Combined Market Indices and User Profile */}
        <div className="xl:col-span-1 space-y-6">
          {/* Market Indices */}
          <div className="slide-up" style={{ animationDelay: "0.3s" }}>
            <ErrorBoundary>
              <MarketIndices />
            </ErrorBoundary>
          </div>
          
          {/* Additional Stock Analysis Cards */}
          <div className="slide-up" style={{ animationDelay: "0.4s" }}>
            <ErrorBoundary>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">Quick Analysis</h3>
                <StockAnalysisCard 
                  compact={true}
                  stockData={{
                    symbol: "AAPL",
                    companyName: "Apple Inc",
                    currentPrice: 189.75,
                    priceChange: 2.45,
                    priceChangePercent: 1.31,
                    marketCap: "$2.95T",
                    recommendation: "Buy",
                    confidence: 78,
                    targetPrice: 205.00,
                    analystCount: 42,
                    lastEarnings: { date: "2024-08-01", eps: 1.40, estimate: 1.35, surprise: 3.7 },
                    keyMetrics: { pe: 28.5, pb: 10.2, roe: 28.8, divYield: 0.47 },
                    chartData: [{ time: "1M", price: 182 }, { time: "Now", price: 189.75 }],
                    tags: ["Tech Giant", "iPhone", "Services"],
                    riskScore: 2.1,
                    nextEarnings: "2024-11-02"
                  }}
                />
                <StockAnalysisCard 
                  compact={true}
                  stockData={{
                    symbol: "GOOGL",
                    companyName: "Alphabet Inc",
                    currentPrice: 168.25,
                    priceChange: -1.85,
                    priceChangePercent: -1.09,
                    marketCap: "$2.08T",
                    recommendation: "Hold",
                    confidence: 65,
                    targetPrice: 175.00,
                    analystCount: 38,
                    lastEarnings: { date: "2024-07-23", eps: 1.89, estimate: 1.85, surprise: 2.2 },
                    keyMetrics: { pe: 22.8, pb: 4.2, roe: 14.2, divYield: 0.0 },
                    chartData: [{ time: "1M", price: 172 }, { time: "Now", price: 168.25 }],
                    tags: ["Search", "Cloud", "AI"],
                    riskScore: 2.8,
                    nextEarnings: "2024-10-24"
                  }}
                />
                <StockAnalysisCard 
                  compact={true}
                  stockData={{
                    symbol: "NVDA",
                    companyName: "NVIDIA Corp",
                    currentPrice: 125.45,
                    priceChange: 4.62,
                    priceChangePercent: 3.82,
                    marketCap: "$3.08T",
                    recommendation: "Strong Buy",
                    confidence: 92,
                    targetPrice: 145.00,
                    analystCount: 45,
                    lastEarnings: { date: "2024-08-28", eps: 0.68, estimate: 0.64, surprise: 6.3 },
                    keyMetrics: { pe: 58.2, pb: 52.1, roe: 115.2, divYield: 0.03 },
                    chartData: [{ time: "1M", price: 108 }, { time: "Now", price: 125.45 }],
                    tags: ["AI Chips", "Data Center", "Gaming"],
                    riskScore: 4.1,
                    nextEarnings: "2024-11-20"
                  }}
                />
              </div>
            </ErrorBoundary>
          </div>
          
          {/* User Sidebar */}
          <div className="slide-up" style={{ animationDelay: "0.5s" }}>
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