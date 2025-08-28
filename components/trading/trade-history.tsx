"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Download, Filter, Clock } from "lucide-react"
import { getCardClasses, getSentimentColorClasses } from "@/lib/colors"
import { cn } from "@/lib/utils"

interface Trade {
  id: string
  symbol: string
  action: "BUY" | "SELL"
  quantity: number
  price: number
  total: number
  fee: number
  status: "FILLED" | "PENDING" | "CANCELLED"
  orderType: "MARKET" | "LIMIT" | "STOP"
  executedAt: string
  gainLoss?: number
}

const trades: Trade[] = [
  {
    id: "T001",
    symbol: "AAPL",
    action: "BUY",
    quantity: 100,
    price: 182.50,
    total: 18250.00,
    fee: 9.99,
    status: "FILLED",
    orderType: "MARKET",
    executedAt: "2024-01-15 09:30:00",
  },
  {
    id: "T002", 
    symbol: "MSFT",
    action: "BUY",
    quantity: 50,
    price: 370.25,
    total: 18512.50,
    fee: 9.99,
    status: "FILLED",
    orderType: "LIMIT",
    executedAt: "2024-01-14 14:22:15",
  },
  {
    id: "T003",
    symbol: "TSLA",
    action: "SELL",
    quantity: 25,
    price: 220.75,
    total: 5518.75,
    fee: 9.99,
    status: "FILLED",
    orderType: "MARKET",
    executedAt: "2024-01-12 11:45:30",
    gainLoss: 275.50
  },
  {
    id: "T004",
    symbol: "NVDA",
    action: "BUY",
    quantity: 25,
    price: 850.00,
    total: 21250.00,
    fee: 9.99,
    status: "PENDING",
    orderType: "LIMIT",
    executedAt: "2024-01-11 16:00:00",
  },
  {
    id: "T005",
    symbol: "GOOGL",
    action: "SELL",
    quantity: 30,
    price: 145.50,
    total: 4365.00,
    fee: 9.99,
    status: "CANCELLED",
    orderType: "STOP",
    executedAt: "2024-01-10 10:15:45",
  },
]

export function TradeHistory() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value)
  }

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime)
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "FILLED":
        return "bg-positive text-white"
      case "PENDING":
        return "bg-neutral text-white"
      case "CANCELLED":
        return "bg-negative text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getActionColor = (action: string) => {
    return getSentimentColorClasses(action === "BUY" ? "positive" : "negative")
  }

  return (
    <Card className={getCardClasses("default")}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Trade History
            </CardTitle>
            <CardDescription>
              Your recent trading activity and order history
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead>Action</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Date/Time</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trades.map((trade) => {
                const actionColor = getActionColor(trade.action)
                const { date, time } = formatDateTime(trade.executedAt)

                return (
                  <TableRow key={trade.id}>
                    <TableCell>
                      <p className="font-medium text-foreground">{trade.id}</p>
                      <p className="text-xs text-muted-foreground">
                        {trade.orderType}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="font-semibold text-foreground">
                        {trade.symbol}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn(
                        "font-medium",
                        trade.action === "BUY" 
                          ? "bg-positive text-white" 
                          : "bg-negative text-white"
                      )}>
                        {trade.action}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <p className="font-medium">{trade.quantity}</p>
                    </TableCell>
                    <TableCell className="text-right">
                      <p className="font-medium">
                        {formatCurrency(trade.price)}
                      </p>
                    </TableCell>
                    <TableCell className="text-right">
                      <div>
                        <p className="font-medium">
                          {formatCurrency(trade.total)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Fee: {formatCurrency(trade.fee)}
                        </p>
                        {trade.gainLoss && (
                          <p className={cn(
                            "text-xs font-medium",
                            trade.gainLoss >= 0 ? "text-positive" : "text-negative"
                          )}>
                            P&L: {trade.gainLoss >= 0 ? '+' : ''}{formatCurrency(trade.gainLoss)}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className={getStatusColor(trade.status)}>
                        {trade.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {date}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {time}
                        </p>
                      </div>
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
                          {trade.status === "PENDING" && (
                            <>
                              <DropdownMenuItem>Modify Order</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                Cancel Order
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>

        {/* Summary stats */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-3 rounded-lg bg-muted/20">
              <p className="text-sm text-muted-foreground">Total Trades</p>
              <p className="text-lg font-bold text-foreground">{trades.length}</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/20">
              <p className="text-sm text-muted-foreground">Filled Orders</p>
              <p className="text-lg font-bold text-foreground">
                {trades.filter(t => t.status === "FILLED").length}
              </p>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/20">
              <p className="text-sm text-muted-foreground">Total Fees</p>
              <p className="text-lg font-bold text-foreground">
                {formatCurrency(trades.reduce((sum, t) => sum + t.fee, 0))}
              </p>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/20">
              <p className="text-sm text-muted-foreground">Realized P&L</p>
              <p className={cn(
                "text-lg font-bold",
                "text-positive" // Assuming positive for demo
              )}>
                +{formatCurrency(275.50)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}