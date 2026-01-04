import { Shield, Lock, Eye, FileCheck, CheckCircle2 } from "lucide-react";

/**
 * UX ANNOTATION: Trust & Privacy Section
 * ---------------------------------
 * Purpose: Address user concerns about data security before demo
 * 
 * Design Decisions:
 * - Dedicated section for trust signals (enterprise expectation)
 * - Icon + short statement format for quick scanning
 * - Green checkmark icons reinforce positive safety feeling
 * - Card-based layout for visual organization
 * 
 * Content Strategy:
 * - Lead with strongest trust signal (masked data)
 * - Address storage concerns directly
 * - Clarify tool purpose (awareness, not advice)
 * - Use simple, non-technical language
 * 
 * Psychological Principle:
 * - Addressing objections proactively builds credibility
 * - Visual trust signals reduce cognitive load for decision-making
 */

const trustPoints = [
  {
    icon: Shield,
    title: "Masked Card Numbers Only",
    description: "We never ask for or store your complete card number. All inputs use masked format (**** **** **** 1234).",
  },
  {
    icon: Lock,
    title: "No Data Stored",
    description: "Your inputs are processed in real-time and immediately discarded. Nothing is saved to any database.",
  },
  {
    icon: Eye,
    title: "Privacy By Design",
    description: "Built with privacy as a core principle. No tracking, no cookies, no personal data collection.",
  },
  {
    icon: FileCheck,
    title: "Awareness Tool Only",
    description: "This is an educational tool to help you understand benefits. It's not financial advice.",
  },
];

export function TrustSection() {
  return (
    <section id="privacy" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success mb-6">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Your Privacy Matters</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Built With Trust at the Core
          </h2>
          <p className="text-lg text-muted-foreground">
            We believe in transparency. Here's how we protect your information.
          </p>
        </div>

        {/* Trust Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {trustPoints.map((point, index) => (
            <div 
              key={point.title}
              className="card-elevated p-6 flex gap-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon Container */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <point.icon className="w-6 h-6 text-success" />
                </div>
              </div>

              {/* Content */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold">{point.title}</h3>
                  <CheckCircle2 className="w-4 h-4 text-success" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Disclaimer */}
        <div className="mt-12 text-center">
          <p className="text-xs text-muted-foreground max-w-xl mx-auto">
            This tool is designed for educational purposes only. The recommendations provided 
            are based on general benefit structures and your input preferences. Always refer 
            to your card issuer for official benefit details and terms.
          </p>
        </div>
      </div>
    </section>
  );
}
