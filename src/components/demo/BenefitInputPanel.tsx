import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { 
  CreditCard, 
  MapPin, 
  Plane, 
  Utensils, 
  ShoppingBag,
  User,
  Globe,
  ArrowRight
} from "lucide-react";

/**
 * UX ANNOTATION: Benefit Input Panel
 * ---------------------------------
 * Purpose: Collect user preferences for personalized benefit analysis
 * 
 * Design Decisions:
 * - Dashboard-style card layout for organized input groups
 * - Clear section headers with icons for context
 * - Masked card input format for privacy/security perception
 * - Persona buttons for quick lifestyle selection
 * - Sliders for intuitive lifestyle intensity adjustment
 * - Language toggle for accessibility
 * 
 * Input Groups:
 * 1. Card Information (masked number, card type)
 * 2. Personal Profile (persona, location)
 * 3. Lifestyle Preferences (travel, dining, shopping sliders)
 * 4. Language Preference
 * 
 * Interaction Design:
 * - Real-time slider value display
 * - Visual feedback on persona selection
 * - Clear CTA for form submission
 */

interface BenefitInputPanelProps {
  onSubmit: (data: InputData) => void;
}

export interface InputData {
  cardNumber: string;
  cardType: string;
  persona: string;
  location: string;
  travel: number;
  dining: number;
  shopping: number;
  language: string;
}

const cardTypes = [
  { value: "classic", label: "Visa Classic" },
  { value: "gold", label: "Visa Gold" },
  { value: "platinum", label: "Visa Platinum" },
  { value: "signature", label: "Visa Signature" },
  { value: "infinite", label: "Visa Infinite" },
];

const personas = [
  { value: "traveler", label: "Frequent Traveler", icon: Plane },
  { value: "foodie", label: "Food Enthusiast", icon: Utensils },
  { value: "shopper", label: "Avid Shopper", icon: ShoppingBag },
  { value: "balanced", label: "Balanced User", icon: User },
];

const locations = [
  { value: "metro", label: "Metro City (Delhi, Mumbai, etc.)" },
  { value: "tier2", label: "Tier 2 City" },
  { value: "tier3", label: "Tier 3 City / Town" },
  { value: "rural", label: "Rural Area" },
];

export function BenefitInputPanel({ onSubmit }: BenefitInputPanelProps) {
  const [formData, setFormData] = useState<InputData>({
    cardNumber: "",
    cardType: "",
    persona: "",
    location: "",
    travel: 50,
    dining: 50,
    shopping: 50,
    language: "english",
  });

  const handleSliderChange = (name: string, value: number[]) => {
    setFormData((prev) => ({ ...prev, [name]: value[0] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const formatCardNumber = (value: string) => {
    // Only allow digits and auto-format
    const cleaned = value.replace(/\D/g, "").slice(0, 4);
    return cleaned ? `**** **** **** ${cleaned}` : "";
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Card Information Section */}
      <div className="card-elevated p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Card Information</h3>
            <p className="text-sm text-muted-foreground">Enter masked card details</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Masked Card Number - UX: Shows privacy-first approach */}
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number (Last 4 digits)</Label>
            <Input
              id="cardNumber"
              placeholder="Enter last 4 digits"
              maxLength={4}
              value={formData.cardNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 4);
                setFormData((prev) => ({ ...prev, cardNumber: value }));
              }}
              className="font-mono"
            />
            {formData.cardNumber && (
              <p className="text-xs text-muted-foreground">
                Display: {formatCardNumber(formData.cardNumber)}
              </p>
            )}
          </div>

          {/* Card Type Selector */}
          <div className="space-y-2">
            <Label htmlFor="cardType">Card Type</Label>
            <Select
              value={formData.cardType}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, cardType: value }))}
            >
              <SelectTrigger id="cardType">
                <SelectValue placeholder="Select card type" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {cardTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Personal Profile Section */}
      <div className="card-elevated p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Personal Profile</h3>
            <p className="text-sm text-muted-foreground">Help us understand your lifestyle</p>
          </div>
        </div>

        {/* Persona Buttons - UX: Quick selection with visual feedback */}
        <div className="mb-6">
          <Label className="mb-3 block">Your Primary Persona</Label>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {personas.map((persona) => (
              <button
                key={persona.value}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, persona: persona.value }))}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  formData.persona === persona.value
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <persona.icon className={`w-6 h-6 mb-2 ${
                  formData.persona === persona.value ? "text-primary" : "text-muted-foreground"
                }`} />
                <p className={`text-sm font-medium ${
                  formData.persona === persona.value ? "text-primary" : "text-foreground"
                }`}>
                  {persona.label}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Location Selector */}
        <div className="space-y-2">
          <Label htmlFor="location" className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            Location
          </Label>
          <Select
            value={formData.location}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, location: value }))}
          >
            <SelectTrigger id="location">
              <SelectValue placeholder="Select your location type" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              {locations.map((loc) => (
                <SelectItem key={loc.value} value={loc.value}>
                  {loc.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Lifestyle Preferences Section */}
      <div className="card-elevated p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Plane className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Lifestyle Preferences</h3>
            <p className="text-sm text-muted-foreground">Adjust sliders based on your spending habits</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Travel Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="flex items-center gap-2">
                <Plane className="w-4 h-4 text-info" />
                Travel Frequency
              </Label>
              <span className="text-sm font-medium text-primary">{formData.travel}%</span>
            </div>
            <Slider
              value={[formData.travel]}
              onValueChange={(value) => handleSliderChange("travel", value)}
              max={100}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Rarely</span>
              <span>Frequently</span>
            </div>
          </div>

          {/* Dining Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-warning" />
                Dining Out
              </Label>
              <span className="text-sm font-medium text-primary">{formData.dining}%</span>
            </div>
            <Slider
              value={[formData.dining]}
              onValueChange={(value) => handleSliderChange("dining", value)}
              max={100}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Home Cook</span>
              <span>Dine Out Often</span>
            </div>
          </div>

          {/* Shopping Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-success" />
                Shopping Habits
              </Label>
              <span className="text-sm font-medium text-primary">{formData.shopping}%</span>
            </div>
            <Slider
              value={[formData.shopping]}
              onValueChange={(value) => handleSliderChange("shopping", value)}
              max={100}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Minimal</span>
              <span>Frequent</span>
            </div>
          </div>
        </div>
      </div>

      {/* Language Toggle */}
      <div className="card-elevated p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Globe className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Language Preference</h3>
            <p className="text-sm text-muted-foreground">Choose your preferred language</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, language: "english" }))}
            className={`px-6 py-3 rounded-lg border-2 transition-all font-medium ${
              formData.language === "english"
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border hover:border-primary/50"
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, language: "tamil" }))}
            className={`px-6 py-3 rounded-lg border-2 transition-all font-medium ${
              formData.language === "tamil"
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border hover:border-primary/50"
            }`}
          >
            தமிழ்
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <Button type="submit" variant="hero" size="xl" className="w-full">
        Analyze My Benefits
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </form>
  );
}
