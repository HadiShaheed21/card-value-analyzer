import { Link } from "react-router-dom";
import { Shield, Lock, FileText } from "lucide-react";

/**
 * UX ANNOTATION: Footer Component
 * ---------------------------------
 * Purpose: Trust reinforcement and secondary navigation
 * 
 * Design Decisions:
 * - Minimal, clean design to not distract from main content
 * - Trust indicators prominently displayed
 * - Quick links for legal/compliance requirements
 * - Consistent branding with header
 * 
 * Content Strategy:
 * - Copyright reinforces legitimacy
 * - Privacy-first messaging builds trust
 * - Disclaimer clarifies tool purpose
 */

export function Footer() {
  return (
    <footer className="bg-navy-900 text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        {/* Trust Indicators Row */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-12 mb-12 pb-8 border-b border-navy-700">
          <div className="flex items-center gap-2 text-sm text-navy-200">
            <Shield className="w-5 h-5 text-accent" />
            <span>Masked Data Only</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-navy-200">
            <Lock className="w-5 h-5 text-accent" />
            <span>No Data Stored</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-navy-200">
            <FileText className="w-5 h-5 text-accent" />
            <span>Awareness Tool</span>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary-foreground flex items-center justify-center">
                <span className="text-primary font-bold text-sm">V</span>
              </div>
              <span className="font-semibold">Benefit Intelligence</span>
            </div>
            <p className="text-sm text-navy-300 leading-relaxed">
              A decision-support tool that simulates the real value of Visa card 
              benefits based on your lifestyle patterns.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-navy-200">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-navy-300 hover:text-primary-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/demo" className="text-sm text-navy-300 hover:text-primary-foreground transition-colors">
                  Start Simulation
                </Link>
              </li>
              <li>
                <Link to="#how-it-works" className="text-sm text-navy-300 hover:text-primary-foreground transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-navy-200">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="#privacy" className="text-sm text-navy-300 hover:text-primary-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#terms" className="text-sm text-navy-300 hover:text-primary-foreground transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link to="#disclaimer" className="text-sm text-navy-300 hover:text-primary-foreground transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="pt-8 border-t border-navy-700 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-navy-400">
            © {new Date().getFullYear()} Visa Benefit Intelligence Assistant. All rights reserved.
          </p>
          <p className="text-xs text-navy-400 text-center sm:text-right">
            This is an awareness tool only. Not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
