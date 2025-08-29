"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Keyboard, Command, RefreshCw, Search, TrendingUp, Settings, Eye, EyeOff, HelpCircle } from "lucide-react"
import { useHotkeys } from "react-hotkeys-hook"

interface KeyboardShortcut {
  key: string
  description: string
  category: 'navigation' | 'data' | 'view' | 'trading' | 'system'
  action: () => void
  enabled: boolean
}

interface KeyboardShortcutsProps {
  onRefreshData?: () => void
  onToggleTheme?: () => void
  onOpenSearch?: () => void
  onFocusSymbolInput?: () => void
  onToggleFullscreen?: () => void
  onResetLayout?: () => void
  className?: string
}

/**
 * Professional keyboard shortcuts system for financial traders
 * Provides Bloomberg Terminal-style keyboard navigation
 */
export function KeyboardShortcuts({
  onRefreshData = () => window.location.reload(),
  onToggleTheme = () => document.documentElement.classList.toggle('dark'),
  onOpenSearch = () => console.log('Search opened'),
  onFocusSymbolInput = () => {
    const input = document.querySelector('input[placeholder*="symbol" i], input[placeholder*="ticker" i]') as HTMLInputElement
    input?.focus()
  },
  onToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  },
  onResetLayout = () => console.log('Layout reset'),
  className
}: KeyboardShortcutsProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const [enabledShortcuts, setEnabledShortcuts] = React.useState(new Set<string>())

  // Define all keyboard shortcuts
  const shortcuts: KeyboardShortcut[] = [
    // Navigation shortcuts
    {
      key: 'ctrl+shift+h',
      description: 'Show/Hide this help',
      category: 'navigation',
      action: () => setIsVisible(!isVisible),
      enabled: true
    },
    {
      key: 'ctrl+k',
      description: 'Open search',
      category: 'navigation', 
      action: onOpenSearch,
      enabled: true
    },
    {
      key: 'alt+s',
      description: 'Focus symbol input',
      category: 'navigation',
      action: onFocusSymbolInput,
      enabled: true
    },
    {
      key: 'esc',
      description: 'Close modals/Clear focus',
      category: 'navigation',
      action: () => {
        // Close any open modals
        const backdrop = document.querySelector('[role="dialog"]')
        if (backdrop) {
          const closeButton = backdrop.querySelector('[aria-label="Close"]') as HTMLElement
          closeButton?.click()
        }
        // Blur focused element
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur()
        }
      },
      enabled: true
    },

    // Data shortcuts
    {
      key: 'f5',
      description: 'Refresh all data',
      category: 'data',
      action: onRefreshData,
      enabled: true
    },
    {
      key: 'ctrl+r',
      description: 'Refresh current view',
      category: 'data',
      action: () => window.location.reload(),
      enabled: true
    },
    {
      key: 'ctrl+shift+r',
      description: 'Hard refresh (clear cache)',
      category: 'data',
      action: () => window.location.reload(),
      enabled: true
    },
    {
      key: 'alt+r',
      description: 'Reset to real-time data',
      category: 'data',
      action: () => console.log('Reset to real-time'),
      enabled: true
    },

    // View shortcuts
    {
      key: 'f11',
      description: 'Toggle fullscreen',
      category: 'view',
      action: onToggleFullscreen,
      enabled: true
    },
    {
      key: 'ctrl+shift+d',
      description: 'Toggle dark/light theme',
      category: 'view',
      action: onToggleTheme,
      enabled: true
    },
    {
      key: 'ctrl+0',
      description: 'Reset zoom level',
      category: 'view',
      action: () => {
        document.body.style.zoom = '1'
      },
      enabled: true
    },
    {
      key: 'ctrl+shift+l',
      description: 'Reset dashboard layout',
      category: 'view',
      action: onResetLayout,
      enabled: true
    },

    // Trading shortcuts (placeholder actions)
    {
      key: 'alt+b',
      description: 'Quick buy order',
      category: 'trading',
      action: () => console.log('Quick buy triggered'),
      enabled: false // Disabled by default for safety
    },
    {
      key: 'alt+shift+s',
      description: 'Quick sell order',
      category: 'trading',
      action: () => console.log('Quick sell triggered'),
      enabled: false // Disabled by default for safety
    },
    {
      key: 'ctrl+shift+p',
      description: 'View portfolio',
      category: 'trading',
      action: () => console.log('Portfolio view'),
      enabled: true
    },
    {
      key: 'ctrl+shift+o',
      description: 'View open orders',
      category: 'trading',
      action: () => console.log('Open orders view'),
      enabled: true
    },

    // System shortcuts
    {
      key: 'ctrl+,',
      description: 'Open settings',
      category: 'system',
      action: () => console.log('Settings opened'),
      enabled: true
    },
    {
      key: 'ctrl+shift+i',
      description: 'System information',
      category: 'system',
      action: () => console.log('System info'),
      enabled: true
    }
  ]

  // Register hotkeys
  shortcuts.forEach(shortcut => {
    useHotkeys(
      shortcut.key,
      (event) => {
        event.preventDefault()
        if (shortcut.enabled) {
          shortcut.action()
        }
      },
      {
        enableOnContentEditable: false,
        enableOnFormTags: false,
        enabled: shortcut.enabled
      },
      [shortcut.enabled]
    )
  })

  // Group shortcuts by category
  const shortcutsByCategory = shortcuts.reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = []
    }
    acc[shortcut.category].push(shortcut)
    return acc
  }, {} as Record<string, KeyboardShortcut[]>)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'navigation': return <Command className="h-4 w-4" />
      case 'data': return <RefreshCw className="h-4 w-4" />
      case 'view': return <Eye className="h-4 w-4" />
      case 'trading': return <TrendingUp className="h-4 w-4" />
      case 'system': return <Settings className="h-4 w-4" />
      default: return <Keyboard className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'navigation': return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'data': return 'text-green-600 bg-green-50 border-green-200'
      case 'view': return 'text-purple-600 bg-purple-50 border-purple-200'
      case 'trading': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'system': return 'text-gray-600 bg-gray-50 border-gray-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const formatKeyShortcut = (key: string) => {
    return key
      .replace('ctrl', '⌘')
      .replace('alt', '⌥')
      .replace('shift', '⇧')
      .replace('+', ' + ')
      .toUpperCase()
  }

  return (
    <>
      {/* Floating help button */}
      <Dialog open={isVisible} onOpenChange={setIsVisible}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="fixed bottom-4 right-4 z-50 bg-card border-highlight/20 hover:bg-highlight/10 text-card-foreground shadow-lg"
          >
            <HelpCircle className="h-4 w-4 mr-2" />
            Shortcuts
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Keyboard className="h-5 w-5 text-highlight" />
              Keyboard Shortcuts
              <Badge variant="outline" className="ml-2 bg-highlight/10 text-highlight">
                Professional Terminal
              </Badge>
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {Object.entries(shortcutsByCategory).map(([category, categoryShortcuts]) => (
              <Card key={category} className="border-border/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg capitalize">
                    {getCategoryIcon(category)}
                    {category}
                    <Badge 
                      variant="outline" 
                      className={getCategoryColor(category)}
                    >
                      {categoryShortcuts.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categoryShortcuts.map((shortcut, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-border/10 last:border-b-0">
                        <div className="flex-1">
                          <div className="text-sm font-medium text-card-foreground">
                            {shortcut.description}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge 
                              variant={shortcut.enabled ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {shortcut.enabled ? "Active" : "Disabled"}
                            </Badge>
                            {category === 'trading' && !shortcut.enabled && (
                              <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                Safety Lock
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="ml-4">
                          <kbd className="px-2 py-1 text-xs font-mono bg-muted border border-border rounded">
                            {formatKeyShortcut(shortcut.key)}
                          </kbd>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Professional Notice */}
          <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-amber-100/50 dark:from-amber-950/20 dark:to-amber-900/10 rounded-lg border border-amber-200 dark:border-amber-800/30">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-amber-600 dark:text-amber-400 text-xs font-bold">!</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-200 mb-1">
                  Professional Terminal Features
                </h4>
                <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
                  Trading shortcuts are disabled by default for safety. 
                  Enable them in Settings → Professional Mode → Trading Shortcuts. 
                  Always verify orders before execution. Market data shortcuts work immediately.
                </p>
                <div className="mt-2 text-xs text-amber-600 dark:text-amber-400 font-mono">
                  Press <kbd className="px-1 py-0.5 bg-amber-200/50 dark:bg-amber-800/50 rounded border">Ctrl+Shift+H</kbd> to toggle this help
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

/**
 * Hook for using keyboard shortcuts in components
 */
export function useKeyboardShortcuts() {
  const [shortcutsEnabled, setShortcutsEnabled] = React.useState(true)

  const toggleShortcuts = React.useCallback(() => {
    setShortcutsEnabled(prev => !prev)
  }, [])

  return {
    shortcutsEnabled,
    toggleShortcuts
  }
}

/**
 * Keyboard shortcut display component for individual shortcuts
 */
export function KeyboardShortcutBadge({ 
  shortcut, 
  className 
}: { 
  shortcut: string
  className?: string 
}) {
  const formatKeyShortcut = (key: string) => {
    return key
      .replace('ctrl', '⌘')
      .replace('alt', '⌥')
      .replace('shift', '⇧')
      .replace('+', ' + ')
      .toUpperCase()
  }

  return (
    <kbd className={`px-2 py-1 text-xs font-mono bg-muted border border-border rounded ${className}`}>
      {formatKeyShortcut(shortcut)}
    </kbd>
  )
}