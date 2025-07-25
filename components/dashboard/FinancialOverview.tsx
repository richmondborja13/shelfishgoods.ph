/**
 * FinancialOverview Component - Financial Analytics and Reporting
 * 
 * FRONT-END GUIDELINES:
 * ====================
 * 
 * 1. COMPONENT STRUCTURE:
 *    - Client-side component with React hooks and Chart.js integration
 *    - Modular financial analytics with multiple data views
 *    - Real-time financial data visualization and reporting
 *    - Responsive design for financial management interface
 * 
 * 2. STATE MANAGEMENT:
 *    - useState for financial data, alerts, and time periods
 *    - useEffect for data fetching and real-time updates
 *    - Local state for filtering, date ranges, and UI interactions
 * 
 * 3. UI/UX PATTERNS:
 *    - Financial metrics cards with trend indicators
 *    - Interactive charts for revenue and expense analysis
 *    - Color-coded financial indicators (green/red)
 *    - Real-time financial alerts and notifications
 *    - Responsive financial data presentation
 * 
 * 4. FINANCIAL VISUALIZATION:
 *    - Chart.js integration for financial charts
 *    - Real-time financial data updates
 *    - Interactive tooltips for financial details
 *    - Performance optimization for financial datasets
 * 
 * 5. ACCESSIBILITY:
 *    - ARIA labels for financial charts and metrics
 *    - Screen reader friendly financial data presentation
 *    - Keyboard navigation for financial operations
 *    - High contrast financial indicators
 * 
 * 6. PERFORMANCE:
 *    - Efficient financial data processing
 *    - Real-time updates without page refresh
 *    - Optimized rendering for large financial datasets
 *    - Caching strategies for financial data
 * 
 * BACK-END INTEGRATION POINTS:
 * ===========================
 * 
 * 1. API ENDPOINTS NEEDED:
 *    - GET /api/financial/overview - Fetch financial overview data
 *    - GET /api/financial/payouts - Fetch payout information
 *    - GET /api/financial/commissions - Fetch commission breakdown
 *    - GET /api/financial/returns - Fetch returns data
 *    - GET /api/financial/revenue-trends - Fetch revenue trends
 *    - GET /api/financial/expenses - Fetch expense breakdown
 *    - GET /api/financial/profit-margins - Fetch profit margin data
 * 
 * 2. DATA STRUCTURES:
 *    - Payout Data: { availableBalance, nextPayoutDate, payoutHistory }
 *    - Commission Data: [{ label, amount, percentage, color }]
 *    - Returns Data: { totalReturns, totalValue, returnRate, pendingReturns }
 *    - Revenue Trends: { labels: [], datasets: [{ data: [] }] }
 *    - Expense Breakdown: { labels: [], datasets: [{ data: [] }] }
 * 
 * 3. REAL-TIME FINANCIAL DATA:
 *    - WebSocket integration for live financial updates
 *    - Real-time revenue tracking and notifications
 *    - Live expense monitoring and alerts
 *    - Instant financial calculations and reporting
 * 
 * 4. FINANCIAL PROCESSING:
 *    - Server-side financial calculations
 *    - Real-time profit margin calculations
 *    - Automated financial reporting
 *    - Financial data validation and reconciliation
 * 
 * 5. SECURITY AND COMPLIANCE:
 *    - Financial data encryption and security
 *    - Audit logging for financial transactions
 *    - Compliance with financial regulations
 *    - Secure financial data transmission
 * 
 * TODO FOR BACK-END DEVELOPMENT:
 * =============================
 * 
 * 1. Implement financial data aggregation API
 * 2. Create real-time financial tracking system
 * 3. Set up financial data security and encryption
 * 4. Implement financial audit logging
 * 5. Add financial data validation and reconciliation
 * 6. Set up financial reporting automation
 * 7. Implement financial export functionality
 * 8. Add financial user permissions and access control
 * 9. Set up financial data backup and recovery
 * 10. Implement financial compliance monitoring
 */
'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMoneyBillWave, 
  faCalendarAlt, 
  faCalculator, 
  faPercent, 
  faUndo, 
  faExclamationTriangle,
  faChartLine,
  faDollarSign,
  faBell,
  faArrowUp,
  faArrowDown
} from '@fortawesome/free-solid-svg-icons';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Payout mock data
const payoutData = {
  availableBalance: 15420, // Current available balance for payout
  nextPayoutDate: 'July 15, 2025', // Next scheduled payout date
};

// Commission mock data
const commissionData = [
  { label: 'Gross Revenue', amount: 45680, color: 'text-gray-900' },
  { label: 'Platform Fee (5%)', amount: 2284, color: 'text-red-600' },
  { label: 'Processing Fee (2.5%)', amount: 1142, color: 'text-red-600' },
  { label: 'Net Revenue', amount: 42254, color: 'text-green-600' },
];

// Returns mock data
const returnsData = {
  totalReturns: 12, // Number of returns
  totalValue: 3240, // Total value of returns
  returnRate: 2.8, // Return rate percentage
  pendingReturns: 3, // Returns pending resolution
  resolvedReturns: 9, // Returns resolved
};

// Revenue Trends mock data
const revenueTrendsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue',
      data: [32000, 35000, 38000, 42000, 45000, 48000],
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      tension: 0.4,
      fill: true,
    },
  ],
};

// Expense Breakdown mock data
const expenseBreakdownData = {
  labels: ['Platform Fees', 'Processing Fees', 'Shipping', 'Marketing', 'Returns'],
  datasets: [
    {
      data: [35, 25, 20, 15, 5],
      backgroundColor: [
        '#ef4444',
        '#f59e0b',
        '#3b82f6',
        '#8b5cf6',
        '#10b981',
      ],
      borderWidth: 2,
      borderColor: '#ffffff',
    },
  ],
};

// Profit Margins mock data
const profitMarginsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Profit Margin %',
      data: [18, 20, 22, 21, 23, 25],
      backgroundColor: '#3b82f6',
      borderRadius: 4,
    },
  ],
};

// Financial Alerts mock data
const financialAlerts = [
  { id: 1, type: 'warning', message: 'High return rate detected (3.2%)', time: '2 hours ago', icon: faExclamationTriangle },
  { id: 2, type: 'success', message: 'Payout processed successfully', time: '1 day ago', icon: faMoneyBillWave },
  { id: 3, type: 'info', message: 'New commission rate applied', time: '3 days ago', icon: faCalculator },
  { id: 4, type: 'warning', message: 'Processing fees increased', time: '1 week ago', icon: faChartLine },
];

export default function FinancialOverview() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50" style={{ left: '16rem' }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-lg font-semibold text-blue-700">Loading Financials...</span>
        </div>
      </div>
    );
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'success':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'info':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Payout Summary</h2>
            <FontAwesomeIcon icon={faMoneyBillWave} className="text-green-500 w-5 h-5" />
          </div>
          
          <div className="flex-1 space-y-4">
            {/* Available Balance */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Available for Withdrawal</p>
                  <p className="text-2xl font-bold text-green-700">₱{payoutData.availableBalance.toLocaleString()}</p>
                </div>
                <div className="text-green-500">
                  <FontAwesomeIcon icon={faMoneyBillWave} className="w-8 h-8" />
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-500 w-5 h-5" />
                <div>
                  <p className="text-sm text-blue-600 font-medium">Next Payout</p>
                  <p className="text-lg font-semibold text-blue-700">{payoutData.nextPayoutDate}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2 mt-auto pt-4">
            <button className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
              Request Payout
            </button>
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2 px-4 rounded-lg transition-colors">
              View Payout History
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Commission Breakdown</h2>
            <FontAwesomeIcon icon={faCalculator} className="text-blue-500 w-5 h-5" />
          </div>
          
          <div className="flex-1 space-y-3">
            {commissionData.map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  {index === commissionData.length - 1 && (
                    <div className="w-1 h-8 bg-green-500 rounded-full"></div>
                  )}
                  <span className="text-sm text-gray-600">{item.label}</span>
                </div>
                <span className={`text-sm font-semibold ${item.color}`}>
                  ₱{item.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Commission Rate</span>
              <div className="flex items-center gap-1">
                <FontAwesomeIcon icon={faPercent} className="text-blue-500 w-3 h-3" />
                <span className="text-sm font-semibold text-blue-600">7.5%</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
              View Detailed Report
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Returns & Refunds</h2>
            <FontAwesomeIcon icon={faUndo} className="text-orange-500 w-5 h-5" />
          </div>
          
          <div className="flex-1 space-y-4">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Return Rate</p>
                  <p className="text-2xl font-bold text-orange-700">{returnsData.returnRate}%</p>
                </div>
                <div className="text-orange-500">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="w-8 h-8" />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600">Total Returns</p>
                <p className="text-lg font-semibold text-gray-900">{returnsData.totalReturns}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600">Total Value</p>
                <p className="text-lg font-semibold text-gray-900">₱{returnsData.totalValue.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">Pending Returns</span>
                <span className="text-sm font-semibold text-orange-600">{returnsData.pendingReturns}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">Resolved Returns</span>
                <span className="text-sm font-semibold text-green-600">{returnsData.resolvedReturns}</span>
              </div>
            </div>
          </div>
          
          {/* Quick Actions - Aligned to Bottom */}
          <div className="space-y-2 mt-auto pt-4">
            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
              Process Returns
            </button>
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2 px-4 rounded-lg transition-colors">
              View Return History
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trends */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Revenue Trends</h3>
              <p className="text-sm text-gray-500">Monthly revenue growth</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Revenue</span>
            </div>
          </div>
          <div className="h-64">
            <Line data={revenueTrendsData} options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: {
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  titleColor: 'white',
                  bodyColor: 'white',
                }
              },
              scales: {
                y: { 
                  beginAtZero: true,
                  grid: {
                    color: 'rgba(0,0,0,0.05)',
                  }
                },
                x: {
                  grid: {
                    color: 'rgba(0,0,0,0.05)',
                  }
                }
              },
            }} />
          </div>
        </div>

        {/* Expense Breakdown */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Expense Breakdown</h3>
              <p className="text-sm text-gray-500">Cost distribution analysis</p>
            </div>
            <div className="text-xs text-gray-500">Total: ₱12,450</div>
          </div>
          <div className="h-64">
            <Doughnut 
              data={expenseBreakdownData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      boxWidth: 12,
                      padding: 15,
                      usePointStyle: true,
                      font: {
                        size: 11
                      }
                    },
                  },
                  tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: 'white',
                    bodyColor: 'white',
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Profit Margins and Financial Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profit Margins */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Profit Margins</h3>
              <p className="text-sm text-gray-500">Monthly profit percentage</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Margin %</span>
            </div>
          </div>
          <div className="h-64">
            <Bar data={profitMarginsData} options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: {
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  titleColor: 'white',
                  bodyColor: 'white',
                }
              },
              scales: {
                y: { 
                  beginAtZero: true,
                  grid: {
                    color: 'rgba(0,0,0,0.05)',
                  }
                },
                x: {
                  grid: {
                    display: false,
                  }
                }
              },
            }} />
          </div>
        </div>

        {/* Financial Alerts */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Financial Alerts</h3>
              <p className="text-sm text-gray-500">Important notifications</p>
            </div>
            <FontAwesomeIcon icon={faBell} className="text-blue-500 w-5 h-5" />
          </div>
          
          <div className="space-y-3">
            {financialAlerts.map((alert) => (
              <div key={alert.id} className={`border rounded-lg p-3 ${getAlertColor(alert.type)}`}>
                <div className="flex items-start gap-3">
                  <FontAwesomeIcon icon={alert.icon} className="w-4 h-4 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs opacity-75 mt-1">{alert.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
              View All Alerts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 