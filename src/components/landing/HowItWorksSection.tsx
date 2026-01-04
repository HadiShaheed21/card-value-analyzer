import { CreditCard, Sliders, BarChart3, CheckCircle } from "lucide-react";

/**
 * UX ANNOTATION: How It Works Section
 * ---------------------------------
 * Purpose: Reduce user anxiety by showing clear process steps
 * 
 * Design Decisions:
 * - 4-step numbered process for clarity
 * - Icons reinforce step meaning visually
 * - Horizontal timeline on desktop, vertical on mobile
 * - Each step has clear action word + brief description
 * 
 * Psychological Principle:
 * - Numbered steps reduce perceived complexity
 * - Progressive disclosure builds confidence
 * - Visual cues (icons, numbers) aid scanning
 */

const steps = [
  {
    icon: CreditCard,
    title: "Enter Card Info",
    description: "Provide masked card details and select your card type for personalized analysis.",
    step: 1,
  },
  {
    icon: Sliders,
    title: "Set Preferences",
    description: "Adjust lifestyle sliders for travel, dining, and shopping to match your habits.",
    step: 2,
  },
  {
    icon: BarChart3,
    title: "View Results",
    description: "Get personalized benefit recommendations with confidence scores and value estimates.",
    step: 3,
  },
  {
    icon: CheckCircle,
    title: "Make Decisions",
    description: "Use insights to maximize your card benefits or compare with other options.",
    step: 4,
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 lg:py-32 bg-secondary/50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Four simple steps to understand your card's true value
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.step}
              className="relative group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Connector Line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-border" />
              )}

              {/* Step Card */}
              <div className="relative card-elevated p-6 text-center group-hover:shadow-lg transition-shadow">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold z-10">
                  {step.step}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-4 mt-4 group-hover:bg-primary/10 transition-colors">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
