'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as Label from '@radix-ui/react-label';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Separator from '@radix-ui/react-separator';

export default function SellerRegistration() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 my-4 md:my-0">
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-cyan-400 p-8 relative flex-col">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="absolute top-4 left-4 z-20 bg-white/80 hover:bg-white rounded-full p-2 shadow transition group"
                aria-label="Back to landing page"
                onClick={() => router.push('/')}
              >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-blue-700">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" align="center">
              Back to Home Page
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="flex flex-col items-center justify-center relative flex-grow min-h-[500px] mb-2 mt-16">
          <svg width="440" height="440" viewBox="0 0 440 440" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-80 z-0">
            <circle cx="220" cy="220" r="200" fill="#fff" fillOpacity="0.08" />
            <circle cx="220" cy="220" r="150" fill="#fff" fillOpacity="0.12" />
            <circle cx="220" cy="220" r="100" fill="#fff" fillOpacity="0.18" />
          </svg>
          <img src="/images/graphics/image.png" alt="Vendor graphic" className="w-[32rem] h-[32rem] drop-shadow-xl relative z-10" />
        </div>
        <div className="z-10 text-left w-full mb-5">
          <h2 className="text-2xl font-extrabold text-white mb-2 drop-shadow-lg">Join Shelf-ish Goods</h2>
          <p className="text-base text-cyan-50 font-medium drop-shadow">Empower your business with modern tools and insights.</p>
        </div>
      </div>
      <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
        <div className="absolute top-4 right-4 z-20">
          <Image src="/images/icons/logosg.png" alt="Shelf-ish Goods Logo" width={48} height={48} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Create your account</h3>
        <p className="text-gray-500 mb-6">Start your journey as a vendor. It's fast and easy!</p>
        <form className="space-y-4">
          <div>
            <Label.Root htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</Label.Root>
            <input id="username" name="username" type="text" required className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-black" placeholder="Your username" />
          </div>
          <div>
            <Label.Root htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</Label.Root>
            <input id="email" name="email" type="email" required className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-black" placeholder="you@email.com" />
          </div>
          <div>
            <Label.Root htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</Label.Root>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-black"
                placeholder="••••••••"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 focus:outline-none"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="mb-2">
            <Label.Root htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</Label.Root>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-black"
                placeholder="••••••••"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 focus:outline-none"
                onClick={() => setShowConfirmPassword((v) => !v)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <Checkbox.Root id="terms" className="w-4 h-4 rounded border border-gray-300 bg-white data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 flex items-center justify-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" required>
              <Checkbox.Indicator className="text-white">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 8l2.5 2.5L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label htmlFor="terms" className="text-sm text-gray-700 select-none">I agree to the{' '}
              <Dialog open={termsOpen} onOpenChange={setTermsOpen}>
                <DialogTrigger asChild>
                  <button type="button" className="text-blue-600 hover:underline font-medium">Terms and Conditions</button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto bg-gradient-to-br from-gray-50 to-white">
                  <DialogHeader className="border-b border-gray-200 pb-4 mb-6">
                    <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      Terms and Conditions
                    </DialogTitle>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-gray-600">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Effective Date: {new Date().toLocaleDateString()}
                        </span>
                        <span className="hidden sm:block">•</span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          Platform: Shelf-ish Goods Store Management System
                        </span>
                      </div>
                    </div>
                  </DialogHeader>
                  
                  <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                      <p className="text-blue-800 font-medium">
                        By accessing or using the Shelf-ish Goods Store Management System ("Platform"), you ("Vendor", "Partner", or "User") agree to comply with and be bound by these Terms and Conditions. If you do not agree to these Terms, you may not access or use the Platform.
                      </p>
                    </div>

                    <section className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                        Acceptance of Terms
                      </h3>
                      <p>By accessing or using the Shelf-ish Goods Store Management System ("Platform"), you ("Vendor", "Partner", or "User") agree to comply with and be bound by these Terms and Conditions. If you do not agree to these Terms, you may not access or use the Platform.</p>
                    </section>

                    <section className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                        Description of Service
                      </h3>
                      <p className="mb-3">The Platform is a subscription-based software solution offering tools and features for:</p>
                      <ul className="list-none space-y-2 ml-4">
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Product and inventory management
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Order tracking and fulfillment
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Team collaboration
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Sales analytics and reporting
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Billing and subscription management
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          System integrations and mobile access
                        </li>
                      </ul>
                      <p className="mt-3 text-gray-600 italic">Features may vary based on the selected subscription plan and may be updated or expanded over time.</p>
                    </section>

                    <section className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                        Account Registration and Access
                      </h3>
                      <ul className="list-none space-y-2 ml-4">
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Vendors must register an account to use the Platform.
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          You are responsible for maintaining the confidentiality of your login credentials.
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          You agree to provide accurate and up-to-date account information.
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Sharing of accounts or unauthorized access is strictly prohibited.
                        </li>
                      </ul>
                    </section>

                    <section className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                        Subscription Plans, Payment & Free Trial
                      </h3>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">4.1 Subscription Plans</h4>
                          <p className="mb-3">Shelf-ish Goods offers multiple pricing tiers to meet the needs of different vendors. Plan features vary and are listed on our <span className="text-blue-600 font-medium">Pricing Page</span>.</p>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="font-medium text-gray-800 mb-2">Plans include, but are not limited to:</p>
                            <ul className="space-y-1 text-sm">
                              <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                <strong>Starter:</strong> basic inventory and product features
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                <strong>Growth:</strong> extended access and reporting tools
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                                <strong>Enterprise:</strong> custom integrations and dedicated support
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">4.2 Free Trial</h4>
                          <p>New users may be eligible for a 7-day free trial for select plans. After the trial period, access will automatically convert to a paid subscription unless canceled.</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">4.3 Payment Terms</h4>
                          <ul className="list-none space-y-1 ml-4">
                            <li className="flex items-start gap-2">
                              <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Subscriptions are billed monthly or yearly, depending on your selection.
                            </li>
                            <li className="flex items-start gap-2">
                              <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Payments are processed via secure payment providers.
                            </li>
                            <li className="flex items-start gap-2">
                              <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Your subscription will automatically renew unless canceled at least 24 hours before the renewal date.
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">4.4 Refund Policy</h4>
                          <p className="mb-2">Refunds are generally not provided after a payment is processed.</p>
                          <p className="mb-2">However, exceptions may be made in the case of:</p>
                          <ul className="list-none space-y-1 ml-4 mb-3">
                            <li className="flex items-start gap-2">
                              <svg className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                              </svg>
                              System errors or failed access
                            </li>
                            <li className="flex items-start gap-2">
                              <svg className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                              </svg>
                              Duplicate payments
                            </li>
                            <li className="flex items-start gap-2">
                              <svg className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                              </svg>
                              Cancelation during the trial period (prior to conversion)
                            </li>
                          </ul>
                          <p className="text-sm text-gray-600">Requests for refund must be submitted in writing to <span className="text-blue-600 font-medium">support@yourdomain.com</span>.</p>
                        </div>
                      </div>
                    </section>
                    
                    <section className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">5</span>
                        Use of Platform
                      </h3>
                      <p className="mb-3">You agree to:</p>
                      <ul className="list-none space-y-2 ml-4">
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Use the Platform for lawful business purposes only.
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Not misuse, interfere with, or reverse-engineer any part of the system.
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Not upload harmful, offensive, or unauthorized content.
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Comply with all applicable intellectual property and copyright laws.
                        </li>
                      </ul>
                    </section>
                    
                    <section className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">6</span>
                        Content and Data Ownership
                      </h3>
                      <ul className="list-none space-y-2 ml-4">
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          You retain full ownership of the content, product information, and business data uploaded to the platform.
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          We require limited rights to host, process, and display your content solely for operational purposes.
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          You are responsible for ensuring the legality and accuracy of your data.
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                          Although we implement backup and security measures, we are not liable for any data loss. You are encouraged to maintain your own records.
                        </li>
                      </ul>
                    </section>
                    
                    <section className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">7</span>
                        Privacy & Data Protection
                      </h3>
                      <ul className="list-none space-y-2 ml-4">
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Use of the platform is subject to our <span className="text-blue-600 font-medium">Privacy Policy</span>.
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          We collect only essential business and user data to provide and improve our services.
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          We comply with applicable data privacy laws, including the Data Privacy Act of 2012 (Philippines).
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          We do not sell or share your personal information with third parties without your consent, except as required by law.
                        </li>
                      </ul>
                    </section>
                    
                    <section className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">8</span>
                        Termination of Access
                      </h3>
                      <p className="mb-3">We reserve the right to suspend or terminate your access to the Platform:</p>
                      <ul className="list-none space-y-2 ml-4 mb-3">
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                          If you breach these Terms
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                          If payment is not received on time
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                          If your usage poses security risks or violates applicable laws
                        </li>
                      </ul>
                      <p>You may cancel your subscription anytime through your account dashboard. Access will remain active until the end of your billing period.</p>
                    </section>
                    
                    <section className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">9</span>
                        Limitation of Liability
                      </h3>
                      <p className="mb-3">To the maximum extent permitted by law:</p>
                      <ul className="list-none space-y-2 ml-4">
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                          We make no guarantees regarding uninterrupted access or error-free operation.
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                          We are not liable for any indirect, incidental, special, or consequential damages.
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                          Our total liability to you for any claim will not exceed the total amount paid in the last 12 months.
                        </li>
                      </ul>
                    </section>
                    
                    <section className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">10</span>
                        Modifications to Terms
                      </h3>
                      <p>We may update these Terms from time to time to reflect changes in legal, technical, or business requirements. If we do, you will be notified via email or in-app notification. Continued use of the platform after the effective date of changes constitutes acceptance.</p>
                    </section>
                    
                    <section className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">11</span>
                        Governing Law
                      </h3>
                      <p>These Terms and any disputes arising out of or related to them shall be governed by the laws of the Republic of the Philippines, without regard to its conflict of laws rules.</p>
                    </section>
                    
                    <section className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-200 shadow-sm">
                      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">12</span>
                        Contact Information
                      </h3>
                      <p className="mb-4">For questions, concerns, or refund requests, please contact:</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span className="font-medium text-blue-600">support@yourdomain.com</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span className="font-medium text-gray-700">[Insert Company Address]</span>
                        </div>
                      </div>
                    </section>
                  </div>
                </DialogContent>
              </Dialog>
            </label>
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0 shadow-md hover:from-cyan-600 hover:to-blue-600 transition-colors"
            style={{ backgroundImage: undefined }}
          >
            Register
          </Button>
          <div className="flex items-center my-4">
            <Separator.Root className="flex-grow h-px bg-gray-300" orientation="horizontal" />
            <span className="mx-3 text-gray-500 font-medium">or</span>
            <Separator.Root className="flex-grow h-px bg-gray-300" orientation="horizontal" />
          </div>
          <div className="flex flex-row gap-3 w-full mt-2">
            <Button type="button" variant="outline" className="flex-1 flex items-center justify-center py-2 rounded-md">
              <Image src="/images/icons/image.png" alt="Google" width={20} height={20} />
            </Button>
            <Button type="button" variant="outline" className="flex-1 flex items-center justify-center py-2 rounded-md">
              <Image src="/images/icons/image copy.png" alt="Apple" width={20} height={20} />
            </Button>
            <Button type="button" variant="outline" className="flex-1 flex items-center justify-center py-2 rounded-md">
              <Image src="/images/icons/image copy 2.png" alt="Facebook" width={20} height={20} />
            </Button>
          </div>
          <div className="text-center mt-4 text-sm text-black">
            Already a vendor?{' '}
            <Link href="/user/login" className="text-blue-600 hover:underline font-semibold">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
