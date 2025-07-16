'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';

const testimonials = [
  {
    name: 'Ian Cramer',
    role: 'Operations Manager',
    company: 'TechCorp Inc.',
    content: 'Shelf-ish Goods has completely transformed how we manage our vendors. The platform is intuitive and the support team is incredibly responsive.',
    rating: 5,
    avatar: '/images/testimonials/ian-cramer.jpeg',
    achievement: '40% faster order processing'
  },
  {
    name: 'Michael Chen',
    role: 'CEO',
    company: 'Retail Solutions',
    content: "We've seen a 40% reduction in order processing time since implementing Shelf-ish Goods. The ROI was immediate and continues to grow.",
    rating: 5,
    avatar: '/images/testimonials/michael-chen.jpeg',
    achievement: '60% cost reduction'
  },
  {
    name: 'John Doe',
    role: 'Procurement Director',
    company: 'Global Retail',
    content: "The analytics and reporting features have given us insights we never had before. It's like having a crystal ball for our supply chain.",
    rating: 5,
    avatar: '/images/testimonials/john-doe.jpeg',
    achievement: 'Real-time insights'
  },
  {
    name: 'David Lee',
    role: 'Supply Chain Lead',
    company: 'LogiPro',
    content: 'Implementation was seamless and the results were immediate. Highly recommended for any growing business.',
    rating: 5,
    avatar: '/images/testimonials/david-lee.jpeg',
    achievement: 'Seamless integration'
  },  
  {
    name: 'Priya Patel',
    role: 'VP of Operations',
    company: 'MarketMakers',
    content: 'The automation features have saved us countless hours each month. Our team is more productive than ever.',
    rating: 5,
    avatar: '/images/testimonials/priya-patel.png',
    achievement: '80% time savings'
  },
  {
    name: 'Carlos Rivera',
    role: 'Warehouse Manager',
    company: 'DistribuTech',
    content: 'Inventory errors are a thing of the past. Shelf-ish Goods is a game changer!',
    rating: 5,
    avatar: '/images/testimonials/carlos-rivera.jpeg',
    achievement: 'Zero inventory errors'
  },
  {
    name: 'Anna Lee',
    role: 'Founder',
    company: 'EcoGoods',
    content: 'We love the reporting and analytics. It helps us make smarter decisions every day.',
    rating: 5,
    avatar: '/images/testimonials/anna-lee.jpeg',
    achievement: 'Data-driven decisions'
  },
];

function getCardsPerView() {
  if (typeof window === 'undefined') return 1;
  if (window.innerWidth >= 1024) return 3; // lg+
  if (window.innerWidth >= 640) return 2; // sm+ (tablet)
  return 1; // mobile
}

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
    function handleResize() {
      setCardsPerView(getCardsPerView());
    }
    setCardsPerView(getCardsPerView());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + cardsPerView) % testimonials.length);
        setAnimating(false);
      }, 400);
    }, 7000);
    return () => clearInterval(interval);
  }, [cardsPerView, mounted, testimonials.length]);

  if (!mounted) {
    return <section id="testimonials" className="py-24 bg-gradient-to-br from-gray-50 to-white" />;
  }

  const numRounds = Math.ceil(testimonials.length / cardsPerView);
  const currentRound = Math.floor(current / cardsPerView);

  const visibleTestimonials = [];
  for (let i = 0; i < cardsPerView; i++) {
    visibleTestimonials.push(testimonials[(current + i) % testimonials.length]);
  }

  const nextSlide = () => {
    setAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + cardsPerView) % testimonials.length);
      setAnimating(false);
    }, 400);
  };

  const prevSlide = () => {
    setAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev - cardsPerView + testimonials.length) % testimonials.length);
      setAnimating(false);
    }, 400);
  };

  return (
    <Tooltip.Provider>
      <section id="testimonials" className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Trusted by
              <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Industry Leaders
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Don't just take our word for it - hear from our satisfied customers who have transformed their operations.
            </p>
          </motion.div>

          {/* Testimonials Container */}
          <div className="relative">
            {/* Navigation Buttons - Outside the cards */}
            <button
              onClick={prevSlide}
              className="absolute -left-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-xl transition-all duration-200 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute -right-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-xl transition-all duration-200 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Testimonials Grid */}
            <div
              className={`grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-400 ${
                animating ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
              }`}
              style={{ willChange: 'transform, opacity' }}
            >
              {visibleTestimonials.map((testimonial, index) => (
                <motion.div 
                  key={index} 
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 flex flex-col h-full justify-between border border-gray-100 hover:border-blue-200 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div>
                    {/* Quote Icon */}
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Quote className="w-6 h-6 text-white" />
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-gray-600 mb-6 italic leading-relaxed">"{testimonial.content}"</p>

                    {/* Achievement Badge with Tooltip */}
                    <Tooltip.Root delayDuration={300}>
                      <Tooltip.Trigger asChild>
                        <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-full text-sm font-medium text-green-700 mb-6 cursor-help hover:from-green-100 hover:to-blue-100 transition-colors duration-200">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          {testimonial.achievement}
                        </div>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content
                          className="z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                          sideOffset={8}
                        >
                          <p>Customer achievement with Shelf-ish Goods</p>
                          <Tooltip.Arrow className="fill-popover" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </div>

                  {/* Author */}
                  <div className="flex items-center mt-auto pt-6 border-t border-gray-100">
                    {testimonial.avatar ? (
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="h-12 w-12 rounded-full object-cover bg-gray-200 border-2 border-gray-100"
                      />
                    ) : (
                      <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">{testimonial.name.charAt(0)}</span>
                      </div>
                    )}
                    <div className="ml-4">
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role} at {testimonial.company}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Indicator dots */}
            <div className="flex justify-center mt-12 space-x-3">
              {Array.from({ length: numRounds }).map((_, idx) => (
                <button
                  key={idx}
                  className={`w-3 h-3 rounded-full border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    idx === currentRound 
                      ? 'bg-blue-600 border-blue-600' 
                      : 'bg-white border-gray-300 hover:border-blue-400'
                  }`}
                  aria-label={`Show testimonials set ${idx + 1}`}
                  onClick={() => {
                    setCurrent(idx * cardsPerView);
                    setAnimating(true);
                    setTimeout(() => setAnimating(false), 400);
                  }}
                />
              ))}
            </div>
            {/* Read more client stories button */}
            <div className="flex justify-center mt-8">
              <button
                className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-white"
                type="button"
              >
                Read more client stories.
              </button>
            </div>
          </div>
        </div>
      </section>
    </Tooltip.Provider>
  );
} 