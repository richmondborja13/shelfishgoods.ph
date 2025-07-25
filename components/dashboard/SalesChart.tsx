/**
 * SalesChart Component
 *
 * Front-end Guidelines:
 * - Visualizes sales data over different time ranges (Today, Week, Month, Year).
 * - Uses Chart.js for graphs and FontAwesome for icons.
 * - Displays top selling products, sales by category, and recent orders.
 * - UI/UX: Interactive, filterable, and visually clear.
 *
 * Back-end Follow-through:
 * - Replace mock data with API calls for real sales, products, and orders.
 * - Ensure endpoints provide data in the expected format for charts and tables.
 * - Handle loading, error, and empty states for all data sections.
 */
'use client';

import { useState } from 'react';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTrophy, 
  faShoppingCart, 
  faDollarSign, 
  faChartLine,
  faUsers,
  faStar,
  faEye,
  faArrowUp,
  faArrowDown
} from '@fortawesome/free-solid-svg-icons';

// Register Chart.js components for use in charts
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

// Time range options for filtering sales data
const timeRanges = ['Today', 'Week', 'Month', 'Year'];
// Labels for x-axis in different views
const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
const days = Array.from({ length: 31 }, (_, i) => String(i + 1));
const years = Array.from({ length: 6 }, (_, i) => String(2020 + i));

// Mock data for sales graph overview
const salesDataByRange: Record<string, { labels: string[]; values: number[] }> = {
  Today: {
    labels: ['Mon'],
    values: [1800],
  },
  Week: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    values: [1200, 1900, 1500, 2100, 1800, 2400, 2000],
  },
  Month: {
    labels: [
      'Week 1', 'Week 2', 'Week 3', 'Week 4'
    ],
    values: [9000, 11000, 10500, 12000],
  },
  Year: {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    values: [32000, 28000, 35000, 37000, 39000, 41000, 43000, 42000, 40000, 39000, 38000, 41000],
  },
};

// Mock data for Top Selling Products
const topSellingProducts = [
  { id: 1, name: 'Premium Wireless Headphones', sales: 234, revenue: 46800, growth: '+15%', category: 'Electronics' },
  { id: 2, name: 'Organic Cotton T-Shirt', sales: 189, revenue: 3780, growth: '+8%', category: 'Apparel' },
  { id: 3, name: 'Smart Fitness Watch', sales: 156, revenue: 31200, growth: '+22%', category: 'Electronics' },
  { id: 4, name: 'Handmade Ceramic Mug', sales: 142, revenue: 2840, growth: '+5%', category: 'Home' },
  { id: 5, name: 'Natural Face Cream', sales: 128, revenue: 2560, growth: '+12%', category: 'Beauty' },
];

// Mock data for Sales by Category (for doughnut chart)
const salesByCategoryData = {
  labels: ['Electronics', 'Apparel', 'Home', 'Beauty', 'Sports'],
  datasets: [
    {
      data: [45, 25, 15, 10, 5],
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

// mock data for Recent Orders
const recentOrders = [
  { id: '#ORD-001', customer: 'Maria Santos', amount: 299.99, status: 'Completed', date: '2 hours ago', product: 'Wireless Headphones' },
  { id: '#ORD-002', customer: 'John Dela Cruz', amount: 89.99, status: 'Processing', date: '4 hours ago', product: 'Cotton T-Shirt' },
  { id: '#ORD-003', customer: 'Ana Rodriguez', amount: 159.99, status: 'Completed', date: '6 hours ago', product: 'Smart Watch' },
  { id: '#ORD-004', customer: 'Carlos Mendoza', amount: 45.99, status: 'Shipped', date: '8 hours ago', product: 'Ceramic Mug Set' },
  { id: '#ORD-005', customer: 'Lisa Chen', amount: 199.99, status: 'Processing', date: '10 hours ago', product: 'Fitness Tracker' },
];

// mock data for Sales Metrics
const salesMetrics = [
  { title: 'Total Revenue', value: '$124,567', change: '+12.5%', isPositive: true, icon: faDollarSign, color: 'text-green-600' },
  { title: 'Orders Today', value: '156', change: '+8.2%', isPositive: true, icon: faShoppingCart, color: 'text-blue-600' },
  { title: 'Avg Order Value', value: '$79.85', change: '+5.1%', isPositive: true, icon: faChartLine, color: 'text-purple-600' },
  { title: 'Conversion Rate', value: '3.2%', change: '-0.8%', isPositive: false, icon: faUsers, color: 'text-orange-600' },
];

export default function SalesChart() {
  const [selectedRange, setSelectedRange] = useState('Week');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(months[new Date().getMonth()]);
  const [selectedDayNum, setSelectedDayNum] = useState(String(new Date().getDate()));
  const [selectedYear, setSelectedYear] = useState(String(new Date().getFullYear()));
  const salesData = salesDataByRange[selectedRange];

  const lineData = {
    labels: salesData.labels,
    datasets: [
      {
        label: 'Sales',
        data: salesData.values,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37,99,235,0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Sales Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {salesMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md border border-gray-100 p-4 hover:shadow-lg transition-all duration-300 group">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${metric.color} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300`}>
                <FontAwesomeIcon icon={metric.icon} className={`w-4 h-4 ${metric.color}`} />
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                metric.isPositive 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                <FontAwesomeIcon 
                  icon={metric.isPositive ? faArrowUp : faArrowDown} 
                  className="w-2 h-2" 
                />
                <span>{metric.change}</span>
              </div>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-xs font-medium text-gray-600 uppercase tracking-wide">{metric.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>vs last period</span>
                <span className={`font-medium ${metric.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.isPositive ? '+' : ''}{metric.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Sales Chart */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex flex-row items-center justify-between gap-2 w-full">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Sales Overview</h2>
              <p className="text-sm text-gray-500">Track your sales performance</p>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="flex flex-wrap items-center gap-2 md:gap-4">
                {timeRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() => {
                      setSelectedRange(range);
                      if (range !== 'Week') setSelectedDay('');
                    }}
                    className={`px-3 py-1 text-sm rounded-md transition-colors duration-150 ${
                      selectedRange === range
                        ? 'bg-blue-100 text-blue-700 font-semibold'
                        : 'text-gray-500 hover:text-blue-700 hover:bg-blue-50'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-none min-w-[110px] flex justify-end">
              {selectedRange === 'Week' ? (
                <div className="flex items-center gap-1">
                  <span className="text-xs font-semibold text-gray-700">Day:</span>
                  <select
                    value={selectedDay}
                    onChange={e => setSelectedDay(e.target.value)}
                    className="border border-blue-300 bg-white text-blue-700 font-semibold rounded-md px-3 py-1 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 hover:border-blue-400 transition"
                  >
                    <option value="">All</option>
                    {daysOfWeek.map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="invisible select-none" aria-hidden="true">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-semibold text-gray-700">Day:</span>
                    <select className="border border-blue-300 bg-white text-blue-700 font-semibold rounded-md px-3 py-1 text-xs shadow-sm"></select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="h-64">
          {selectedRange === 'Today' ? (
            <Bar
              data={{
                labels: salesData.labels,
                datasets: [
                  {
                    label: 'Sales',
                    data: salesData.values,
                    backgroundColor: '#2563eb',
                    borderRadius: 6,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: { 
                    enabled: true,
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: 'white',
                    bodyColor: 'white',
                  },
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
              }}
            />
          ) : selectedRange === 'Week' && selectedDay ? (
            <Bar
              data={{
                labels: [selectedDay],
                datasets: [
                  {
                    label: 'Sales',
                    data: [salesData.values[salesData.labels.indexOf(selectedDay)]],
                    backgroundColor: '#2563eb',
                    borderRadius: 6,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: { 
                    enabled: true,
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: 'white',
                    bodyColor: 'white',
                  },
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
              }}
            />
          ) : (
            <Line
              data={lineData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: { 
                    enabled: true,
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: 'white',
                    bodyColor: 'white',
                  },
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
              }}
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Products */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Top Selling Products</h3>
              <p className="text-sm text-gray-500">Best performing items this period</p>
            </div>
            <FontAwesomeIcon icon={faTrophy} className="text-yellow-500 w-5 h-5" />
          </div>
          
          <div className="space-y-4">
            {topSellingProducts.map((product, index) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">₱{product.revenue.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{product.sales} units</p>
                  <span className={`text-xs font-medium ${product.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {product.growth}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
              <p className="text-sm text-gray-500">Latest customer orders</p>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">View All</button>
          </div>
          
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faShoppingCart} className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{order.customer}</p>
                    <p className="text-xs text-gray-500">{order.product}</p>
                    <p className="text-xs text-gray-400">{order.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">₱{order.amount}</p>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 