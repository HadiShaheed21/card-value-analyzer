import { ConfidenceMeter } from "./ConfidenceMeter";
import { InputData } from "./BenefitInputPanel";
import { 
  Plane, 
  Utensils, 
  ShoppingBag, 
  Shield, 
  Percent, 
  IndianRupee,
  Info,
  Sparkles,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * UX ANNOTATION: Results Panel
 * ---------------------------------
 * Purpose: Display personalized benefit analysis with confidence metrics
 * 
 * Design Decisions:
 * - 3-card grid layout for organized information
 * - Card A: Primary benefit with icon and description
 * - Card B: Confidence meter (visual trust indicator)
 * - Card C: Estimated value with breakdown
 * - AI explanation panel for transparency
 * 
 * Visual Hierarchy:
 * - Primary benefit as largest/most prominent card
 * - Confidence meter as visual focal point
 * - Value estimate with supporting breakdowns
 * - Explanation as supporting context
 * 
 * Information Architecture:
 * - Most actionable info first
 * - Supporting details progressively disclosed
 * - Clear visual separation between sections
 */

interface ResultsPanelProps {
  inputData: InputData;
}

// Mock benefit calculation based on input
const calculateBenefits = (data: InputData) => {
  const baseConfidence = 65;
  let confidence = baseConfidence;
  const factors: string[] = [];

  // Adjust confidence based on completeness
  if (data.cardType) {
    confidence += 10;
    factors.push("Card Type Match");
  }
  if (data.persona) {
    confidence += 8;
    factors.push("Lifestyle Fit");
  }
  if (data.location) {
    confidence += 5;
    factors.push("Regional Data");
  }

  // Determine primary benefit based on persona and sliders
  let primaryBenefit = {
    icon: Shield,
    title: "Purchase Protection",
    description: "Extended warranty and purchase protection on eligible items.",
    value: "₹25,000",
  };

  if (data.travel > 60 || data.persona === "traveler") {
    primaryBenefit = {
      icon: Plane,
      title: "Travel Insurance",
      description: "Comprehensive travel insurance including trip cancellation and medical coverage.",
      value: "₹50,000",
    };
    factors.push("High Travel Score");
  } else if (data.dining > 60 || data.persona === "foodie") {
    primaryBenefit = {
      icon: Utensils,
      title: "Dining Rewards",
      description: "Enhanced cashback and exclusive offers at partner restaurants.",
      value: "5% Cashback",
    };
    factors.push("Dining Preference");
  } else if (data.shopping > 60 || data.persona === "shopper") {
    primaryBenefit = {
      icon: ShoppingBag,
      title: "Shopping Rewards",
      description: "Extra reward points and exclusive discounts on online and retail purchases.",
      value: "10X Points",
    };
    factors.push("Shopping Pattern");
  }

  // Calculate estimated annual value
  const baseValue = 12000;
  const travelBonus = (data.travel / 100) * 15000;
  const diningBonus = (data.dining / 100) * 8000;
  const shoppingBonus = (data.shopping / 100) * 10000;
  const cardMultiplier = data.cardType === "infinite" ? 2 : data.cardType === "signature" ? 1.5 : 1;

  const estimatedValue = Math.round((baseValue + travelBonus + diningBonus + shoppingBonus) * cardMultiplier);

  return {
    confidence: Math.min(confidence, 95),
    factors,
    primaryBenefit,
    estimatedValue,
    breakdown: [
      { label: "Travel Benefits", value: Math.round(travelBonus * cardMultiplier), icon: Plane },
      { label: "Dining Rewards", value: Math.round(diningBonus * cardMultiplier), icon: Utensils },
      { label: "Shopping Cashback", value: Math.round(shoppingBonus * cardMultiplier), icon: ShoppingBag },
      { label: "Base Perks", value: Math.round(baseValue * cardMultiplier), icon: Shield },
    ],
  };
};

export function ResultsPanel({ inputData }: ResultsPanelProps) {
  const results = calculateBenefits(inputData);

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Results Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success mb-4">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Analysis Complete</span>
        </div>
        <h2 className="text-2xl lg:text-3xl font-bold mb-2">Your Personalized Results</h2>
        <p className="text-muted-foreground">Based on your card and lifestyle preferences</p>
      </div>

      {/* Results Grid - 3 Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card A: Primary Benefit */}
        <div className="card-elevated p-6 result-card-glow">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <results.primaryBenefit.icon className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Top Benefit
            </span>
          </div>
          
          <h3 className="text-xl font-bold mb-2">{results.primaryBenefit.title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{results.primaryBenefit.description}</p>
          
          <div className="flex items-center gap-2 text-primary">
            <TrendingUp className="w-5 h-5" />
            <span className="text-lg font-bold">{results.primaryBenefit.value}</span>
          </div>
        </div>

        {/* Card B: Confidence Meter */}
        <div className="card-elevated p-6 result-card-glow flex flex-col items-center justify-center">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Recommendation Certainty
          </span>
          <ConfidenceMeter value={results.confidence} factors={results.factors} />
        </div>

        {/* Card C: Estimated Value */}
        <div className="card-elevated p-6 result-card-glow">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
              <IndianRupee className="w-5 h-5 text-accent" />
            </div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Annual Value
            </span>
          </div>

          <div className="mb-4">
            <span className="text-3xl font-bold text-foreground">
              ₹{results.estimatedValue.toLocaleString("en-IN")}
            </span>
            <span className="text-sm text-muted-foreground"> / year</span>
          </div>

          {/* Value Breakdown */}
          <div className="space-y-2">
            {results.breakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                <span className="font-medium">₹{item.value.toLocaleString("en-IN")}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Explanation Panel */}
      <div className="card-elevated p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center flex-shrink-0">
            <Info className="w-5 h-5 text-info" />
          </div>
          <div>
            <h4 className="font-semibold mb-2">AI Analysis Summary</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Based on your {inputData.cardType || "selected"} card and {inputData.persona || "balanced"} lifestyle profile, 
              we've identified {results.primaryBenefit.title.toLowerCase()} as your most valuable benefit. 
              With your {inputData.travel > 60 ? "frequent travel" : inputData.dining > 60 ? "dining preferences" : "shopping habits"}, 
              you could realize an estimated annual value of ₹{results.estimatedValue.toLocaleString("en-IN")}. 
              Our confidence level of {results.confidence}% is based on the completeness of your profile and 
              historical benefit utilization patterns for similar user profiles.
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-center text-muted-foreground">
        Estimates are based on general benefit structures and your input preferences. 
        Actual values may vary. Contact your card issuer for official benefit details.
      </p>
    </div>
  );
}
