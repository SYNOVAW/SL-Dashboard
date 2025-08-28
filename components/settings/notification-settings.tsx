"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Bell, Mail, Smartphone, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"
import { getCardClasses } from "@/lib/colors"

interface NotificationSettings {
  email: {
    enabled: boolean
    marketAlerts: boolean
    portfolioUpdates: boolean
    tradingActivity: boolean
    aiRecommendations: boolean
    promotions: boolean
  }
  push: {
    enabled: boolean
    marketAlerts: boolean
    portfolioUpdates: boolean
    tradingActivity: boolean
    aiRecommendations: boolean
  }
  frequency: {
    marketAlerts: string
    portfolioReports: string
    aiInsights: string
  }
  thresholds: {
    priceMovement: string
    portfolioChange: string
  }
}

export function NotificationSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [settings, setSettings] = useState<NotificationSettings>({
    email: {
      enabled: true,
      marketAlerts: true,
      portfolioUpdates: true,
      tradingActivity: true,
      aiRecommendations: false,
      promotions: false,
    },
    push: {
      enabled: true,
      marketAlerts: true,
      portfolioUpdates: false,
      tradingActivity: true,
      aiRecommendations: true,
    },
    frequency: {
      marketAlerts: "immediate",
      portfolioReports: "daily",
      aiInsights: "weekly",
    },
    thresholds: {
      priceMovement: "5",
      portfolioChange: "2",
    }
  })

  const updateEmailSetting = (key: keyof typeof settings.email, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      email: {
        ...prev.email,
        [key]: value
      }
    }))
  }

  const updatePushSetting = (key: keyof typeof settings.push, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      push: {
        ...prev.push,
        [key]: value
      }
    }))
  }

  const updateFrequencySetting = (key: keyof typeof settings.frequency, value: string) => {
    setSettings(prev => ({
      ...prev,
      frequency: {
        ...prev.frequency,
        [key]: value
      }
    }))
  }

  const updateThresholdSetting = (key: keyof typeof settings.thresholds, value: string) => {
    setSettings(prev => ({
      ...prev,
      thresholds: {
        ...prev.thresholds,
        [key]: value
      }
    }))
  }

  const handleSave = async () => {
    setIsLoading(true)
    setSuccess(false)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error("Error saving settings:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {success && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Your notification settings have been updated successfully!
          </AlertDescription>
        </Alert>
      )}

      {/* Email Notifications */}
      <Card className={getCardClasses("default")}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Email Notifications
          </CardTitle>
          <CardDescription>
            Configure when and how you receive email notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium">Enable Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications via email
              </p>
            </div>
            <Switch
              checked={settings.email.enabled}
              onCheckedChange={(checked) => updateEmailSetting("enabled", checked)}
            />
          </div>

          {settings.email.enabled && (
            <div className="space-y-4 pl-4 border-l-2 border-muted">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Market Alerts</Label>
                  <p className="text-xs text-muted-foreground">
                    Major market movements and breaking news
                  </p>
                </div>
                <Switch
                  checked={settings.email.marketAlerts}
                  onCheckedChange={(checked) => updateEmailSetting("marketAlerts", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Portfolio Updates</Label>
                  <p className="text-xs text-muted-foreground">
                    Daily summaries and significant changes
                  </p>
                </div>
                <Switch
                  checked={settings.email.portfolioUpdates}
                  onCheckedChange={(checked) => updateEmailSetting("portfolioUpdates", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Trading Activity</Label>
                  <p className="text-xs text-muted-foreground">
                    Order confirmations and execution updates
                  </p>
                </div>
                <Switch
                  checked={settings.email.tradingActivity}
                  onCheckedChange={(checked) => updateEmailSetting("tradingActivity", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>AI Recommendations</Label>
                  <p className="text-xs text-muted-foreground">
                    Investment insights from AI agents
                  </p>
                </div>
                <Switch
                  checked={settings.email.aiRecommendations}
                  onCheckedChange={(checked) => updateEmailSetting("aiRecommendations", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Promotions & Updates</Label>
                  <p className="text-xs text-muted-foreground">
                    New features and promotional offers
                  </p>
                </div>
                <Switch
                  checked={settings.email.promotions}
                  onCheckedChange={(checked) => updateEmailSetting("promotions", checked)}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card className={getCardClasses("default")}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-primary" />
            Push Notifications
          </CardTitle>
          <CardDescription>
            Real-time alerts delivered to your device
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium">Enable Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Instant alerts on your device
              </p>
            </div>
            <Switch
              checked={settings.push.enabled}
              onCheckedChange={(checked) => updatePushSetting("enabled", checked)}
            />
          </div>

          {settings.push.enabled && (
            <div className="space-y-4 pl-4 border-l-2 border-muted">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Market Alerts</Label>
                  <Badge variant="secondary" className="ml-2 text-xs">High Priority</Badge>
                </div>
                <Switch
                  checked={settings.push.marketAlerts}
                  onCheckedChange={(checked) => updatePushSetting("marketAlerts", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Portfolio Updates</Label>
                </div>
                <Switch
                  checked={settings.push.portfolioUpdates}
                  onCheckedChange={(checked) => updatePushSetting("portfolioUpdates", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Trading Activity</Label>
                  <Badge variant="secondary" className="ml-2 text-xs">Critical</Badge>
                </div>
                <Switch
                  checked={settings.push.tradingActivity}
                  onCheckedChange={(checked) => updatePushSetting("tradingActivity", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>AI Recommendations</Label>
                </div>
                <Switch
                  checked={settings.push.aiRecommendations}
                  onCheckedChange={(checked) => updatePushSetting("aiRecommendations", checked)}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Alert Frequency & Thresholds */}
      <Card className={getCardClasses("default")}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Alert Frequency & Thresholds
          </CardTitle>
          <CardDescription>
            Customize when and how often you receive alerts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Frequency Settings</h4>
              
              <div className="space-y-2">
                <Label>Market Alerts</Label>
                <Select
                  value={settings.frequency.marketAlerts}
                  onValueChange={(value) => updateFrequencySetting("marketAlerts", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="hourly">Hourly Digest</SelectItem>
                    <SelectItem value="daily">Daily Summary</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Portfolio Reports</Label>
                <Select
                  value={settings.frequency.portfolioReports}
                  onValueChange={(value) => updateFrequencySetting("portfolioReports", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>AI Insights</Label>
                <Select
                  value={settings.frequency.aiInsights}
                  onValueChange={(value) => updateFrequencySetting("aiInsights", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Alert Thresholds</h4>
              
              <div className="space-y-2">
                <Label>Price Movement Threshold</Label>
                <Select
                  value={settings.thresholds.priceMovement}
                  onValueChange={(value) => updateThresholdSetting("priceMovement", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1% or more</SelectItem>
                    <SelectItem value="3">3% or more</SelectItem>
                    <SelectItem value="5">5% or more</SelectItem>
                    <SelectItem value="10">10% or more</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Portfolio Change Threshold</Label>
                <Select
                  value={settings.thresholds.portfolioChange}
                  onValueChange={(value) => updateThresholdSetting("portfolioChange", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.5">0.5% or more</SelectItem>
                    <SelectItem value="1">1% or more</SelectItem>
                    <SelectItem value="2">2% or more</SelectItem>
                    <SelectItem value="5">5% or more</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  )
}