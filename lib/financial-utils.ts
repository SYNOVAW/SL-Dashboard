/**
 * Financial data formatting utilities
 * Provides consistent formatting for financial numbers, prices, and percentages
 */

export interface PriceFormatOptions {
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  currency?: string
  showCurrency?: boolean
  compact?: boolean
}

export interface PercentageFormatOptions {
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  showSign?: boolean
  compact?: boolean
}

/**
 * Format price with proper decimal places and optional currency
 */
export function formatPrice(
  price: number, 
  options: PriceFormatOptions = {}
): string {
  const {
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
    currency = 'USD',
    showCurrency = false,
    compact = false
  } = options

  if (compact && Math.abs(price) >= 1000000) {
    const millions = price / 1000000
    const formatted = millions.toLocaleString('en-US', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    })
    return `${formatted}M${showCurrency ? ` ${currency}` : ''}`
  }

  if (compact && Math.abs(price) >= 1000) {
    const thousands = price / 1000
    const formatted = thousands.toLocaleString('en-US', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    })
    return `${formatted}K${showCurrency ? ` ${currency}` : ''}`
  }

  const formatted = price.toLocaleString('en-US', {
    minimumFractionDigits,
    maximumFractionDigits
  })

  return showCurrency ? `${formatted} ${currency}` : formatted
}

/**
 * Format percentage with proper sign and decimal places
 */
export function formatPercentage(
  percentage: number,
  options: PercentageFormatOptions = {}
): string {
  const {
    minimumFractionDigits = 1,
    maximumFractionDigits = 2,
    showSign = true,
    compact = false
  } = options

  const sign = showSign && percentage >= 0 ? '+' : ''
  const formatted = percentage.toLocaleString('en-US', {
    minimumFractionDigits,
    maximumFractionDigits
  })

  return `${sign}${formatted}%`
}

/**
 * Format change value with appropriate sign and styling
 */
export function formatChange(
  change: number,
  options: PriceFormatOptions = {}
): string {
  const sign = change >= 0 ? '+' : ''
  const formatted = formatPrice(Math.abs(change), options)
  return `${sign}${change >= 0 ? '' : '-'}${formatted}`
}

/**
 * Format large numbers with appropriate suffixes (K, M, B, T)
 */
export function formatLargeNumber(
  num: number,
  options: { precision?: number; forceDecimals?: boolean } = {}
): string {
  const { precision = 1, forceDecimals = false } = options

  if (Math.abs(num) >= 1e12) {
    const formatted = (num / 1e12).toFixed(precision)
    return forceDecimals || formatted.includes('.') 
      ? `${formatted}T` 
      : `${Math.round(num / 1e12)}T`
  }
  
  if (Math.abs(num) >= 1e9) {
    const formatted = (num / 1e9).toFixed(precision)
    return forceDecimals || formatted.includes('.') 
      ? `${formatted}B` 
      : `${Math.round(num / 1e9)}B`
  }
  
  if (Math.abs(num) >= 1e6) {
    const formatted = (num / 1e6).toFixed(precision)
    return forceDecimals || formatted.includes('.') 
      ? `${formatted}M` 
      : `${Math.round(num / 1e6)}M`
  }
  
  if (Math.abs(num) >= 1e3) {
    const formatted = (num / 1e3).toFixed(precision)
    return forceDecimals || formatted.includes('.') 
      ? `${formatted}K` 
      : `${Math.round(num / 1e3)}K`
  }
  
  return num.toFixed(forceDecimals ? precision : 0)
}

/**
 * Format volume with appropriate units
 */
export function formatVolume(volume: number): string {
  return formatLargeNumber(volume, { precision: 1 })
}

/**
 * Format market cap with appropriate units and currency
 */
export function formatMarketCap(marketCap: number, currency = 'USD'): string {
  const formatted = formatLargeNumber(marketCap, { precision: 2 })
  return `${formatted} ${currency}`
}

/**
 * Get sentiment-based CSS classes for styling financial data
 */
export function getSentimentClasses(value: number, neutralThreshold = 0): {
  text: string
  background: string
  border: string
} {
  if (value > neutralThreshold) {
    return {
      text: 'text-positive',
      background: 'bg-positive/10',
      border: 'border-positive/20'
    }
  } else if (value < neutralThreshold) {
    return {
      text: 'text-negative', 
      background: 'bg-negative/10',
      border: 'border-negative/20'
    }
  } else {
    return {
      text: 'text-neutral',
      background: 'bg-neutral/10',
      border: 'border-neutral/20'
    }
  }
}

/**
 * Format time with financial market context
 */
export function formatMarketTime(
  timestamp: string | Date,
  options: {
    format?: 'short' | 'time-only' | 'full' | 'relative'
    timezone?: string
  } = {}
): string {
  const { format = 'full', timezone = 'America/New_York' } = options
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp

  if (format === 'relative') {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    
    if (diffMins < 1) return 'Just now'
    if (diffMins === 1) return '1 min ago'
    if (diffMins < 60) return `${diffMins} mins ago`
    
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours === 1) return '1 hour ago'
    if (diffHours < 24) return `${diffHours} hours ago`
    
    const diffDays = Math.floor(diffHours / 24)
    if (diffDays === 1) return '1 day ago'
    return `${diffDays} days ago`
  }

  const timeOptions: Intl.DateTimeFormatOptions = {
    timeZone: timezone,
    hour12: false
  }

  switch (format) {
    case 'time-only':
      return date.toLocaleTimeString('en-US', {
        ...timeOptions,
        hour: '2-digit',
        minute: '2-digit'
      })
    case 'short':
      return date.toLocaleString('en-US', {
        ...timeOptions,
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    default:
      return date.toLocaleString('en-US', {
        ...timeOptions,
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
  }
}

/**
 * Calculate and format time until market close/open
 */
export function formatMarketStatus(): {
  isOpen: boolean
  status: string
  nextEvent: string
  timeUntilNext: string
} {
  const now = new Date()
  const nyTime = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}))
  const hour = nyTime.getHours()
  const minute = nyTime.getMinutes()
  const currentMinutes = hour * 60 + minute
  
  // Market hours: 9:30 AM - 4:00 PM ET (weekdays)
  const marketOpen = 9 * 60 + 30  // 9:30 AM
  const marketClose = 16 * 60     // 4:00 PM
  const dayOfWeek = nyTime.getDay() // 0 = Sunday, 6 = Saturday
  
  // Check if it's a weekend
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    const daysUntilMonday = dayOfWeek === 0 ? 1 : 2
    return {
      isOpen: false,
      status: 'Market Closed',
      nextEvent: 'Market Open',
      timeUntilNext: `${daysUntilMonday} day${daysUntilMonday > 1 ? 's' : ''}`
    }
  }
  
  // Check if market is currently open
  if (currentMinutes >= marketOpen && currentMinutes < marketClose) {
    const minutesUntilClose = marketClose - currentMinutes
    const hours = Math.floor(minutesUntilClose / 60)
    const mins = minutesUntilClose % 60
    
    return {
      isOpen: true,
      status: 'Market Open',
      nextEvent: 'Market Close',
      timeUntilNext: `${hours}h ${mins}m`
    }
  } else {
    // Market is closed, calculate time until next open
    let minutesUntilOpen
    if (currentMinutes >= marketClose) {
      // After market close, next open is tomorrow
      minutesUntilOpen = (24 * 60) - currentMinutes + marketOpen
    } else {
      // Before market open, next open is today
      minutesUntilOpen = marketOpen - currentMinutes
    }
    
    const hours = Math.floor(minutesUntilOpen / 60)
    const mins = minutesUntilOpen % 60
    
    return {
      isOpen: false,
      status: 'Market Closed',
      nextEvent: 'Market Open',
      timeUntilNext: `${hours}h ${mins}m`
    }
  }
}

/**
 * Format data delay information
 */
export function formatDataDelay(delayMinutes: number): string {
  if (delayMinutes === 0) return 'Real-time'
  if (delayMinutes < 60) return `${delayMinutes}min delay`
  
  const hours = Math.floor(delayMinutes / 60)
  const mins = delayMinutes % 60
  
  if (mins === 0) return `${hours}h delay`
  return `${hours}h ${mins}m delay`
}

/**
 * Professional number formatting with Bloomberg-style precision
 */
export function formatFinancialNumber(
  value: number,
  type: 'price' | 'percentage' | 'volume' | 'marketcap' | 'ratio' = 'price'
): string {
  switch (type) {
    case 'price':
      return formatPrice(value, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    case 'percentage':
      return formatPercentage(value, { minimumFractionDigits: 1, maximumFractionDigits: 2 })
    case 'volume':
      return formatVolume(value)
    case 'marketcap':
      return formatMarketCap(value)
    case 'ratio':
      return formatPrice(value, { minimumFractionDigits: 2, maximumFractionDigits: 3 })
    default:
      return value.toFixed(2)
  }
}