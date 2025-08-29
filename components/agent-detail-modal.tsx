"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, Newspaper, TrendingUp, Building, ExternalLink, Calendar, Target, AlertTriangle, CheckCircle } from "lucide-react"
import { getSentimentColorClasses, getFinancialBadgeClasses } from "@/lib/colors"

interface AgentDetailData {
  name: string
  icon: React.ReactNode
  sentiment: "Positive" | "Negative" | "Neutral"
  percentage: number
  reasoning: string
  detailedAnalysis: {
    summary: string
    keyPoints: string[]
    dataSource: string
    lastUpdate: string
    recommendation: string
    riskFactors: string[]
    confidence: number
    methodology: string
  }
}

interface AgentDetailModalProps {
  isOpen: boolean
  onClose: () => void
  agent: AgentDetailData | null
}

export function AgentDetailModal({ isOpen, onClose, agent }: AgentDetailModalProps) {
  if (!agent) return null

  const agentDetailData: Record<string, AgentDetailData> = {
    "RL Agent": {
      name: "RL Agent",
      icon: <Brain className="h-4 w-4" />,
      sentiment: "Negative",
      percentage: 72,
      reasoning: "短期のモメンタム弱い、下降トレンド継続",
      detailedAnalysis: {
        summary: "強化学習モデルによる価格データ分析では、直近の価格動向から軽微な売りシグナルを検出しています。",
        keyPoints: [
          "20日移動平均線を下回る価格推移",
          "出来高減少傾向が継続",
          "モメンタム指標（RSI、MACD）が弱気を示唆",
          "サポートライン付近での反発力が不足"
        ],
        dataSource: "リアルタイム価格データ、テクニカル指標",
        lastUpdate: "2025-01-29 07:21",
        recommendation: "短期的には慎重な姿勢を維持。$580付近でのサポート確認後の反発を待つ",
        riskFactors: [
          "高ボラティリティ継続のリスク",
          "テクニカル指標の偽シグナル可能性"
        ],
        confidence: 72,
        methodology: "深層強化学習（DQN）による価格予測モデル"
      }
    },
    "News Agent": {
      name: "News Agent",
      icon: <Newspaper className="h-4 w-4" />,
      sentiment: "Neutral",
      percentage: 68,
      reasoning: "報道は分岐、やや慎重な見方が優勢",
      detailedAnalysis: {
        summary: "Meta関連ニュースは複数の課題と機会が混在しており、全体的には慎重な評価が必要な状況です。",
        keyPoints: [
          "Meta AIのヨーロッパ展開（ポジティブ要因）",
          "法的問題と著書『Careless People』関連の論争",
          "VR市場での競争激化とQuest需要の減速",
          "広告ターゲティング規制強化の影響",
          "Threadsプラットフォームの機能強化"
        ],
        dataSource: "Bloomberg、Reuters、TechCrunch、Financial Times",
        lastUpdate: "2025-01-29 06:45",
        recommendation: "短期的にはニュースフローに注意を払い、法的リスクとAI事業拡大のバランスを監視",
        riskFactors: [
          "規制強化による広告収益への影響",
          "VR事業の収益性に関する懸念",
          "従業員関連の訴訟リスク"
        ],
        confidence: 68,
        methodology: "自然言語処理とセンチメント分析による多源ニュース解析"
      }
    },
    "Financial Agent": {
      name: "Financial Agent",
      icon: <TrendingUp className="h-4 w-4" />,
      sentiment: "Positive",
      percentage: 85,
      reasoning: "売上・純利益堅調、ファンダメンタルズ良好",
      detailedAnalysis: {
        summary: "Q4 2024の財務データは堅調な成長を示しており、収益性とキャッシュフロー生成能力が健全な水準を維持しています。",
        keyPoints: [
          "Q4売上高: $47.69B（前年同期比+8%）",
          "純利益: $20.84B（同+15%）",
          "営業キャッシュフロー: $27.99B（健全水準）",
          "総資産: $276.05B、負債: $93.42B（財務体質良好）",
          "設備投資は高水準だが成長投資として評価"
        ],
        dataSource: "SEC 10-K、10-Q、決算説明資料",
        lastUpdate: "2025-01-29 07:15",
        recommendation: "財務基盤は堅固であり、継続保有を推奨。AI・VR投資の成果に注目",
        riskFactors: [
          "高水準な設備投資による短期的利益圧迫",
          "債務負担の増加可能性"
        ],
        confidence: 85,
        methodology: "DCF分析、財務比率分析、同業他社比較"
      }
    },
    "Institutional Agent": {
      name: "Institutional Agent",
      icon: <Building className="h-4 w-4" />,
      sentiment: "Positive",
      percentage: 78,
      reasoning: "目標株価平均 +15%、機関投資家は強気",
      detailedAnalysis: {
        summary: "機関投資家とアナリストの予測は総じて楽観的で、2025年の成長見通しを支持しています。",
        keyPoints: [
          "平均目標株価: $718.31（現在価格から+15%）",
          "最高目標株価: $935.00（一部アナリスト）",
          "2025年価格上昇予測: 8-28%",
          "24/7 Wall Street予測: 年末$603",
          "四半期別予測: Q1 $586、Q2 $630、Q3 $688.56"
        ],
        dataSource: "Bloomberg、Refinitiv、機関投資家レポート",
        lastUpdate: "2025-01-29 07:00",
        recommendation: "機関投資家のコンセンサスに基づき、中長期的な上昇を期待。目標株価$718付近",
        riskFactors: [
          "市場全体の調整局面での影響",
          "AI投資収益化の不確実性"
        ],
        confidence: 78,
        methodology: "機関投資家予測の統計分析、コンセンサス予測モデル"
      }
    }
  }

  const currentAgent = agentDetailData[agent.name] || agent

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="p-3 rounded-xl bg-gradient-to-br from-[var(--highlight)]/15 to-[var(--highlight)]/10 text-[var(--highlight)]">
              {currentAgent.icon}
            </div>
            {currentAgent.name} 詳細分析
            <Badge
              variant="outline"
              className={getFinancialBadgeClasses('sentiment', currentAgent.sentiment)}
            >
              {currentAgent.sentiment}
            </Badge>
          </DialogTitle>
          <DialogDescription className="text-base">
            {currentAgent.detailedAnalysis.summary}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* 概要カード */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-[var(--highlight)]" />
                分析概要
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">信頼度</span>
                  <div className="text-2xl font-bold text-card-foreground">
                    {currentAgent.detailedAnalysis.confidence}%
                  </div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">推奨アクション</span>
                  <div className="text-lg font-semibold text-card-foreground">
                    {currentAgent.detailedAnalysis.recommendation}
                  </div>
                </div>
              </div>
              
              <div>
                <span className="text-sm text-muted-foreground">分析手法</span>
                <div className="text-base text-card-foreground mt-1">
                  {currentAgent.detailedAnalysis.methodology}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* キーポイント */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-[var(--positive)]" />
                主要分析ポイント
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {currentAgent.detailedAnalysis.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[var(--highlight)] mt-2 flex-shrink-0" />
                    <span className="text-base text-card-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* リスク要因 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-[var(--negative)]" />
                リスク要因
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {currentAgent.detailedAnalysis.riskFactors.map((risk, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[var(--negative)] mt-2 flex-shrink-0" />
                    <span className="text-base text-card-foreground">{risk}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* メタデータ */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[var(--neutral)]" />
                データソース情報
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="text-sm text-muted-foreground">データソース</span>
                <div className="text-base text-card-foreground">{currentAgent.detailedAnalysis.dataSource}</div>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">最終更新</span>
                <div className="text-base font-mono text-card-foreground">{currentAgent.detailedAnalysis.lastUpdate}</div>
              </div>
            </CardContent>
          </Card>

          {/* アクションボタン */}
          <div className="flex gap-3 pt-4">
            <Button onClick={onClose} variant="outline" className="flex-1">
              閉じる
            </Button>
            <Button className="flex items-center gap-2" variant="default">
              <ExternalLink className="h-4 w-4" />
              詳細レポート
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
