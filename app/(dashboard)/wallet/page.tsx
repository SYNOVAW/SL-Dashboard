"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart, 
  BarChart3, 
  ArrowUpDown, 
  Plus, 
  Minus,
  AlertCircle,
  Target,
  Shield,
  History,
  RefreshCw
} from "lucide-react"
import { formatPrice, formatPercentage, formatLargeNumber, getSentimentClasses } from "@/lib/financial-utils"
import { getCardClasses, getSentimentColorClasses } from "@/lib/colors"
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts"

// Mock data for wallet/portfolio
const portfolioData = {
  totalValue: 847650.75,
  dayChange: 12847.23,
  dayChangePercent: 1.54,
  totalReturn: 147650.75,
  totalReturnPercent: 21.08,
  cash: 25000.00,
  investedValue: 700000.00,
  lastUpdate: new Date(),
}

const holdingsData = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    shares: 150,
    avgPrice: 185.50,
    currentPrice: 192.30,
    marketValue: 28845.00,
    unrealizedPnL: 1020.00,
    unrealizedPnLPercent: 3.67,
    dayChange: 2.45,
    dayChangePercent: 1.29,
    weight: 3.40,
    sector: "Technology"
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    shares: 85,
    avgPrice: 280.25,
    currentPrice: 295.80,
    marketValue: 25143.00,
    unrealizedPnL: 1322.75,
    unrealizedPnLPercent: 5.56,
    dayChange: 4.20,
    dayChangePercent: 1.44,
    weight: 2.97,
    sector: "Technology"
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    shares: 45,
    avgPrice: 125.80,
    currentPrice: 142.65,
    marketValue: 6419.25,
    unrealizedPnL: 757.25,
    unrealizedPnLPercent: 13.37,
    dayChange: 1.85,
    dayChangePercent: 1.31,
    weight: 0.76,
    sector: "Technology"
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    shares: 75,
    avgPrice: 450.20,
    currentPrice: 525.75,
    marketValue: 39431.25,
    unrealizedPnL: 5666.25,
    unrealizedPnLPercent: 16.79,
    dayChange: 8.35,
    dayChangePercent: 1.61,
    weight: 4.65,
    sector: "Technology"
  },
  {
    symbol: "SPY",
    name: "SPDR S&P 500 ETF Trust",
    shares: 200,
    avgPrice: 420.15,
    currentPrice: 445.80,
    marketValue: 89160.00,
    unrealizedPnL: 5130.00,
    unrealizedPnLPercent: 6.12,
    dayChange: 3.25,
    dayChangePercent: 0.73,
    weight: 10.52,
    sector: "ETF"
  },
  {
    symbol: "QQQ",
    name: "Invesco QQQ Trust",
    shares: 150,
    avgPrice: 365.40,
    currentPrice: 385.20,
    marketValue: 57780.00,
    unrealizedPnL: 2970.00,
    unrealizedPnLPercent: 5.42,
    dayChange: 2.80,
    dayChangePercent: 0.73,
    weight: 6.82,
    sector: "ETF"
  }
]

const allocationData = [
  { name: "Technology", value: 45.2, amount: 383250.00, color: "#1d3c78" },
  { name: "ETFs", value: 17.3, amount: 146940.00, color: "#29abe2" },
  { name: "Healthcare", value: 12.8, amount: 108499.20, color: "#00c853" },
  { name: "Financial", value: 10.5, amount: 89003.25, color: "#ff9800" },
  { name: "Energy", value: 8.4, amount: 71202.60, color: "#d50000" },
  { name: "Consumer", value: 3.8, data: 32210.74, color: "#9c27b0" },
  { name: "Cash", value: 2.0, amount: 25000.00, color: "#6b7280" }
]

const performanceData = [
  { period: "1D", return: 1.54, benchmark: 1.12 },
  { period: "1W", return: 2.87, benchmark: 2.34 },
  { period: "1M", return: 4.23, benchmark: 3.89 },
  { period: "3M", return: 8.94, benchmark: 7.65 },
  { period: "6M", return: 15.67, benchmark: 12.34 },
  { period: "1Y", return: 21.08, benchmark: 18.45 },
  { period: "YTD", return: 18.92, benchmark: 16.78 }
]

const transactionHistory = [
  {
    id: "1",
    type: "BUY",
    symbol: "NVDA",
    shares: 25,
    price: 452.30,
    amount: 11307.50,
    date: new Date("2024-01-15"),
    fees: 4.99
  },
  {
    id: "2", 
    type: "SELL",
    symbol: "TSLA",
    shares: 50,
    price: 245.80,
    amount: 12290.00,
    date: new Date("2024-01-12"),
    fees: 4.99
  },
  {
    id: "3",
    type: "DIVIDEND",
    symbol: "AAPL",
    shares: 150,
    price: 0.24,
    amount: 36.00,
    date: new Date("2024-01-08"),
    fees: 0
  },
  {
    id: "4",
    type: "BUY",
    symbol: "SPY", 
    shares: 50,
    price: 425.60,
    amount: 21280.00,
    date: new Date("2024-01-05"),
    fees: 4.99
  },
  {
    id: "5",
    type: "DEPOSIT",
    amount: 50000.00,
    date: new Date("2024-01-02"),
    fees: 0
  }
]

const riskMetrics = {
  beta: 1.15,
  volatility: 18.45,
  sharpeRatio: 1.42,
  maxDrawdown: -12.8,
  var95: -2.3,
  correlation: 0.87
}

const rebalancingData = [
  { asset: "Technology", current: 45.2, target: 40.0, action: "REDUCE", amount: 44086.25 },
  { asset: "Healthcare", current: 12.8, target: 15.0, amount: 18648.36, action: "INCREASE" },
  { asset: "Financial", current: 10.5, target: 12.0, amount: 12717.49, action: "INCREASE" },
  { asset: "International", current: 2.1, target: 8.0, amount: 49991.40, action: "INCREASE" }
]

const chartData = [
  { date: "Jan", value: 750000, benchmark: 745000 },
  { date: "Feb", value: 765000, benchmark: 758000 },
  { date: "Mar", value: 780000, benchmark: 771000 },
  { date: "Apr", value: 795000, benchmark: 785000 },
  { date: "May", value: 820000, benchmark: 808000 },
  { date: "Jun", value: 835000, benchmark: 823000 },
  { date: "Jul", value: 847650, benchmark: 835400 }
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="font-semibold text-foreground">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {formatPrice(entry.value, { showCurrency: true })}
          </p>
        ))}
      </div>
    )
  }
  return null
}

const AllocationTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="font-semibold text-foreground">{data.name}</p>
        <p className="text-sm text-muted-foreground">
          {formatPrice(data.amount, { showCurrency: true })} ({data.value}%)
        </p>
      </div>
    )
  }
  return null
}

export default function WalletPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("1Y")
  const [showDeposit, setShowDeposit] = useState(false)
  const [showWithdraw, setShowWithdraw] = useState(false)
  
  const totalPnLClasses = getSentimentClasses(portfolioData.totalReturn)
  const dayChangeClasses = getSentimentClasses(portfolioData.dayChange)

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="fade-in">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[var(--highlight)]/20 to-[var(--highlight)]/10 glow-cyan">
              <Wallet className="h-8 w-8 text-[var(--highlight)]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2 bg-gradient-to-r from-foreground to-[var(--highlight)] bg-clip-text">
                Wallet Management
              </h1>
              <p className="text-lg text-muted-foreground font-medium">
                Comprehensive portfolio tracking and management suite
              </p>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 text-negative border-negative/20 hover:bg-negative/10"
              onClick={() => setShowWithdraw(true)}
            >
              <Minus className="h-4 w-4" />
              Withdraw
            </Button>
            <Button 
              size="sm" 
              className="gap-2 bg-[var(--positive)] hover:bg-[var(--positive-dark)] text-white"
              onClick={() => setShowDeposit(true)}
            >
              <Plus className="h-4 w-4" />
              Deposit
            </Button>
          </div>
        </div>

        {/* Status indicators */}
        <div className="flex items-center gap-6 p-4 rounded-2xl bg-gradient-to-r from-muted/20 to-muted/10 border border-border/20 hover-lift">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[var(--positive)] pulse-glow" />
            <span className="text-sm font-medium text-muted-foreground">Portfolio Active</span>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 text-[var(--highlight)]" />
            <span className="text-sm font-medium text-muted-foreground">
              Last Update: {portfolioData.lastUpdate.toLocaleTimeString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[var(--highlight)]" />
            <span className="text-sm font-medium text-muted-foreground">
              Risk Level: Moderate
            </span>
          </div>
        </div>
      </header>

      {/* Portfolio Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 slide-up">
        {/* Total Portfolio Value */}
        <Card className={getCardClasses("highlight")}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Total Portfolio Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold font-financial text-foreground">
                {formatPrice(portfolioData.totalValue, { showCurrency: true })}
              </div>
              <div className={`flex items-center gap-1 text-sm font-financial ${dayChangeClasses.text}`}>
                {portfolioData.dayChange >= 0 ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                {formatPrice(Math.abs(portfolioData.dayChange), { showCurrency: true })} 
                ({formatPercentage(portfolioData.dayChangePercent)})
              </div>
              <div className="text-xs text-muted-foreground">Today's Change</div>
            </div>
          </CardContent>
        </Card>

        {/* Total Return */}
        <Card className={getCardClasses("default")}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Total Return
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className={`text-3xl font-bold font-financial ${totalPnLClasses.text}`}>
                {formatPrice(portfolioData.totalReturn, { showCurrency: true })}
              </div>
              <div className={`text-sm font-financial ${totalPnLClasses.text}`}>
                {formatPercentage(portfolioData.totalReturnPercent)}
              </div>
              <div className="text-xs text-muted-foreground">All Time</div>
            </div>
          </CardContent>
        </Card>

        {/* Cash Balance */}
        <Card className={getCardClasses("default")}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Available Cash
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold font-financial text-foreground">
                {formatPrice(portfolioData.cash, { showCurrency: true })}
              </div>
              <div className="text-sm text-muted-foreground">
                {((portfolioData.cash / portfolioData.totalValue) * 100).toFixed(1)}% of portfolio
              </div>
              <div className="text-xs text-muted-foreground">Ready to Invest</div>
            </div>
          </CardContent>
        </Card>

        {/* Invested Amount */}
        <Card className={getCardClasses("default")}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Invested Amount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold font-financial text-foreground">
                {formatPrice(portfolioData.investedValue, { showCurrency: true })}
              </div>
              <div className="text-sm text-muted-foreground">
                {((portfolioData.investedValue / portfolioData.totalValue) * 100).toFixed(1)}% of portfolio
              </div>
              <div className="text-xs text-muted-foreground">Market Exposure</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <div className="slide-up" style={{ animationDelay: "0.2s" }}>
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-muted/20">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="holdings">Holdings</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
            <TabsTrigger value="rebalance">Rebalancing</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Asset Allocation Chart */}
              <Card className={getCardClasses("default")}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Asset Allocation
                  </CardTitle>
                  <CardDescription>Portfolio distribution by asset class</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={allocationData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {allocationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<AllocationTooltip />} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  {/* Legend */}
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    {allocationData.map((item) => (
                      <div key={item.name} className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.value}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Portfolio Performance Chart */}
              <Card className={getCardClasses("default")}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Portfolio Performance
                  </CardTitle>
                  <CardDescription>Portfolio vs. benchmark performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                        <XAxis dataKey="date" stroke="var(--muted-foreground)" />
                        <YAxis stroke="var(--muted-foreground)" tickFormatter={(value) => formatLargeNumber(value)} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="var(--highlight)"
                          fill="var(--highlight)"
                          fillOpacity={0.2}
                          strokeWidth={2}
                          name="Portfolio"
                        />
                        <Area
                          type="monotone"
                          dataKey="benchmark"
                          stroke="var(--chart-1)"
                          fill="var(--chart-1)"
                          fillOpacity={0.1}
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          name="Benchmark"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <Card className={getCardClasses("default")}>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Returns across different time periods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-4">
                  {performanceData.map((period) => {
                    const outperformance = period.return - period.benchmark
                    const classes = getSentimentClasses(outperformance)
                    
                    return (
                      <div key={period.period} className="text-center space-y-2">
                        <div className="text-sm font-medium text-muted-foreground">
                          {period.period}
                        </div>
                        <div className={`text-lg font-bold font-financial ${getSentimentClasses(period.return).text}`}>
                          {formatPercentage(period.return)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          vs {formatPercentage(period.benchmark)}
                        </div>
                        <div className={`text-xs font-medium ${classes.text}`}>
                          {outperformance >= 0 ? '+' : ''}{formatPercentage(outperformance)}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Holdings Tab */}
          <TabsContent value="holdings" className="space-y-6">
            <Card className={getCardClasses("default")}>
              <CardHeader>
                <CardTitle>Portfolio Holdings</CardTitle>
                <CardDescription>Individual positions and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {holdingsData.map((holding) => {
                    const unrealizedClasses = getSentimentClasses(holding.unrealizedPnL)
                    const dayChangeClasses = getSentimentClasses(holding.dayChange)
                    
                    return (
                      <div key={holding.symbol} className="flex items-center justify-between p-4 rounded-xl border border-border/20 hover-lift">
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="font-bold text-foreground">{holding.symbol}</div>
                            <div className="text-xs text-muted-foreground">{holding.shares} shares</div>
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium text-foreground truncate">
                              {holding.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {holding.sector} • {holding.weight}%
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-4 gap-6 text-right">
                          <div>
                            <div className="text-sm font-medium text-muted-foreground">Current Price</div>
                            <div className="font-financial font-semibold text-foreground">
                              {formatPrice(holding.currentPrice)}
                            </div>
                            <div className={`text-xs font-financial ${dayChangeClasses.text}`}>
                              {formatPercentage(holding.dayChangePercent)}
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm font-medium text-muted-foreground">Market Value</div>
                            <div className="font-financial font-semibold text-foreground">
                              {formatPrice(holding.marketValue)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Avg: {formatPrice(holding.avgPrice)}
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm font-medium text-muted-foreground">Unrealized P&L</div>
                            <div className={`font-financial font-semibold ${unrealizedClasses.text}`}>
                              {formatPrice(holding.unrealizedPnL, { showCurrency: true })}
                            </div>
                            <div className={`text-xs font-financial ${unrealizedClasses.text}`}>
                              {formatPercentage(holding.unrealizedPnLPercent)}
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm font-medium text-muted-foreground">Day Change</div>
                            <div className={`font-financial font-semibold ${dayChangeClasses.text}`}>
                              {formatPrice(holding.dayChange)}
                            </div>
                            <div className={`text-xs font-financial ${dayChangeClasses.text}`}>
                              {formatPercentage(holding.dayChangePercent)}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            {/* Time period selector and detailed performance metrics would go here */}
            <Card className={getCardClasses("default")}>
              <CardHeader>
                <CardTitle>Detailed Performance Analysis</CardTitle>
                <CardDescription>In-depth portfolio performance metrics and analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Detailed performance analysis coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-6">
            <Card className={getCardClasses("default")}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Transaction History
                </CardTitle>
                <CardDescription>Recent portfolio transactions and activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactionHistory.map((transaction) => {
                    const isPositive = transaction.type === "BUY" || transaction.type === "DEPOSIT" || transaction.type === "DIVIDEND"
                    const classes = getSentimentClasses(isPositive ? 1 : -1)
                    
                    return (
                      <div key={transaction.id} className="flex items-center justify-between p-4 rounded-xl border border-border/20 hover-lift">
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-full ${classes.background}`}>
                            {transaction.type === "BUY" && <Plus className="h-4 w-4 text-positive" />}
                            {transaction.type === "SELL" && <Minus className="h-4 w-4 text-negative" />}
                            {transaction.type === "DIVIDEND" && <DollarSign className="h-4 w-4 text-positive" />}
                            {transaction.type === "DEPOSIT" && <ArrowUpDown className="h-4 w-4 text-positive" />}
                          </div>
                          <div>
                            <div className="font-medium text-foreground">
                              {transaction.type} {transaction.symbol && `${transaction.symbol}`}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {transaction.date.toLocaleDateString()} 
                              {transaction.shares && ` • ${transaction.shares} shares`}
                              {transaction.price && ` @ ${formatPrice(transaction.price)}`}
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className={`font-financial font-semibold ${classes.text}`}>
                            {isPositive ? '+' : '-'}{formatPrice(Math.abs(transaction.amount), { showCurrency: true })}
                          </div>
                          {transaction.fees > 0 && (
                            <div className="text-xs text-muted-foreground">
                              Fee: {formatPrice(transaction.fees)}
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Risk Analysis Tab */}
          <TabsContent value="risk" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Risk Metrics */}
              <Card className={getCardClasses("default")}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Risk Metrics
                  </CardTitle>
                  <CardDescription>Portfolio risk assessment and analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 rounded-xl bg-muted/20">
                        <div className="text-2xl font-bold font-financial text-foreground">
                          {riskMetrics.beta.toFixed(2)}
                        </div>
                        <div className="text-sm text-muted-foreground">Beta</div>
                      </div>
                      
                      <div className="text-center p-4 rounded-xl bg-muted/20">
                        <div className="text-2xl font-bold font-financial text-foreground">
                          {formatPercentage(riskMetrics.volatility)}
                        </div>
                        <div className="text-sm text-muted-foreground">Volatility</div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-muted-foreground">Sharpe Ratio</span>
                        <span className="font-financial font-semibold text-foreground">
                          {riskMetrics.sharpeRatio.toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-muted-foreground">Max Drawdown</span>
                        <span className="font-financial font-semibold text-negative">
                          {formatPercentage(riskMetrics.maxDrawdown)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-muted-foreground">VaR (95%)</span>
                        <span className="font-financial font-semibold text-negative">
                          {formatPercentage(riskMetrics.var95)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-muted-foreground">Market Correlation</span>
                        <span className="font-financial font-semibold text-foreground">
                          {riskMetrics.correlation.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Risk Alerts */}
              <Card className={getCardClasses("default")}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Risk Alerts
                  </CardTitle>
                  <CardDescription>Important risk notifications and warnings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl border border-orange-200 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-800">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="h-4 w-4 text-orange-600" />
                        <span className="font-medium text-orange-800 dark:text-orange-200">Concentration Risk</span>
                      </div>
                      <p className="text-sm text-orange-700 dark:text-orange-300">
                        Technology allocation (45.2%) exceeds recommended maximum of 40%.
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-xl border border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-800 dark:text-blue-200">Cash Position</span>
                      </div>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Cash allocation (2.0%) is below recommended minimum of 5%.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Rebalancing Tab */}
          <TabsContent value="rebalance" className="space-y-6">
            <Card className={getCardClasses("default")}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Portfolio Rebalancing
                </CardTitle>
                <CardDescription>Suggested adjustments to optimize asset allocation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rebalancingData.map((item) => {
                    const isIncrease = item.action === "INCREASE"
                    const classes = getSentimentClasses(isIncrease ? 1 : -1)
                    const variance = item.current - item.target
                    
                    return (
                      <div key={item.asset} className="flex items-center justify-between p-4 rounded-xl border border-border/20 hover-lift">
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-full ${classes.background}`}>
                            {isIncrease ? (
                              <Plus className="h-4 w-4 text-positive" />
                            ) : (
                              <Minus className="h-4 w-4 text-negative" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{item.asset}</div>
                            <div className="text-sm text-muted-foreground">
                              Current: {item.current.toFixed(1)}% → Target: {item.target.toFixed(1)}%
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <Badge variant={isIncrease ? "default" : "secondary"} className="mb-2">
                            {item.action}
                          </Badge>
                          <div className={`font-financial font-semibold ${classes.text}`}>
                            {formatPrice(item.amount, { showCurrency: true })}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {Math.abs(variance).toFixed(1)}% {variance > 0 ? 'over' : 'under'}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                
                <div className="mt-6 pt-6 border-t border-border">
                  <Button className="w-full gap-2 bg-[var(--highlight)] hover:bg-[var(--highlight-dark)]">
                    <Target className="h-4 w-4" />
                    Execute Rebalancing Plan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}