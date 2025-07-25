/**
 * StoreManagementSection Component (Extra)
 *
 * Front-end Guidelines:
 * - Highlights store management, vendor partnerships, and analytics features.
 * - Uses Lucide icons, Framer Motion for animation, and Radix UI Card for layout.
 * - UI/UX: Visually engaging, responsive, and emphasizes security and reliability.
 *
 * Back-end Follow-through:
 * - If section content is dynamic, fetch from API or CMS.
 * - Ensure endpoints provide feature highlights and stats as needed.
 */
"use client";

import { motion } from "framer-motion";
import { Globe, BarChart3, RefreshCcw, ShieldCheck, Users, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from '@radix-ui/themes';

export default function StoreManagementSection() {
  return (
    <section className="py-28 bg-gradient-to-br from-cyan-500 to-blue-600 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Store Management. <span className="text-cyan-400">Partnerships.</span> Growth.
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Empower your business with seamless vendor partner management, real-time analytics, and always-on reliability.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <Card asChild className="bg-blue-600 rounded-2xl p-8 shadow-lg">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-500/30 rounded-xl mb-6">
                <Store className="w-7 h-7 text-blue-200" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Unified Vendor Dashboard</h3>
              <p className="text-blue-100">
                Manage all your partner stores in one place. Track performance, compliance, and communications with ease.
              </p>
            </motion.div>
          </Card>
          <Card asChild className="bg-blue-600 rounded-2xl p-8 shadow-lg">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-500/30 rounded-xl mb-6">
                <BarChart3 className="w-7 h-7 text-blue-200" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Real-Time Analytics</h3>
              <p className="text-blue-100">
                Get instant insights into sales, inventory, and vendor activity. Make data-driven decisions for every partnership.
              </p>
            </motion.div>
          </Card>
          <Card asChild className="bg-blue-600 rounded-2xl p-8 shadow-lg">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-500/30 rounded-xl mb-6">
                <ShieldCheck className="w-7 h-7 text-blue-200" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Secure & Reliable</h3>
              <p className="text-blue-100">
                99.9% uptime, robust permissions, and enterprise-grade security for all your vendor data and transactions.
              </p>
            </motion.div>
          </Card>
        </div>
    
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            className="relative w-full lg:w-1/2 flex justify-center mb-12 lg:mb-0"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="relative w-96 h-96 bg-cyan-900/30 rounded-3xl overflow-hidden border-2 border-cyan-700/30">
              <img 
                src="/images/pages.png" 
                alt="Store management interface" 
                className="w-full h-full object-cover"
              />
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-cyan-700/40 rounded-full blur-2xl" />
              <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-cyan-700/40 rounded-full blur-2xl" />
              
              {/* Dashed connection lines and nodes remain unchanged */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 384 384">
                <defs>
                  <pattern id="dashed" patternUnits="userSpaceOnUse" width="8" height="8">
                    <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="2,2" opacity="0.7"/>
                  </pattern>
                </defs>
                <path d="M 280 80 L 320 120" stroke="url(#dashed)" strokeWidth="1.5" fill="none"/>
                <path d="M 320 120 L 280 160" stroke="url(#dashed)" strokeWidth="1.5" fill="none"/>
                <path d="M 280 160 L 120 320" stroke="url(#dashed)" strokeWidth="1.5" fill="none"/>
                <path d="M 120 320 L 80 280" stroke="url(#dashed)" strokeWidth="1.5" fill="none"/>
                <circle cx="280" cy="80" r="2" fill="white" opacity="0.9"/>
                <circle cx="320" cy="120" r="2" fill="white" opacity="0.9"/>
                <circle cx="280" cy="160" r="2" fill="white" opacity="0.9"/>
                <circle cx="120" cy="320" r="2" fill="white" opacity="0.9"/>
                <circle cx="80" cy="280" r="2" fill="white" opacity="0.9"/>
                <circle cx="200" cy="200" r="2" fill="white" opacity="0.9"/>
              </svg>
            </div>
          </motion.div>
          <motion.div
            className="w-full lg:w-1/2 flex flex-col items-center lg:items-start"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-6">Total control. Effortless collaboration.</h3>
            <ul className="text-lg text-gray-300 mb-8 space-y-3">
              <li>• Onboard new vendors in minutes</li>
              <li>• Automated compliance & document tracking</li>
              <li>• Customizable permissions & workflows</li>
              <li>• 24/7 support for you and your partners</li>
            </ul>
            <Button size="lg" className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
              Get started with vendor management
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 