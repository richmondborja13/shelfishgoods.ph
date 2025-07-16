'use client';

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