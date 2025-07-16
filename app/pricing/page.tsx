"use client";
import React, { useState } from 'react';
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