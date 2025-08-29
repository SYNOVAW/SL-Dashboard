"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { TrendingUp, Shield, Clock, Settings, User, Bell } from "lucide-react"
import { getFinancialBadgeClasses } from "@/lib/colors"

export function UserSidebar() {
  const [selectedInvestorType, setSelectedInvestorType] = useState("growth")
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  const handleSettingsClick = () => {
    console.log("Settings clicked")
    // Navigate to settings page
  }

  const handleNotificationsToggle = () => {
    setNotificationsEnabled(!notificationsEnabled)
    console.log("Notifications toggled:", !notificationsEnabled)
  }
  const investorTypes = [
    {
      id: "growth",
      label: "Growth-oriented",
      icon: <TrendingUp className="h-4 w-4" />,
      description: "Focus on high-growth opportunities",
    },
    {
      id: "risk-averse",
      label: "Risk-averse",
      icon: <Shield className="h-4 w-4" />,
      description: "Prioritize capital preservation",
    },
    {
      id: "long-term",
      label: "Long-term holder",
      icon: <Clock className="h-4 w-4" />,
      description: "Buy and hold strategy",
    },
  ]

  return (
    <div className="space-y-6">
      {/* User Profile */}
      <Card className="hover-lift enhanced-shadow rounded-xl gradient-bg border border-border/20 scale-in">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-lg font-bold text-card-foreground">
            <div className="p-2 rounded-full bg-[var(--highlight)]/10 glow-cyan">
              <User className="h-5 w-5 text-[var(--highlight)]" />
            </div>
            User Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-muted/20 to-muted/10 hover-lift border border-border/20">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--highlight)]/20 to-[var(--highlight)]/10 flex items-center justify-center glow-cyan">
              <User className="h-6 w-6 text-[var(--highlight)]" />
            </div>
            <div>
              <h4 className="font-bold text-lg text-card-foreground">Investor</h4>
              <p className="text-sm font-medium text-[var(--highlight)]">Premium Member</p>
            </div>
          </div>
          <Separator className="bg-border/30" />
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted/20 hover-lift transition-all duration-200">
              <span className="text-sm font-medium text-muted-foreground">Portfolio Value</span>
              <span className="text-lg font-bold text-card-foreground">$125,000</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-[var(--positive)]/10 to-[var(--positive)]/5 border border-[var(--positive)]/20 hover-lift glow-cyan">
              <span className="text-sm font-medium text-muted-foreground">Today's P&L</span>
              <span className="text-lg font-bold text-[var(--positive)]">+$2,450</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Investor Type Selection */}
      <Card className="hover-lift enhanced-shadow rounded-xl gradient-bg border border-border/20 scale-in">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-lg font-bold text-card-foreground">
            <div className="p-2 rounded-full bg-[var(--highlight)]/10 glow-cyan">
              <Settings className="h-5 w-5 text-[var(--highlight)]" />
            </div>
            Investment Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedInvestorType} onValueChange={setSelectedInvestorType} className="space-y-4">
            {investorTypes.map((type) => (
              <div key={type.id} className="group p-4 rounded-xl bg-muted/10 hover:bg-muted/20 border border-border/10 hover:border-[var(--highlight)]/30 transition-all duration-300 hover-lift cursor-pointer">
                <div className="flex items-start space-x-4">
                  <RadioGroupItem value={type.id} id={type.id} className="mt-2 ring-[var(--highlight)] text-[var(--highlight)]" />
                  <div className="flex-1 space-y-2">
                    <Label htmlFor={type.id} className="flex items-center gap-3 font-semibold cursor-pointer text-card-foreground group-hover:text-[var(--highlight)] transition-colors duration-300">
                      <div className="p-1 rounded-lg bg-[var(--highlight)]/10 text-[var(--highlight)] group-hover:scale-110 transition-transform duration-300">
                        {type.icon}
                      </div>
                      {type.label}
                    </Label>
                    <p className="text-sm text-muted-foreground leading-relaxed">{type.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="hover-lift enhanced-shadow rounded-xl gradient-bg border border-border/20 scale-in">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-lg font-bold text-card-foreground">
            <div className="p-2 rounded-full bg-[var(--highlight)]/10 glow-cyan">
              <Bell className="h-5 w-5 text-[var(--highlight)]" />
            </div>
            Live Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="group p-4 bg-gradient-to-br from-[var(--highlight)]/15 to-[var(--highlight)]/10 rounded-xl border border-[var(--highlight)]/30 hover-lift cursor-pointer transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full bg-[var(--highlight)] pulse-glow" />
              <span className="font-semibold text-card-foreground group-hover:text-[var(--highlight)] transition-colors">High Volatility Alert</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">Market volatility increased by 15% in the last hour</p>
          </div>

          <div className="group p-4 bg-gradient-to-br from-[var(--positive)]/15 to-[var(--positive)]/10 rounded-xl border border-[var(--positive)]/30 hover-lift cursor-pointer transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full bg-[var(--positive)] pulse-glow" />
              <span className="font-semibold text-card-foreground group-hover:text-[var(--positive)] transition-colors">Sentiment Shift</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">Overall sentiment improved to Positive</p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="hover-lift enhanced-shadow rounded-xl gradient-bg border border-border/20 scale-in">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold text-card-foreground">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            variant="outline" 
            onClick={() => console.log("Export Analysis clicked")}
            className="w-full justify-start bg-transparent hover:bg-[var(--highlight)]/10 hover:border-[var(--highlight)]/30 hover:text-[var(--highlight)] transition-all duration-300 hover-lift font-medium"
          >
            Export Analysis
          </Button>
          <Button 
            variant="outline" 
            onClick={() => console.log("Set Price Alerts clicked")}
            className="w-full justify-start bg-transparent hover:bg-[var(--highlight)]/10 hover:border-[var(--highlight)]/30 hover:text-[var(--highlight)] transition-all duration-300 hover-lift font-medium"
          >
            Set Price Alerts
          </Button>
          <Button 
            variant="outline" 
            onClick={() => console.log("View Full Report clicked")}
            className="w-full justify-start bg-transparent hover:bg-[var(--highlight)]/10 hover:border-[var(--highlight)]/30 hover:text-[var(--highlight)] transition-all duration-300 hover-lift font-medium"
          >
            View Full Report
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
