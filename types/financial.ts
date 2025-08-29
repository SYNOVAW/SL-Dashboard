/**
 * TypeScript interfaces for financial dashboard data
 * Provides type safety and structure for all financial data models
 */

export type SentimentType = 'positive' | 'negative' | 'neutral' | 'bullish' | 'bearish' | 'mixed'
export type ActionType = 'buy' | 'sell' | 'hold' | 'strong_buy' | 'strong_sell'
export type ImportanceLevel = 'high' | 'medium' | 'low'
export type DataStatus = 'real-time' | 'delayed' | 'stale' | 'offline'
export type ConfidenceLevel = 'high' | 'medium' | 'low'
export type MarketStatus = 'open' | 'closed' | 'pre-market' | 'after-hours'

/**
 * Base interface for timestamped data
 */
export interface TimestampedData {
  timestamp: string | Date
  lastUpdated: string | Date
  dataSource?: string
  confidence?: number
}

/**
 * Financial instrument/security data
 */
export interface Security extends TimestampedData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume?: number
  marketCap?: number
  sector?: string
  exchange?: string
}

/**
 * Market index data
 */
export interface MarketIndex extends TimestampedData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  isUp: boolean
  volume?: number
  previousClose?: number
}

/**
 * Agent voting/sentiment data
 */
export interface AgentVote extends TimestampedData {
  agentId: string
  agentName: string
  sentiment: SentimentType
  action: ActionType
  confidence: number
  reasoning?: string
  weight?: number
  isActive: boolean
}

/**
 * Aggregated market sentiment
 */
export interface MarketSentiment extends TimestampedData {
  overallSentiment: SentimentType
  confidenceScore: number
  suggestedAction: ActionType
  biasNote?: string
  consensusStrength: number
  volatilityIndex?: number
}

/**
 * News item data
 */
export interface NewsItem extends TimestampedData {
  id: string
  headline: string
  summary?: string
  source: string
  url?: string
  sentiment: SentimentType
  importance: ImportanceLevel
  tags?: string[]
  impact?: number
}

/**
 * Professional data source information
 */
export interface DataSourceInfo {
  source: string
  lastUpdated: string | Date
  isRealTime: boolean
  confidence?: number
  delay?: number
  status: DataStatus
  reliability?: ConfidenceLevel
}

/**
 * Chart data point
 */
export interface ChartDataPoint {
  timestamp: string | Date
  value: number
  volume?: number
  open?: number
  high?: number
  low?: number
  close?: number
}

/**
 * Time series data
 */
export interface TimeSeriesData {
  symbol?: string
  interval: string
  data: ChartDataPoint[]
  metadata?: {
    source: string
    timezone: string
    currency: string
  }
}

/**
 * Market status information
 */
export interface MarketStatusInfo {
  isOpen: boolean
  status: MarketStatus
  nextEvent: string
  timeUntilNext: string
  timezone: string
  lastTradingDay?: string | Date
  nextTradingDay?: string | Date
}

/**
 * Financial metrics
 */
export interface FinancialMetrics extends TimestampedData {
  symbol: string
  pe?: number
  pb?: number
  eps?: number
  dividend?: number
  dividendYield?: number
  marketCap?: number
  beta?: number
  fiftyTwoWeekHigh?: number
  fiftyTwoWeekLow?: number
}

/**
 * Portfolio position data
 */
export interface Position extends TimestampedData {
  symbol: string
  quantity: number
  averageCost: number
  currentPrice: number
  marketValue: number
  unrealizedPnL: number
  unrealizedPnLPercent: number
  dayChange: number
  dayChangePercent: number
}

/**
 * Risk metrics
 */
export interface RiskMetrics extends TimestampedData {
  symbol?: string
  var?: number // Value at Risk
  beta?: number
  sharpeRatio?: number
  volatility?: number
  maxDrawdown?: number
  correlationSPY?: number
}

/**
 * Economic indicator data
 */
export interface EconomicIndicator extends TimestampedData {
  name: string
  value: number
  previousValue?: number
  change?: number
  changePercent?: number
  unit: string
  frequency: string
  importance: ImportanceLevel
  nextRelease?: string | Date
}

/**
 * Alert/notification data
 */
export interface Alert extends TimestampedData {
  id: string
  type: 'price' | 'news' | 'sentiment' | 'technical' | 'earnings'
  severity: ImportanceLevel
  title: string
  message: string
  symbol?: string
  isRead: boolean
  isActive: boolean
  triggerValue?: number
  currentValue?: number
}

/**
 * User preferences and settings
 */
export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto'
  currency: string
  timezone: string
  refreshInterval: number
  notifications: {
    email: boolean
    push: boolean
    inApp: boolean
  }
  watchlist: string[]
  defaultChartInterval: string
  riskTolerance: 'conservative' | 'moderate' | 'aggressive'
}

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
  data: T
  success: boolean
  timestamp: string | Date
  source: string
  cached?: boolean
  error?: string
  metadata?: Record<string, any>
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    hasNext: boolean
    hasPrev: boolean
  }
}

/**
 * Real-time data update
 */
export interface RealtimeUpdate<T> {
  type: 'price' | 'sentiment' | 'news' | 'alert'
  data: T
  timestamp: string | Date
  source: string
  changeType: 'insert' | 'update' | 'delete'
}

/**
 * Component state interfaces
 */
export interface LoadingState {
  isLoading: boolean
  error?: string
  lastError?: Error
  retryCount?: number
}

export interface ComponentState extends LoadingState {
  data?: any
  initialized: boolean
  lastUpdate?: string | Date
}

/**
 * Keyboard shortcut configuration
 */
export interface KeyboardShortcut {
  key: string
  description: string
  action: () => void
  category: 'navigation' | 'data' | 'view' | 'trading'
  enabled: boolean
}

/**
 * Professional terminal configuration
 */
export interface TerminalConfig {
  layout: 'single' | 'dual' | 'quad'
  refreshRate: number
  fontFamily: 'monospace' | 'financial'
  fontSize: number
  colorScheme: 'bloomberg' | 'reuters' | 'custom'
  showDataSources: boolean
  showTimestamps: boolean
  enableKeyboardShortcuts: boolean
  shortcuts: KeyboardShortcut[]
}

/**
 * Dashboard widget configuration
 */
export interface WidgetConfig {
  id: string
  type: 'chart' | 'table' | 'gauge' | 'news' | 'alerts'
  title: string
  size: 'small' | 'medium' | 'large'
  position: { x: number; y: number }
  visible: boolean
  refreshInterval?: number
  settings: Record<string, any>
}

/**
 * Dashboard layout configuration
 */
export interface DashboardLayout {
  id: string
  name: string
  widgets: WidgetConfig[]
  isDefault: boolean
  createdAt: string | Date
  updatedAt: string | Date
}