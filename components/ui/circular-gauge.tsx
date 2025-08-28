"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type CircularGaugeProps = {
  value: number
  size?: number
  strokeWidth?: number
  className?: string
  trackColor?: string
  indicatorColor?: string
  label?: React.ReactNode
  sublabel?: React.ReactNode
  showPercentText?: boolean
  roundedCaps?: boolean
}

export function CircularGauge({
  value,
  size = 120,
  strokeWidth = 10,
  className,
  trackColor = "#E5E7EB",
  indicatorColor,
  label,
  sublabel,
  showPercentText = true,
  roundedCaps = true,
}: CircularGaugeProps) {
  const clamped = Math.max(0, Math.min(100, value))
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (clamped / 100) * circumference
  const id = React.useId().replace(/:/g, "")

  const gradientId = `g-${id}`
  const resolvedIndicator = indicatorColor || undefined

  return (
    <div className={cn("inline-flex flex-col items-center justify-center", className)} style={{ width: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--primary)" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={resolvedIndicator || `url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap={roundedCaps ? "round" : "butt"}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        {showPercentText && (
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            className="fill-[color:var(--foreground)] font-semibold"
            style={{ fontSize: Math.max(12, size * 0.2) }}
          >
            {clamped}%
          </text>
        )}
      </svg>
      {(label || sublabel) && (
        <div className="mt-2 text-center">
          {label ? <div className="text-sm font-medium text-foreground">{label}</div> : null}
          {sublabel ? <div className="text-xs text-muted-foreground">{sublabel}</div> : null}
        </div>
      )}
    </div>
  )
}

export default CircularGauge


