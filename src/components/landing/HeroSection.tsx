import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, TrendingUp, Sparkles } from "lucide-react";

/**
 * UX ANNOTATION: Hero Section
 * ---------------------------------
 * Purpose: Primary landing area - first impression and value proposition
 * 
 * Design Decisions:
 * - Large, bold headline for immediate impact
 * - Subtext clarifies unique value (confidence-based recommendations)
 * - Primary CTA prominently styled and positioned
 * - Trust badges reinforce credibility before user commits
 * - Visual hierarchy: Headline > Subtext > CTA > Trust elements
 * 
 * Copy Strategy:
 * - "With Confidence" - differentiator from standard benefit lists
 * - "Not just a list" - addresses common user frustration
 * - Action-oriented CTA text
 * 
 * Visual Design:
 * - Subtle gradient background for depth
 * - Generous whitespace for premium feel
 * - Floating cards/elements for visual interest (mobile-aware)
 */

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center hero-gradient overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-20 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content Column */}
          <div className="text-center lg:text-left">
            {/* Trust Badge - UX: Immediate credibility signal */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-6 animate-fade-up">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-secondary-foreground">
                Privacy-First Design
              </span>
            </div>

            {/* Main Headline - UX: Clear value proposition */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-up delay-100">
              Understand What Benefits Matter —{" "}
              <span className="text-gradient-primary">With Confidence</span>
            </h1>

            {/* Subtext - UX: Differentiation from competitors */}
            <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-up delay-200">
              Not just a list — smart, honest recommendations based on your actual 
              spending patterns and lifestyle preferences.
            </p>

            {/* CTA Buttons - UX: Clear primary action with secondary option */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up delay-300">
              <Button variant="hero" size="xl" asChild>
                <Link to="/demo">
                  Start Simulation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="#how-it-works">
                  How It Works
                </Link>
              </Button>
            </div>

            {/* Feature Pills - UX: Quick feature summary */}
            <div className="flex flex-wrap gap-3 mt-10 justify-center lg:justify-start animate-fade-up delay-400">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4 text-success" />
                <span>Real Value Estimates</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4 text-accent" />
                <span>AI-Powered Insights</span>
              </div>
            </div>
          </div>

          {/* Visual Column - UX: Preview of the tool interface */}
          <div className="relative hidden lg:block animate-fade-up delay-300">
            <div className="relative">
              {/* Mock Dashboard Card */}
              <div className="card-elevated p-6 rounded-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-8 bg-gradient-to-r from-primary to-navy-500 rounded-md" />
                  <div>
                    <p className="text-xs text-muted-foreground">Card Benefits</p>
                    <p className="font-semibold text-sm">Visa Signature</p>
                  </div>
                </div>
                
                {/* Mini Confidence Meter Preview */}
                <div className="bg-secondary rounded-xl p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-muted-foreground">Confidence</span>
                    <span className="text-lg font-bold text-success">87%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-[87%] bg-success rounded-full" />
                  </div>
                </div>

                {/* Mini Benefit Preview */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-success" />
                    <span>Travel Insurance: ₹50,000</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span>Dining Cashback: 5%</span>
                  </div>
                </div>
              </div>

              {/* Floating Accent Card */}
              <div className="absolute -bottom-6 -left-6 card-elevated p-4 rounded-xl animate-pulse-soft">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Estimated Value</p>
                    <p className="font-bold text-primary">₹24,500/yr</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
