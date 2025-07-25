/**
 * HeroSection Component
 *
 * Front-end Guidelines:
 * - Main landing page hero section with animated headline and call-to-action.
 * - Uses Framer Motion for animation, Radix UI for dialogs/tooltips, and Lucide icons.
 * - Handles smooth scrolling to sections and modal state for user interaction.
 * - UI/UX: Responsive, visually engaging, and accessible.
 *
 * Back-end Follow-through:
 * - If dynamic content (headline, stats, etc.) is needed, integrate with CMS or API.
 * - Ensure endpoints provide necessary data for hero section personalization.
 * - Consider A/B testing or analytics hooks for user engagement tracking.
 */
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tooltip from '@radix-ui/react-tooltip';
import { Button } from '@/components/ui/button';
import { Info, Play, ArrowRight, CheckCircle, Star, X } from 'lucide-react';

export default function HeroSection() {
  // State for modal dialog visibility
  const [modalOpen, setModalOpen] = useState(false);
  // State for which section to scroll to after modal closes
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);

  /**
   * Scrolls smoothly to a section by ID
   * @param sectionId - The DOM id of the section to scroll to
   */
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Effect: If modal closes and scrollTarget is set, scroll to that section
  useEffect(() => {
    if (!modalOpen && scrollTarget) {
      setTimeout(() => {
        scrollToSection(scrollTarget);
        setScrollTarget(null);
      }, 100);
    }
  }, [modalOpen, scrollTarget]);

  // Animated typing effect for headline
  const text = "Shelf-ish Goods Solutions";
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);   

  // Start typing after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Add one character at a time every 120ms for typing effect
  useEffect(() => {
    if (isTyping && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 120);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, isTyping]);

  return (
    <Tooltip.Provider>
      {/* Hero section with animated background and call-to-action */}
      <section id="hero" className="min-h-screen flex flex-col justify-center pt-24 pb-16 bg-gradient-to-br from-white via-blue-50 to-cyan-50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {/* Decorative blurred background gradients */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full opacity-10 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center relative z-10">
          <div className="text-center">
            {/* Trust badge with animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-full text-sm font-medium text-blue-700 mb-8"
            >
              <Star className="w-4 h-4 mr-2 text-yellow-500" />
              Trusted by 10,000+ businesses worldwide
            </motion.div>

            {/* Animated headline with sliding and typing effect */}
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* --- sliding animation headline: "Transform Your Business with" --- */}
              <motion.span 
                className="block relative"
                initial={{ x: -1000, opacity: 0, y: 0 }}
                animate={{ x: 0, opacity: 1, y: 0 }}
                // Springy, smooth transition
                transition={{ 
                  duration: 2.5, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  type: "spring",
                  stiffness: 30,
                  damping: 15,
                  mass: 2
                }}
                // this add a subtle bounce effect after entrance
                whileInView={{
                  y: [0, -5, 0, -3, 0],
                  transition: {
                    duration: 0.5,
                    delay: 2.5,
                    repeat: Infinity,
                    repeatDelay: 3
                  }
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-20 blur-sm"
                  initial={{ x: -1000, opacity: 0 }}
                  animate={{ x: 0, opacity: 0.2 }}
                  transition={{ 
                    duration: 2.5, 
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: 0.1
                  }}
                />
                Transform Your Business with
              </motion.span>
              {/* --- typing animation on "Shelf-ish Goods Solutions" headline --- */}
              <motion.span 
                className="block bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  duration: 0.5,
                  delay: 1.5
                }}
              >
                {displayText}
                {/* shows blinking cursor while typing */}
                {isTyping && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-0.5 h-8 bg-blue-600 ml-1"
                  />
                )}
              </motion.span>
            </motion.h1>

            <motion.p 
              className="mt-6 max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Simplify vendor management, enhance inventory efficiency, and grow your business with our all-in-one platform built for modern enterprises.
            </motion.p>

            <motion.div 
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button asChild size="lg" className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                <Link href="/user/registration" className="flex items-center">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              
              <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
                <Dialog.Trigger asChild>
                  <Button 
                    variant="outline"
                    size="lg"
                    className="px-8 py-4 text-lg font-semibold border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 rounded-xl transition-all duration-200 text-black"
                    onClick={() => setModalOpen(true)}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Watch Demo
                  </Button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                  <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-[600px] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
                    <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                      <X className="h-4 w-4" />
                      <span className="sr-only">Close</span>
                    </Dialog.Close>
                    
                    <div className="text-center">
                      <Dialog.Title className="text-3xl font-bold text-gray-900">
                        See Shelf-ish Goods in Action
                      </Dialog.Title>
                      <Dialog.Description className="text-lg text-gray-600 mt-4">
                        Discover how our platform can revolutionize your business operations and drive growth.
                      </Dialog.Description>
                    </div>
                    
                    <div className="mt-8 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          { title: 'Vendor Management', desc: 'Centralized control of all your suppliers' },
                          { title: 'Inventory Tracking', desc: 'Real-time stock monitoring and alerts' },
                          { title: 'Order Processing', desc: 'Automated workflows and approvals' },
                          { title: 'Analytics Dashboard', desc: 'Comprehensive insights and reporting' }
                        ].map((feature, index) => (
                          <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl">
                            <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                            <div>
                              <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                              <p className="text-gray-600 text-sm mt-1">{feature.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-gray-200 pt-6">
                        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="font-medium">10,000+ Clients</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span className="font-medium">99.9% Uptime</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                            <span className="font-medium">24/7 Support</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 pt-6">
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setModalOpen(false);
                            setScrollTarget('services');
                          }}
                          className="flex-1 py-3"
                        >
                          Explore Features
                        </Button>
                        <Button 
                          onClick={() => {
                            setModalOpen(false);
                            setScrollTarget('pricing');
                          }}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 py-3"
                        >
                          View Pricing
                        </Button>
                      </div>
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </motion.div>
            
            <motion.div 
              className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <div className="flex items-center space-x-2 cursor-help hover:text-blue-600 transition-colors">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="font-medium">Free 14-day trial</span>
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                    sideOffset={4}
                  >
                    <p>No credit card required</p>
                    <Tooltip.Arrow className="fill-popover" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
              
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <div className="flex items-center space-x-2 cursor-help hover:text-blue-600 transition-colors">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="font-medium">Setup in 5 minutes</span>
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                    sideOffset={4}
                  >
                    <p>Quick and easy onboarding</p>
                    <Tooltip.Arrow className="fill-popover" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
              
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <div className="flex items-center space-x-2 cursor-help hover:text-blue-600 transition-colors">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="font-medium">Cancel anytime</span>
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                    sideOffset={4}
                  >
                    <p>No long-term commitments</p>
                    <Tooltip.Arrow className="fill-popover" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </motion.div>
          </div>
        </div>
      </section>
    </Tooltip.Provider>
  );
} 