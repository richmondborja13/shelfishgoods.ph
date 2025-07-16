'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, Store, BarChart3, Crown, Play, CreditCard, Calendar, Lightbulb, Star, Settings, Smartphone, Code, Pen, Rocket, SlidersHorizontal, ArrowUpRight, HelpCircle, Heart, Users } from 'lucide-react';

const Navigation = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isPricingDropdownOpen, setIsPricingDropdownOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '#contact' }
  ];

  // grouped dropdown items 
  const pricingDropdownSections = [
    {
      title: 'PLANS',
      items: [
        {
          name: 'Vendor Plans',
          path: '#pricing',
          emoji: '🏪',
          description: 'Standard subscription tiers (Starter, Growth, Enterprise)'
        },
        {
          name: 'Compare Plans',
          path: '#pricing',
          emoji: '🧾',
          description: 'Feature-by-feature breakdown table'
        },
        {
          name: 'Enterprise Solutions',
          path: '#pricing',
          emoji: '🎯',
          description: 'Custom pricing for large vendors',
          badge: 'POPULAR'
        }
      ]
    },
    {
      title: 'BILLING',
      items: [
        {
          name: 'Payment Methods',
          path: '#pricing',
          emoji: '💳',
          description: 'Info about billing options, credit cards, GCash, etc.'
        },
        {
          name: 'Monthly vs Yearly',
          path: '#pricing',
          emoji: '🔄',
          description: 'View billing cycle savings and switch option'
        }
      ]
    },
    {
      title: 'GUIDES & TOOLS',
      items: [
        {
          name: 'Which Plan is Right for Me?',
          path: '#pricing',
          emoji: '💡',
          description: 'Guide/quiz to help vendors choose a plan',
          badge: 'GUIDE'
        },
        {
          name: 'Feature Highlights',
          path: '#pricing',
          emoji: '📊',
          description: 'Overview of what\'s included in the system'
        },
        {
          name: 'Developer Tools Access',
          path: '#pricing',
          emoji: '🧰',
          description: 'API usage tiers and dev support levels'
        }
      ]
    },
    {
      title: 'EXTRAS',
      items: [
        {
          name: 'Add-ons & Extras',
          path: '#pricing',
          emoji: '🛠️',
          description: 'Optional features like integrations, custom domains'
        },
        {
          name: 'Mobile App Access',
          path: '#pricing',
          emoji: '📱',
          description: 'Plans that include mobile access and push notifications',
          badge: 'NEW'
        }
      ]
    }
  ];
  const startFreeTrial = {
    name: 'Start Free Trial',
    path: '/registration',
    emoji: '🆓',
    description: 'Sign up with free access for limited time',
    highlight: true
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 relative">
          <div className="flex items-center relative z-10">
            <button
              onClick={() => router.push('/')}
              className="flex-shrink-0 flex items-center cursor-pointer hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-2"
            >
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Shelf-ish Goods
              </span>
            </button>
          </div>

          <div className="hidden lg:flex items-center justify-center absolute inset-0">
            <div className="flex items-center space-x-1">
              <Link
                href="/pricing"
                className={`px-4 py-2 text-base font-oswald font-medium transition-all duration-200 cursor-pointer rounded-lg hover:bg-gray-50 ${pathname === '/pricing' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'}`}
              >
                Pricing
              </Link>
              
              <div className="relative group">
                <button
                  onClick={() => {
                    setIsAboutDropdownOpen(!isAboutDropdownOpen);
                    if (isPricingDropdownOpen) setIsPricingDropdownOpen(false);
                  }}
                  className="text-gray-700 hover:text-blue-600 px-4 py-2 text-base font-oswald font-medium transition-all duration-200 cursor-pointer flex items-center space-x-1 rounded-lg hover:bg-gray-50"
                >
                  <span>Explore</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isAboutDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isAboutDropdownOpen && (
                  <div 
                    className="absolute top-full left-[-200px] mt-2 w-[600px] bg-white rounded-xl shadow-xl border border-gray-100 py-6 px-6 z-50"
                  >
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <button 
                          onClick={() => {
                            scrollToSection('#testimonials');
                            setIsAboutDropdownOpen(false);
                          }}
                          className="rounded-lg overflow-hidden transition-colors hover:shadow-xl w-full"
                        >
                          <img src="/images/client.png" alt="Client stories" className="w-full h-32 object-cover object-center" />
                          <div className="p-4">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-gray-900">Client stories</span>
                              <ArrowUpRight className="w-4 h-4 text-gray-900" />
                            </div>
                            <div className="text-xs text-gray-500 mt-1">Our clients' successes are our favorite stories</div>
                          </div>
                        </button>
                      </div>
                      <div className="space-y-4">
                        <button 
                          onClick={() => {
                            scrollToSection('#blog');
                            setIsAboutDropdownOpen(false);
                          }}
                          className="flex items-start gap-3 group bg-transparent p-0 border-0 text-left hover:bg-gray-50 rounded-lg p-2 transition-colors hover:shadow-xl"
                        >
                          <Pen className="w-5 h-5 text-gray-900 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-bold text-sm text-gray-900">Blog</div>
                            <div className="text-xs text-gray-500 mt-0.5">Our latest news and updates</div>
                          </div>
                        </button>
                        <button 
                          onClick={() => {
                            scrollToSection('#about');
                            setIsAboutDropdownOpen(false);
                          }}
                          className="flex items-start gap-3 group bg-transparent p-0 border-0 text-left hover:bg-gray-50 rounded-lg p-2 transition-colors hover:shadow-xl"
                        >
                          <Rocket className="w-5 h-5 text-gray-900 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-bold text-sm text-gray-900">Our story</div>
                            <div className="text-xs text-gray-500 mt-0.5">How we got here and where we're going</div>
                          </div>
                        </button>
                        <button 
                          onClick={() => {
                            scrollToSection('#faq');
                            setIsAboutDropdownOpen(false);
                          }}
                          className="flex items-start gap-3 group bg-transparent p-0 border-0 text-left hover:bg-gray-50 rounded-lg p-2 transition-colors hover:shadow-xl"
                        >
                          <HelpCircle className="w-5 h-5 text-gray-900 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-bold text-sm text-gray-900">FAQ</div>
                            <div className="text-xs text-gray-500 mt-0.5">Frequently asked questions and answers</div>
                          </div>
                        </button>
                        <button 
                          onClick={() => {
                            scrollToSection('#values');
                            setIsAboutDropdownOpen(false);
                          }}
                          className="flex items-start gap-3 group bg-transparent p-0 border-0 text-left hover:bg-gray-50 rounded-lg p-2 transition-colors hover:shadow-xl"
                        >
                          <Heart className="w-5 h-5 text-gray-900 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-bold text-sm text-gray-900">Values</div>
                            <div className="text-xs text-gray-500 mt-0.5">What drives us and our mission</div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {navItems.filter(item => item.name !== 'Pricing' && item.name !== 'Blog').map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    if (item.name === 'Contact') {
                      router.push('/?scrollTo=contact');
                    } else {
                      scrollToSection(item.path);
                    }
                  }}
                  className="text-gray-700 hover:text-blue-600 px-4 py-2 text-base font-oswald font-medium transition-all duration-200 cursor-pointer rounded-lg hover:bg-gray-50"
                >
                  {item.name.replace('Dropdown', '')}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/user/registration"
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>

          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 text-lg"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <Menu className="h-6 w-6" />
              ) : (
                <X className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden">
          <div className="px-4 pt-4 pb-6 space-y-3 bg-white shadow-xl border-t border-gray-100">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  if (item.name === 'Contact') {
                    router.push('/?scrollTo=contact');
                  } else {
                    scrollToSection(item.path);
                  }
                  setIsOpen(false);
                }}
                className="text-gray-700 hover:bg-gray-50 hover:text-blue-600 block px-4 py-3 rounded-lg text-lg font-oswald font-medium transition-all duration-200 w-full text-left"
              >
                {item.name}
              </button>
            ))}
            
            <Link
              href="/components/landingpage/pricingpage"
              className="text-gray-700 hover:bg-gray-50 hover:text-blue-600 block px-4 py-3 rounded-lg text-lg font-oswald font-medium transition-all duration-200 w-full text-left"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            
            <div className="pt-4">
              <Link
                href="/user/registration"
                className="block px-4 py-3 rounded-lg text-base font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 text-center"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation; 