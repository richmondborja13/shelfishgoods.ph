/**
 * CustomerInteraction Component - Customer Relationship Management
 * 
 * FRONT-END GUIDELINES:
 * ====================
 * 
 * 1. COMPONENT STRUCTURE:
 *    - Client-side component with React hooks and Chart.js integration
 *    - Modular customer analytics with review and message management
 *    - Real-time customer interaction tracking and analytics
 *    - Responsive design for customer relationship interface
 * 
 * 2. STATE MANAGEMENT:
 *    - useState for customer data, reviews, and messages
 *    - useEffect for data fetching and real-time updates
 *    - Local state for filtering, sorting, and UI interactions
 * 
 * 3. UI/UX PATTERNS:
 *    - Customer review display with star ratings
 *    - Message statistics and response time tracking
 *    - Customer behavior analytics with doughnut charts
 *    - Real-time customer interaction updates
 *    - Interactive customer feedback management
 * 
 * 4. CUSTOMER ANALYTICS:
 *    - Chart.js integration for customer behavior visualization
 *    - Real-time customer data updates
 *    - Interactive tooltips for customer insights
 *    - Performance optimization for customer datasets
 * 
 * 5. ACCESSIBILITY:
 *    - ARIA labels for customer charts and reviews
 *    - Screen reader friendly customer data presentation
 *    - Keyboard navigation for customer operations
 *    - High contrast customer interaction indicators
 * 
 * 6. PERFORMANCE:
 *    - Efficient customer data processing
 *    - Real-time updates without page refresh
 *    - Optimized rendering for large customer datasets
 *    - Caching strategies for customer data
 * 
 * BACK-END INTEGRATION POINTS:
 * ===========================
 * 
 * 1. API ENDPOINTS NEEDED:
 *    - GET /api/customers/reviews - Fetch customer reviews
 *    - GET /api/customers/messages - Fetch customer messages
 *    - GET /api/customers/behavior - Fetch customer behavior analytics
 *    - GET /api/customers/segments - Fetch customer segmentation data
 *    - POST /api/customers/reviews/reply - Reply to customer reviews
 *    - PUT /api/customers/messages/read - Mark messages as read
 *    - GET /api/customers/analytics - Fetch customer analytics
 * 
 * 2. DATA STRUCTURES:
 *    - Customer Review: { id, customerName, rating, product, message, date }
 *    - Message Data: { newMessages, unreadInquiries, totalInbox, responseTime }
 *    - Customer Behavior: { labels: [], datasets: [{ data: [] }] }
 *    - Customer Segments: { newCustomers, returning, inactive, vip }
 * 
 * 3. REAL-TIME CUSTOMER DATA:
 *    - WebSocket integration for live customer updates
 *    - Real-time review notifications
 *    - Live message tracking and alerts
 *    - Instant customer behavior updates
 * 
 * 4. CUSTOMER RELATIONSHIP MANAGEMENT:
 *    - Automated review response system
 *    - Customer segmentation algorithms
 *    - Customer lifetime value calculations
 *    - Customer satisfaction tracking
 * 
 * 5. COMMUNICATION MANAGEMENT:
 *    - Multi-channel customer communication
 *    - Automated response templates
 *    - Customer inquiry routing
 *    - Response time optimization
 * 
 * TODO FOR BACK-END DEVELOPMENT:
 * =============================
 * 
 * 1. Implement customer review management system
 * 2. Create customer message handling system
 * 3. Set up customer behavior analytics
 * 4. Implement customer segmentation algorithms
 * 5. Add customer communication automation
 * 6. Set up customer satisfaction tracking
 * 7. Implement customer data export functionality
 * 8. Add customer user permissions and access control
 * 9. Set up customer data backup and recovery
 * 10. Implement customer privacy and GDPR compliance
 */
'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faStar, 
  faUser, 
  faEnvelope, 
  faReply, 
  faInbox 
} from '@fortawesome/free-solid-svg-icons';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

// Recent Reviews Data
const recentReviews = [
  {
    id: 1,
    customerName: 'Maria Santos',
    rating: 5,
    product: 'Handmade Leather Wallet',
    message: 'Excellent quality! The leather feels premium and the craftsmanship is outstanding. Highly recommend!',
    date: '2 hours ago',
  },
  {
    id: 2,
    customerName: 'John Dela Cruz',
    rating: 4,
    product: 'Organic Cotton T-Shirt',
    message: 'Great fit and very comfortable. The fabric is soft and breathable. Will buy again!',
    date: '1 day ago',
  },
  {
    id: 3,
    customerName: 'Ana Rodriguez',
    rating: 5,
    product: 'Bamboo Cutting Board',
    message: 'Beautiful and functional. Perfect size for my kitchen. Love the natural finish!',
    date: '2 days ago',
  },
  {
    id: 4,
    customerName: 'Carlos Mendoza',
    rating: 3,
    product: 'Natural Soap Bar',
    message: 'Good scent but smaller than expected. Still satisfied with the purchase.',
    date: '3 days ago',
  },
];

// Message Data
const messageData = {
  newMessages: 3,
  unreadInquiries: 7,
  totalInbox: 24,
  responseTime: '2.3 hours',
};

// Customer Behavior Data
const customerData = {
  labels: ['New Customers', 'Returning', 'Inactive', 'VIP'],
  datasets: [
    {
      data: [35, 45, 15, 5],
      backgroundColor: [
        '#3b82f6',
        '#10b981',
        '#f59e0b',
        '#ef4444',
      ],
      borderWidth: 2,
      borderColor: '#ffffff',
    },
  ],
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'bottom' as const,
    },
    tooltip: { enabled: true },
  },
};

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FontAwesomeIcon
          key={star}
          icon={faStar}
          className={`w-3 h-3 ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

export default function CustomerInteraction() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 grid-rows-2 gap-6">
      {/* Recent Reviews - C column, full height */}
      <div className="lg:row-span-2 bg-white rounded-lg shadow p-6 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Reviews</h2>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {recentReviews.length} Reviews
          </span>
        </div>
        <div className="space-y-4 flex-1">
          {loading && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50" style={{ left: '16rem' }}>
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-lg font-semibold text-blue-700">Loading Customers...</span>
              </div>
            </div>
          )}
          {recentReviews.map((review) => (
            <div key={review.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{review.customerName}</p>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                </div>
                <StarRating rating={review.rating} />
              </div>
              <div className="mb-2">
                <p className="text-xs text-gray-500 mb-1">Product: {review.product}</p>
                <p className="text-sm text-gray-700">{review.message}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors">
                  Reply
                </button>
                <span className="text-gray-300">•</span>
                <button className="text-xs text-gray-600 hover:text-gray-800 transition-colors">
                  View Product
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
            View All Reviews
          </button>
        </div>
      </div>
      {/* Customer Messages - B (top right) */}
      <div className="bg-white rounded-lg shadow p-6 flex flex-col lg:col-span-2 lg:row-start-1 lg:row-end-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Customer Messages</h2>
          <FontAwesomeIcon icon={faEnvelope} className="text-blue-500 w-5 h-5" />
        </div>
        <div className="space-y-4 flex-1">
          {/* New Messages Alert */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">New Messages</p>
                <p className="text-2xl font-bold text-blue-700">{messageData.newMessages}</p>
                <p className="text-xs text-blue-600 mt-1">from customers</p>
              </div>
              <div className="text-blue-500">
                <FontAwesomeIcon icon={faEnvelope} className="w-8 h-8" />
              </div>
            </div>
          </div>
          {/* Message Statistics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-600">Unread Inquiries</p>
              <p className="text-lg font-semibold text-gray-900">{messageData.unreadInquiries}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-600">Total Inbox</p>
              <p className="text-lg font-semibold text-gray-900">{messageData.totalInbox}</p>
            </div>
          </div>
          {/* Response Time */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faReply} className="text-green-500 w-4 h-4" />
              <div>
                <p className="text-sm text-green-600 font-medium">Avg Response Time</p>
                <p className="text-sm font-semibold text-green-700">{messageData.responseTime}</p>
              </div>
            </div>
          </div>
          {/* Quick Actions */}
          <div className="space-y-2">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
              <FontAwesomeIcon icon={faReply} className="w-4 h-4" />
              Reply to Messages
            </button>
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
              <FontAwesomeIcon icon={faInbox} className="w-4 h-4" />
              View Inbox
            </button>
          </div>
        </div>
      </div>
      {/* Customer Behavior - D (bottom right) */}
      <div className="bg-white rounded-lg shadow p-6 flex flex-col lg:col-span-2 lg:row-start-2 lg:row-end-3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Customer Behavior</h2>
          <FontAwesomeIcon icon={faUser} className="text-blue-500 w-5 h-5" />
        </div>
        <div className="space-y-4 flex-1">
          {/* Chart */}
          <div className="h-48">
            <Doughnut data={customerData} options={doughnutOptions} />
          </div>
          {/* Customer Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-lg font-bold text-blue-600">35%</p>
              <p className="text-xs text-gray-600">New Customers</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-lg font-bold text-green-600">45%</p>
              <p className="text-xs text-gray-600">Returning</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 