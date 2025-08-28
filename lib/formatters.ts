/**
 * Professional Financial Formatting Utilities
 * Bloomberg-grade number formatting with institutional standards
 */

import { NumberFormatOptions, FormattedFinancial, Currency } from './types'

/**
 * Format number with professional financial standards
 */
export function formatFinancialNumber(
  value: number,
  options: NumberFormatOptions = { type: 'number' }
): FormattedFinancial {
  const { type, currency = 'USD', decimals, shorthand = false, showSign = false, monospace = true } = options

  let formatted = ''
  let shorthandFormatted = ''
  const isNegative = value < 0
  const absValue = Math.abs(value)

  // Determine color based on value and type
  const getColor = (): 'positive' | 'negative' | 'neutral' => {
    if (type === 'percentage' || showSign) {
      return value > 0 ? 'positive' : value < 0 ? 'negative' : 'neutral'
    }
    return 'neutral'
  }

  // Determine arrow based on value
  const getArrow = (): '↑' | '↓' | '→' | undefined => {
    if (type === 'percentage' || showSign) {
      return value > 0 ? '↑' : value < 0 ? '↓' : '→'
    }
    return undefined
  }

  // Format based on type
  switch (type) {
    case 'currency':
      const currencyDecimals = decimals ?? 2
      formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: currencyDecimals,
        maximumFractionDigits: currencyDecimals,
        signDisplay: showSign ? 'exceptZero' : 'auto'
      }).format(value)
      
      // Shorthand for large numbers
      if (shorthand) {
        shorthandFormatted = formatCurrencyShorthand(value, currency, currencyDecimals)
      } else {
        shorthandFormatted = formatted
      }
      break

    case 'percentage':
      const percentDecimals = decimals ?? 2
      formatted = new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: percentDecimals,
        maximumFractionDigits: percentDecimals,
        signDisplay: 'exceptZero'
      }).format(value / 100)
      shorthandFormatted = formatted
      break

    case 'volume':
      formatted = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value)
      shorthandFormatted = formatVolumeShorthand(value)
      break

    default: // 'number'
      const numberDecimals = decimals ?? (value % 1 === 0 ? 0 : 2)
      formatted = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: numberDecimals,
        maximumFractionDigits: numberDecimals,
        signDisplay: showSign ? 'exceptZero' : 'auto'
      }).format(value)
      
      if (shorthand && Math.abs(value) >= 1000) {
        shorthandFormatted = formatNumberShorthand(value, numberDecimals)
      } else {
        shorthandFormatted = formatted
      }
      break
  }

  return {
    raw: value,
    formatted,
    shorthand: shorthandFormatted,
    color: getColor(),
    arrow: getArrow()
  }
}

/**
 * Format currency with shorthand notation (K, M, B, T)
 */
function formatCurrencyShorthand(value: number, currency: Currency, decimals: number): string {
  const absValue = Math.abs(value)
  const sign = value < 0 ? '-' : ''
  const currencySymbol = getCurrencySymbol(currency)

  if (absValue >= 1e12) {
    return `${sign}${currencySymbol}${(absValue / 1e12).toFixed(decimals)}T`
  } else if (absValue >= 1e9) {
    return `${sign}${currencySymbol}${(absValue / 1e9).toFixed(decimals)}B`
  } else if (absValue >= 1e6) {
    return `${sign}${currencySymbol}${(absValue / 1e6).toFixed(decimals)}M`
  } else if (absValue >= 1e3) {
    return `${sign}${currencySymbol}${(absValue / 1e3).toFixed(decimals)}K`
  } else {
    return `${sign}${currencySymbol}${absValue.toFixed(decimals)}`
  }
}

/**
 * Format volume with shorthand notation
 */
function formatVolumeShorthand(value: number): string {
  const absValue = Math.abs(value)
  const sign = value < 0 ? '-' : ''

  if (absValue >= 1e9) {
    return `${sign}${(absValue / 1e9).toFixed(1)}B`
  } else if (absValue >= 1e6) {
    return `${sign}${(absValue / 1e6).toFixed(1)}M`
  } else if (absValue >= 1e3) {
    return `${sign}${(absValue / 1e3).toFixed(1)}K`
  } else {
    return `${sign}${absValue.toString()}`
  }
}

/**
 * Format number with shorthand notation
 */
function formatNumberShorthand(value: number, decimals: number): string {
  const absValue = Math.abs(value)
  const sign = value < 0 ? '-' : ''

  if (absValue >= 1e12) {
    return `${sign}${(absValue / 1e12).toFixed(decimals)}T`
  } else if (absValue >= 1e9) {
    return `${sign}${(absValue / 1e9).toFixed(decimals)}B`
  } else if (absValue >= 1e6) {
    return `${sign}${(absValue / 1e6).toFixed(decimals)}M`
  } else if (absValue >= 1e3) {
    return `${sign}${(absValue / 1e3).toFixed(decimals)}K`
  } else {
    return `${sign}${absValue.toFixed(decimals)}`
  }
}

/**
 * Get currency symbol for display
 */
function getCurrencySymbol(currency: Currency): string {
  const symbols: Record<Currency, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    CHF: 'CHF',
    CAD: 'C$',
    AUD: 'A$'
  }
  return symbols[currency] || currency
}

/**
 * Format timestamp for professional display
 */
export function formatTimestamp(date: Date, options: {
  includeSeconds?: boolean
  includeTimezone?: boolean
  format?: 'full' | 'short' | 'time-only'
} = {}): string {
  const { includeSeconds = true, includeTimezone = false, format = 'full' } = options

  const formatOptions: Intl.DateTimeFormatOptions = {
    timeZone: 'America/New_York', // EDT/EST for US markets
  }

  switch (format) {
    case 'time-only':
      formatOptions.hour = '2-digit'
      formatOptions.minute = '2-digit'
      if (includeSeconds) formatOptions.second = '2-digit'
      break
    case 'short':
      formatOptions.month = 'short'
      formatOptions.day = 'numeric'
      formatOptions.hour = '2-digit'
      formatOptions.minute = '2-digit'
      break
    default: // 'full'
      formatOptions.year = 'numeric'
      formatOptions.month = 'short'
      formatOptions.day = '2-digit'
      formatOptions.hour = '2-digit'
      formatOptions.minute = '2-digit'
      if (includeSeconds) formatOptions.second = '2-digit'
      break
  }

  if (includeTimezone) {
    formatOptions.timeZoneName = 'short'
  }

  return new Intl.DateTimeFormat('en-US', formatOptions).format(date)
}

/**
 * Format time ago for last update displays
 */
export function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)

  if (diffSec < 60) {
    return `${diffSec}s ago`
  } else if (diffMin < 60) {
    return `${diffMin}m ago`
  } else if (diffHour < 24) {
    return `${diffHour}h ago`
  } else {
    return `${diffDay}d ago`
  }
}

/**
 * Format delay information for data status
 */
export function formatDataDelay(delayMinutes: number): string {
  if (delayMinutes === 0) return 'Real-time'
  if (delayMinutes < 60) return `${delayMinutes}m delay`
  if (delayMinutes < 1440) return `${Math.floor(delayMinutes / 60)}h delay`
  return 'End of day'
}

/**
 * Get monospace CSS class for financial numbers
 */
export function getMonospaceClass(): string {
  return 'font-mono tabular-nums'
}

/**
 * Create professional table cell class with proper alignment
 */
export function getFinancialCellClass(type: 'number' | 'currency' | 'percentage' | 'text' = 'text'): string {
  const baseClass = 'px-4 py-2'
  
  switch (type) {
    case 'number':
    case 'currency':
    case 'percentage':
      return `${baseClass} text-right ${getMonospaceClass()}`
    default:
      return `${baseClass} text-left`
  }
}