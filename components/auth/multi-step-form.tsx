"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface Step {
  id: string
  title: string
  description: string
}

interface MultiStepFormProps {
  steps: Step[]
  currentStep: number
  children: React.ReactNode
}

export function MultiStepForm({ steps, currentStep, children }: MultiStepFormProps) {
  return (
    <div className="space-y-8">
      {/* Progress indicator */}
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
                index < currentStep
                  ? "bg-primary text-primary-foreground"
                  : index === currentStep
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {index < currentStep ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "w-16 h-0.5 mx-2 transition-all duration-300",
                  index < currentStep ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step info */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground">
          {steps[currentStep]?.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {steps[currentStep]?.description}
        </p>
      </div>

      {/* Form content */}
      <div>{children}</div>
    </div>
  )
}