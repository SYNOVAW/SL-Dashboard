"use client"

import React, { useState } from "react"
import { AccountSettings } from "@/components/settings/account-settings"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { SecuritySettings } from "@/components/settings/security-settings"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings, User, Bell, Shield, Palette, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { getCardClasses } from "@/lib/colors"

type SettingsTab = "account" | "notifications" | "security" | "preferences" | "help"

const settingsTabs = [
  {
    id: "account" as const,
    label: "Account",
    icon: User,
    description: "Personal information and profile settings"
  },
  {
    id: "notifications" as const,
    label: "Notifications",
    icon: Bell,
    description: "Email and push notification preferences"
  },
  {
    id: "security" as const,
    label: "Security",
    icon: Shield,
    description: "Password, 2FA, and session management"
  },
  {
    id: "preferences" as const,
    label: "Preferences",
    icon: Palette,
    description: "Display, theme, and application settings"
  },
  {
    id: "help" as const,
    label: "Help & Support",
    icon: HelpCircle,
    description: "Documentation, support, and feedback"
  }
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("account")

  const renderTabContent = () => {
    switch (activeTab) {
      case "account":
        return <AccountSettings />
      case "notifications":
        return <NotificationSettings />
      case "security":
        return <SecuritySettings />
      case "preferences":
        return (
          <Card className={getCardClasses("default")}>
            <CardContent className="p-8 text-center">
              <Palette className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Preferences</h3>
              <p className="text-muted-foreground">
                Theme, display, and application preferences coming soon.
              </p>
            </CardContent>
          </Card>
        )
      case "help":
        return (
          <Card className={getCardClasses("default")}>
            <CardContent className="p-8 text-center">
              <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Help & Support</h3>
              <p className="text-muted-foreground mb-4">
                Documentation, tutorials, and support resources coming soon.
              </p>
              <Button variant="outline">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="fade-in">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[var(--highlight)]/20 to-[var(--highlight)]/10 glow-cyan">
            <Settings className="h-8 w-8 text-[var(--highlight)]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2 bg-gradient-to-r from-foreground to-[var(--highlight)] bg-clip-text">
              Settings
            </h1>
            <p className="text-lg text-muted-foreground font-medium">
              Manage your account, security, and notification preferences
            </p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <Card className={getCardClasses("default")}>
            <CardContent className="p-2">
              <nav className="space-y-1">
                {settingsTabs.map((tab) => {
                  const Icon = tab.icon
                  const isActive = activeTab === tab.id
                  
                  return (
                    <Button
                      key={tab.id}
                      variant="ghost"
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "w-full justify-start h-auto p-4 text-left transition-all",
                        isActive 
                          ? "bg-accent text-accent-foreground shadow-sm" 
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className={cn(
                          "h-5 w-5 mt-0.5 flex-shrink-0",
                          isActive 
                            ? "text-accent-foreground" 
                            : "text-muted-foreground"
                        )} />
                        <div className="space-y-1">
                          <p className="font-medium">{tab.label}</p>
                          <p className="text-xs text-muted-foreground leading-tight">
                            {tab.description}
                          </p>
                        </div>
                      </div>
                    </Button>
                  )
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 slide-up" style={{ animationDelay: "0.2s" }}>
          {renderTabContent()}
        </div>
      </div>
    </div>
  )
}