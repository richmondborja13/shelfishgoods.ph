import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, CreditCard, Shield, Smartphone, Users, Store, Settings, HelpCircle } from 'lucide-react';

const footerSections = [
  {
    title: 'PLATFORM',
    links: [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Features', href: '#features' },
      { name: 'Integrations', href: '#integrations' },
      { name: 'Mobile App', href: '#mobile' },
    ],
  },
  {
    title: 'VENDORS',
    links: [
      { name: 'Become a Vendor', href: '/registration' },
      { name: 'Vendor Stories', href: '#case-studies' },
      { name: 'FAQ', href: '#faq' },
      { name: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'TOOLS',
    links: [
      { name: 'Inventory Tools', href: '#inventory' },
      { name: 'Analytics', href: '#analytics' },
      { name: 'Team Collaboration', href: '#team' },
      { name: 'Add-ons & Extras', href: '#addons' },
    ],
  },
  {
    title: 'COMPANY',
    links: [
      { name: 'About', href: '#about' },
      { name: 'Blog', href: '#blog' },
      { name: 'Careers', href: '#careers' },
      { name: 'Sustainability', href: '#sustainability' },
    ],
  },
  {
    title: 'SUPPORT',
    links: [
      { name: 'Help Center', href: '#help' },
      { name: 'Knowledge Base', href: '#knowledge' },
      { name: 'Contact Support', href: '#contact' },
      { name: 'Report Issue', href: '#report' },
    ],
  },
];

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
];

// Payment icons as images from /public/payments
const paymentImages = [
  { src: '/payments/visa.png', alt: 'Visa' },
  { src: '/payments/maya.png', alt: 'Maya' },
  { src: '/payments/paypal.png', alt: 'PayPal' },
  { src: '/payments/qr-ph.png', alt: 'QR PH' },
  { src: '/payments/gcash.png', alt: 'GCash' },
];

const PaymentIcons = () => (
  <div className="flex items-center gap-4">
    {paymentImages.map(img => (
      <img
        key={img.alt}
        src={img.src}
        alt={img.alt}
        className="w-16 h-10 bg-white rounded shadow p-2 object-contain"
        loading="lazy"
      />
    ))}
  </div>
);

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-blue-50 to-cyan-50 border-t border-blue-100 mt-16 pt-12">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12">
        {/* Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 pb-12">
          {footerSections.map(section => (
            <div key={section.title}>
              <div className="font-bold text-gray-700 mb-3 tracking-wide text-sm">{section.title}</div>
              <ul className="space-y-2">
                {section.links.map(link => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Payment icons row */}
        <div className="flex flex-col sm:flex-row items-center border-t border-blue-100 py-6 gap-6">
          {/* Payment icons left */}
          <PaymentIcons />
          {/* Centered logo/tagline */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <span className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Shelf-ish Goods</span>
            <span className="text-xs text-gray-400 mt-1">Empowering Modern Vendors</span>
          </div>
          {/* Social icons right */}
          <div className="flex gap-2">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 rounded-full hover:bg-blue-100 transition-colors text-blue-600 hover:text-cyan-600"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
        {/* Legal and copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-blue-100 py-4 text-xs text-gray-400 bg-white/30 mt-2">
          <div className="flex flex-wrap gap-4 mb-2 md:mb-0">
            <Link href="#privacy" className="hover:text-blue-600">Privacy policy</Link>
            <Link href="#refund" className="hover:text-blue-600">Refund policy</Link>
            <Link href="#terms" className="hover:text-blue-600">Terms of service</Link>
          </div>
          <div>&copy; {new Date().getFullYear()} Shelf-ish Goods. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 