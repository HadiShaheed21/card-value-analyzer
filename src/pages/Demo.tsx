import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BenefitInputPanel, InputData } from "@/components/demo/BenefitInputPanel";
import { ResultsPanel } from "@/components/demo/ResultsPanel";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

/**
 * UX ANNOTATION: Demo Page
 * ---------------------------------
 * Purpose: Interactive benefit simulation experience
 * 
 * Page States:
 * 1. Input State - User enters preferences
 * 2. Results State - Display personalized analysis
 * 
 * Design Decisions:
 * - Two-column layout on desktop (sidebar + main)
 * - Full-width stacked layout on mobile
 * - Clear visual separation between input and results
 * - Smooth transition between states
 * - Back button to modify inputs
 * 
 * User Flow:
 * 1. User enters card and lifestyle info
 * 2. Clicks "Analyze" to see results
 * 3. Can go back to modify inputs
 * 4. Results update based on new inputs
 */

export default function Demo() {
  const [showResults, setShowResults] = useState(false);
  const [inputData, setInputData] = useState<InputData | null>(null);

  const handleSubmit = (data: InputData) => {
    setInputData(data);
    setShowResults(true);
    // Scroll to top on mobile
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setShowResults(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-secondary/30">
      <Header />
      
      <main className="flex-1 pt-20 lg:pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold">
                {showResults ? "Your Benefit Analysis" : "Benefit Simulation"}
              </h1>
            </div>
            <p className="text-muted-foreground">
              {showResults 
                ? "Here are your personalized card benefit recommendations"
                : "Enter your details to discover your card's true value"
              }
            </p>
          </div>

          {/* Main Content Area */}
          {showResults && inputData ? (
            <div className="space-y-6">
              {/* Back Button */}
              <Button 
                variant="outline" 
                onClick={handleBack}
                className="mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Modify Inputs
              </Button>

              {/* Results */}
              <ResultsPanel inputData={inputData} />
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Sidebar - Info Panel */}
              <div className="lg:col-span-1 order-2 lg:order-1">
                <div className="card-elevated p-6 sticky top-28">
                  <h3 className="font-semibold mb-4">What We'll Analyze</h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      </span>
                      Your card's benefit structure based on type
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      </span>
                      Lifestyle match with available perks
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      </span>
                      Estimated annual value based on usage
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      </span>
                      Confidence score for recommendations
                    </li>
                  </ul>

                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      🔒 Your data is processed locally and never stored. 
                      We use masked card numbers only for demonstration.
                    </p>
                  </div>
                </div>
              </div>

              {/* Main Input Form */}
              <div className="lg:col-span-2 order-1 lg:order-2">
                <BenefitInputPanel onSubmit={handleSubmit} />
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
