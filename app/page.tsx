import { SummaryZone } from "@/components/summary-zone"
import { AgentVotingPanel } from "@/components/agent-voting-panel"
import { VisualDataLayer } from "@/components/visual-data-layer"
import { InsightTabs } from "@/components/insight-tabs"
import { UserSidebar } from "@/components/user-sidebar"
import { ComplianceFooter } from "@/components/compliance-footer"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Agentic Financial Dashboard</h1>
          <p className="text-muted-foreground">Multi-Agent AI Analysis & Sentiment Visualization</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Dashboard Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Summary Zone */}
            <SummaryZone />

            {/* Agent Voting Panel */}
            <AgentVotingPanel />

            {/* Visual Data Layer */}
            <VisualDataLayer />

            {/* Insight Tabs */}
            <InsightTabs />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <UserSidebar />
          </div>
        </div>

        {/* Compliance Footer */}
        <ComplianceFooter />
      </div>
    </div>
  )
}
