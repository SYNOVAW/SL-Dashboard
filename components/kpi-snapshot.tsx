"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, PieChart, Activity, BarChart3 } from "lucide-react"

interface KPIItem {
  label: string
  value: string
  period: string
  yoyChange: number
  qoqChange: number
  icon: React.ReactNode
  unit: string
}

export function KPISnapshot() {
  const kpiData: KPIItem[] = [
    {
      label: "Revenue",
      value: "47.7",
      period: "Q4 2024",
      yoyChange: 8,
      qoqChange: 3,
      icon: <DollarSign className="h-5 w-5" />,
      unit: "B"
    },
    {
      label: "Net Income",
      value: "20.8",
      period: "Q4 2024",
      yoyChange: 15,
      qoqChange: 7,
      icon: <PieChart className="h-5 w-5" />,
      unit: "B"
    },
    {
      label: "Operating Cash Flow",
      value: "28.3",
      period: "Q4 2024",
      yoyChange: -2,
      qoqChange: 5,
      icon: <Activity className="h-5 w-5" />,
      unit: "B"
    },
    {
      label: "Total Debt",
      value: "62.1",
      period: "Q4 2024",
      yoyChange: -12,
      qoqChange: -8,
      icon: <BarChart3 className="h-5 w-5" />,
      unit: "B"
    }
  ]

  const getTrendIcon = (change: number) => {
    if (change > 0) {
      return <TrendingUp className="h-4 w-4 text-[var(--positive)]" />
    } else if (change < 0) {
      return <TrendingDown className="h-4 w-4 text-[var(--negative)]" />
    }
    return <div className="h-4 w-4 border border-[var(--neutral)] rounded-full" />
  }

  const getTrendColor = (change: number) => {
    if (change > 0) return "text-[var(--positive)]"
    if (change < 0) return "text-[var(--negative)]"
    return "text-[var(--neutral)]"
  }

  return (
    <Card className="w-full bg-card hover-lift enhanced-shadow fade-in gradient-bg border-2 border-border/20">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-2xl font-bold text-card-foreground">
          <div className="p-2 rounded-full bg-[var(--highlight)]/10 glow-cyan">
            <BarChart3 className="h-6 w-6 text-[var(--highlight)]" />
          </div>
          Financial Snapshot
          <Badge variant="outline" className="bg-gradient-to-r from-[var(--highlight)]/15 to-[var(--highlight)]/10 text-[var(--highlight)] border-[var(--highlight)]/30 px-4 py-2 font-semibold">
            Q4 2024
          </Badge>
        </CardTitle>
        <p className="text-lg text-muted-foreground mt-2">
          主要財務指標と前年・前四半期比較
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => (
            <div 
              key={index}
              className="p-6 rounded-2xl border bg-gradient-to-br from-card/90 to-card/70 hover-lift glass-morphism transition-all duration-300 hover:shadow-lg scale-in"
            >
              {/* KPI名とアイコン */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-[var(--highlight)]/15 to-[var(--highlight)]/10 text-[var(--highlight)] hover:glow-cyan transition-all duration-300">
                  {kpi.icon}
                </div>
                <div>
                  <h4 className="font-bold text-lg text-card-foreground">{kpi.label}</h4>
                  <p className="text-xs text-muted-foreground">{kpi.period}</p>
                </div>
              </div>
              
              {/* メイン数値 */}
              <div className="mb-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-card-foreground font-financial">
                    ${kpi.value}
                  </span>
                  <span className="text-lg font-semibold text-muted-foreground">
                    {kpi.unit}
                  </span>
                </div>
              </div>
              
              {/* YoY/QoQ トレンド */}
              <div className="space-y-2">
                {/* YoY */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">YoY</span>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(kpi.yoyChange)}
                    <span className={`text-sm font-semibold ${getTrendColor(kpi.yoyChange)}`}>
                      {kpi.yoyChange > 0 ? '+' : ''}{kpi.yoyChange}%
                    </span>
                  </div>
                </div>
                
                {/* QoQ */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">QoQ</span>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(kpi.qoqChange)}
                    <span className={`text-sm font-semibold ${getTrendColor(kpi.qoqChange)}`}>
                      {kpi.qoqChange > 0 ? '+' : ''}{kpi.qoqChange}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* KPI要約 */}
        <div className="mt-8 p-6 bg-gradient-to-br from-muted/20 to-muted/10 rounded-2xl border border-border/20 hover-lift glass-morphism">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-full bg-[var(--highlight)]/10 mt-1">
              <Activity className="h-5 w-5 text-[var(--highlight)]" />
            </div>
            <div className="space-y-3 flex-1">
              <h4 className="text-xl font-bold text-card-foreground">財務サマリー</h4>
              <p className="text-base text-muted-foreground leading-relaxed">
                売上・純利益ともに前年比プラス成長を維持。営業CFはやや減少するも健全水準。
                負債削減により財務体質は改善傾向。
              </p>
              <div className="flex items-center gap-3 pt-2 flex-wrap">
                <div className="px-4 py-2 bg-[var(--positive)]/10 rounded-full text-sm font-medium text-[var(--positive)] border border-[var(--positive)]/20">
                  成長持続
                </div>
                <div className="px-4 py-2 bg-[var(--highlight)]/10 rounded-full text-sm font-medium text-[var(--highlight)] border border-[var(--highlight)]/20">
                  財務健全
                </div>
                <div className="px-4 py-2 bg-[var(--neutral)]/10 rounded-full text-sm font-medium text-[var(--neutral)] border border-[var(--neutral)]/20">
                  CF注視
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
