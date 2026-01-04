import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { TrustSection } from "@/components/landing/TrustSection";

/**
 * UX ANNOTATION: Landing Page (Index)
 * ---------------------------------
 * Purpose: Primary entry point - convert visitors to demo users
 * 
 * Page Structure:
 * 1. Header - Navigation and brand identity
 * 2. Hero - Value proposition and primary CTA
 * 3. How It Works - Process education, reduce anxiety
 * 4. Trust Section - Address security/privacy concerns
 * 5. Footer - Secondary navigation and trust signals
 * 
 * Conversion Strategy:
 * - Clear value proposition in hero
 * - Process transparency reduces friction
 * - Trust signals address objections
 * - Multiple CTAs throughout page
 * 
 * SEO Considerations:
 * - Semantic HTML structure
 * - Proper heading hierarchy
 * - Meta tags for social sharing
 */

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 lg:pt-20">
        <HeroSection />
        <HowItWorksSection />
        <TrustSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
