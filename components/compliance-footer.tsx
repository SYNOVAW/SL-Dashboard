import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Info } from "lucide-react"

export function ComplianceFooter() {
  return (
    <Card className="mt-8 bg-[var(--footer-background)] text-[var(--disclaimer-text)]">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Main Disclaimer */}
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-[var(--negative)] mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-white mb-2">Important Disclaimer</h4>
              <p className="text-sm leading-relaxed">
                This analysis is provided for educational and informational purposes only and does not constitute
                investment advice. The AI-generated insights and sentiment analysis should not be used as the sole basis
                for investment decisions. Past performance does not guarantee future results.
              </p>
            </div>
          </div>

          {/* Additional Information */}
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-[var(--accent)] mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-white mb-2">About Our Analysis</h4>
              <p className="text-sm leading-relaxed">
                Our multi-agent AI system analyzes market data, news sentiment, and financial metrics to provide
                educational insights. The confidence scores and agent voting represent algorithmic assessments and
                should be considered alongside traditional analysis methods.
              </p>
            </div>
          </div>

          {/* Footer Links */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex flex-wrap gap-4 text-xs">
              <span>© 2025 Agentic Financial Dashboard</span>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">
                Risk Disclosure
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
