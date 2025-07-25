/**
 * InventoryOverview Component
 *
 * Front-end Guidelines:
 * - Shows low stock alerts, top viewed products, and product performance metrics.
 * - Uses FontAwesome icons for status and actions.
 * - Supports sorting by various product metrics.
 * - UI/UX: Highlights critical inventory issues and trends.
 *
 * Back-end Follow-through:
 * - Replace mock data with API calls for real inventory and analytics.
 * - Ensure endpoints provide data for low stock, views, and performance.
 * - Integrate with inventory management and analytics endpoints.
 */
'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSort, 
  faSortUp, 
  faSortDown, 
  faExclamationTriangle, 
  faEye, 
  faChartLine 
} from '@fortawesome/free-solid-svg-icons';

// Low Stock Alerts mock data
const lowStockProducts = [
  { id: 1, name: 'Organic Cotton T-Shirt', stock: 3, minStock: 10, category: 'Clothing' },
  { id: 2, name: 'Handmade Ceramic Mug', stock: 2, minStock: 15, category: 'Home & Garden' },
  { id: 3, name: 'Bamboo Cutting Board', stock: 1, minStock: 8, category: 'Kitchen' },
  { id: 4, name: 'Natural Soap Bar', stock: 4, minStock: 20, category: 'Beauty' },
  { id: 5, name: 'Wooden Phone Stand', stock: 2, minStock: 12, category: 'Electronics' },
];

// Top Viewed Products mock data
const topViewedProducts = [
  { id: 1, name: 'Handmade Leather Wallet', views: 1247, trend: '+12%', category: 'Accessories' },
  { id: 2, name: 'Organic Cotton T-Shirt', views: 1156, trend: '+8%', category: 'Clothing' },
  { id: 3, name: 'Bamboo Cutting Board', views: 987, trend: '+15%', category: 'Kitchen' },
  { id: 4, name: 'Natural Soap Bar', views: 856, trend: '+5%', category: 'Beauty' },
  { id: 5, name: 'Wooden Phone Stand', views: 743, trend: '+22%', category: 'Electronics' },
];

// Product Performance mock data
const productPerformanceData = [
  {
    id: 1,
    name: 'Handmade Leather Wallet',
    views: 1247,
    addToCarts: 89,
    sales: 67,
    conversionRate: 5.4,
    revenue: 1340,
  },
  {
    id: 2,
    name: 'Organic Cotton T-Shirt',
    views: 1156,
    addToCarts: 156,
    sales: 98,
    conversionRate: 8.5,
    revenue: 980,
  },
  {
    id: 3,
    name: 'Bamboo Cutting Board',
    views: 987,
    addToCarts: 78,
    sales: 45,
    conversionRate: 4.6,
    revenue: 675,
  },
  {
    id: 4,
    name: 'Natural Soap Bar',
    views: 856,
    addToCarts: 92,
    sales: 73,
    conversionRate: 8.5,
    revenue: 365,
  },
  {
    id: 5,
    name: 'Wooden Phone Stand',
    views: 743,
    addToCarts: 45,
    sales: 32,
    conversionRate: 4.3,
    revenue: 640,
  },
  {
    id: 6,
    name: 'Handmade Ceramic Mug',
    views: 654,
    addToCarts: 67,
    sales: 41,
    conversionRate: 6.3,
    revenue: 410,
  },
];

type SortField = 'name' | 'views' | 'addToCarts' | 'sales' | 'conversionRate' | 'revenue';
type SortDirection = 'asc' | 'desc';

export default function InventoryOverview() {
  const [sortField, setSortField] = useState<SortField>('revenue');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return faSort;
    return sortDirection === 'asc' ? faSortUp : faSortDown;
  };

  const sortedData = [...productPerformanceData].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Alerts */}
        <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Low Stock Alerts</h2>
          <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {lowStockProducts.length} Products
          </span>
        </div>
        
        <div className="space-y-3">
          {lowStockProducts.map((product) => (
            <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500 w-4 h-4" />
                  <h3 className="font-medium text-gray-900 text-sm">{product.name}</h3>
                </div>
                <div className="flex items-center gap-4 mt-1 text-xs text-gray-600">
                  <span>Stock: <span className="font-semibold text-red-600">{product.stock}</span></span>
                  <span>Min: {product.minStock}</span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded">{product.category}</span>
                </div>
              </div>
              <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-xs font-medium transition-colors">
                <FontAwesomeIcon icon={faEye} className="w-3 h-3" />
                View
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
            View All Low Stock Products
          </button>
        </div>
      </div>

      {/* Top Viewed Products */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Top Viewed Products</h2>
          <FontAwesomeIcon icon={faChartLine} className="text-green-500 w-5 h-5" />
        </div>
        
        <div className="space-y-3">
          {topViewedProducts.map((product, index) => (
            <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 text-sm">{product.name}</h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                    <span className="bg-gray-100 px-2 py-0.5 rounded">{product.category}</span>
                    <span className="text-green-600 font-medium">{product.trend}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FontAwesomeIcon icon={faEye} className="w-4 h-4" />
                <span className="font-medium">{product.views.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2 px-4 rounded-lg transition-colors">
            View All Product Analytics
          </button>
        </div>
      </div>
      </div>

      {/* Product Performance Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Product Performance</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('views')}
                >
                  <div className="flex items-center gap-1">
                    Views
                    <FontAwesomeIcon icon={getSortIcon('views')} className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('addToCarts')}
                >
                  <div className="flex items-center gap-1">
                    Add to Carts
                    <FontAwesomeIcon icon={getSortIcon('addToCarts')} className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('sales')}
                >
                  <div className="flex items-center gap-1">
                    Sales
                    <FontAwesomeIcon icon={getSortIcon('sales')} className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('conversionRate')}
                >
                  <div className="flex items-center gap-1">
                    Conversion Rate
                    <FontAwesomeIcon icon={getSortIcon('conversionRate')} className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('revenue')}
                >
                  <div className="flex items-center gap-1">
                    Revenue
                    <FontAwesomeIcon icon={getSortIcon('revenue')} className="w-3 h-3" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedData.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.views.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.addToCarts}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.sales}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.conversionRate}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">₱{product.revenue.toLocaleString()}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 