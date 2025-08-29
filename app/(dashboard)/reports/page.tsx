"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { FileText, Download, Search, Filter, Calendar as CalendarIcon, TrendingUp, TrendingDown, BarChart3, PieChart, FileSpreadsheet, Printer, Share, Eye, Clock, CheckCircle } from "lucide-react"
import { useState } from "react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface Report {
  id: string
  title: string
  type: "portfolio" | "market" | "risk" | "performance" | "tax" | "compliance"
  status: "completed" | "pending" | "failed"
  generatedDate: Date
  period: string
  size: string
  description: string
  tags: string[]
  downloadUrl?: string
}

interface ScheduledReport {
  id: string
  name: string
  type: string
  frequency: "daily" | "weekly" | "monthly" | "quarterly"
  nextRun: Date
  enabled: boolean
  recipients: string[]
}

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [dateRange, setDateRange] = useState<{from: Date | undefined, to: Date | undefined}>({from: undefined, to: undefined})

  const reports: Report[] = [
    {
      id: "rpt-001",
      title: "Monthly Portfolio Performance Report",
      type: "portfolio",
      status: "completed",
      generatedDate: new Date(2024, 11, 1, 9, 30),
      period: "November 2024",
      size: "2.4 MB",
      description: "Comprehensive portfolio analysis including returns, risk metrics, and sector allocation",
      tags: ["monthly", "performance", "portfolio", "risk"],
      downloadUrl: "#"
    },
    {
      id: "rpt-002", 
      title: "Market Sentiment Analysis - Weekly",
      type: "market",
      status: "completed",
      generatedDate: new Date(2024, 11, 25, 14, 15),
      period: "Week of Dec 23, 2024",
      size: "1.8 MB",
      description: "AI-driven market sentiment analysis with agent voting breakdown and trend predictions",
      tags: ["weekly", "sentiment", "market", "AI"],
      downloadUrl: "#"
    },
    {
      id: "rpt-003",
      title: "Risk Assessment & VaR Analysis",
      type: "risk", 
      status: "pending",
      generatedDate: new Date(2024, 11, 28, 16, 45),
      period: "Q4 2024",
      size: "Processing...",
      description: "Value at Risk calculations, stress testing results, and portfolio risk decomposition",
      tags: ["quarterly", "risk", "VaR", "stress-testing"]
    },
    {
      id: "rpt-004",
      title: "Tax Loss Harvesting Report",
      type: "tax",
      status: "completed", 
      generatedDate: new Date(2024, 11, 20, 11, 20),
      period: "YTD 2024",
      size: "845 KB",
      description: "Tax optimization opportunities and realized gains/losses summary",
      tags: ["annual", "tax", "optimization", "gains-losses"],
      downloadUrl: "#"
    },
    {
      id: "rpt-005",
      title: "Compliance & Regulatory Report",
      type: "compliance",
      status: "failed",
      generatedDate: new Date(2024, 11, 27, 8, 0),
      period: "November 2024", 
      size: "N/A",
      description: "Regulatory compliance check and audit trail documentation",
      tags: ["monthly", "compliance", "regulatory", "audit"]
    },
    {
      id: "rpt-006",
      title: "Agent Performance Benchmark",
      type: "performance",
      status: "completed",
      generatedDate: new Date(2024, 11, 26, 13, 30),
      period: "Q4 2024",
      size: "3.2 MB", 
      description: "AI agent accuracy metrics, prediction quality, and consensus analysis",
      tags: ["quarterly", "AI", "performance", "agents"],
      downloadUrl: "#"
    }
  ]

  const scheduledReports: ScheduledReport[] = [
    {
      id: "sched-001",
      name: "Daily Portfolio Summary",
      type: "portfolio",
      frequency: "daily",
      nextRun: new Date(2024, 11, 29, 6, 0),
      enabled: true,
      recipients: ["trader@company.com", "risk@company.com"]
    },
    {
      id: "sched-002", 
      name: "Weekly Market Analysis",
      type: "market",
      frequency: "weekly", 
      nextRun: new Date(2024, 11, 30, 8, 0),
      enabled: true,
      recipients: ["analysts@company.com"]
    },
    {
      id: "sched-003",
      name: "Monthly Risk Report",
      type: "risk",
      frequency: "monthly",
      nextRun: new Date(2025, 0, 1, 9, 0),
      enabled: false,
      recipients: ["cro@company.com", "board@company.com"]
    }
  ]

  const getTypeIcon = (type: Report['type']) => {
    switch (type) {
      case "portfolio":
        return <PieChart className="h-4 w-4" />
      case "market":
        return <BarChart3 className="h-4 w-4" />
      case "risk":
        return <TrendingDown className="h-4 w-4" />
      case "performance":
        return <TrendingUp className="h-4 w-4" />
      case "tax":
        return <FileSpreadsheet className="h-4 w-4" />
      case "compliance":
        return <CheckCircle className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case "completed":
        return "bg-positive/10 text-positive border-positive/30"
      case "pending": 
        return "bg-highlight/10 text-highlight border-highlight/30"
      case "failed":
        return "bg-negative/10 text-negative border-negative/30"
    }
  }

  const getStatusIcon = (status: Report['status']) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4 animate-pulse" />
      case "failed":
        return <TrendingDown className="h-4 w-4" />
    }
  }

  const generateReport = (type: string) => {
    // Handle report generation
  }

  const downloadReport = (reportId: string) => {
    // Handle report download
  }

  const shareReport = (reportId: string) => {
    // Handle report sharing
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate and manage financial reports and analysis documents</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-highlight hover:bg-highlight/90">
            <FileText className="h-4 w-4 mr-2" />
            New Report
          </Button>
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="relative flex-1 max-w-md">
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Report Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="portfolio">Portfolio</SelectItem>
            <SelectItem value="market">Market</SelectItem>
            <SelectItem value="risk">Risk</SelectItem>
            <SelectItem value="performance">Performance</SelectItem>
            <SelectItem value="tax">Tax</SelectItem>
            <SelectItem value="compliance">Compliance</SelectItem>
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[200px] justify-start text-left">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd")} -{" "}
                    {format(dateRange.to, "LLL dd")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dateRange.from}
              onSelect={(date) => setDateRange({...dateRange, from: date})}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Report Generation Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Report Generation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {["Portfolio", "Market", "Risk", "Performance", "Tax", "Compliance"].map((type) => (
              <Button
                key={type}
                variant="outline"
                className="h-20 flex flex-col gap-2 hover:bg-accent"
                onClick={() => generateReport(type.toLowerCase())}
              >
                {getTypeIcon(type.toLowerCase() as Report['type'])}
                <span className="text-sm">{type}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="recent" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recent">Recent Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {reports.map((report) => (
              <Card key={report.id} className="hover-lift transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-highlight/15 to-highlight/10 text-highlight">
                        {getTypeIcon(report.type)}
                      </div>
                      <div className="space-y-2">
                        <div>
                          <h3 className="font-bold text-lg">{report.title}</h3>
                          <p className="text-sm text-muted-foreground">{report.description}</p>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Period: {report.period}</span>
                          <span>"</span>
                          <span>Generated: {report.generatedDate.toLocaleDateString()}</span>
                          <span>"</span>
                          <span>Size: {report.size}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {report.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Badge className={getStatusColor(report.status)}>
                        {getStatusIcon(report.status)}
                        {report.status}
                      </Badge>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {report.downloadUrl && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => downloadReport(report.id)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => shareReport(report.id)}
                        >
                          <Share className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Printer className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-highlight/15 to-highlight/10 text-highlight">
                        {getTypeIcon(report.type as Report['type'])}
                      </div>
                      <div>
                        <div className="font-medium">{report.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {report.frequency} " Next run: {report.nextRun.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Recipients: {report.recipients.join(", ")}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={report.enabled ? "default" : "secondary"}>
                        {report.enabled ? "Active" : "Disabled"}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Executive Summary",
                description: "High-level portfolio overview for executives",
                type: "portfolio",
                features: ["Key metrics", "Performance charts", "Risk summary"]
              },
              {
                name: "Detailed Risk Analysis",
                description: "Comprehensive risk assessment and stress testing",
                type: "risk", 
                features: ["VaR calculations", "Scenario analysis", "Correlation matrices"]
              },
              {
                name: "Market Intelligence",
                description: "AI-powered market analysis and predictions",
                type: "market",
                features: ["Sentiment analysis", "Agent votes", "Market trends"]
              },
              {
                name: "Tax Optimization",
                description: "Tax-efficient portfolio management insights",
                type: "tax",
                features: ["Loss harvesting", "Gain optimization", "Tax projections"]
              },
              {
                name: "Compliance Audit", 
                description: "Regulatory compliance and audit documentation",
                type: "compliance",
                features: ["Regulatory checks", "Audit trails", "Violation alerts"]
              },
              {
                name: "Performance Attribution",
                description: "Detailed performance breakdown and attribution",
                type: "performance",
                features: ["Sector attribution", "Security selection", "Benchmark comparison"]
              }
            ].map((template, index) => (
              <Card key={index} className="hover-lift transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-highlight/15 to-highlight/10 text-highlight">
                      {getTypeIcon(template.type as Report['type'])}
                    </div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium mb-2">Features:</div>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {template.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-positive" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button className="w-full bg-highlight hover:bg-highlight/90">
                      Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}