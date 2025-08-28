"use client"

import React, { useState } from "react"
import { OrderForm } from "@/components/trading/order-form"
import { MarketData } from "@/components/trading/market-data"
import { TradeHistory } from "@/components/trading/trade-history"
import { TrendingUp } from "lucide-react"

interface Stock {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
}

export default function TradingPage() {
  const [selectedStock, setSelectedStock] = useState<Stock | undefined>()

  const handleStockSelect = (stock: Stock) => {
    setSelectedStock(stock)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="fade-in">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[var(--highlight)]/20 to-[var(--highlight)]/10 glow-cyan">
            <TrendingUp className="h-8 w-8 text-[var(--highlight)]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2 bg-gradient-to-r from-foreground to-[var(--highlight)] bg-clip-text">
              Trading Center
            </h1>
            <p className="text-lg text-muted-foreground font-medium">
              Execute trades with real-time market data and advanced order types
            </p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Form */}
        <div className="lg:col-span-1 slide-up">
          <OrderForm selectedStock={selectedStock} />
        </div>

        {/* Market Data */}
        <div className="lg:col-span-2 slide-up" style={{ animationDelay: "0.2s" }}>
          <MarketData onStockSelect={handleStockSelect} />
        </div>
      </div>

      {/* Trade History */}
      <div className="slide-up" style={{ animationDelay: "0.4s" }}>
        <TradeHistory />
      </div>
    </div>
  )
}