/**
 * AboutSection Component
 *
 * Front-end Guidelines:
 * - Describes company values, mission, and key stats.
 * - Uses Lucide icons, Framer Motion for animation, and Radix Tooltip for info.
 * - UI/UX: Visually engaging, highlights values and team.
 *
 * Back-end Follow-through:
 * - If about content is dynamic, fetch from API or CMS.
 * - Ensure endpoints provide company info, values, and stats as needed.
 */
"use client";
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  Target, 
  Handshake, 
  Star, 
  Users, 
  Leaf,
  TrendingUp,
  Clock,
  Headphones
} from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';

export default function AboutSection() {
  // values card content on the about section
  const values = [
    {
      title: 'Innovation',
      description: 'We constantly push boundaries to create cutting-edge solutions that solve real business challenges.',
      icon: Lightbulb,
      color: 'from-yellow-400 to-orange-500'
    },
    {
      title: 'Customer Success',
      description: 'Your success is our success. We\'re committed to helping our clients achieve their business goals.',
      icon: Target,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Integrity',
      description: 'We believe in transparency, honesty, and doing what\'s right for our clients and partners.',
      icon: Handshake,
      color: 'from-green-500 to-teal-600'
    },
    {
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from product development to customer support.',
      icon: Star,
      color: 'from-yellow-500 to-pink-500'
    },
    {
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and collaboration to achieve extraordinary results.',
      icon: Users,
      color: 'from-cyan-500 to-blue-600'
    },
    {
      title: 'Sustainability',
      description: 'We\'re committed to building sustainable solutions that benefit both businesses and the environment.',
      icon: Leaf,
      color: 'from-green-400 to-emerald-500'
    }
  ];

  // stats card content on the about section
  const stats = [
    { number: '10,000+', label: 'Clients Worldwide', icon: Users },
    { number: '99.9%', label: 'Uptime', icon: TrendingUp },
    { number: '24/7', label: 'Customer Support', icon: Headphones }
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About
            <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Shelf-ish Goods
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to transform how businesses manage their vendor relationships 
            and operations through innovative technology solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative h-96 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
              <img 
                src="/images/team.png" 
                alt="Our team at work" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h3>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                Founded in 2020, Shelf-ish Goods emerged from a simple observation: businesses needed a better way to manage their vendor relationships and operations. What started as a simple solution has grown into a comprehensive platform trusted by businesses worldwide.
              </p>
              <p>
                Today, we're proud to serve thousands of businesses, helping them streamline their operations, reduce costs, and grow their business with our innovative vendor management solutions.
              </p>
            </div>
          </motion.div>
        </div>

        <Tooltip.Provider>
        <motion.div 
          className="mb-24"
          id="values"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-16">Our Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
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
                  <Tooltip.Root delayDuration={200}>
                    <Tooltip.Trigger asChild>
                      <div className={`flex items-center justify-center w-16 h-16 bg-gradient-to-br ${value.color} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300 cursor-help`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        className="z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                        sideOffset={8}
                      >
                        {value.description}
                        <Tooltip.Arrow className="fill-popover" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                  <h4 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {value.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
        </Tooltip.Provider>
            
        <motion.div 
          className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-xl mb-4 mx-auto">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-blue-100 font-medium">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 