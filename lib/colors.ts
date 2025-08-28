/**
 * Color utilities for financial dashboard
 * Provides consistent color mapping and utility functions
 */

export const sentimentColors = {
  positive: {
    base: 'var(--positive)',
    light: 'var(--positive-light)', 
    dark: 'var(--positive-dark)',
    alpha10: 'rgba(var(--positive), 0.1)',
    alpha20: 'rgba(var(--positive), 0.2)',
    alpha30: 'rgba(var(--positive), 0.3)',
  },
  negative: {
    base: 'var(--negative)',
    light: 'var(--negative-light)',
    dark: 'var(--negative-dark)',
    alpha10: 'rgba(var(--negative), 0.1)',
    alpha20: 'rgba(var(--negative), 0.2)',
    alpha30: 'rgba(var(--negative), 0.3)',
  },
  neutral: {
    base: 'var(--neutral)',
    light: 'var(--neutral-light)',
    dark: 'var(--neutral-dark)',
    alpha10: 'rgba(var(--neutral), 0.1)',
    alpha20: 'rgba(var(--neutral), 0.2)',
    alpha30: 'rgba(var(--neutral), 0.3)',
  },
  highlight: {
    base: 'var(--highlight)',
    light: 'var(--highlight-light)',
    dark: 'var(--highlight-dark)',
    alpha10: 'rgba(var(--highlight), 0.1)',
    alpha20: 'rgba(var(--highlight), 0.2)',
    alpha30: 'rgba(var(--highlight), 0.3)',
  }
} as const

export type SentimentType = keyof typeof sentimentColors

/**
 * Get color classes for sentiment-based styling
 */
export function getSentimentColorClasses(sentiment: string): {
  text: string
  background: string
  border: string
  hover: string
} {
  const normalizedSentiment = sentiment.toLowerCase()
  
  switch (normalizedSentiment) {
    case 'positive':
    case 'bullish':
    case 'buy':
      return {
        text: 'text-positive',
        background: 'bg-positive/10',
        border: 'border-positive/20',
        hover: 'hover:bg-positive/20'
      }
    case 'negative':
    case 'bearish': 
    case 'sell':
      return {
        text: 'text-negative',
        background: 'bg-negative/10',
        border: 'border-negative/20',
        hover: 'hover:bg-negative/20'
      }
    case 'neutral':
    case 'mixed':
    case 'hold':
      return {
        text: 'text-neutral',
        background: 'bg-neutral/10', 
        border: 'border-neutral/20',
        hover: 'hover:bg-neutral/20'
      }
    default:
      return {
        text: 'text-highlight',
        background: 'bg-highlight/10',
        border: 'border-highlight/20',
        hover: 'hover:bg-highlight/20'
      }
  }
}

/**
 * Get gradient class for sentiment
 */
export function getSentimentGradient(sentiment: string): string {
  const normalizedSentiment = sentiment.toLowerCase()
  
  switch (normalizedSentiment) {
    case 'positive':
    case 'bullish':
      return 'gradient-positive'
    case 'negative':
    case 'bearish':
      return 'gradient-negative'
    case 'neutral':
    case 'mixed':
      return 'gradient-neutral'
    default:
      return 'gradient-highlight'
  }
}

/**
 * Get consistent badge styling for financial data
 */
export function getFinancialBadgeClasses(type: 'sentiment' | 'status' | 'metric', value?: string): string {
  const baseClasses = 'px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-300'
  
  if (type === 'sentiment' && value) {
    const colors = getSentimentColorClasses(value)
    return `${baseClasses} ${colors.text} ${colors.background} ${colors.border} ${colors.hover}`
  }
  
  if (type === 'status') {
    return `${baseClasses} text-highlight bg-highlight/10 border-highlight/20 hover:bg-highlight/20`
  }
  
  return `${baseClasses} text-muted-foreground bg-muted border-border`
}

/**
 * Get consistent card styling with sentiment colors
 */
export function getCardClasses(variant: 'default' | 'highlight' | 'glass' = 'default'): string {
  const baseClasses = 'rounded-xl border transition-all duration-300'
  
  switch (variant) {
    case 'highlight':
      return `${baseClasses} bg-gradient-to-br from-card to-card/80 border-highlight/20 hover-lift enhanced-shadow`
    case 'glass':
      return `${baseClasses} glass-morphism hover-lift`
    default:
      return `${baseClasses} bg-card border-border/20 hover-lift soft-shadow`
  }
}

/**
 * Color constants for charts and data visualization
 */
export const chartColors = {
  primary: 'var(--chart-1)',
  positive: 'var(--positive)',
  negative: 'var(--negative)', 
  neutral: 'var(--neutral)',
  highlight: 'var(--highlight)',
  background: 'var(--chart-background)'
} as const