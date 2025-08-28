"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  BookOpen,
  Briefcase,
  Home,
  PieChart,
  Settings,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  description?: string
}

interface NavSection {
  title: string
  items: NavItem[]
}

const navSections: NavSection[] = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: Home,
        description: "Market overview and insights"
      },
    ]
  },
  {
    title: "Investments",
    items: [
      {
        title: "Portfolio",
        href: "/portfolio",
        icon: PieChart,
        description: "Your investment holdings"
      },
      {
        title: "Trading",
        href: "/trading",
        icon: TrendingUp,
        badge: "NEW",
        description: "Buy and sell securities"
      },
      {
        title: "Watchlist",
        href: "/watchlist",
        icon: BookOpen,
        description: "Monitor stocks and crypto"
      },
    ]
  },
  {
    title: "Analysis",
    items: [
      {
        title: "Market Data",
        href: "/market",
        icon: BarChart3,
        description: "Real-time market information"
      },
      {
        title: "AI Agents",
        href: "/agents",
        icon: Users,
        description: "AI-powered analysis tools"
      },
      {
        title: "Reports",
        href: "/reports",
        icon: Briefcase,
        description: "Detailed investment reports"
      },
    ]
  },
  {
    title: "Account",
    items: [
      {
        title: "Wallet",
        href: "/wallet",
        icon: Wallet,
        description: "Manage your funds"
      },
      {
        title: "Settings",
        href: "/settings",
        icon: Settings,
        description: "Account preferences"
      },
    ]
  },
]

interface NavSidebarProps {
  className?: string
}

export function NavSidebar({ className }: NavSidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn("pb-12 w-64", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <ScrollArea className="h-[calc(100vh-8rem)] px-1">
              <div className="space-y-6">
                {navSections.map((section, sectionIndex) => (
                  <div key={section.title}>
                    {sectionIndex > 0 && <Separator className="my-4" />}
                    <div className="px-3 py-2">
                      <h3 className="mb-2 px-4 text-xs font-semibold tracking-tight uppercase text-muted-foreground">
                        {section.title}
                      </h3>
                      <div className="space-y-1">
                        {section.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                              "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground",
                              pathname === item.href
                                ? "bg-accent text-accent-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                            )}
                          >
                            <item.icon 
                              className={cn(
                                "mr-3 h-4 w-4 transition-colors",
                                pathname === item.href
                                  ? "text-accent-foreground"
                                  : "text-muted-foreground group-hover:text-foreground"
                              )} 
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="truncate">{item.title}</span>
                                {item.badge && (
                                  <Badge 
                                    variant="secondary" 
                                    className="ml-2 text-xs px-1.5 py-0.5"
                                  >
                                    {item.badge}
                                  </Badge>
                                )}
                              </div>
                              {item.description && (
                                <p className="text-xs text-muted-foreground/80 mt-0.5 truncate">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  )
}