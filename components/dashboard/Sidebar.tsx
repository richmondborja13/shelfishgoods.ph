/**
 * Sidebar Component - Dashboard Navigation Interface
 * 
 * FRONT-END GUIDELINES:
 * ====================
 * 
 * 1. COMPONENT STRUCTURE:
 *    - Client-side component with React hooks
 *    - Responsive design with collapsible functionality
 *    - Uses FontAwesome icons for consistent iconography
 *    - Next.js navigation integration with usePathname
 * 
 * 2. STATE MANAGEMENT:
 *    - useState for sidebar collapse/expand state
 *    - usePathname for active route detection
 *    - Local state for responsive behavior
 * 
 * 3. UI/UX PATTERNS:
 *    - Collapsible sidebar with smooth transitions
 *    - Active route highlighting
 *    - Categorized navigation groups
 *    - Responsive breakpoint handling
 *    - Logo and branding integration
 * 
 * 4. ACCESSIBILITY:
 *    - Proper ARIA labels for navigation
 *    - Keyboard navigation support
 *    - Screen reader friendly structure
 *    - Focus management for collapsible elements
 * 
 * 5. RESPONSIVE DESIGN:
 *    - Mobile-first approach
 *    - Collapsible on smaller screens
 *    - Maintains functionality across devices
 * 
 * 6. NAVIGATION STRUCTURE:
 *    - Categorized navigation items
 *    - Dynamic active state detection
 *    - Consistent icon usage
 * 
 * BACK-END INTEGRATION POINTS:
 * ===========================
 * 
 * 1. API ENDPOINTS NEEDED:
 *    - GET /api/user/permissions - Fetch user navigation permissions
 *    - GET /api/navigation/menu - Fetch dynamic navigation structure
 *    - GET /api/user/profile - Fetch user info for sidebar display
 * 
 * 2. DATA STRUCTURES:
 *    - Navigation Menu: [{ category, items: [{ href, label, icon, permissions }] }]
 *    - User Permissions: { canViewProducts, canViewReports, canViewSettings }
 *    - User Profile: { name, role, avatar, company }
 * 
 * 3. AUTHENTICATION:
 *    - Route-level permission checking
 *    - Role-based navigation filtering
 *    - Session validation for protected routes
 * 
 * 4. DYNAMIC CONTENT:
 *    - User-specific navigation items
 *    - Role-based menu filtering
 *    - Company-specific branding
 * 
 * 5. ERROR HANDLING:
 *    - Navigation permission errors
 *    - Route access denied handling
 *    - Fallback navigation structure
 * 
 * TODO FOR BACK-END DEVELOPMENT:
 * =============================
 * 
 * 1. Implement user permission system
 * 2. Create dynamic navigation API
 * 3. Add role-based access control
 * 4. Set up route protection middleware
 * 5. Implement user profile integration
 * 6. Add navigation analytics tracking
 * 7. Set up company branding API
 * 8. Implement navigation caching
 * 9. Add navigation audit logging
 * 10. Set up real-time permission updates
 */
'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTachometerAlt, 
  faBoxOpen, 
  faChartLine, 
  faCog, 
  faChevronLeft, 
  faChevronRight,
  faWarehouse,
  faMoneyBillWave,
  faUsers,
  faChartBar,
  faPlus
} from '@fortawesome/free-solid-svg-icons';

// Navigation link structure for sidebar
const navLinks = [
  {
    category: 'Home',
    items: [
      {
        href: '/dashboard',
        label: 'Dashboard',
        icon: <FontAwesomeIcon icon={faTachometerAlt} className="w-5 h-5" />,
      },
    ]
  },
  {
    category: 'Products',
    items: [
      {
        href: '/dashboard/products',
        label: 'Products',
        icon: <FontAwesomeIcon icon={faBoxOpen} className="w-5 h-5" />,
      },
      {
        href: '/dashboard/inventory',
        label: 'Inventory',
        icon: <FontAwesomeIcon icon={faWarehouse} className="w-5 h-5" />,
      },
    ]
  },
  {
    category: 'Reports',
    items: [
      {
        href: '/dashboard/sales',
        label: 'Sales',
        icon: <FontAwesomeIcon icon={faChartLine} className="w-5 h-5" />,
      },
      {
        href: '/dashboard/analytics',
        label: 'Analytics',
        icon: <FontAwesomeIcon icon={faChartBar} className="w-5 h-5" />,
      },
      {
        href: '/dashboard/financial',
        label: 'Financial',
        icon: <FontAwesomeIcon icon={faMoneyBillWave} className="w-5 h-5" />,
      },
      {
        href: '/dashboard/customers',
        label: 'Customers',
        icon: <FontAwesomeIcon icon={faUsers} className="w-5 h-5" />,
      },
    ]
  },
  {
    category: 'Settings',
    items: [
      {
        href: '/user/settings',
        label: 'Settings',
        icon: <FontAwesomeIcon icon={faCog} className="w-5 h-5" />,
      },
    ]
  },
];

export default function Sidebar() {
  // State for sidebar collapse/expand
  const [collapsed, setCollapsed] = useState(false);
  // Current route for active link highlighting
  const pathname = usePathname();

  return (
    <aside
      className={`h-screen sticky top-0 left-0 z-20 transition-all duration-300 flex flex-col shadow-lg font-sans ${
        collapsed ? 'w-16' : 'w-64'
      } bg-gradient-to-b from-blue-700 to-blue-900 text-white relative`}
    >
      <div className="flex items-center justify-center px-4 py-6 border-b border-blue-800">
        {/* Show logo or app name depending on collapse state */}
        {collapsed ? (
          <div className="bg-white rounded-lg p-1">
            <Image src="/images/icons/logosg.png" alt="Shelf-ish Goods Logo" width={32} height={32} />
          </div>
        ) : (
          <span className="text-xl font-extrabold tracking-widest text-center w-full uppercase">Shelf-ish</span>
        )}
      </div>
      <button
        className="absolute right-0 top-4 translate-x-1/2 p-1.5 rounded-full bg-blue-500 hover:bg-blue-600 shadow focus:outline-none z-30"
        onClick={() => setCollapsed((c) => !c)}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <FontAwesomeIcon icon={collapsed ? faChevronRight : faChevronLeft} className="w-4 h-4 text-white" />
      </button>
      {/* Navigation */}
      <nav className="flex-1 mt-4 space-y-4">
        {navLinks.map((category) => (
          <div key={category.category} className="space-y-1">
            {!collapsed && (
              <h3 className="px-3 text-xs text-blue-200 uppercase tracking-wider font-semibold">{category.category}</h3>
            )}
            {category.items.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`group flex px-3 py-3 rounded-lg transition-all duration-200 text-xs md:text-sm tracking-wide uppercase font-bold hover:bg-blue-800 focus:bg-blue-800 focus:outline-none ${
                  pathname === link.href
                    ? 'bg-white bg-opacity-10 text-white font-bold shadow-sm'
                    : 'text-blue-100 hover:text-white'
                } ${collapsed ? 'justify-center items-center' : 'items-center'}`}
                title={link.label}
              >
                <span className={collapsed ? 'flex justify-center items-center w-full' : 'flex items-center'}>{link.icon}</span>
                {!collapsed && (
                  <span className="ml-2 md:ml-3 transition-all duration-200">{link.label}</span>
                )}
              </a>
            ))}
          </div>
        ))}
      </nav>
      <div className="border-t border-white my-0"></div>
      {/* Footer */}
      <div className="px-4 py-4 text-xs text-blue-200 text-center">
        {!collapsed && <span className="tracking-wider">&copy; 2024 Shelf-ish Goods</span>}
      </div>
    </aside>
  );
} 