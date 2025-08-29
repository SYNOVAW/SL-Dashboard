"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw, Bug, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
  errorId?: string
  timestamp?: Date
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<ErrorFallbackProps>
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
  resetOnPropsChange?: boolean
  isolate?: boolean
}

interface ErrorFallbackProps {
  error: Error
  errorInfo?: React.ErrorInfo
  resetError: () => void
  errorId?: string
  timestamp?: Date
}

/**
 * Professional error boundary with detailed error reporting
 * Provides comprehensive error handling for financial components
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private resetTimeoutId?: NodeJS.Timeout

  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorId: `ERR_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date()
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
      errorId: `ERR_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date()
    })

    // Log to external service in production
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    // Call onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // Auto-retry after 10 seconds for transient errors
    if (this.isTransientError(error)) {
      this.resetTimeoutId = setTimeout(() => {
        this.handleReset()
      }, 10000)
    }
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const { resetOnPropsChange } = this.props
    const { hasError } = this.state
    
    if (hasError && resetOnPropsChange && prevProps.children !== this.props.children) {
      this.handleReset()
    }
  }

  componentWillUnmount() {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId)
    }
  }

  private isTransientError(error: Error): boolean {
    const transientKeywords = ['network', 'fetch', 'timeout', 'connection']
    const errorMessage = error.message.toLowerCase()
    return transientKeywords.some(keyword => errorMessage.includes(keyword))
  }

  private handleReset = () => {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId)
    }
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  private getErrorSeverity(error: Error): 'low' | 'medium' | 'high' | 'critical' {
    const message = error.message.toLowerCase()
    
    if (message.includes('chunk') || message.includes('loading')) return 'low'
    if (message.includes('network') || message.includes('fetch')) return 'medium'
    if (message.includes('type') || message.includes('null')) return 'high'
    return 'critical'
  }

  render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      
      return (
        <FallbackComponent
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          resetError={this.handleReset}
          errorId={this.state.errorId}
          timestamp={this.state.timestamp}
        />
      )
    }

    return this.props.children
  }
}

/**
 * Default professional error fallback component
 */
export function DefaultErrorFallback({
  error,
  resetError,
  errorId,
  timestamp
}: ErrorFallbackProps) {
  const formatTimestamp = (date?: Date) => {
    if (!date) return 'Unknown'
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
  }

  const getErrorType = (error: Error): string => {
    if (error.name) return error.name
    if (error.message.includes('fetch')) return 'NetworkError'
    if (error.message.includes('timeout')) return 'TimeoutError'
    if (error.message.includes('parse')) return 'ParseError'
    return 'UnknownError'
  }

  const getSeverityBadge = (error: Error) => {
    const message = error.message.toLowerCase()
    
    if (message.includes('chunk') || message.includes('loading')) {
      return <Badge variant="outline" className="text-yellow-600 border-yellow-300 bg-yellow-50">Low</Badge>
    }
    if (message.includes('network') || message.includes('fetch')) {
      return <Badge variant="outline" className="text-orange-600 border-orange-300 bg-orange-50">Medium</Badge>
    }
    if (message.includes('type') || message.includes('null')) {
      return <Badge variant="destructive" className="bg-red-100 text-red-700 border-red-300">High</Badge>
    }
    return <Badge variant="destructive" className="bg-red-200 text-red-800 border-red-400">Critical</Badge>
  }

  return (
    <Card className="w-full max-w-2xl mx-auto border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-red-800 dark:text-red-200">
          <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/50">
            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
          </div>
          Component Error Detected
          {getSeverityBadge(error)}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Error Summary */}
        <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-red-200 dark:border-red-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-semibold text-muted-foreground">Error Type:</span>
              <div className="font-financial text-red-700 dark:text-red-300 mt-1">
                {getErrorType(error)}
              </div>
            </div>
            <div>
              <span className="font-semibold text-muted-foreground">Occurred:</span>
              <div className="font-financial text-muted-foreground mt-1">
                {formatTimestamp(timestamp)}
              </div>
            </div>
            <div>
              <span className="font-semibold text-muted-foreground">Error ID:</span>
              <div className="font-financial text-xs text-muted-foreground mt-1 font-mono">
                {errorId}
              </div>
            </div>
            <div>
              <span className="font-semibold text-muted-foreground">Status:</span>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-sm text-red-600 dark:text-red-400">System Isolated</span>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="bg-slate-900 dark:bg-slate-950 rounded-lg p-4 text-green-400 font-mono text-sm border">
          <div className="flex items-center gap-2 mb-2">
            <Bug className="h-4 w-4" />
            <span className="font-semibold">Error Details</span>
          </div>
          <div className="whitespace-pre-wrap break-words">
            {error.message}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button 
            onClick={resetError}
            variant="default"
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry Component
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => window.location.reload()}
            className="border-red-300 text-red-700 hover:bg-red-50"
          >
            Refresh Page
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => {
              const errorReport = {
                errorId,
                timestamp: timestamp?.toISOString(),
                error: error.message,
                stack: error.stack,
                userAgent: navigator.userAgent,
                url: window.location.href
              }
              
              navigator.clipboard.writeText(JSON.stringify(errorReport, null, 2))
                .then(() => alert('Error report copied to clipboard'))
                .catch(() => alert('Failed to copy error report'))
            }}
            className="text-muted-foreground"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Copy Error Report
          </Button>
        </div>

        {/* Professional Notice */}
        <div className="text-xs text-muted-foreground bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border">
          <div className="font-semibold mb-1">System Notice</div>
          This component has been isolated to prevent system-wide failure. 
          Market data may continue to function normally in other sections. 
          Our engineering team has been automatically notified.
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Hook for error boundary context
 */
export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null)

  const resetError = React.useCallback(() => {
    setError(null)
  }, [])

  const captureError = React.useCallback((error: Error) => {
    setError(error)
  }, [])

  React.useEffect(() => {
    if (error) {
      throw error
    }
  }, [error])

  return { captureError, resetError }
}

/**
 * Higher-order component wrapper
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryConfig?: Omit<ErrorBoundaryProps, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryConfig}>
      <Component {...props} />
    </ErrorBoundary>
  )
  
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`
  return WrappedComponent
}