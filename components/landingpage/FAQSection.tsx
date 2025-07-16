'use client';

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export default function FAQSection() {
  // faq content on the faq section
  const faqs = [
    {
      question: 'How long does it take to set up Shelf-ish Goods?',
      answer: 'Most businesses can get up and running within 24-48 hours. Our onboarding team will guide you through the entire process, from initial setup to training your team.',
      icon: '⚡',
      category: 'Setup'
    },
    {
      question: 'Can I integrate with my existing systems?',
      answer: 'Yes! Shelf-ish Goods offers robust API integrations with popular ERP systems, accounting software, and e-commerce platforms. Our team can help you set up custom integrations if needed.',
      icon: '🔗',
      category: 'Integration'
    },
    {
      question: 'What kind of support do you provide?',
      answer: 'We offer comprehensive support including live chat, email support, phone support for Professional and Enterprise plans, and a comprehensive knowledge base with video tutorials.',
      icon: '🎧',
      category: 'Support'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use enterprise-grade security measures including SSL encryption, regular security audits, and compliance with industry standards like SOC 2 and GDPR.',
      icon: '🔒',
      category: 'Security'
    },
    {
      question: 'Can I upgrade or downgrade my plan?',
      answer: 'Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades take effect at the end of your current billing cycle.',
      icon: '📈',
      category: 'Billing'
    },
    {
      question: 'Do you offer a free trial?',
      answer: 'Yes! We offer a 14-day free trial with full access to all features. No credit card required to start your trial.',
      icon: '🎁',
      category: 'Trial'
    }
  ];

  return (
    <section id="faq" className="min-h-screen flex flex-col justify-center py-20 pt-24 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <span className="text-2xl">❓</span>
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            Got Questions?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about Shelf-ish Goods. Can't find the answer you're looking for? 
            <button 
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-blue-600 hover:text-blue-500 font-semibold ml-1 underline"
            >
              Contact our support team
            </button>
          </p>
        </div>

        <Accordion type="single" collapsible className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`} 
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <AccordionTrigger className="text-left px-6 py-6 hover:no-underline group">
                <div className="flex items-start space-x-4 w-full">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-lg">
                    {faq.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {faq.question}
                        </h3>
                        <span className="inline-block mt-2 px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {faq.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="pl-14">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-16 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h3>
            <p className="text-gray-600 mb-6">
              Our support team is here to help you get the most out of Shelf-ish Goods
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Contact Support
              </button>
              <button className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 