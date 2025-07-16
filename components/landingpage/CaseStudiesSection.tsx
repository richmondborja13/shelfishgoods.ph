'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { TrendingUp, Users, DollarSign, Eye, ArrowRight } from 'lucide-react';

// mock contents on card on the case studies section
const caseStudies = [
  {
    id: 1,
    title: 'Retail Chain Optimization',
    company: 'FreshMart Groceries',
    industry: 'Retail',
    challenge: 'Managing inventory across 50+ locations with inconsistent tracking methods',
    solution: 'Implemented centralized inventory management system with real-time tracking',
    results: {
      efficiency: '40%',
      cost: '25%',
      revenue: '30%'
    },
    description: 'FreshMart Groceries was struggling with inventory management across their 50+ store locations. Each store was using different tracking methods, leading to stockouts, overstocking, and significant revenue loss.',
    fullContent: `FreshMart Groceries, a regional grocery chain with 50+ locations, was facing significant challenges with their inventory management system. Each store was operating independently with different tracking methods, leading to frequent stockouts, overstocking, and an estimated 15% revenue loss due to poor inventory control.

The Challenge:
- Inconsistent inventory tracking across 50+ locations
- Frequent stockouts affecting customer satisfaction
- Overstocking leading to waste and increased costs
- No centralized visibility into inventory levels
- Manual processes consuming significant staff time

The Solution:
We implemented a comprehensive inventory management system that provided:
- Centralized inventory tracking across all locations
- Real-time stock level monitoring
- Automated reorder points and purchase orders
- Advanced analytics and reporting
- Mobile app for on-the-go management

The Results:
- 40% improvement in inventory efficiency
- 25% reduction in inventory costs
- 30% increase in revenue through better stock management
- 60% reduction in stockout incidents
- 50% decrease in manual inventory tasks`
  },
  {
    id: 2,
    title: 'Manufacturing Supply Chain',
    company: 'TechCorp Industries',
    industry: 'Manufacturing',
    challenge: 'Complex supply chain with multiple vendors and long lead times',
    solution: 'Streamlined vendor management with automated ordering and tracking',
    results: {
      efficiency: '35%',
      cost: '20%',
      revenue: '25%'
    },
    description: 'TechCorp Industries needed to streamline their complex supply chain involving multiple vendors and long lead times that were affecting production schedules.',
    fullContent: `TechCorp Industries, a leading manufacturer of electronic components, was struggling with a complex supply chain involving over 200 vendors across multiple countries. Long lead times, inconsistent delivery schedules, and poor communication were causing production delays and increased costs.

The Challenge:
- Complex supply chain with 200+ vendors
- Inconsistent delivery schedules
- Poor communication with suppliers
- Long lead times affecting production
- Manual vendor management processes

The Solution:
We implemented a comprehensive vendor management system that included:
- Centralized vendor database with performance tracking
- Automated purchase order generation
- Real-time delivery tracking
- Supplier communication portal
- Performance analytics and reporting

The Results:
- 35% improvement in supply chain efficiency
- 20% reduction in procurement costs
- 25% increase in on-time deliveries
- 40% reduction in production delays
- 50% decrease in manual procurement tasks`
  },
  {
    id: 3,
    title: 'E-commerce Fulfillment',
    company: 'StyleHub Online',
    industry: 'E-commerce',
    challenge: 'Rapid growth overwhelming existing inventory and order management systems',
    solution: 'Scalable inventory and order management platform with automation',
    results: {
      efficiency: '50%',
      cost: '30%',
      revenue: '45%'
    },
    description: 'StyleHub Online experienced rapid growth that overwhelmed their existing inventory and order management systems, leading to customer service issues.',
    fullContent: `StyleHub Online, a fast-growing fashion e-commerce platform, was experiencing rapid growth that was overwhelming their existing inventory and order management systems. Customer complaints about delayed shipments and incorrect orders were increasing, threatening their reputation and growth.

The Challenge:
- Rapid growth overwhelming existing systems
- Increasing customer complaints about delays
- Manual order processing causing errors
- Poor inventory visibility
- Inefficient fulfillment processes

The Solution:
We implemented a scalable inventory and order management platform featuring:
- Automated order processing and fulfillment
- Real-time inventory tracking across multiple warehouses
- Advanced demand forecasting
- Integration with major e-commerce platforms
- Customer self-service portal

The Results:
- 50% improvement in order processing efficiency
- 30% reduction in fulfillment costs
- 45% increase in revenue through better customer satisfaction
- 80% reduction in order errors
- 70% decrease in customer service inquiries`
  }
];

export default function CaseStudiesSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center py-20 pt-24 bg-white" id="case-studies">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Success Stories</h2>
          <p className="mt-4 text-xl text-gray-500">See how businesses are transforming their operations</p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <HoverCard key={study.id}>
              <HoverCardTrigger asChild>
                <div className="bg-gray-50 rounded-lg p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:bg-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {study.industry}
                    </span>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{study.title}</DialogTitle>
                          <DialogDescription>
                            {study.company} • {study.industry}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">The Challenge</h4>
                            <p className="text-gray-600">{study.challenge}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">The Solution</h4>
                            <p className="text-gray-600">{study.solution}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">The Results</h4>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">{study.results.efficiency}</div>
                                <div className="text-sm text-gray-500">Efficiency Improvement</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">{study.results.cost}</div>
                                <div className="text-sm text-gray-500">Cost Reduction</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600">{study.results.revenue}</div>
                                <div className="text-sm text-gray-500">Revenue Increase</div>
                              </div>
                            </div>
                          </div>
                          <div className="prose prose-sm max-w-none">
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                              {study.fullContent}
                            </p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{study.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{study.description}</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Efficiency</span>
                      <span className="text-sm font-medium text-blue-600">+{study.results.efficiency}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Cost Reduction</span>
                      <span className="text-sm font-medium text-green-600">-{study.results.cost}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Revenue</span>
                      <span className="text-sm font-medium text-purple-600">+{study.results.revenue}</span>
                    </div>
                  </div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="font-semibold">{study.title}</h4>
                  <p className="text-sm text-gray-600">{study.company}</p>
                  <p className="text-sm text-gray-600">{study.description}</p>
                  <div className="pt-2">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Industry: {study.industry}</span>
                    </div>
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Efficiency:</span>
                        <span className="text-blue-600">+{study.results.efficiency}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Cost Reduction:</span>
                        <span className="text-green-600">-{study.results.cost}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Revenue:</span>
                        <span className="text-purple-600">+{study.results.revenue}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
          
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Transform Your Business?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of businesses that have already improved their operations with our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/registration" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="#contact" className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Schedule Demo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 