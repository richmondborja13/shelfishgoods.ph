'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faClock, 
  faCalendarAlt, 
  faChartBar, 
  faUpload, 
  faPlus,
  faDollarSign,
  faUsers,
  faShoppingCart,
  faChartLine,
  faEye
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

// Best Selling Times Data
const peakHours = [
  { hour: '8-11 PM', orders: 45, percentage: 35 },
  { hour: '2-5 PM', orders: 32, percentage: 25 },
  { hour: '11 AM-2 PM', orders: 28, percentage: 22 },
  { hour: '8-11 AM', orders: 18, percentage: 18 },
];

const topDays = [
  { day: 'Friday', orders: 156, trend: '+12%' },
  { day: 'Saturday', orders: 142, trend: '+8%' },
  { day: 'Thursday', orders: 128, trend: '+5%' },
  { day: 'Wednesday', orders: 115, trend: '+3%' },
];

// Product Upload Trend Data
const uploadData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Products Added',
      data: [12, 19, 15, 25, 22, 30],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
      fill: true,
      pointRadius: 4,
      pointHoverRadius: 6,
    },
  ],
};

// Sales Trend Data
const salesData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Sales Revenue',
      data: [8500, 9200, 7800, 10500, 11200, 12800],
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      tension: 0.4,
      fill: true,
      pointRadius: 4,
      pointHoverRadius: 6,
    },
  ],
};

// Revenue by Category Data
const categoryData = {
  labels: ['Electronics', 'Home & Garden', 'Fashion', 'Sports', 'Books'],
  datasets: [
    {
      label: 'Revenue',
      data: [4200, 3800, 3200, 2800, 1500],
      backgroundColor: [
        '#3b82f6',
        '#10b981',
        '#f59e0b',
        '#ef4444',
        '#8b5cf6',
      ],
      borderWidth: 2,
      borderColor: '#ffffff',
    },
  ],
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

// Monthly Performance Data
const performanceData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Orders',
      data: [120, 135, 110, 160, 175, 190],
      backgroundColor: '#3b82f6',
      borderRadius: 4,
    },
    {
      label: 'Revenue',
      data: [8500, 9200, 7800, 10500, 11200, 12800],
      backgroundColor: '#10b981',
      borderRadius: 4,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
  scales: {
    y: { 
      beginAtZero: true,
      ticks: {
        stepSize: 5,
      },
    },
  },
};

const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: true },
    tooltip: { enabled: true },
  },
  scales: {
    y: { 
      beginAtZero: true,
    },
  },
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

export default function AnalyticsOverview() {
  const totalProducts = 123;
  const thisMonth = 30;
  const lastMonth = 22;

  return (
    <div className="space-y-6">
      {/* Best Selling Times - Full Width */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Best Selling Times</h2>
          <FontAwesomeIcon icon={faClock} className="text-blue-500 w-5 h-5" />
        </div>
        
        <div className="space-y-6">
          {/* Peak Hours and Top Sales Days in 2 columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Peak Hours */}
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-3">Peak Order Hours</h3>
              <div className="space-y-3">
                {peakHours.map((timeSlot, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{timeSlot.hour}</p>
                        <p className="text-xs text-gray-500">{timeSlot.orders} orders</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${timeSlot.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-gray-600">{timeSlot.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Top Sales Days */}
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-3">Top Sales Days</h3>
              <div className="space-y-3">
                {topDays.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{day.day}</p>
                        <p className="text-xs text-gray-500">{day.orders} orders</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-green-600 font-medium">{day.trend}</span>
                      <FontAwesomeIcon icon={faChartBar} className="text-green-500 w-3 h-3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Insights */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-500 w-4 h-4" />
              <h4 className="text-sm font-medium text-blue-900">Key Insights</h4>
            </div>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• Most orders placed at 8–11 PM</li>
              <li>• Friday is your top sales day</li>
              <li>• Consider extending evening hours</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Graph Cards - 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Upload Trend */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Product Upload Trend</h2>
            <FontAwesomeIcon icon={faUpload} className="text-blue-500 w-5 h-5" />
          </div>
          
          <div className="space-y-4">
            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
                <p className="text-xs text-gray-500">Total Products</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{thisMonth}</p>
                <p className="text-xs text-gray-500">This Month</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">+{thisMonth - lastMonth}</p>
                <p className="text-xs text-gray-500">vs Last Month</p>
              </div>
            </div>
            
            {/* Chart */}
            <div className="h-48">
              <Line data={uploadData} options={chartOptions} />
            </div>
            
            {/* Quick Actions */}
            <div className="space-y-2">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
                Add New Product
              </button>
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2 px-4 rounded-lg transition-colors">
                View Upload History
              </button>
            </div>
          </div>
        </div>

        {/* Sales Trend */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Sales Trend</h2>
            <FontAwesomeIcon icon={faChartLine} className="text-green-500 w-5 h-5" />
          </div>
          
          <div className="space-y-4">
            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">₱60,000</p>
                <p className="text-xs text-gray-500">Total Revenue</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">₱12,800</p>
                <p className="text-xs text-gray-500">This Month</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">+14%</p>
                <p className="text-xs text-gray-500">Growth</p>
              </div>
            </div>
            
            {/* Chart */}
            <div className="h-48">
              <Line data={salesData} options={chartOptions} />
            </div>
            
            {/* Quick Actions */}
            <div className="space-y-2">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                <FontAwesomeIcon icon={faDollarSign} className="w-4 h-4" />
                View Detailed Reports
              </button>
            </div>
          </div>
        </div>

        {/* Revenue by Category */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Revenue by Category</h2>
            <FontAwesomeIcon icon={faShoppingCart} className="text-purple-500 w-5 h-5" />
          </div>
          
          <div className="space-y-4">
            {/* Chart */}
            <div className="h-48">
              <Doughnut data={categoryData} options={doughnutOptions} />
            </div>
            
            {/* Category Breakdown */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Electronics</span>
                <span className="font-medium">₱4,200</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Home & Garden</span>
                <span className="font-medium">₱3,800</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Fashion</span>
                <span className="font-medium">₱3,200</span>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Performance */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Monthly Performance</h2>
            <FontAwesomeIcon icon={faChartBar} className="text-orange-500 w-5 h-5" />
          </div>
          
          <div className="space-y-4">
            {/* Summary Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-lg font-bold text-blue-600">890</p>
                <p className="text-xs text-gray-600">Total Orders</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-lg font-bold text-green-600">₱60,000</p>
                <p className="text-xs text-gray-600">Total Revenue</p>
              </div>
            </div>
            
            {/* Chart */}
            <div className="h-48">
              <Bar data={performanceData} options={barChartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 