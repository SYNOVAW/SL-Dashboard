"use client"

import React from "react"
import { ArrowDown, ArrowUp, MoreHorizontal, TrendingDown, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getCardClasses, getSentimentColorClasses } from "@/lib/colors"
import { cn } from "@/lib/utils"

interface Holding {
  symbol: string
  name: string
  shares: number
  currentPrice: number
  avgCost: number
  marketValue: number
  dayChange: number
  dayChangePercent: number
  totalGainLoss: number
  totalGainLossPercent: number
  sector: string
}

const holdings: Holding[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    shares: 100,
    currentPrice: 185.25,
    avgCost: 172.50,
    marketValue: 18525,
    dayChange: 2.75,
    dayChangePercent: 1.51,
    totalGainLoss: 1275,
    totalGainLossPercent: 7.39,
    sector: "Technology"
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    shares: 50,
    currentPrice: 374.50,
    avgCost: 360.00,
    marketValue: 18725,
    dayChange: -5.25,
    dayChangePercent: -1.38,
    totalGainLoss: 725,
    totalGainLossPercent: 4.03,
    sector: "Technology"
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    shares: 75,
    currentPrice: 142.80,
    avgCost: 135.20,
    marketValue: 10710,
    dayChange: 1.20,
    dayChangePercent: 0.85,
    totalGainLoss: 570,
    totalGainLossPercent: 5.62,
    sector: "Technology"
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    shares: 30,
    currentPrice: 208.50,
    avgCost: 245.80,
    marketValue: 6255,
    dayChange: -8.75,
    dayChangePercent: -4.03,
    totalGainLoss: -1119,
    totalGainLossPercent: -15.18,
    sector: "Consumer Discretionary"
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    shares: 25,
    currentPrice: 875.30,
    avgCost: 420.50,
    marketValue: 21882.50,
    dayChange: 15.20,
    dayChangePercent: 1.77,
    totalGainLoss: 11370,
    totalGainLossPercent: 108.26,
    sector: "Technology"
  },
]

export function HoldingsTable() {
  const totalMarketValue = holdings.reduce((sum, holding) => sum + holding.marketValue, 0)
  const totalGainLoss = holdings.reduce((sum, holding) => sum + holding.totalGainLoss, 0)
  const totalGainLossPercent = (totalGainLoss / (totalMarketValue - totalGainLoss)) * 100

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value)
  }

  const formatPercent = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
  }

  return (
    <Card className={getCardClasses("default")}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Holdings</CardTitle>
            <CardDescription>
              Your current investment positions
            </CardDescription>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">
              {formatCurrency(totalMarketValue)}
            </p>
            <p className={cn(
              "text-sm font-medium flex items-center gap-1",
              totalGainLoss >= 0 ? "text-positive" : "text-negative"
            )}>
              {totalGainLoss >= 0 ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              {formatCurrency(totalGainLoss)} ({formatPercent(totalGainLossPercent)})
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Shares</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Day Change</TableHead>
                <TableHead className="text-right">Market Value</TableHead>
                <TableHead className="text-right">Total Gain/Loss</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {holdings.map((holding) => {
                const dayChangeColor = getSentimentColorClasses(
                  holding.dayChange >= 0 ? "positive" : "negative"
                )
                const gainLossColor = getSentimentColorClasses(
                  holding.totalGainLoss >= 0 ? "positive" : "negative"
                )

                return (
                  <TableRow key={holding.symbol}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">
                          {holding.symbol}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {holding.name}
                        </p>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {holding.sector}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{holding.shares}</p>
                      <p className="text-xs text-muted-foreground">
                        Avg: {formatCurrency(holding.avgCost)}
                      </p>
                    </TableCell>
                    <TableCell className="text-right">
                      <p className="font-medium">
                        {formatCurrency(holding.currentPrice)}
                      </p>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className={cn(
                        "flex items-center justify-end gap-1",
                        dayChangeColor.text
                      )}>
                        {holding.dayChange >= 0 ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        )}
                        <span className="font-medium">
                          {formatCurrency(Math.abs(holding.dayChange))}
                        </span>
                      </div>
                      <p className={cn("text-xs", dayChangeColor.text)}>
                        {formatPercent(holding.dayChangePercent)}
                      </p>
                    </TableCell>
                    <TableCell className="text-right">
                      <p className="font-medium">
                        {formatCurrency(holding.marketValue)}
                      </p>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className={cn(
                        "flex items-center justify-end gap-1",
                        gainLossColor.text
                      )}>
                        {holding.totalGainLoss >= 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        <span className="font-medium">
                          {formatCurrency(Math.abs(holding.totalGainLoss))}
                        </span>
                      </div>
                      <p className={cn("text-xs", gainLossColor.text)}>
                        {formatPercent(holding.totalGainLossPercent)}
                      </p>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Buy More</DropdownMenuItem>
                          <DropdownMenuItem>Sell</DropdownMenuItem>
                          <DropdownMenuItem>Add to Watchlist</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}