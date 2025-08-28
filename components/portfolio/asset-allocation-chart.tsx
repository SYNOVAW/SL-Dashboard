"use client"

import React from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getCardClasses } from "@/lib/colors"

const data = [
  { name: "Stocks", value: 65, color: "#1d3c78", amount: 325000 },
  { name: "Bonds", value: 20, color: "#29abe2", amount: 100000 },
  { name: "Real Estate", value: 10, color: "#00c853", amount: 50000 },
  { name: "Crypto", value: 3, color: "#ff9800", amount: 15000 },
  { name: "Cash", value: 2, color: "#d50000", amount: 10000 },
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="font-semibold text-foreground">{data.name}</p>
        <p className="text-sm text-muted-foreground">
          ${data.amount.toLocaleString()} ({data.value}%)
        </p>
      </div>
    )
  }
  return null
}

export function AssetAllocationChart() {
  const totalValue = data.reduce((sum, item) => sum + item.amount, 0)

  return (
    <Card className={getCardClasses("default")}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Asset Allocation
          <span className="text-sm font-normal text-muted-foreground">
            (${totalValue.toLocaleString()})
          </span>
        </CardTitle>
        <CardDescription>
          Distribution of your investment portfolio
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {item.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  ${item.amount.toLocaleString()} ({item.value}%)
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}