import { Clock, Wifi, WifiOff, Shield } from "lucide-react"

interface DataSourceProps {
  source: string
  lastUpdated: string
  isRealTime: boolean
  confidence?: number
  delay?: number
}

export function DataSource({ 
  source, 
  lastUpdated, 
  isRealTime, 
  confidence,
  delay = 0 
}: DataSourceProps) {
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit', 
      second: '2-digit',
      hour12: false
    })
  }

  return (
    <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/20 pt-2 mt-3">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <Shield className="h-3 w-3" />
          <span className="data-source font-medium">{source}</span>
        </div>
        
        <div className={isRealTime ? "real-time-indicator" : "delayed-indicator"}>
          {isRealTime ? (
            <>
              <Wifi className="h-3 w-3" />
              <span>Real-time</span>
            </>
          ) : (
            <>
              <WifiOff className="h-3 w-3" />
              <span>Delayed {delay}min</span>
            </>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>Updated: {formatTime(lastUpdated)}</span>
        </div>
      </div>
      
      {confidence && (
        <div className="flex items-center gap-1">
          <div className={`h-2 w-12 bg-muted rounded-full overflow-hidden`}>
            <div 
              className="h-full bg-positive transition-all duration-300"
              style={{ width: `${confidence}%` }}
            />
          </div>
          <span className="text-[10px] font-financial">{confidence}%</span>
        </div>
      )}
    </div>
  )
}