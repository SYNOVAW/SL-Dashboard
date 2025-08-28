import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { TrendingUp, Shield, Clock, Settings, User, Bell } from "lucide-react"

export function UserSidebar() {
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--highlight)]/10 flex items-center justify-center">
              <User className="h-5 w-5 text-[var(--highlight)]" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Investor</h4>
              <p className="text-sm text-muted-foreground">Premium Member</p>
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Portfolio Value</span>
              <span className="font-medium text-foreground">$125,000</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Today's P&L</span>
              <span className="font-medium text-[var(--highlight)]">+$2,450</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Investor Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Investment Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue="growth" className="space-y-4">
            {investorTypes.map((type) => (
              <div key={type.id} className="flex items-start space-x-3">
                <RadioGroupItem value={type.id} id={type.id} className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor={type.id} className="flex items-center gap-2 font-medium cursor-pointer">
                    {type.icon}
                    {type.label}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 bg-[var(--highlight)]/10 rounded-lg border border-[var(--highlight)]/20">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-[var(--highlight)]" />
              <span className="text-sm font-medium text-foreground">High Volatility Alert</span>
            </div>
            <p className="text-xs text-muted-foreground">Market volatility increased by 15% in the last hour</p>
          </div>

          <div className="p-3 bg-[color-mix(in_srgb,var(--highlight)_10%,transparent)] rounded-lg border border-[var(--highlight)]/20">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-[var(--highlight)]" />
              <span className="text-sm font-medium text-foreground">Sentiment Shift</span>
            </div>
            <p className="text-xs text-muted-foreground">Overall sentiment improved to Positive</p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-start bg-transparent">
            Export Analysis
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            Set Price Alerts
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            View Full Report
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
