"use client";

import { motion } from "framer-motion";
import { Globe, BarChart3, RefreshCcw, ShieldCheck, Users, Store } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StoreManagementSection() {
  return (
    <section className="py-28 bg-gradient-to-br from-[#1a1440] to-[#221a4d] text-white relative overflow-hidden">
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
          <motion.div
            className="bg-[#2a2260] rounded-2xl p-8 shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center w-12 h-12 bg-cyan-700/30 rounded-xl mb-6">
              <Store className="w-7 h-7 text-cyan-300" />
            </div>
            <h3 className="text-xl font-bold mb-2">Unified Vendor Dashboard</h3>
            <p className="text-gray-300">
              Manage all your partner stores in one place. Track performance, compliance, and communications with ease.
            </p>
          </motion.div>
          <motion.div
            className="bg-[#2a2260] rounded-2xl p-8 shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center w-12 h-12 bg-cyan-700/30 rounded-xl mb-6">
              <BarChart3 className="w-7 h-7 text-cyan-300" />
            </div>
            <h3 className="text-xl font-bold mb-2">Real-Time Analytics</h3>
            <p className="text-gray-300">
              Get instant insights into sales, inventory, and vendor activity. Make data-driven decisions for every partnership.
            </p>
          </motion.div>
          <motion.div
            className="bg-[#2a2260] rounded-2xl p-8 shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center w-12 h-12 bg-cyan-700/30 rounded-xl mb-6">
              <ShieldCheck className="w-7 h-7 text-cyan-300" />
            </div>
            <h3 className="text-xl font-bold mb-2">Secure & Reliable</h3>
            <p className="text-gray-300">
              99.9% uptime, robust permissions, and enterprise-grade security for all your vendor data and transactions.
            </p>
          </motion.div>
        </div>
    
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            className="relative w-full lg:w-1/2 flex justify-center mb-12 lg:mb-0"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="relative w-80 h-80 bg-cyan-900/30 rounded-3xl flex items-center justify-center border-2 border-cyan-700/30">
              <Users className="w-24 h-24 text-cyan-400" />
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-cyan-700/40 rounded-full blur-2xl" />
              <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-cyan-700/40 rounded-full blur-2xl" />
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