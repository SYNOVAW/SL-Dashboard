/**
 * Professional Financial Data Types for Bloomberg-grade Dashboard
 * Provides comprehensive type definitions for institutional financial data
 */

export type DataSource = 'Reuters' | 'Bloomberg' | 'Yahoo Finance' | 'Alpha Vantage' | 'Quandl' | 'Internal'
export type DataStatus = 'real-time' | 'delayed' | 'end-of-day' | 'historical'
export type ConfidenceLevel = 'high' | 'medium' | 'low'
export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CHF' | 'CAD' | 'AUD'

/**
 * Core financial data with metadata
 */
export interface FinancialDataPoint {
  value: number
  timestamp: Date
  source: DataSource
  status: DataStatus
  confidence: ConfidenceLevel
  currency?: Currency
  formatted?: string
}

/**
 * Market data with professional metadata
 */
export interface MarketData {
  symbol: string
  price: FinancialDataPoint
  change: FinancialDataPoint
  changePercent: FinancialDataPoint
  volume: FinancialDataPoint
  marketCap?: FinancialDataPoint
  pe?: FinancialDataPoint
  lastUpdate: Date
  nextUpdate?: Date
  delay?: number // delay in minutes
}

/**
 * Professional sentiment analysis
 */
export interface SentimentAnalysis {
  overall: 'Positive' | 'Negative' | 'Neutral'
  score: number // -1 to 1
  confidence: number // 0-100
  sources: Array<{
    name: string
    sentiment: number
    weight: number
    timestamp: Date
  }>
  breakdown: {
    news: number
    social: number
    technical: number
    fundamental: number
  }
  lastUpdate: Date
}

/**
 * News item with professional structure
 */
export interface NewsItem {
  id: string
  headline: string
  summary?: string
  source: string
  author?: string
  timestamp: Date
  url?: string
  impact: 'high' | 'medium' | 'low'
  category: 'earnings' | 'economic' | 'geopolitical' | 'regulatory' | 'company'
  symbols?: string[]
  sentiment?: number
}

/**
 * Market index data
 */
export interface MarketIndex {
  symbol: string
  name: string
  value: FinancialDataPoint
  change: FinancialDataPoint
  changePercent: FinancialDataPoint
  high52w?: FinancialDataPoint
  low52w?: FinancialDataPoint
}

/**
 * Economic indicator
 */
export interface EconomicIndicator {
  name: string
  value: FinancialDataPoint
  previous?: FinancialDataPoint
  forecast?: FinancialDataPoint
  impact: 'high' | 'medium' | 'low'
  releaseDate: Date
  nextRelease?: Date
}

/**
 * Professional disclaimer/risk warning
 */
export interface Disclaimer {
  type: 'investment-advice' | 'data-accuracy' | 'risk-warning' | 'regulatory'
  content: string
  isRequired: boolean
  lastUpdated: Date
}

/**
 * Data source attribution
 */
export interface DataAttribution {
  primary: DataSource
  delay?: number
  lastUpdate: Date
  confidence: ConfidenceLevel
  coverage: string // e.g., "99.5% uptime"
  disclaimer?: string
}

/**
 * Chart configuration for professional display
 */
export interface ChartConfig {
  timeframe: '1D' | '5D' | '1M' | '3M' | '6M' | '1Y' | '2Y' | '5Y' | 'MAX'
  indicators: Array<{
    type: 'sma' | 'ema' | 'bollinger' | 'rsi' | 'macd' | 'volume'
    period?: number
    visible: boolean
  }>
  overlays: Array<{
    type: 'news' | 'earnings' | 'dividends' | 'splits'
    visible: boolean
  }>
  style: 'candlestick' | 'line' | 'area' | 'ohlc'
}

/**
 * Professional number formatting options
 */
export interface NumberFormatOptions {
  type: 'currency' | 'percentage' | 'number' | 'volume'
  currency?: Currency
  decimals?: number
  shorthand?: boolean // K, M, B notation
  showSign?: boolean
  monospace?: boolean
}

/**
 * Alert/notification for significant market events
 */
export interface MarketAlert {
  id: string
  type: 'price' | 'volume' | 'news' | 'technical' | 'economic'
  severity: 'critical' | 'high' | 'medium' | 'low'
  title: string
  message: string
  symbol?: string
  timestamp: Date
  acknowledged: boolean
  autoExpire?: Date
}

/**
 * Portfolio holding with professional metadata
 */
export interface PortfolioHolding {
  symbol: string
  name: string
  quantity: number
  avgPrice: FinancialDataPoint
  currentPrice: FinancialDataPoint
  marketValue: FinancialDataPoint
  unrealizedPnL: FinancialDataPoint
  unrealizedPnLPercent: FinancialDataPoint
  dayChange: FinancialDataPoint
  dayChangePercent: FinancialDataPoint
  weight: number // portfolio weight percentage
  sector?: string
  lastUpdate: Date
}

/**
 * Risk metrics for portfolio analysis
 */
export interface RiskMetrics {
  beta: FinancialDataPoint
  volatility: FinancialDataPoint
  sharpeRatio: FinancialDataPoint
  maxDrawdown: FinancialDataPoint
  var95: FinancialDataPoint // Value at Risk 95%
  var99: FinancialDataPoint // Value at Risk 99%
  lastCalculated: Date
}

/**
 * Time series data point for charts
 */
export interface TimeSeriesPoint {
  timestamp: Date
  open?: number
  high?: number
  low?: number
  close: number
  volume?: number
  sma20?: number
  sma50?: number
  sma200?: number
  rsi?: number
  sentiment?: number
}

/**
 * Market hours information
 */
export interface MarketHours {
  market: string
  timezone: string
  isOpen: boolean
  openTime: string
  closeTime: string
  nextOpen?: Date
  nextClose?: Date
  preMarket?: {
    isActive: boolean
    openTime: string
    closeTime: string
  }
  afterHours?: {
    isActive: boolean
    openTime: string
    closeTime: string
  }
}

/**
 * Utility type for formatted financial displays
 */
export interface FormattedFinancial {
  raw: number
  formatted: string
  shorthand: string
  color: 'positive' | 'negative' | 'neutral'
  arrow?: '↑' | '↓' | '→'
}