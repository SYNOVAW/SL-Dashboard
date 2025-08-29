"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import {
  User,
  Settings,
  Shield,
  Bell,
  TrendingUp,
  Key,
  Palette,
  Download,
  Lock,
  Mail,
  Phone,
  MapPin,
  Upload,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  Smartphone,
  Globe,
  DollarSign,
  BarChart3,
  Target,
  Calendar,
  Languages,
  Moon,
  Sun,
  Monitor
} from "lucide-react"
import { getCardClasses, getSentimentColorClasses } from "@/lib/colors"

interface ProfileData {
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
    bio: string
    dateOfBirth: string
    occupation: string
    experienceLevel: string
  }
  preferences: {
    theme: string
    language: string
    currency: string
    timezone: string
    dateFormat: string
    numberFormat: string
    autoRefresh: boolean
    soundNotifications: boolean
    compactView: boolean
  }
  trading: {
    riskTolerance: string
    investmentGoals: string[]
    preferredAssets: string[]
    tradingExperience: number
    maxPositionSize: number
    stopLossDefault: number
    takeProfitDefault: number
    autoRebalancing: boolean
    marginTrading: boolean
  }
  security: {
    twoFactorEnabled: boolean
    biometricEnabled: boolean
    sessionTimeout: string
    ipWhitelist: string[]
    apiKeysEnabled: boolean
  }
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
    marketAlerts: boolean
    portfolioUpdates: boolean
    tradingActivity: boolean
    aiRecommendations: boolean
    frequency: string
  }
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [showPasswordChange, setShowPasswordChange] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const [profileData, setProfileData] = useState<ProfileData>({
    personalInfo: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      address: "123 Wall Street",
      city: "New York",
      state: "NY",
      zipCode: "10005",
      country: "United States",
      bio: "Experienced quantitative analyst with 8+ years in financial markets, specializing in algorithmic trading and risk management.",
      dateOfBirth: "1985-03-15",
      occupation: "Quantitative Analyst",
      experienceLevel: "Expert"
    },
    preferences: {
      theme: "dark",
      language: "en",
      currency: "USD",
      timezone: "America/New_York",
      dateFormat: "MM/DD/YYYY",
      numberFormat: "US",
      autoRefresh: true,
      soundNotifications: false,
      compactView: false
    },
    trading: {
      riskTolerance: "moderate",
      investmentGoals: ["growth", "income"],
      preferredAssets: ["stocks", "etfs", "options"],
      tradingExperience: 8,
      maxPositionSize: 10,
      stopLossDefault: 5,
      takeProfitDefault: 15,
      autoRebalancing: true,
      marginTrading: false
    },
    security: {
      twoFactorEnabled: true,
      biometricEnabled: false,
      sessionTimeout: "30",
      ipWhitelist: [],
      apiKeysEnabled: true
    },
    notifications: {
      email: true,
      push: true,
      sms: false,
      marketAlerts: true,
      portfolioUpdates: true,
      tradingActivity: true,
      aiRecommendations: false,
      frequency: "immediate"
    }
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const [apiKeys, setApiKeys] = useState([
    { id: "1", name: "Trading Bot API", key: "sk-***************", created: "2024-01-15", lastUsed: "2024-01-20" },
    { id: "2", name: "Portfolio Analytics", key: "pk-***************", created: "2024-01-10", lastUsed: "2024-01-19" }
  ])

  const updatePersonalInfo = (field: keyof typeof profileData.personalInfo, value: string) => {
    setProfileData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }))
  }

  const updatePreferences = (field: keyof typeof profileData.preferences, value: string | boolean) => {
    setProfileData(prev => ({
      ...prev,
      preferences: { ...prev.preferences, [field]: value }
    }))
  }

  const updateTrading = (field: keyof typeof profileData.trading, value: any) => {
    setProfileData(prev => ({
      ...prev,
      trading: { ...prev.trading, [field]: value }
    }))
  }

  const updateSecurity = (field: keyof typeof profileData.security, value: any) => {
    setProfileData(prev => ({
      ...prev,
      security: { ...prev.security, [field]: value }
    }))
  }

  const updateNotifications = (field: keyof typeof profileData.notifications, value: any) => {
    setProfileData(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [field]: value }
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
      console.error("Error saving profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) return

    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
      setShowPasswordChange(false)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error("Error changing password:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateApiKey = () => {
    const newKey = {
      id: Date.now().toString(),
      name: "New API Key",
      key: `sk-${Math.random().toString(36).substring(2, 15)}***********`,
      created: new Date().toISOString().split('T')[0],
      lastUsed: "Never"
    }
    setApiKeys(prev => [...prev, newKey])
  }

  const deleteApiKey = (id: string) => {
    setApiKeys(prev => prev.filter(key => key.id !== id))
  }

  const exportData = (type: string) => {
    // Simulate data export
    console.log(`Exporting ${type} data...`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-financial">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your account, preferences, and security settings</p>
        </div>
        <Button onClick={handleSave} disabled={isLoading} className="bg-highlight hover:bg-highlight/90">
          {isLoading ? "Saving..." : "Save All Changes"}
        </Button>
      </div>

      {success && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Your profile has been updated successfully!
          </AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Personal
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="trading" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Trading
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Privacy
          </TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal" className="space-y-6">
          <Card className={getCardClasses("default")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Update your personal details and profile information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback className="text-xl font-bold">
                    {profileData.personalInfo.firstName[0]}{profileData.personalInfo.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photo
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      Remove
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG or GIF. Max size 5MB. Recommended 400x400px.
                  </p>
                </div>
              </div>

              <Separator />

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profileData.personalInfo.firstName}
                    onChange={(e) => updatePersonalInfo("firstName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profileData.personalInfo.lastName}
                    onChange={(e) => updatePersonalInfo("lastName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={profileData.personalInfo.dateOfBirth}
                    onChange={(e) => updatePersonalInfo("dateOfBirth", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    value={profileData.personalInfo.occupation}
                    onChange={(e) => updatePersonalInfo("occupation", e.target.value)}
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Contact Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="email"
                        type="email"
                        value={profileData.personalInfo.email}
                        onChange={(e) => updatePersonalInfo("email", e.target.value)}
                        required
                      />
                      <Badge variant="secondary" className="text-xs">
                        Verified
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profileData.personalInfo.phone}
                      onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Address Information
                </h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      value={profileData.personalInfo.address}
                      onChange={(e) => updatePersonalInfo("address", e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={profileData.personalInfo.city}
                        onChange={(e) => updatePersonalInfo("city", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province</Label>
                      <Input
                        id="state"
                        value={profileData.personalInfo.state}
                        onChange={(e) => updatePersonalInfo("state", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                      <Input
                        id="zipCode"
                        value={profileData.personalInfo.zipCode}
                        onChange={(e) => updatePersonalInfo("zipCode", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select
                      value={profileData.personalInfo.country}
                      onValueChange={(value) => updatePersonalInfo("country", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="United States">United States</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                        <SelectItem value="Germany">Germany</SelectItem>
                        <SelectItem value="France">France</SelectItem>
                        <SelectItem value="Japan">Japan (日本)</SelectItem>
                        <SelectItem value="Australia">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Professional Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="experienceLevel">Investment Experience</Label>
                    <Select
                      value={profileData.personalInfo.experienceLevel}
                      onValueChange={(value) => updatePersonalInfo("experienceLevel", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner (0-2 years)</SelectItem>
                        <SelectItem value="Intermediate">Intermediate (2-5 years)</SelectItem>
                        <SelectItem value="Advanced">Advanced (5-10 years)</SelectItem>
                        <SelectItem value="Expert">Expert (10+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Professional Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.personalInfo.bio}
                    onChange={(e) => updatePersonalInfo("bio", e.target.value)}
                    placeholder="Tell us about your investment experience and professional background..."
                    className="min-h-[120px]"
                  />
                  <p className="text-xs text-muted-foreground">
                    Brief description of your professional background and investment expertise. Max 1000 characters.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <Card className={getCardClasses("default")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                Display & Theme
              </CardTitle>
              <CardDescription>
                Customize the appearance and behavior of your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <Select
                      value={profileData.preferences.theme}
                      onValueChange={(value) => updatePreferences("theme", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">
                          <div className="flex items-center gap-2">
                            <Sun className="h-4 w-4" />
                            Light
                          </div>
                        </SelectItem>
                        <SelectItem value="dark">
                          <div className="flex items-center gap-2">
                            <Moon className="h-4 w-4" />
                            Dark
                          </div>
                        </SelectItem>
                        <SelectItem value="system">
                          <div className="flex items-center gap-2">
                            <Monitor className="h-4 w-4" />
                            System
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select
                      value={profileData.preferences.language}
                      onValueChange={(value) => updatePreferences("language", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                        <SelectItem value="ja">日本語</SelectItem>
                        <SelectItem value="zh">中文</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Currency</Label>
                    <Select
                      value={profileData.preferences.currency}
                      onValueChange={(value) => updatePreferences("currency", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                        <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Time Zone</Label>
                    <Select
                      value={profileData.preferences.timezone}
                      onValueChange={(value) => updatePreferences("timezone", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                        <SelectItem value="Europe/London">London (GMT)</SelectItem>
                        <SelectItem value="Europe/Frankfurt">Frankfurt (CET)</SelectItem>
                        <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                        <SelectItem value="Asia/Hong_Kong">Hong Kong (HKT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Date Format</Label>
                    <Select
                      value={profileData.preferences.dateFormat}
                      onValueChange={(value) => updatePreferences("dateFormat", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Number Format</Label>
                    <Select
                      value={profileData.preferences.numberFormat}
                      onValueChange={(value) => updatePreferences("numberFormat", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">1,234.56 (US)</SelectItem>
                        <SelectItem value="EU">1.234,56 (EU)</SelectItem>
                        <SelectItem value="IN">1,23,456.78 (IN)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Interface Options</h4>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Auto-refresh Data</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically update market data and portfolio information
                    </p>
                  </div>
                  <Switch
                    checked={profileData.preferences.autoRefresh}
                    onCheckedChange={(checked) => updatePreferences("autoRefresh", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Sound Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Play sound alerts for important notifications
                    </p>
                  </div>
                  <Switch
                    checked={profileData.preferences.soundNotifications}
                    onCheckedChange={(checked) => updatePreferences("soundNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Compact View</Label>
                    <p className="text-sm text-muted-foreground">
                      Use a more dense layout to show more information
                    </p>
                  </div>
                  <Switch
                    checked={profileData.preferences.compactView}
                    onCheckedChange={(checked) => updatePreferences("compactView", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card className={getCardClasses("default")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-primary" />
                Password & Authentication
              </CardTitle>
              <CardDescription>
                Manage your password and authentication settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!showPasswordChange ? (
                <Button variant="outline" onClick={() => setShowPasswordChange(true)}>
                  Change Password
                </Button>
              ) : (
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Password must be at least 12 characters with uppercase, lowercase, numbers, and symbols
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Updating..." : "Update Password"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowPasswordChange(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>

          <Card className={getCardClasses("default")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Multi-Factor Authentication
              </CardTitle>
              <CardDescription>
                Add extra layers of security to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-medium flex items-center gap-2">
                    Two-Factor Authentication
                    {profileData.security.twoFactorEnabled && (
                      <Badge variant="default" className="text-xs">Active</Badge>
                    )}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Use SMS or authenticator app for additional security
                  </p>
                </div>
                <Switch
                  checked={profileData.security.twoFactorEnabled}
                  onCheckedChange={(checked) => updateSecurity("twoFactorEnabled", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-medium">Biometric Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Use fingerprint or face recognition when available
                  </p>
                </div>
                <Switch
                  checked={profileData.security.biometricEnabled}
                  onCheckedChange={(checked) => updateSecurity("biometricEnabled", checked)}
                />
              </div>

              <div className="space-y-2">
                <Label>Session Timeout</Label>
                <Select
                  value={profileData.security.sessionTimeout}
                  onValueChange={(value) => updateSecurity("sessionTimeout", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="240">4 hours</SelectItem>
                    <SelectItem value="never">Never timeout</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className={getCardClasses("default")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Configure when and how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </h4>
                  <Switch
                    checked={profileData.notifications.email}
                    onCheckedChange={(checked) => updateNotifications("email", checked)}
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    Push
                  </h4>
                  <Switch
                    checked={profileData.notifications.push}
                    onCheckedChange={(checked) => updateNotifications("push", checked)}
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    SMS
                  </h4>
                  <Switch
                    checked={profileData.notifications.sms}
                    onCheckedChange={(checked) => updateNotifications("sms", checked)}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Notification Types</h4>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Market Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Major market movements and breaking news
                      </p>
                    </div>
                    <Switch
                      checked={profileData.notifications.marketAlerts}
                      onCheckedChange={(checked) => updateNotifications("marketAlerts", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Portfolio Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Daily summaries and significant portfolio changes
                      </p>
                    </div>
                    <Switch
                      checked={profileData.notifications.portfolioUpdates}
                      onCheckedChange={(checked) => updateNotifications("portfolioUpdates", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Trading Activity</Label>
                      <p className="text-sm text-muted-foreground">
                        Order confirmations and execution updates
                      </p>
                    </div>
                    <Switch
                      checked={profileData.notifications.tradingActivity}
                      onCheckedChange={(checked) => updateNotifications("tradingActivity", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">AI Recommendations</Label>
                      <p className="text-sm text-muted-foreground">
                        Investment insights and recommendations from AI agents
                      </p>
                    </div>
                    <Switch
                      checked={profileData.notifications.aiRecommendations}
                      onCheckedChange={(checked) => updateNotifications("aiRecommendations", checked)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Notification Frequency</Label>
                  <Select
                    value={profileData.notifications.frequency}
                    onValueChange={(value) => updateNotifications("frequency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="hourly">Hourly Digest</SelectItem>
                      <SelectItem value="daily">Daily Summary</SelectItem>
                      <SelectItem value="weekly">Weekly Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trading Preferences Tab */}
        <TabsContent value="trading" className="space-y-6">
          <Card className={getCardClasses("default")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Trading Preferences
              </CardTitle>
              <CardDescription>
                Configure your trading settings and risk management
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Risk Tolerance</Label>
                    <Select
                      value={profileData.trading.riskTolerance}
                      onValueChange={(value) => updateTrading("riskTolerance", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="conservative">Conservative</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="aggressive">Aggressive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Trading Experience (Years)</Label>
                    <div className="px-2">
                      <Slider
                        value={[profileData.trading.tradingExperience]}
                        onValueChange={(value) => updateTrading("tradingExperience", value[0])}
                        max={20}
                        min={0}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>0</span>
                        <span className="font-financial">{profileData.trading.tradingExperience} years</span>
                        <span>20+</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Max Position Size (%)</Label>
                    <div className="px-2">
                      <Slider
                        value={[profileData.trading.maxPositionSize]}
                        onValueChange={(value) => updateTrading("maxPositionSize", value[0])}
                        max={25}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>1%</span>
                        <span className="font-financial">{profileData.trading.maxPositionSize}%</span>
                        <span>25%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Default Stop Loss (%)</Label>
                    <div className="px-2">
                      <Slider
                        value={[profileData.trading.stopLossDefault]}
                        onValueChange={(value) => updateTrading("stopLossDefault", value[0])}
                        max={20}
                        min={1}
                        step={0.5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>1%</span>
                        <span className="font-financial">{profileData.trading.stopLossDefault}%</span>
                        <span>20%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Default Take Profit (%)</Label>
                    <div className="px-2">
                      <Slider
                        value={[profileData.trading.takeProfitDefault]}
                        onValueChange={(value) => updateTrading("takeProfitDefault", value[0])}
                        max={50}
                        min={5}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>5%</span>
                        <span className="font-financial">{profileData.trading.takeProfitDefault}%</span>
                        <span>50%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Investment Preferences</h4>
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-medium">Investment Goals</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Select your primary investment objectives
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["growth", "income", "preservation", "speculation"].map((goal) => (
                        <Badge
                          key={goal}
                          variant={profileData.trading.investmentGoals.includes(goal) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => {
                            const current = profileData.trading.investmentGoals
                            const updated = current.includes(goal)
                              ? current.filter(g => g !== goal)
                              : [...current, goal]
                            updateTrading("investmentGoals", updated)
                          }}
                        >
                          {goal.charAt(0).toUpperCase() + goal.slice(1)}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium">Preferred Asset Classes</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Select the asset classes you prefer to trade
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["stocks", "etfs", "options", "bonds", "crypto", "commodities"].map((asset) => (
                        <Badge
                          key={asset}
                          variant={profileData.trading.preferredAssets.includes(asset) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => {
                            const current = profileData.trading.preferredAssets
                            const updated = current.includes(asset)
                              ? current.filter(a => a !== asset)
                              : [...current, asset]
                            updateTrading("preferredAssets", updated)
                          }}
                        >
                          {asset.toUpperCase()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Auto-Rebalancing</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically rebalance portfolio based on target allocations
                    </p>
                  </div>
                  <Switch
                    checked={profileData.trading.autoRebalancing}
                    onCheckedChange={(checked) => updateTrading("autoRebalancing", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Margin Trading</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable margin trading capabilities (higher risk)
                    </p>
                  </div>
                  <Switch
                    checked={profileData.trading.marginTrading}
                    onCheckedChange={(checked) => updateTrading("marginTrading", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Keys Tab */}
        <TabsContent value="integrations" className="space-y-6">
          <Card className={getCardClasses("default")}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5 text-primary" />
                    API Keys & Integrations
                  </CardTitle>
                  <CardDescription>
                    Manage your API keys for third-party integrations
                  </CardDescription>
                </div>
                <Button onClick={generateApiKey} variant="outline">
                  <Key className="h-4 w-4 mr-2" />
                  Generate New Key
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiKeys.map((key) => (
                  <div key={key.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{key.name}</p>
                        <Badge variant="outline" className="text-xs">
                          Active
                        </Badge>
                      </div>
                      <div className="font-financial text-sm text-muted-foreground">
                        {key.key}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Created: {key.created}</span>
                        <span>Last used: {key.lastUsed}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        Copy
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteApiKey(key.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className={getCardClasses("default")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Third-party Integrations
              </CardTitle>
              <CardDescription>
                Connect with external services and platforms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">TradingView</p>
                      <p className="text-sm text-muted-foreground">
                        Advanced charting and technical analysis
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Connect
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Interactive Brokers</p>
                      <p className="text-sm text-muted-foreground">
                        Execute trades directly from the platform
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="text-xs">Connected</Badge>
                    <Button variant="ghost" size="sm">
                      Configure
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <Bell className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Discord Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive alerts in your Discord server
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Connect
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy & Data Tab */}
        <TabsContent value="privacy" className="space-y-6">
          <Card className={getCardClasses("default")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5 text-primary" />
                Data Export & Privacy
              </CardTitle>
              <CardDescription>
                Download your data and manage privacy settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Export Your Data</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <div className="space-y-2">
                      <h5 className="font-medium">Portfolio Data</h5>
                      <p className="text-sm text-muted-foreground">
                        Export all your portfolio holdings, transactions, and performance data
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => exportData("portfolio")}
                        className="w-full mt-2"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export Portfolio
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="space-y-2">
                      <h5 className="font-medium">Trading History</h5>
                      <p className="text-sm text-muted-foreground">
                        Complete history of all your trades and orders
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => exportData("trades")}
                        className="w-full mt-2"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export Trades
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="space-y-2">
                      <h5 className="font-medium">Personal Information</h5>
                      <p className="text-sm text-muted-foreground">
                        Your profile, settings, and preferences
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => exportData("profile")}
                        className="w-full mt-2"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export Profile
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="space-y-2">
                      <h5 className="font-medium">All Data</h5>
                      <p className="text-sm text-muted-foreground">
                        Complete export of all your account data
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => exportData("all")}
                        className="w-full mt-2"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export All
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Privacy Controls
                </h4>
                
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    All data exports are encrypted and will be delivered securely to your registered email address. 
                    Processing may take up to 48 hours for complete data exports.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4 pt-4">
                  <div className="p-4 bg-negative/5 border border-negative/20 rounded-lg">
                    <h5 className="font-medium text-destructive mb-2">Danger Zone</h5>
                    <p className="text-sm text-muted-foreground mb-4">
                      These actions are permanent and cannot be undone. Please proceed with caution.
                    </p>
                    
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="text-destructive border-destructive">
                        Delete Trading History
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive border-destructive">
                        Close Account
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={getCardClasses("default")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Privacy Policy & Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Privacy Policy</span>
                  <Button variant="link" size="sm">
                    View Latest
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Terms of Service</span>
                  <Button variant="link" size="sm">
                    View Latest
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Cookie Policy</span>
                  <Button variant="link" size="sm">
                    View Latest
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}