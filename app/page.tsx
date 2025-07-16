"use client";
import Navigation from '@/components/landingpage/Navigation';
import HeroSection from '@/components/landingpage/HeroSection';
import ServicesSection from '@/components/landingpage/ServicesSection';
import AboutSection from '@/components/landingpage/AboutSection';
import TestimonialsSection from '@/components/landingpage/TestimonialsSection';
// import CaseStudiesSection from '@/components/landingpage/CaseStudiesSection';
import PricingSection from '@/components/landingpage/PricingSection';
// import BlogSection from '@/components/landingpage/BlogSection';
import FAQSection from '@/components/landingpage/FAQSection';
import ContactSection from '@/components/landingpage/ContactSection';
import Footer from '@/components/landingpage/Footer';
import ExtraSection from '@/components/landingpage/extra/section';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams?.get('scrollTo') === 'contact') {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        setTimeout(() => {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [searchParams]);
  return (
    <>
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      {/* <CaseStudiesSection /> */}
      <PricingSection />
      {/* <BlogSection /> */}
      <ExtraSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </>
  );
}