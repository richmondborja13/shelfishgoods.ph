/**
 * PricingSection Component
 *
 * Front-end Guidelines:
 * - Displays pricing tiers, features, and plan comparison.
 * - Uses Lucide icons, Framer Motion for animation, Radix UI for switch/dialog, and Next.js Link.
 * - UI/UX: Responsive, interactive, highlights recommended plans, and supports monthly/annual toggle.
 *
 * Back-end Follow-through:
 * - If pricing is dynamic, fetch from API or CMS.
 * - Ensure endpoints provide tier details, features, and pricing as needed.
 */
'use client';

import { useState } from 'react';
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { Check, X, Star, ArrowRight, Zap, Crown, Rocket } from 'lucide-react';
import Link from 'next/link';

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-6 w-6 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 border border-gray-200"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

interface PricingFeature {
  name: string; // Name of the feature
  included: boolean; // Whether the feature is included in the tier
}

interface PricingTier {
  name: string; // Name of the pricing tier
  description: string; // Description of the tier
  price: {
    monthly: number; // Monthly price
    annual: number; // Annual price
  };
  features: PricingFeature[]; // List of features for the tier
  highlighted?: boolean; // Whether this tier is highlighted/recommended
  icon: React.ComponentType<any>; // Icon for the tier
  color: string; // Color gradient for the tier card
}

// pricing tiers on the pricing section
const pricingTiers: PricingTier[] = [
  {
    name: 'Starter',
    description: 'Perfect for small businesses getting started',
    price: {
      monthly: 900,
      annual: 9180,
    },
    features: [
      { name: 'Basic inventory management', included: true },
      { name: 'Up to 1,000 SKUs', included: true },
      { name: 'Email support', included: true },
      { name: 'Basic analytics', included: true },
      { name: 'Single location', included: true },
      { name: 'Advanced reporting', included: false },
      { name: 'Multi-user access', included: false },
      { name: 'API access', included: false },
    ],
    icon: Rocket,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Professional',
    description: 'Ideal for growing businesses with multiple locations',
    price: {
      monthly: 2900,
      annual: 29580,
    },
    features: [
      { name: 'Advanced inventory management', included: true },
      { name: 'Up to 10,000 SKUs', included: true },
      { name: 'Priority email & chat support', included: true },
      { name: 'Advanced analytics', included: true },
      { name: 'Up to 5 locations', included: true },
      { name: 'Advanced reporting', included: true },
      { name: 'Multi-user access', included: true },
      { name: 'API access', included: false },
    ],
    highlighted: true,
    icon: Zap,
    color: 'from-cyan-500 to-blue-600'
  },
  {
    name: 'Enterprise',
    description: 'For large businesses with complex needs',
    price: {
      monthly: 4900,
      annual: 49980,
    },
    features: [
      { name: 'Enterprise inventory management', included: true },
      { name: 'Unlimited SKUs', included: true },
      { name: '24/7 phone, email & chat support', included: true },
      { name: 'Custom analytics', included: true },
      { name: 'Unlimited locations', included: true },
      { name: 'Custom reporting', included: true },
      { name: 'Unlimited users', included: true },
      { name: 'Full API access', included: true },
    ],
    icon: Crown,
    color: 'from-blue-600 to-cyan-600'
  },
];

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [trialModalOpen, setTrialModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingTier | null>(null);

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white" id="pricing" aria-labelledby="pricing-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 id="pricing-heading" className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Simple,
            <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
              Transparent Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose the perfect plan for your business needs. All plans include a 14-day free trial.
          </p>
        </motion.div>

        <motion.div 
          className="flex justify-center items-center space-x-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <span className={`text-sm font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
            Monthly billing
          </span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
            className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-600 data-[state=checked]:to-cyan-600 data-[state=unchecked]:bg-cyan-500 border-2 border-white"
          />
          <span className={`text-sm font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
            Annual billing
            <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              Save 15%
            </span>
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => {
            const IconComponent = tier.icon;
            return (
              <motion.div
                key={tier.name}
                className={`relative rounded-2xl border-2 transition-all duration-300 hover:shadow-2xl ${
                  tier.highlighted
                    ? 'border-cyan-500 shadow-xl bg-white scale-105'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`flex items-center justify-center w-12 h-12 bg-gradient-to-br ${tier.color} rounded-xl`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    {tier.highlighted && (
                      <Star className="w-6 h-6 text-yellow-400 fill-current" />
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <p className="text-gray-600 mb-8">{tier.description}</p>

                  <div className="mb-8">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-gray-900">
                        ₱{(isAnnual ? tier.price.annual : tier.price.monthly).toLocaleString()}
                      </span>
                      <span className="text-lg text-gray-500 ml-2">/mo</span>
                    </div>
                    {isAnnual && (
                      <p className="text-sm text-green-600 font-medium mt-1">
                        Save ₱{(tier.price.monthly * 12 * 0.15).toLocaleString()} annually
                      </p>
                    )}
                  </div>

                  <Button
                    onClick={() => {
                      setSelectedPlan(tier);
                      setTrialModalOpen(true);
                    }}
                    className={`w-full mb-8 py-3 text-lg font-semibold rounded-xl transition-all duration-200 ${
                      tier.highlighted
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl'
                        : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl'
                    }`}
                  >
                    <span className="flex items-center justify-center">
                      Start Free Trial
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </span>
                  </Button>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-4">
                      What's included
                    </h4>
                    <ul className="space-y-3">
                      {tier.features.map((feature) => (
                        <li key={feature.name} className="flex items-start space-x-3">
                          <span
                            className={`flex-shrink-0 mt-0.5 ${
                              feature.included ? 'text-green-500' : 'text-gray-300'
                            }`}
                          >
                            {feature.included ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                          </span>
                          <span
                            className={`text-sm ${
                              feature.included ? 'text-gray-700' : 'text-gray-400'
                            }`}
                          >
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Questions about pricing?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our team is here to help you choose the right plan for your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-8 py-3 text-lg font-semibold border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 rounded-xl transition-all duration-200 text-black"
            >
              Contact Sales
            </Button>
            <Button 
              className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Schedule Demo
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Trial Signup Modal */}
      <Dialog open={trialModalOpen} onOpenChange={setTrialModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 text-center">
              Start Your Free Trial
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                You're about to start a 14-day free trial of the <strong>{selectedPlan?.name}</strong> plan.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-blue-900 mb-2">What's included in your trial:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  {selectedPlan?.features.filter(feature => feature.included).map((feature, index) => (
                    <li key={index}>✓ {feature.name}</li>
                  ))}
                  <li>✓ No credit card required</li>
                  <li>✓ Cancel anytime during trial</li>
                  <li>✓ 24/7 customer support</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button 
                onClick={() => window.location.href = '/user/registration'}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3 text-lg font-semibold rounded-xl"
              >
                Create Account & Start Trial
              </Button>
              <Button 
                variant="outline"
                onClick={() => setTrialModalOpen(false)}
                className="w-full border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-700 py-3 rounded-xl"
              >
                Maybe Later
              </Button>
            </div>
            
            <p className="text-xs text-gray-500 text-center">
              By starting your trial, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
} 