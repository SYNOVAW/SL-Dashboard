"use client"

import React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Loader2, TrendingUp, BarChart3, Clock, Wifi, Database } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingStateProps {
  variant?: 'default' | 'card' | 'inline' | 'minimal'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  message?: string
  showProgress?: boolean
  progress?: number
  className?: string
}

/**
 * Professional loading component with financial context
 */
export function LoadingState({ 
  variant = 'default',
  size = 'md', 
  message = 'Loading market data...',
  showProgress = false,
  progress = 0,
  className
}: LoadingStateProps) {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16', 
    xl: 'h-20'
  }

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-8 w-8'
  }

  if (variant === 'minimal') {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Loader2 className={cn("animate-spin text-highlight", iconSizes[size])} />
        {message && <span className="text-sm text-muted-foreground">{message}</span>}
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <div className={cn("flex items-center justify-center py-4", className)}>
        <div className="flex items-center gap-3">
          <Loader2 className={cn("animate-spin text-highlight", iconSizes[size])} />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-card-foreground">{message}</span>
            {showProgress && (
              <div className="flex items-center gap-2 mt-1">
                <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-highlight transition-all duration-300"
                    style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground font-financial">
                  {Math.round(progress)}%
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <Card className={cn("w-full", className)}>
        <CardContent className="flex items-center justify-center py-8">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-2 border-muted" />
              <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-highlight border-t-transparent animate-spin" />
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-card-foreground mb-1">{message}</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Database className="h-3 w-3" />
                <span>Fetching real-time data</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={cn("flex flex-col items-center justify-center", sizeClasses[size], className)}>
      <div className="flex items-center gap-3">
        <Loader2 className={cn("animate-spin text-highlight", iconSizes[size])} />
        <span className="text-sm font-medium text-card-foreground">{message}</span>
      </div>
      {showProgress && (
        <div className="mt-3 w-full max-w-xs">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Loading</span>
            <span className="font-financial">{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-highlight transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Skeleton loading for summary zone
 */
export function SummaryZoneSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader className="pb-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        <Skeleton className="h-4 w-96 mt-2" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Judgment & Action */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <Skeleton className="h-8 w-32 rounded-full" />
            <Skeleton className="h-4 w-full" />
          </div>

          {/* Confidence Ring */}
          <div className="flex justify-center">
            <Skeleton className="h-36 w-36 rounded-full" />
          </div>

          {/* Time Context */}
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 border border-border/20 rounded-xl">
                <Skeleton className="h-3 w-16 mb-2" />
                <Skeleton className="h-5 w-24 mb-1" />
                <Skeleton className="h-3 w-20" />
              </div>
            ))}
          </div>
        </div>

        {/* Analysis Summary */}
        <div className="p-6 border border-border/20 rounded-2xl">
          <div className="flex items-start gap-4">
            <Skeleton className="w-3 h-3 rounded-full mt-3" />
            <div className="flex-1">
              <Skeleton className="h-5 w-48 mb-2" />
              <div className="space-y-2 mb-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="flex items-center justify-between flex-wrap gap-4 mt-4 pt-4 border-t border-border/20">
                <div className="flex items-center gap-6">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Skeleton loading for market indices
 */
export function MarketIndicesSkeleton() {
  return (
    <Card className="w-72">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="w-2 h-2 rounded-full" />
        </div>
        
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between py-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-3 w-3" />
                </div>
                <Skeleton className="h-3 w-20" />
              </div>
              <div className="text-right">
                <Skeleton className="h-4 w-16 mb-1" />
                <div className="flex items-center gap-1">
                  <Skeleton className="h-3 w-8" />
                  <Skeleton className="h-3 w-12" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-2 border border-border/20 rounded-lg">
          <Skeleton className="h-3 w-20 mb-2 mx-auto" />
          <div className="flex items-center justify-center gap-2 mb-2">
            <Skeleton className="w-2 h-2 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-3 w-16 mx-auto" />
        </div>
      </div>
    </Card>
  )
}

/**
 * Skeleton loading for news ticker
 */
export function NewsTickerSkeleton() {
  return (
    <div className="bg-card border-y border-border/20">
      <div className="flex items-center px-4 py-2">
        <Skeleton className="h-6 w-20 rounded mr-3" />
        <div className="flex-1 h-8 flex items-center">
          <div className="flex items-center gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-3 w-10" />
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Real-time data indicator
 */
export function DataStatusIndicator({ 
  isRealTime = true, 
  lastUpdate, 
  className 
}: {
  isRealTime?: boolean
  lastUpdate?: string | Date
  className?: string
}) {
  const formatLastUpdate = () => {
    if (!lastUpdate) return 'Unknown'
    const date = typeof lastUpdate === 'string' ? new Date(lastUpdate) : lastUpdate
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
  }

  return (
    <div className={cn("flex items-center gap-2 text-xs", className)}>
      <div className={cn(
        "flex items-center gap-1",
        isRealTime ? "text-positive" : "text-neutral"
      )}>
        <div className={cn(
          "w-2 h-2 rounded-full",
          isRealTime ? "bg-positive animate-pulse" : "bg-neutral"
        )} />
        {isRealTime ? (
          <Wifi className="h-3 w-3" />
        ) : (
          <Clock className="h-3 w-3" />
        )}
        <span className="font-medium">
          {isRealTime ? 'Real-time' : 'Delayed'}
        </span>
      </div>
      {lastUpdate && (
        <>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground font-financial">
            {formatLastUpdate()}
          </span>
        </>
      )}
    </div>
  )
}

/**
 * Progress bar for data loading
 */
export function DataProgressBar({ 
  progress, 
  message, 
  className 
}: {
  progress: number
  message?: string
  className?: string
}) {
  const clampedProgress = Math.min(100, Math.max(0, progress))
  
  return (
    <div className={cn("w-full", className)}>
      {message && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">{message}</span>
          <span className="text-xs text-muted-foreground font-financial">
            {Math.round(clampedProgress)}%
          </span>
        </div>
      )}
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-highlight to-highlight-light transition-all duration-500 ease-out"
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  )
}

/**
 * Pulsing skeleton for real-time data
 */
export function PulsingValue({ 
  isLoading = true, 
  children, 
  className 
}: {
  isLoading?: boolean
  children: React.ReactNode
  className?: string
}) {
  if (isLoading) {
    return <Skeleton className={cn("animate-pulse", className)} />
  }
  
  return <span className={className}>{children}</span>
}