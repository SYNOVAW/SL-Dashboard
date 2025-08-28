"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Search, TrendingUp, TrendingDown, DollarSign } from "lucide-react"
import { getCardClasses } from "@/lib/colors"
import { cn } from "@/lib/utils"

interface OrderFormProps {
  selectedStock?: {
    symbol: string
    name: string
    price: number
    change: number
    changePercent: number
  }
}

export function OrderForm({ selectedStock }: OrderFormProps) {
  const [orderType, setOrderType] = useState<"market" | "limit" | "stop">("market")
  const [action, setAction] = useState<"buy" | "sell">("buy")
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")
  const [symbol, setSymbol] = useState(selectedStock?.symbol || "")
  const [duration, setDuration] = useState("day")
  const [isLoading, setIsLoading] = useState(false)

  const stock = selectedStock || {
    symbol: symbol.toUpperCase(),
    name: "Search for a symbol",
    price: 0,
    change: 0,
    changePercent: 0
  }

  const estimatedCost = parseFloat(quantity) * (orderType === "market" ? stock.price : parseFloat(price) || stock.price)
  const estimatedTotal = estimatedCost + (action === "buy" ? 9.99 : -9.99) // Commission fee

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Simulate order submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Reset form
      setQuantity("")
      setPrice("")
      
      // Show success (would typically show a toast notification)
      console.log("Order submitted successfully")
    } catch (error) {
      console.error("Order submission failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = symbol && quantity && (orderType === "market" || price)

  return (
    <Card className={getCardClasses("default")}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Place Order
        </CardTitle>
        <CardDescription>
          Buy or sell securities with real-time execution
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Stock Search */}
          <div className="space-y-2">
            <Label htmlFor="symbol">Symbol</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="symbol"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="Enter stock symbol (e.g., AAPL)"
                className="pl-10"
                required
              />
            </div>
            
            {symbol && (
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{stock.symbol}</p>
                    <p className="text-sm text-muted-foreground">{stock.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">
                      ${stock.price.toFixed(2)}
                    </p>
                    <div className={cn(
                      "text-sm flex items-center gap-1",
                      stock.change >= 0 ? "text-positive" : "text-negative"
                    )}>
                      {stock.change >= 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      ${Math.abs(stock.change).toFixed(2)} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Buy/Sell Tabs */}
          <Tabs value={action} onValueChange={(value) => setAction(value as "buy" | "sell")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="buy" className="text-positive data-[state=active]:bg-positive data-[state=active]:text-white">
                Buy
              </TabsTrigger>
              <TabsTrigger value="sell" className="text-negative data-[state=active]:bg-negative data-[state=active]:text-white">
                Sell
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value={action} className="space-y-4">
              {/* Order Type */}
              <div className="space-y-2">
                <Label>Order Type</Label>
                <Select value={orderType} onValueChange={(value) => setOrderType(value as any)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="market">Market Order</SelectItem>
                    <SelectItem value="limit">Limit Order</SelectItem>
                    <SelectItem value="stop">Stop Order</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  {orderType === "market" && "Execute immediately at current market price"}
                  {orderType === "limit" && "Execute only at specified price or better"}
                  {orderType === "stop" && "Execute when price reaches stop level"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Quantity */}
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="0"
                    min="1"
                    required
                  />
                </div>

                {/* Price (for limit/stop orders) */}
                <div className="space-y-2">
                  <Label htmlFor="price">
                    {orderType === "limit" ? "Limit Price" : orderType === "stop" ? "Stop Price" : "Market Price"}
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    value={orderType === "market" ? stock.price.toFixed(2) : price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder={stock.price.toFixed(2)}
                    step="0.01"
                    disabled={orderType === "market"}
                    required={orderType !== "market"}
                  />
                </div>
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <Label>Time in Force</Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Day Order</SelectItem>
                    <SelectItem value="gtc">Good Till Canceled (GTC)</SelectItem>
                    <SelectItem value="ioc">Immediate or Cancel (IOC)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>

          {/* Order Summary */}
          {quantity && symbol && (
            <div className="space-y-3">
              <Separator />
              <h4 className="font-semibold text-foreground">Order Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Action:</span>
                  <Badge variant={action === "buy" ? "default" : "secondary"}>
                    {action.toUpperCase()} {quantity} shares of {symbol}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order Type:</span>
                  <span className="text-foreground capitalize">{orderType} Order</span>
                </div>
                {orderType !== "market" && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="text-foreground">${parseFloat(price || "0").toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Cost:</span>
                  <span className="text-foreground">${estimatedCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Commission:</span>
                  <span className="text-foreground">$9.99</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span className="text-foreground">Total {action === "buy" ? "Cost" : "Proceeds"}:</span>
                  <span className="text-foreground">${Math.abs(estimatedTotal).toFixed(2)}</span>
                </div>
              </div>
              
              <Alert>
                <DollarSign className="h-4 w-4" />
                <AlertDescription>
                  {action === "buy" 
                    ? `You need $${Math.abs(estimatedTotal).toFixed(2)} in buying power to complete this order.`
                    : `You will receive approximately $${Math.abs(estimatedTotal).toFixed(2)} from this sale.`
                  }
                </AlertDescription>
              </Alert>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className={cn(
              "w-full",
              action === "buy" ? "bg-positive hover:bg-positive/90" : "bg-negative hover:bg-negative/90"
            )}
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? "Placing Order..." : `${action === "buy" ? "Buy" : "Sell"} ${symbol || "Stock"}`}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}