/**
 * DashboardStats Component
 *
 * Front-end Guidelines:
 * - Displays key business statistics in card format with icons and trend indicators.
 * - Uses Chart.js for data visualization and FontAwesome for icons.
 * - Accepts no props; stats are currently hardcoded but should be replaced with dynamic data.
 * - UI/UX: Cards are interactive with hover effects, color-coded for positive/negative trends.
 *
 * Back-end Follow-through:
 * - Replace hardcoded stats with data fetched from the back-end (e.g., sales, products, etc.).
 * - Ensure API endpoints provide the required statistics in the expected format.
 * - Handle loading and error states for data fetching.
 * - Consider caching or optimizing API calls for dashboard performance.
 */
"use client";

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
} from "chart.js";
import { Line, Pie, Bar } from "react-chartjs-2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faDollarSign, 
  faBoxOpen, 
  faShoppingCart, 
  faChartLine,
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

/**
 * Props for StatCard component
 * - Used to display a single statistic card on the dashboard
 */
interface StatCardProps {
  title: string; // Title of the statistic (e.g., "Total Sales")
  value: string | number; // Value to display (e.g., "$24,567")
  change: string; // Percentage or value change (e.g., "12.5%")
  isPositive: boolean; // Indicates if the change is positive or negative
  icon: any; // Icon to display (FontAwesome)
  color: string; // Tailwind color class for icon and highlights
}

/**
 * StatCard component
 * - Renders a single dashboard statistic with icon, value, and trend
 * - UI/UX: Color and icon indicate positive/negative trends
 */
function StatCard({ title, value, change, isPositive, icon, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-100 p-4 hover:shadow-lg transition-all duration-300 group">
      <div className="flex items-center justify-between mb-3">
        {/* Icon with color and background */}
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300`}>
          <FontAwesomeIcon icon={icon} className={`w-4 h-4 ${color}`} />
        </div>
        {/* Change indicator with up/down arrow */}
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
          isPositive 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          <FontAwesomeIcon 
            icon={isPositive ? faArrowUp : faArrowDown} 
            className="w-2 h-2" 
          />
          <span>{change}</span>
        </div>
      </div>
      
      <div className="space-y-1">
        {/* Statistic title and value */}
        <h3 className="text-xs font-medium text-gray-600 uppercase tracking-wide">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-100">
        {/* Comparison to previous period */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>vs last month</span>
          <span className={`font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '+' : ''}{change}
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * DashboardStats main component
 * - Displays a grid of StatCards for key business metrics
 * - TODO: Replace hardcoded stats with API data
 */
export default function DashboardStats() {
  // Example stats array; should be fetched from back-end
  const stats = [
    {
      title: "Total Sales",
      value: "$24,567",
      change: "12.5%",
      isPositive: true,
      icon: faDollarSign,
      color: "text-green-600",
    },
    {
      title: "Active Products",
      value: "156",
      change: "3.2%",
      isPositive: true,
      icon: faBoxOpen,
      color: "text-blue-600",
    },
    {
      title: "Total Orders",
      value: "892",
      change: "2.4%",
      isPositive: false,
      icon: faShoppingCart,
      color: "text-purple-600",
    },
    {
      title: "Average Order Value",
      value: "$27.54",
      change: "5.1%",
      isPositive: true,
      icon: faChartLine,
      color: "text-orange-600",
    },
  ];

  // mock data for Sales Over Time (Line Chart)
  const salesLineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Sales",
        data: [3000, 4000, 3200, 5000, 4200, 6000, 7000],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Example data for Product Category Breakdown (Pie Chart)
  const categoryPieData = {
    labels: ["Electronics", "Clothing", "Home", "Beauty", "Other"],
    datasets: [
      {
        label: "Products",
        data: [40, 25, 15, 10, 10],
        backgroundColor: [
          "#2563eb",
          "#60a5fa",
          "#818cf8",
          "#fbbf24",
          "#f87171",
        ],
        borderWidth: 1,
      },
    ],
  };

  // mock data for Top Selling Products (Bar Chart)
  const topProductsBarData = {
    labels: ["Laptop", "Shirt", "Sofa", "Lipstick", "Book"],
    datasets: [
      {
        label: "Units Sold",
        data: [120, 90, 70, 50, 40],
        backgroundColor: [
          "#2563eb",
          "#60a5fa",
          "#818cf8",
          "#fbbf24",
          "#f87171",
        ],
      },
    ],
  };

  // mock data for Order Status (Pie Chart)
  const orderStatusPieData = {
    labels: ["Completed", "Pending", "Cancelled"],
    datasets: [
      {
        label: "Orders",
        data: [70, 20, 10],
        backgroundColor: ["#22c55e", "#fbbf24", "#ef4444"],
        borderWidth: 1,
      },
    ],
  };

  // mock data for Customer Growth (Line Chart)
  const customerGrowthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Customers",
        data: [100, 120, 150, 180, 220, 260, 300],
        borderColor: "#10b981",
        backgroundColor: "rgba(16,185,129,0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // mock data for Monthly New Orders (Bar Chart)
  const monthlyOrdersData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "New Orders",
        data: [50, 70, 65, 90, 80, 110, 120],
        backgroundColor: "#f59e42",
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Sales Over Time</h3>
                <p className="text-sm text-gray-500">Monthly revenue trends</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Revenue</span>
              </div>
            </div>
            <div className="h-48">
              <Line data={salesLineData} options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { 
                  legend: { display: false },
                  tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: 'white',
                    bodyColor: 'white',
                    borderColor: '#3b82f6',
                    borderWidth: 1,
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
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Product Categories</h3>
                <p className="text-sm text-gray-500">Distribution by category</p>
              </div>
              <div className="text-xs text-gray-500">Total: 156 products</div>
            </div>
            <div className="h-64">
              <Pie data={categoryPieData}
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
                      borderColor: '#3b82f6',
                      borderWidth: 1,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Top Selling Products</h3>
                <p className="text-sm text-gray-500">Best performing items</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Units sold</span>
              </div>
            </div>
            <div className="h-48">
              <Bar data={topProductsBarData} options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { 
                  legend: { display: false },
                  tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: 'white',
                    bodyColor: 'white',
                    borderColor: '#3b82f6',
                    borderWidth: 1,
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
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Order Status</h3>
                <p className="text-sm text-gray-500">Current order distribution</p>
              </div>
              <div className="text-xs text-gray-500">Total: 892 orders</div>
            </div>
            <div className="h-64">
              <Pie
                data={orderStatusPieData}
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
                      borderColor: '#3b82f6',
                      borderWidth: 1,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Customer Growth</h3>
              <p className="text-sm text-gray-500">New customer acquisition</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Customers</span>
            </div>
          </div>
          <div className="h-56">
            <Line data={customerGrowthData} options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { 
                legend: { display: false },
                tooltip: {
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  titleColor: 'white',
                  bodyColor: 'white',
                  borderColor: '#10b981',
                  borderWidth: 1,
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
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Monthly New Orders</h3>
              <p className="text-sm text-gray-500">Order volume trends</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Orders</span>
            </div>
          </div>
          <div className="h-56">
            <Bar data={monthlyOrdersData} options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { 
                legend: { display: false },
                tooltip: {
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  titleColor: 'white',
                  bodyColor: 'white',
                  borderColor: '#f59e0b',
                  borderWidth: 1,
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
      </div>
    </div>
  );
} 