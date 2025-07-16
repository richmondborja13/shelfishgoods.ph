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

export default function Home() {
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