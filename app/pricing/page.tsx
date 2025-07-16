import { Suspense } from 'react';
import PricingNav from '@/components/landingpage/pricingpage/pricing-nav';
import Pricing from '@/components/landingpage/pricingpage/index';

export default function PricingPage() {
  return (
    <>
      <PricingNav />
      <Suspense fallback={null}>
        <Pricing />
      </Suspense>
    </>
  );
} 