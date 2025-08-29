"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardAction } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Trash2, TrendingUp, TrendingDown, Star, Search, Filter } from "lucide-react"
import { cn } from "@/lib/utils"

interface WatchlistItem {
  id: string
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  marketCap: string
  sector: string
  starred: boolean
  addedDate: string
}

// Mock watchlist data
const mockWatchlistData: WatchlistItem[] = [
  {
    id: "1",
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 175.43,
    change: 2.15,
    changePercent: 1.24,
    volume: 52400000,
    marketCap: "$2.8T",
    sector: "Technology",
    starred: true,
    addedDate: "2024-01-15"
  },
  {
    id: "2",
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 141.80,
    change: -1.25,
    changePercent: -0.87,
    volume: 28300000,
    marketCap: "$1.8T",
    sector: "Technology",
    starred: false,
    addedDate: "2024-01-20"
  },
  {
    id: "3",
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 378.85,
    change: 4.32,
    changePercent: 1.15,
    volume: 19800000,
    marketCap: "$2.8T",
    sector: "Technology",
    starred: true,
    addedDate: "2024-01-10"
  },
  {
    id: "4",
    symbol: "TSLA",
    name: "Tesla, Inc.",
    price: 248.50,
    change: -8.75,
    changePercent: -3.40,
    volume: 89200000,
    marketCap: "$790B",
    sector: "Automotive",
    starred: false,
    addedDate: "2024-02-01"
  },
  {
    id: "5",
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    price: 875.28,
    change: 18.45,
    changePercent: 2.15,
    volume: 41600000,
    marketCap: "$2.2T",
    sector: "Technology",
    starred: true,
    addedDate: "2024-01-25"
  }
]

export default function WatchlistPage() {
  const [watchlistItems, setWatchlistItems] = useState<WatchlistItem[]>(mockWatchlistData)
  const [searchTerm, setSearchTerm] = useState("")
  const [newSymbol, setNewSymbol] = useState("")
  const [newName, setNewName] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [filterSector, setFilterSector] = useState("all")

  const filteredItems = watchlistItems.filter(item => {
    const matchesSearch = item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSector = filterSector === "all" || item.sector.toLowerCase() === filterSector.toLowerCase()
    return matchesSearch && matchesSector
  })

  const sectors = Array.from(new Set(watchlistItems.map(item => item.sector)))

  const handleAddStock = () => {
    if (newSymbol && newName) {
      const newItem: WatchlistItem = {
        id: Date.now().toString(),
        symbol: newSymbol.toUpperCase(),
        name: newName,
        price: Math.random() * 500 + 50,
        change: (Math.random() - 0.5) * 20,
        changePercent: (Math.random() - 0.5) * 5,
        volume: Math.floor(Math.random() * 100000000),
        marketCap: `$${Math.floor(Math.random() * 1000)}B`,
        sector: "Technology",
        starred: false,
        addedDate: new Date().toISOString().split('T')[0]
      }
      setWatchlistItems([...watchlistItems, newItem])
      setNewSymbol("")
      setNewName("")
      setIsAddDialogOpen(false)
    }
  }

  const handleRemoveStock = (id: string) => {
    setWatchlistItems(watchlistItems.filter(item => item.id !== id))
  }

  const handleToggleStar = (id: string) => {
    setWatchlistItems(watchlistItems.map(item =>
      item.id === id ? { ...item, starred: !item.starred } : item
    ))
  }

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(1)}M`
    }
    if (volume >= 1000) {
      return `${(volume / 1000).toFixed(1)}K`
    }
    return volume.toString()
  }

  const totalValue = filteredItems.reduce((sum, item) => sum + item.price, 0)
  const avgChange = filteredItems.length > 0 
    ? filteredItems.reduce((sum, item) => sum + item.changePercent, 0) / filteredItems.length 
    : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Watchlist</h1>
          <p className="text-lg text-muted-foreground">Track your favorite stocks and securities</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Stock
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Stock to Watchlist</DialogTitle>
              <DialogDescription>
                Enter the stock symbol and company name to add it to your watchlist.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="symbol">Stock Symbol</Label>
                <Input
                  id="symbol"
                  placeholder="e.g., AAPL"
                  value={newSymbol}
                  onChange={(e) => setNewSymbol(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Company Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Apple Inc."
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddStock}>Add to Watchlist</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Stocks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredItems.length}</div>
            <p className="text-xs text-muted-foreground">
              {watchlistItems.filter(item => item.starred).length} starred
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Combined Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Based on current prices
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Average Change</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={cn(
              "text-2xl font-bold flex items-center gap-1",
              avgChange >= 0 ? "text-[var(--positive)]" : "text-[var(--negative)]"
            )}>
              {avgChange >= 0 ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              {avgChange.toFixed(2)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Today's performance
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-2 flex-1 max-w-sm">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search stocks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-0 bg-transparent focus-visible:ring-0 px-0"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={filterSector}
                onChange={(e) => setFilterSector(e.target.value)}
                className="bg-transparent border border-input rounded-md px-3 py-1 text-sm"
              >
                <option value="all">All Sectors</option>
                {sectors.map(sector => (
                  <option key={sector} value={sector.toLowerCase()}>{sector}</option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Change</TableHead>
                  <TableHead>Change %</TableHead>
                  <TableHead>Volume</TableHead>
                  <TableHead>Market Cap</TableHead>
                  <TableHead>Sector</TableHead>
                  <TableHead>Added</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleStar(item.id)}
                        className="p-1 h-auto"
                      >
                        <Star
                          className={cn(
                            "h-4 w-4",
                            item.starred ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                          )}
                        />
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium">{item.symbol}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell className="font-mono">${item.price.toFixed(2)}</TableCell>
                    <TableCell className={cn(
                      "font-mono",
                      item.change >= 0 ? "text-[var(--positive)]" : "text-[var(--negative)]"
                    )}>
                      {item.change >= 0 ? "+" : ""}{item.change.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(
                          "font-mono",
                          item.changePercent >= 0
                            ? "border-[var(--positive)] text-[var(--positive)]"
                            : "border-[var(--negative)] text-[var(--negative)]"
                        )}
                      >
                        {item.changePercent >= 0 ? "+" : ""}{item.changePercent.toFixed(2)}%
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono">{formatVolume(item.volume)}</TableCell>
                    <TableCell className="font-mono">{item.marketCap}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{item.sector}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(item.addedDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveStock(item.id)}
                        className="p-1 h-auto text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredItems.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No stocks found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}