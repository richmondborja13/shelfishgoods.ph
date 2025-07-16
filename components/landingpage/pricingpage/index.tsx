'use client';

import React, { useState } from 'react';
import { CheckCircle, XCircle, Users, BarChart2, Zap, Star, UserPlus, Layers, TrendingUp, Headset, Shield, ShoppingCart, Package, Link2, CreditCard, Smartphone, Wrench, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/landingpage/Footer';
import { useSearchParams } from 'next/navigation';

const categories = [
  { label: 'Store Management', icon: ShoppingCart },
  { label: 'Inventory Tools', icon: Package },
  { label: 'Team Collaboration', icon: Users },
  { label: 'Analytics & Reports', icon: BarChart2 },
  { label: 'Integrations', icon: Link2 },
  { label: 'Payments & Billing', icon: CreditCard },
  { label: 'Mobile Access', icon: Smartphone },
  { label: 'Add-ons & Extras', icon: Wrench },
];

const categoriesTop = categories.slice(0, 4);
const categoriesBottom = categories.slice(4, 8);

// these are the plans by category
const plansByCategory: { [key: string]: any[] } = {
  'Store Management': [
    {
      name: 'Starter',
      price: 1000,
      priceYearly: 800,
      description: 'For individuals just starting',
      features: [
        { label: 'Product Management (up to 50)', included: true },
        { label: 'Team Access', included: false },
        { label: 'Barcode Generator', included: false },
        { label: 'Advanced Reports', included: false },
        { label: 'Priority Support', included: false },
      ],
      cta: 'Get Started',
      ctaLink: '/user/registration',
      highlight: false,
    },
    {
      name: 'Growth',
      price: 2900,
      priceYearly: 2300,
      description: 'For growing stores managing more products',
      features: [
        { label: 'Product Management (500)', included: true },
        { label: 'Team Access (3 members)', included: true },
        { label: 'Barcode Generator', included: true },
        { label: 'Sales Reports', included: true },
        { label: 'Priority Support', included: true },
      ],
      cta: 'Start 7-Day Trial',
      ctaLink: '/user/registration',
      highlight: true,
      badge: 'Most Popular',
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      priceYearly: 'Custom',
      description: 'For high-volume vendors needing full customization',
      features: [
        { label: 'Unlimited Products', included: true },
        { label: 'Unlimited Team Access', included: true },
        { label: 'Smart Inventory Tools', included: true },
        { label: 'Custom Reports & Insights', included: true },
        { label: 'Dedicated Account Manager', included: true },
      ],
      cta: 'Contact Sales',
      ctaLink: '/contact',
      highlight: false,
    },
  ],
  'Inventory Tools': [
    {
      name: 'Basic',
      price: 1200,
      priceYearly: 1000,
      description: 'Essential inventory features',
      features: [
        { label: 'Stock Tracking', included: true },
        { label: 'Low Stock Alerts', included: true },
        { label: 'Barcode Scanning', included: false },
        { label: 'Batch Import/Export', included: false },
      ],
      cta: 'Get Started',
      ctaLink: '/user/registration',
      highlight: false,
    },
    {
      name: 'Pro',
      price: 2500,
      priceYearly: 2000,
      description: 'Advanced inventory management',
      features: [
        { label: 'Stock Tracking', included: true },
        { label: 'Low Stock Alerts', included: true },
        { label: 'Barcode Scanning', included: true },
        { label: 'Batch Import/Export', included: true },
      ],
      cta: 'Start 7-Day Trial',
      ctaLink: '/user/registration',
      highlight: true,
      badge: 'Most Popular',
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      priceYearly: 'Custom',
      description: 'Custom inventory solutions',
      features: [
        { label: 'All Pro Features', included: true },
        { label: 'Custom Integrations', included: true },
        { label: 'Dedicated Support', included: true },
      ],
      cta: 'Contact Sales',
      ctaLink: '/contact',
      highlight: false,
    },
  ],
  'Team Collaboration': [
    {
      name: 'Basic',
      price: 1500,
      priceYearly: 1200,
      description: 'For small teams',
      features: [
        { label: 'Up to 3 Users', included: true },
        { label: 'Shared Calendar', included: true },
        { label: 'Role Permissions', included: false },
      ],
      cta: 'Get Started',
      ctaLink: '/user/registration',
      highlight: false,
    },
    {
      name: 'Pro',
      price: 3200,
      priceYearly: 2500,
      description: 'For growing teams',
      features: [
        { label: 'Up to 10 Users', included: true },
        { label: 'Shared Calendar', included: true },
        { label: 'Role Permissions', included: true },
      ],
      cta: 'Start 7-Day Trial',
      ctaLink: '/user/registration',
      highlight: true,
      badge: 'Most Popular',
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      priceYearly: 'Custom',
      description: 'Unlimited team access',
      features: [
        { label: 'Unlimited Users', included: true },
        { label: 'Custom Workflows', included: true },
        { label: 'Dedicated Account Manager', included: true },
      ],
      cta: 'Contact Sales',
      ctaLink: '/contact',
      highlight: false,
    },
  ],
  'Analytics & Reports': [
    {
      name: 'Basic',
      price: 1800,
      priceYearly: 1500,
      description: 'Essential analytics',
      features: [
        { label: 'Sales Dashboard', included: true },
        { label: 'Basic Reports', included: true },
        { label: 'Export Data', included: false },
      ],
      cta: 'Get Started',
      ctaLink: '/user/registration',
      highlight: false,
    },
    {
      name: 'Pro',
      price: 3500,
      priceYearly: 2800,
      description: 'Advanced analytics',
      features: [
        { label: 'Sales Dashboard', included: true },
        { label: 'Advanced Reports', included: true },
        { label: 'Export Data', included: true },
      ],
      cta: 'Start 7-Day Trial',
      ctaLink: '/user/registration',
      highlight: true,
      badge: 'Most Popular',
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      priceYearly: 'Custom',
      description: 'Custom analytics solutions',
      features: [
        { label: 'All Pro Features', included: true },
        { label: 'Custom Dashboards', included: true },
        { label: 'Dedicated Analyst', included: true },
      ],
      cta: 'Contact Sales',
      ctaLink: '/contact',
      highlight: false,
    },
  ],
  'Integrations': [
    {
      name: 'Basic',
      price: 1200,
      priceYearly: 1000,
      description: 'Connect popular apps',
      features: [
        { label: 'Zapier Integration', included: true },
        { label: 'Shopify Sync', included: false },
      ],
      cta: 'Get Started',
      ctaLink: '/user/registration',
      highlight: false,
    },
    {
      name: 'Pro',
      price: 2500,
      priceYearly: 2000,
      description: 'More integrations',
      features: [
        { label: 'Zapier Integration', included: true },
        { label: 'Shopify Sync', included: true },
      ],
      cta: 'Start 7-Day Trial',
      ctaLink: '/user/registration',
      highlight: true,
      badge: 'Most Popular',
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      priceYearly: 'Custom',
      description: 'Custom integrations',
      features: [
        { label: 'All Pro Features', included: true },
        { label: 'API Access', included: true },
        { label: 'Dedicated Support', included: true },
      ],
      cta: 'Contact Sales',
      ctaLink: '/contact',
      highlight: false,
    },
  ],
  'Payments & Billing': [
    {
      name: 'Basic',
      price: 2000,
      priceYearly: 1600,
      description: 'Essential payment tools',
      features: [
        { label: 'Credit Card Processing', included: true },
        { label: 'GCash/PayPal', included: true },
        { label: 'Invoicing', included: false },
      ],
      cta: 'Get Started',
      ctaLink: '/user/registration',
      highlight: false,
    },
    {
      name: 'Pro',
      price: 4000,
      priceYearly: 3200,
      description: 'Advanced billing',
      features: [
        { label: 'Credit Card Processing', included: true },
        { label: 'GCash/PayPal', included: true },
        { label: 'Invoicing', included: true },
      ],
      cta: 'Start 7-Day Trial',
      ctaLink: '/user/registration',
      highlight: true,
      badge: 'Most Popular',
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      priceYearly: 'Custom',
      description: 'Custom payment solutions',
      features: [
        { label: 'All Pro Features', included: true },
        { label: 'Custom Payment Gateways', included: true },
        { label: 'Dedicated Support', included: true },
      ],
      cta: 'Contact Sales',
      ctaLink: '/contact',
      highlight: false,
    },
  ],
  'Mobile Access': [
    {
      name: 'Basic',
      price: 1000,
      priceYearly: 800,
      description: 'Mobile dashboard',
      features: [
        { label: 'iOS/Android App', included: true },
        { label: 'Push Notifications', included: false },
      ],
      cta: 'Get Started',
      ctaLink: '/user/registration',
      highlight: false,
    },
    {
      name: 'Pro',
      price: 2200,
      priceYearly: 1800,
      description: 'Full mobile access',
      features: [
        { label: 'iOS/Android App', included: true },
        { label: 'Push Notifications', included: true },
      ],
      cta: 'Start 7-Day Trial',
      ctaLink: '/user/registration',
      highlight: true,
      badge: 'Most Popular',
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      priceYearly: 'Custom',
      description: 'Custom mobile solutions',
      features: [
        { label: 'All Pro Features', included: true },
        { label: 'Custom App Integrations', included: true },
        { label: 'Dedicated Support', included: true },
      ],
      cta: 'Contact Sales',
      ctaLink: '/contact',
      highlight: false,
    },
  ],
  'Add-ons & Extras': [
    {
      name: 'Basic',
      price: 1000,
      priceYearly: 800,
      description: 'Optional add-ons',
      features: [
        { label: 'Custom Domain', included: true },
        { label: 'Email Support', included: false },
      ],
      cta: 'Get Started',
      ctaLink: '/user/registration',
      highlight: false,
    },
    {
      name: 'Pro',
      price: 1800,
      priceYearly: 1500,
      description: 'More add-ons',
      features: [
        { label: 'Custom Domain', included: true },
        { label: 'Email Support', included: true },
      ],
      cta: 'Start 7-Day Trial',
      ctaLink: '/user/registration',
      highlight: true,
      badge: 'Most Popular',
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      priceYearly: 'Custom',
      description: 'Custom add-on solutions',
      features: [
        { label: 'All Pro Features', included: true },
        { label: 'Dedicated Support', included: true },
      ],
      cta: 'Contact Sales',
      ctaLink: '/contact',
      highlight: false,
    },
  ],
};

// these are the features by category
const featuresByCategory: { [key: string]: any[] } = {
  'Store Management': [
    { feature: 'Product Listings', starter: 'Up to 50', growth: '500', enterprise: 'Unlimited' },
    { feature: 'Orders per Month', starter: '100', growth: '1,000', enterprise: 'Unlimited' },
    { feature: 'Inventory Sync', starter: true, growth: true, enterprise: true },
    { feature: 'Team Access', starter: false, growth: '3 users', enterprise: 'Unlimited' },
    { feature: 'Sales Reports', starter: false, growth: 'Basic', enterprise: 'Custom' },
    { feature: 'API Access', starter: false, growth: true, enterprise: true },
    { feature: 'Support', starter: 'Standard', growth: 'Priority', enterprise: 'Dedicated' },
    { feature: 'Bulk Product Import', starter: false, growth: true, enterprise: true },
    { feature: 'Custom Storefront', starter: false, growth: false, enterprise: true },
    { feature: 'Automated Order Routing', starter: false, growth: false, enterprise: true },
    { feature: 'Order Notifications', starter: true, growth: true, enterprise: true },
    { feature: 'Store Analytics', starter: false, growth: true, enterprise: true },
    { feature: 'Multi-location Support', starter: false, growth: false, enterprise: true },
  ],
  'Inventory Tools': [
    { feature: 'Stock Tracking', starter: true, growth: true, enterprise: true },
    { feature: 'Low Stock Alerts', starter: true, growth: true, enterprise: true },
    { feature: 'Barcode Scanning', starter: false, growth: true, enterprise: true },
    { feature: 'Batch Import/Export', starter: false, growth: true, enterprise: true },
    { feature: 'Custom Integrations', starter: false, growth: false, enterprise: true },
    { feature: 'Multi-warehouse Support', starter: false, growth: true, enterprise: true },
    { feature: 'Inventory Forecasting', starter: false, growth: false, enterprise: true },
    { feature: 'Supplier Management', starter: false, growth: false, enterprise: true },
    { feature: 'Stock Movement History', starter: false, growth: true, enterprise: true },
    { feature: 'Automated Reordering', starter: false, growth: false, enterprise: true },
    { feature: 'SKU Management', starter: true, growth: true, enterprise: true },
    { feature: 'Support', starter: 'Standard', growth: 'Priority', enterprise: 'Dedicated' },
  ],
  'Team Collaboration': [
    { feature: 'Users', starter: '3', growth: '10', enterprise: 'Unlimited' },
    { feature: 'Shared Calendar', starter: true, growth: true, enterprise: true },
    { feature: 'Role Permissions', starter: false, growth: true, enterprise: true },
    { feature: 'Custom Workflows', starter: false, growth: false, enterprise: true },
    { feature: 'Task Assignments', starter: false, growth: true, enterprise: true },
    { feature: 'Internal Chat', starter: false, growth: true, enterprise: true },
    { feature: 'Activity Logs', starter: false, growth: true, enterprise: true },
    { feature: 'Document Sharing', starter: false, growth: true, enterprise: true },
    { feature: 'Team Notifications', starter: true, growth: true, enterprise: true },
    { feature: 'Onboarding Tools', starter: false, growth: false, enterprise: true },
    { feature: 'Support', starter: 'Standard', growth: 'Priority', enterprise: 'Dedicated' },
  ],
  'Analytics & Reports': [
    { feature: 'Sales Dashboard', starter: true, growth: true, enterprise: true },
    { feature: 'Basic Reports', starter: true, growth: false, enterprise: false },
    { feature: 'Advanced Reports', starter: false, growth: true, enterprise: true },
    { feature: 'Export Data', starter: false, growth: true, enterprise: true },
    { feature: 'Custom Dashboards', starter: false, growth: false, enterprise: true },
    { feature: 'Real-time Analytics', starter: false, growth: true, enterprise: true },
    { feature: 'Product Performance', starter: false, growth: true, enterprise: true },
    { feature: 'Customer Insights', starter: false, growth: true, enterprise: true },
    { feature: 'Scheduled Reports', starter: false, growth: false, enterprise: true },
    { feature: 'KPI Tracking', starter: false, growth: true, enterprise: true },
    { feature: 'Support', starter: 'Standard', growth: 'Priority', enterprise: 'Dedicated' },
  ],
  'Integrations': [
    { feature: 'Zapier Integration', starter: true, growth: true, enterprise: true },
    { feature: 'Shopify Sync', starter: false, growth: true, enterprise: true },
    { feature: 'API Access', starter: false, growth: false, enterprise: true },
    { feature: 'Custom Integrations', starter: false, growth: false, enterprise: true },
    { feature: 'POS Integration', starter: false, growth: true, enterprise: true },
    { feature: 'Accounting Software', starter: false, growth: true, enterprise: true },
    { feature: 'Shipping Providers', starter: false, growth: true, enterprise: true },
    { feature: 'CRM Integration', starter: false, growth: false, enterprise: true },
    { feature: 'Webhook Support', starter: false, growth: true, enterprise: true },
    { feature: 'Support', starter: 'Standard', growth: 'Priority', enterprise: 'Dedicated' },
  ],
  'Payments & Billing': [
    { feature: 'Credit Card Processing', starter: true, growth: true, enterprise: true },
    { feature: 'GCash/PayPal', starter: true, growth: true, enterprise: true },
    { feature: 'Invoicing', starter: false, growth: true, enterprise: true },
    { feature: 'Custom Payment Gateways', starter: false, growth: false, enterprise: true },
    { feature: 'Recurring Billing', starter: false, growth: true, enterprise: true },
    { feature: 'Multi-currency Support', starter: false, growth: true, enterprise: true },
    { feature: 'Tax Calculation', starter: false, growth: true, enterprise: true },
    { feature: 'Refund Management', starter: false, growth: true, enterprise: true },
    { feature: 'Payment Analytics', starter: false, growth: true, enterprise: true },
    { feature: 'Support', starter: 'Standard', growth: 'Priority', enterprise: 'Dedicated' },
  ],
  'Mobile Access': [
    { feature: 'iOS/Android App', starter: true, growth: true, enterprise: true },
    { feature: 'Push Notifications', starter: false, growth: true, enterprise: true },
    { feature: 'Custom App Integrations', starter: false, growth: false, enterprise: true },
    { feature: 'Mobile Analytics', starter: false, growth: true, enterprise: true },
    { feature: 'Offline Mode', starter: false, growth: false, enterprise: true },
    { feature: 'QR Code Scanning', starter: false, growth: true, enterprise: true },
    { feature: 'Mobile Payments', starter: false, growth: true, enterprise: true },
    { feature: 'Device Management', starter: false, growth: false, enterprise: true },
    { feature: 'Support', starter: 'Standard', growth: 'Priority', enterprise: 'Dedicated' },
  ],
  'Add-ons & Extras': [
    { feature: 'Custom Domain', starter: true, growth: true, enterprise: true },
    { feature: 'Email Support', starter: false, growth: true, enterprise: true },
    { feature: 'Dedicated Support', starter: false, growth: false, enterprise: true },
    { feature: 'White-labeling', starter: false, growth: false, enterprise: true },
    { feature: 'Custom Branding', starter: false, growth: true, enterprise: true },
    { feature: 'Priority Onboarding', starter: false, growth: false, enterprise: true },
    { feature: 'Training Sessions', starter: false, growth: true, enterprise: true },
    { feature: 'Beta Features Access', starter: false, growth: false, enterprise: true },
    { feature: 'Support', starter: 'Standard', growth: 'Priority', enterprise: 'Dedicated' },
  ],
};

const PricingPage = () => {
  const searchParams = useSearchParams();
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedCategory, setSelectedCategory] = useState(categories[0].label);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const categoriesRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const category = searchParams.get('category');
    if (category === 'mobile-app-access') {
      setSelectedCategory('Mobile Access');
    } else if (category === 'add-ons-extras') {
      setSelectedCategory('Add-ons & Extras');
    } else if (category === 'payments-billing') {
      setSelectedCategory('Payments & Billing');
    }
  }, [searchParams]);

  const plans = plansByCategory[selectedCategory] || [];
  const featuresTable = featuresByCategory[selectedCategory] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex flex-col items-center pt-24">
      <section className="w-full py-16 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3 text-center">Flexible Plans for Every Vendor</h1>
        <p className="text-lg text-gray-700 mb-8 text-center max-w-xl">From small sellers to enterprise partners—choose a plan that grows with your store.</p>
        <div className="flex items-center justify-center gap-4 bg-white rounded-full shadow px-2 py-1 mb-2">
          <button
            className={`px-5 py-2 rounded-full font-semibold transition-all text-sm ${billing === 'monthly' ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setBilling('monthly')}
          >
            Monthly
          </button>
          <button
            className={`px-5 py-2 rounded-full font-semibold transition-all text-sm flex items-center gap-2 ${billing === 'yearly' ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setBilling('yearly')}
          >
            Yearly <span className="ml-1 text-xs font-bold bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded-full">Save 15%</span>
          </button>
        </div>
      </section>

      <div className="w-full flex flex-col items-center mb-16 gap-3">
        <div className="relative w-full max-w-6xl">
          {/* Left Arrow Indicator */}
          {showLeftArrow && (
            <div className="absolute left-[-32px] top-1/2 -translate-y-1/2 -translate-x-full z-20 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg border border-gray-200">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </div>
          )}
          {/* Right Arrow Indicator */}
          {showRightArrow && (
            <div className="absolute right-[-32px] top-1/2 -translate-y-1/2 translate-x-full z-20 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg border border-gray-200">
              <ArrowRight className="w-5 h-5 text-gray-600" />
            </div>
          )}
          
          <div
            ref={categoriesRef}
            className="flex gap-4 px-4 pb-1 overflow-x-auto whitespace-nowrap cursor-grab active:cursor-grabbing select-none max-w-6xl [&::-webkit-scrollbar]:hidden"
            style={{ 
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
            onMouseDown={e => {
              setIsDragging(true);
              setStartX(e.pageX - (categoriesRef.current?.offsetLeft || 0));
              setScrollLeft(categoriesRef.current?.scrollLeft || 0);
            }}
            onMouseLeave={() => setIsDragging(false)}
            onMouseUp={() => setIsDragging(false)}
            onMouseMove={e => {
              if (!isDragging) return;
              e.preventDefault();
              if (categoriesRef.current) {
                const x = e.pageX - (categoriesRef.current.offsetLeft || 0);
                const walk = (x - startX) * 1.5; // scroll-fast
                categoriesRef.current.scrollLeft = scrollLeft - walk;
              }
            }}
            onTouchStart={e => {
              setIsDragging(true);
              setStartX(e.touches[0].pageX - (categoriesRef.current?.offsetLeft || 0));
              setScrollLeft(categoriesRef.current?.scrollLeft || 0);
            }}
            onTouchEnd={() => setIsDragging(false)}
            onTouchMove={e => {
              if (!isDragging) return;
              if (categoriesRef.current) {
                const x = e.touches[0].pageX - (categoriesRef.current.offsetLeft || 0);
                const walk = (x - startX) * 1.5;
                categoriesRef.current.scrollLeft = scrollLeft - walk;
              }
            }}
            onScroll={() => {
              if (categoriesRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = categoriesRef.current;
                setShowLeftArrow(scrollLeft > 0);
                setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
              }
            }}
          >
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.label}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-base whitespace-nowrap shadow-sm border transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 ${selectedCategory === cat.label ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-blue-400' : 'bg-blue-50 hover:bg-cyan-100 text-gray-900 border-blue-100'}`}
                  onClick={() => setSelectedCategory(cat.label)}
                  type="button"
                >
                  <Icon className="w-5 h-5" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <section className="w-full max-w-6xl px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {plans.map((plan: any, idx: number) => (
          <div
            key={plan.name}
            className={`relative flex flex-col rounded-2xl shadow-xl border border-gray-100 bg-white p-8 pt-10 transition-transform hover:-translate-y-1 ${plan.highlight ? 'ring-2 ring-cyan-400 z-10' : ''}`}
          >
            {plan.badge && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow">{plan.badge}</span>
            )}
            <h2 className="text-2xl font-bold mb-2 text-gray-900 text-center flex items-center justify-center gap-2">
              {plan.name}
              {plan.name === 'Growth' && <Star className="w-5 h-5 text-yellow-400" />}
            </h2>
            <div className="text-4xl font-extrabold text-blue-700 text-center mb-1">
              {typeof plan.price === 'number'
                ? (
                  billing === 'monthly'
                    ? `₱${plan.price.toLocaleString()}/mo`
                    : `₱${plan.priceYearly.toLocaleString()}/mo`
                )
                : 'Custom'}
            </div>
            <div className="text-gray-500 text-center mb-4">{plan.description}</div>
            <ul className="mb-8 space-y-2">
              {featuresTable.map((feature: any, i: number) => {
                let value;
                if (plan.name === 'Starter' || plan.name === 'Basic') value = feature.starter;
                else if (plan.name === 'Growth' || plan.name === 'Pro') value = feature.growth;
                else value = feature.enterprise;
                return (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    {typeof value === 'boolean' ? (
                      <>
                        {value ? <CheckCircle className="w-4 h-4 text-cyan-600" /> : <XCircle className="w-4 h-4 text-gray-300" />}
                        <span className={value ? 'text-gray-800' : 'text-gray-400 line-through'}>{feature.feature}</span>
                      </>
                    ) : (
                      <span className="font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        {value} {feature.feature}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
            <Link
              href={plan.ctaLink}
              className={`inline-block w-full py-3 rounded-lg font-bold text-center transition-all text-white ${plan.highlight ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg' : 'bg-blue-500 hover:bg-cyan-600'}`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </section>

      {/* Features Comparison Table */}
      <section className="w-full max-w-5xl px-2 mb-20">
        <div className="overflow-x-auto rounded-2xl shadow border border-gray-100 bg-white">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="bg-gradient-to-r from-blue-50 to-cyan-50">
                <th className="py-4 px-4 font-bold text-gray-700">Feature</th>
                <th className="py-4 px-4 font-bold text-blue-700 text-center">Starter</th>
                <th className="py-4 px-4 font-bold text-blue-700 text-center">Growth</th>
                <th className="py-4 px-4 font-bold text-blue-700 text-center">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {featuresTable.map((row: any, idx: number) => (
                <tr key={row.feature} className={idx % 2 === 0 ? 'bg-white' : 'bg-blue-50/50'}>
                  <td className="py-3 px-4 font-medium text-gray-800">{row.feature}</td>
                  <td className="py-3 px-4 text-center">
                    {typeof row.starter === 'boolean'
                      ? row.starter
                        ? <CheckCircle className="w-5 h-5 mx-auto text-cyan-600" />
                        : <XCircle className="w-5 h-5 mx-auto text-gray-300" />
                      : <span className="font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{row.starter}</span>}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {typeof row.growth === 'boolean'
                      ? row.growth
                        ? <CheckCircle className="w-5 h-5 mx-auto text-cyan-600" />
                        : <XCircle className="w-5 h-5 mx-auto text-gray-300" />
                      : <span className="font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{row.growth}</span>}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {typeof row.enterprise === 'boolean'
                      ? row.enterprise
                        ? <CheckCircle className="w-5 h-5 mx-auto text-cyan-600" />
                        : <XCircle className="w-5 h-5 mx-auto text-gray-300" />
                      : <span className="font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{row.enterprise}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="w-full flex flex-col items-center py-16 bg-gradient-to-r from-blue-600 to-cyan-600">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2 text-center">Ready to Partner With Us?</h2>
        <p className="text-lg text-cyan-100 mb-8 text-center">Start managing your store efficiently with our all-in-one system.</p>
        <div className="flex flex-col md:flex-row gap-4">
          <Link
            href="/registration"
            className="px-8 py-4 rounded-lg font-bold bg-white text-blue-700 hover:bg-cyan-50 shadow text-lg transition-all text-center"
          >
            Join as a Vendor
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 rounded-lg font-bold bg-cyan-100 text-cyan-800 hover:bg-white shadow text-lg transition-all text-center"
          >
            Contact Sales
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PricingPage; 