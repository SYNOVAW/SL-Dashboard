"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

const priceData = [
  { date: "2025-01", price: 580, sma20: 575, sma50: 570, volume: 1200000 },
  { date: "2025-02", price: 595, sma20: 585, sma50: 575, volume: 1500000 },
  { date: "2025-03", price: 610, sma20: 600, sma50: 585, volume: 1800000 },
  { date: "2025-04", price: 625, sma20: 615, sma50: 600, volume: 1600000 },
  { date: "2025-05", price: 640, sma20: 630, sma50: 615, volume: 2000000 },
  { date: "2025-06", price: 635, sma20: 635, sma50: 625, volume: 1700000 },
]

const sentimentData = [
  { date: "2025-01", sentiment: 0.2 },
  { date: "2025-02", sentiment: 0.4 },
  { date: "2025-03", sentiment: 0.6 },
  { date: "2025-04", sentiment: 0.3 },
  { date: "2025-05", sentiment: 0.7 },
  { date: "2025-06", sentiment: 0.5 },
]

export function VisualDataLayer() {
  const timeframes = ["1M", "3M", "6M", "1Y"]

  return (
    <Card className="w-full bg-card border-border/50 rounded-xl soft-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-card-foreground font-inter">Market Analysis</CardTitle>
          <div className="flex gap-2">
            {timeframes.map((timeframe) => (
              <Button
                key={timeframe}
                variant={timeframe === "6M" ? "default" : "outline"}
                size="sm"
                className={
                  timeframe === "6M"
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                    : "border-border/50 hover:bg-accent/50 text-muted-foreground hover:text-foreground font-medium"
                }
              >
                {timeframe}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Price Chart */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <h3 className="font-semibold text-card-foreground font-inter">Price Movement</h3>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-primary rounded-full" />
                <span className="text-muted-foreground font-inter">Price</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-[var(--positive)] rounded-full" />
                <span className="text-muted-foreground font-inter">SMA20</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-[var(--neutral)] rounded-full" />
                <span className="text-muted-foreground font-inter">SMA50</span>
              </div>
            </div>
          </div>
          <div className="h-64 bg-[var(--chart-background)] rounded-lg p-4 border border-border/30">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: "hsl(var(--foreground))" }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "hsl(var(--foreground))" }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    color: "hsl(var(--card-foreground))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    fontFamily: "Inter, sans-serif",
                  }}
                />
                <Line type="monotone" dataKey="price" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 5 }} />
                <Line
                  type="monotone"
                  dataKey="sma20"
                  stroke="hsl(var(--positive))"
                  strokeWidth={2}
                  strokeDasharray="2 4"
                />
                <Line
                  type="monotone"
                  dataKey="sma50"
                  stroke="hsl(var(--neutral))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Volume Chart */}
        <div>
          <h3 className="font-semibold text-card-foreground mb-6 font-inter">Trading Volume</h3>
          <div className="h-32 bg-[var(--chart-background)] rounded-lg p-4 border border-border/30">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: "hsl(var(--foreground))" }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "hsl(var(--foreground))" }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    color: "hsl(var(--card-foreground))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    fontFamily: "Inter, sans-serif",
                  }}
                />
                <Bar dataKey="volume" fill="hsl(var(--muted-foreground))" opacity={0.6} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sentiment Heat Bar */}
        <div>
          <h3 className="font-semibold text-card-foreground mb-6 font-inter">Sentiment Timeline</h3>
          <div className="space-y-3">
            {sentimentData.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground w-16 font-inter font-medium">{item.date}</span>
                <div className="flex-1 h-3 bg-background rounded-full overflow-hidden border border-border/30">
                  <div
                    className={`h-full transition-all duration-500 ease-out ${
                      item.sentiment > 0.5
                        ? "bg-gradient-to-r from-[var(--positive)]/60 to-[var(--positive)]"
                        : "bg-gradient-to-r from-[var(--negative)] to-[var(--negative)]/60"
                    }`}
                    style={{ width: `${Math.abs(item.sentiment) * 100}%` }}
                  />
                </div>
                <Badge
                  variant="outline"
                  className={`text-xs font-medium font-inter px-3 py-1 rounded-full ${
                    item.sentiment > 0.5
                      ? "bg-[var(--positive)]/10 text-[var(--positive)] border-[var(--positive)]/30 hover:bg-[var(--positive)]/20"
                      : item.sentiment < 0.3
                        ? "bg-[var(--negative)]/10 text-[var(--negative)] border-[var(--negative)]/30 hover:bg-[var(--negative)]/20"
                        : "bg-[var(--neutral)]/10 text-[var(--neutral)] border-[var(--neutral)]/30"
                  }`}
                >
                  {item.sentiment > 0.5 ? "Positive" : item.sentiment < 0.3 ? "Negative" : "Neutral"}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
