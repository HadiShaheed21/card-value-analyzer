import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * UX ANNOTATION: Header Component
 * ---------------------------------
 * Purpose: Primary navigation for enterprise fintech application
 * 
 * Design Decisions:
 * - Fixed positioning for constant accessibility
 * - Clean white background with subtle border for separation
 * - Logo prominently placed left (brand recognition)
 * - Navigation links center-aligned on desktop
 * - CTA button right-aligned for action visibility
 * - Mobile hamburger menu for responsive design
 * 
 * Accessibility:
 * - Clear focus states on all interactive elements
 * - Semantic nav landmark
 * - Skip-to-content consideration for screen readers
 */

const navLinks = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Demo", href: "/demo" },
  { label: "Privacy", href: "#privacy" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo - UX: Brand identity, clickable to home */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group"
            aria-label="Visa Benefit Intelligence - Home"
          >
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">V</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                Benefit Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - UX: Clear wayfinding with hover states */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={cn(
                  "nav-link text-sm font-medium",
                  location.pathname === link.href && "text-primary"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button - UX: Primary action always visible */}
          <div className="hidden lg:flex items-center gap-4">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button size="sm" asChild>
              <Link to="/demo">Start Simulation</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle - UX: Accessible hamburger menu */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu - UX: Full-width dropdown for touch targets */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    location.pathname === link.href
                      ? "bg-secondary text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-4 px-4">
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
                <Button className="w-full" asChild>
                  <Link to="/demo">Start Simulation</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
