"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AuthCard } from "@/components/auth/auth-card"
import { MultiStepForm } from "@/components/auth/multi-step-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

const steps = [
  {
    id: "account",
    title: "Create Account",
    description: "Enter your basic information"
  },
  {
    id: "profile",
    title: "Investment Profile",
    description: "Tell us about your investment experience"
  },
  {
    id: "verification",
    title: "Email Verification",
    description: "Verify your email address"
  }
]

interface FormData {
  // Account info
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean

  // Investment profile
  experience: string
  riskTolerance: string
  investmentGoals: string[]
  annualIncome: string

  // Verification
  verificationCode: string
}

export default function SignupPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [emailSent, setEmailSent] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    experience: "",
    riskTolerance: "",
    investmentGoals: [],
    annualIncome: "",
    verificationCode: ""
  })

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 0:
        return !!(
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.password &&
          formData.confirmPassword &&
          formData.password === formData.confirmPassword &&
          formData.agreeToTerms
        )
      case 1:
        return !!(
          formData.experience &&
          formData.riskTolerance &&
          formData.investmentGoals.length > 0 &&
          formData.annualIncome
        )
      case 2:
        return !!formData.verificationCode
      default:
        return false
    }
  }

  const handleNext = async () => {
    if (!validateStep(currentStep)) {
      setError("Please fill in all required fields")
      return
    }

    setError("")
    setIsLoading(true)

    try {
      if (currentStep === 0) {
        // Simulate email verification sending
        await new Promise(resolve => setTimeout(resolve, 1000))
        setEmailSent(true)
      } else if (currentStep === 2) {
        // Complete registration
        await new Promise(resolve => setTimeout(resolve, 1000))
        router.push("/dashboard")
        return
      }

      setCurrentStep(prev => prev + 1)
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => Math.max(0, prev - 1))
    setError("")
  }

  const handleGoalToggle = (goal: string, checked: boolean) => {
    const currentGoals = formData.investmentGoals
    if (checked) {
      handleInputChange("investmentGoals", [...currentGoals, goal])
    } else {
      handleInputChange("investmentGoals", currentGoals.filter(g => g !== goal))
    }
  }

  const resendVerification = async () => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setEmailSent(true)
    } catch (err) {
      setError("Failed to resend verification email")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthCard
      title="Create Your Account"
      description="Join thousands of investors using AI-powered financial analysis"
    >
      <MultiStepForm steps={steps} currentStep={currentStep}>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Step 1: Account Information */}
        {currentStep === 0 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="John"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="john@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Create a strong password"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked)}
              />
              <Label htmlFor="agreeToTerms" className="text-sm">
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>
          </div>
        )}

        {/* Step 2: Investment Profile */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>Investment Experience</Label>
              <RadioGroup
                value={formData.experience}
                onValueChange={(value) => handleInputChange("experience", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="beginner" id="beginner" />
                  <Label htmlFor="beginner">Beginner (Less than 1 year)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="intermediate" id="intermediate" />
                  <Label htmlFor="intermediate">Intermediate (1-5 years)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="experienced" id="experienced" />
                  <Label htmlFor="experienced">Experienced (5+ years)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label>Risk Tolerance</Label>
              <RadioGroup
                value={formData.riskTolerance}
                onValueChange={(value) => handleInputChange("riskTolerance", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="conservative" id="conservative" />
                  <Label htmlFor="conservative">Conservative - Minimal risk, stable returns</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderate" id="moderate" />
                  <Label htmlFor="moderate">Moderate - Balanced risk and return</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="aggressive" id="aggressive" />
                  <Label htmlFor="aggressive">Aggressive - Higher risk, higher potential returns</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label>Investment Goals (Select all that apply)</Label>
              <div className="space-y-2">
                {["Retirement Planning", "Wealth Building", "Income Generation", "Short-term Gains", "Portfolio Diversification"].map((goal) => (
                  <div key={goal} className="flex items-center space-x-2">
                    <Checkbox
                      id={goal}
                      checked={formData.investmentGoals.includes(goal)}
                      onCheckedChange={(checked) => handleGoalToggle(goal, checked as boolean)}
                    />
                    <Label htmlFor={goal}>{goal}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="annualIncome">Annual Income</Label>
              <Select value={formData.annualIncome} onValueChange={(value) => handleInputChange("annualIncome", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your income range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-50k">Under $50,000</SelectItem>
                  <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                  <SelectItem value="100k-250k">$100,000 - $250,000</SelectItem>
                  <SelectItem value="250k-500k">$250,000 - $500,000</SelectItem>
                  <SelectItem value="over-500k">Over $500,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Step 3: Email Verification */}
        {currentStep === 2 && (
          <div className="space-y-4 text-center">
            {emailSent && (
              <div className="mb-4 p-4 bg-accent/10 rounded-lg border border-accent/20">
                <p className="text-sm text-foreground">
                  We've sent a verification code to <strong>{formData.email}</strong>
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="verificationCode">Verification Code</Label>
              <Input
                id="verificationCode"
                value={formData.verificationCode}
                onChange={(e) => handleInputChange("verificationCode", e.target.value)}
                placeholder="Enter the 6-digit code"
                className="text-center text-lg tracking-widest"
                maxLength={6}
                required
              />
            </div>

            <Button
              type="button"
              variant="link"
              onClick={resendVerification}
              disabled={isLoading}
              className="text-sm"
            >
              Didn't receive the code? Resend
            </Button>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between pt-6">
          {currentStep > 0 && (
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={isLoading}
            >
              Back
            </Button>
          )}
          
          <div className="flex-1 flex justify-end">
            <Button
              onClick={handleNext}
              disabled={isLoading || !validateStep(currentStep)}
              className="min-w-[120px]"
            >
              {isLoading 
                ? "Loading..." 
                : currentStep === steps.length - 1 
                  ? "Complete Registration" 
                  : "Next"}
            </Button>
          </div>
        </div>

        {currentStep === 0 && (
          <div className="text-center text-sm text-muted-foreground pt-4">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Sign in
            </Link>
          </div>
        )}
      </MultiStepForm>
    </AuthCard>
  )
}