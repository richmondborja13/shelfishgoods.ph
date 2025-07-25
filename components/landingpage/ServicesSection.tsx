'use client';

import { motion } from 'framer-motion';
import { 
  Package, 
  BarChart3, 
  RefreshCw, 
  CreditCard, 
  TrendingUp, 
  Headphones,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ServicesSection() {
  // services contents on the services section
  const services = [
    {
      title: 'Inventory Management',
      description: 'Real-time tracking and automated stock management with intelligent reorder alerts.',
      icon: Package,
      features: ['Real-time tracking', 'Automated alerts', 'Multi-location support']
    },
    {
      title: 'Vendor Analytics',
      description: 'Comprehensive insights into vendor performance, costs, and efficiency metrics.',
      icon: BarChart3,
      features: ['Performance metrics', 'Cost analysis', 'Efficiency reports']
    },
    {
      title: 'Order Processing',
      description: 'Streamlined order workflows with automated approvals and fulfillment tracking.',
      icon: RefreshCw,
      features: ['Automated workflows', 'Approval systems', 'Fulfillment tracking']
    },
    {
      title: 'Payment Solutions',
      description: 'Secure payment processing with multiple payment methods and automated billing.',
      icon: CreditCard,
      features: ['Multiple payment methods', 'Automated billing', 'Secure transactions']
    },
    {
      title: 'Reporting Tools',
      description: 'Advanced analytics and customizable reports for data-driven business decisions.',
      icon: TrendingUp,
      features: ['Custom reports', 'Data visualization', 'Export capabilities']
    },
    {
      title: 'Support & Training',
      description: '24/7 customer support and comprehensive training resources for your team.',
      icon: Headphones,
      features: ['24/7 support', 'Training resources', 'Knowledge base']
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to
            <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Scale Your Business
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive tools and features designed to streamline your operations, 
            boost efficiency, and drive growth for your business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses that have already streamlined their operations 
              and achieved remarkable growth with our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="px-8 py-4 text-lg font-semibold bg-white text-blue-600 hover:bg-gray-100 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                <Link href="/user/registration" className="flex items-center">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-4 text-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-blue-600 rounded-xl transition-all duration-200"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 