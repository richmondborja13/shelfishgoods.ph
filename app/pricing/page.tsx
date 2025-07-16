'use client';
export const dynamic = "force-dynamic";
import PricingNav from '@/components/landingpage/pricingpage/pricing-nav';
import Pricing from '@/components/landingpage/pricingpage/index';

export default function PricingPage() {
  return (
    <>
      <PricingNav />
      <Pricing />
    </>
  );
} 