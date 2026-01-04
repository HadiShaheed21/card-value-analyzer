import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * UX ANNOTATION: Confidence Meter Component
 * ---------------------------------
 * Purpose: Visual representation of recommendation certainty
 * 
 * Design Decisions:
 * - Circular/arc gauge for intuitive understanding
 * - Color-coded levels (green=high, amber=medium, red=low)
 * - Percentage display for precision
 * - Supporting tags explain confidence factors
 * - Animated fill for engagement
 * 
 * Visual Hierarchy:
 * - Large percentage number as focal point
 * - Arc visualization for at-a-glance understanding
 * - Label below for context
 * - Factor tags as supporting information
 * 
 * Animation:
 * - Smooth arc fill animation on load
 * - Draws attention and creates delight
 */

interface ConfidenceMeterProps {
  value: number; // 0-100
  factors: string[];
  className?: string;
}

export function ConfidenceMeter({ value, factors, className }: ConfidenceMeterProps) {
  const [animatedValue, setAnimatedValue] = useState(0);

  // Animate the value on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value);
    }, 300);
    return () => clearTimeout(timer);
  }, [value]);

  // Calculate arc parameters
  const radius = 80;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * Math.PI; // Half circle
  const strokeDashoffset = circumference - (animatedValue / 100) * circumference;

  // Determine confidence level and color
  const getConfidenceLevel = (val: number) => {
    if (val >= 70) return { label: "High", color: "confidence-high", textClass: "text-success" };
    if (val >= 40) return { label: "Medium", color: "confidence-medium", textClass: "text-warning" };
    return { label: "Low", color: "confidence-low", textClass: "text-destructive" };
  };

  const confidence = getConfidenceLevel(value);

  return (
    <div className={cn("flex flex-col items-center", className)}>
      {/* Arc Gauge */}
      <div className="relative" style={{ width: radius * 2, height: radius + 20 }}>
        <svg
          width={radius * 2}
          height={radius + 20}
          viewBox={`0 0 ${radius * 2} ${radius + 20}`}
          className="transform -rotate-180"
          style={{ transformOrigin: 'center' }}
        >
          {/* Background Arc */}
          <path
            d={`M ${strokeWidth / 2} ${radius + 10} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${radius * 2 - strokeWidth / 2} ${radius + 10}`}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          
          {/* Filled Arc */}
          <path
            d={`M ${strokeWidth / 2} ${radius + 10} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${radius * 2 - strokeWidth / 2} ${radius + 10}`}
            fill="none"
            stroke={`hsl(var(--${confidence.color}))`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="confidence-arc"
            style={{
              transition: 'stroke-dashoffset 0.8s ease-out, stroke 0.3s ease',
            }}
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-4">
          <span className={cn("text-4xl font-bold", confidence.textClass)}>
            {Math.round(animatedValue)}%
          </span>
          <span className={cn("text-sm font-medium", confidence.textClass)}>
            {confidence.label} Confidence
          </span>
        </div>
      </div>

      {/* Factor Tags */}
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {factors.map((factor, index) => (
          <span
            key={index}
            className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
          >
            {factor}
          </span>
        ))}
      </div>
    </div>
  );
}
