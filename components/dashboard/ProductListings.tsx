'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSort, 
  faSortUp, 
  faSortDown, 
  faLightbulb, 
  faPlus, 
  faChartLine, 
  faExclamationTriangle, 
  faEye, 
  faEdit 
} from '@fortawesome/free-solid-svg-icons';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'Active' | 'Inactive' | 'Out of Stock';
  sku: string;
  dateAdded: string;
}

const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Premium Headphones', category: 'Electronics', price: 199.99, stock: 45, status: 'Active', sku: 'ELEC-001', dateAdded: '2024-06-01' },
  { id: '2', name: 'Wireless Mouse', category: 'Electronics', price: 49.99, stock: 0, status: 'Out of Stock', sku: 'ELEC-002', dateAdded: '2024-06-03' },
  { id: '3', name: 'Mechanical Keyboard', category: 'Electronics', price: 129.99, stock: 12, status: 'Active', sku: 'ELEC-003', dateAdded: '2024-06-05' },
  { id: '4', name: 'Gaming Monitor', category: 'Electronics', price: 299.99, stock: 8, status: 'Active', sku: 'ELEC-004', dateAdded: '2024-06-07' },
  { id: '5', name: 'Yoga Mat', category: 'Fitness', price: 29.99, stock: 30, status: 'Active', sku: 'FIT-001', dateAdded: '2024-06-10' },
  { id: '6', name: 'Running Shoes', category: 'Footwear', price: 89.99, stock: 20, status: 'Active', sku: 'FTWR-001', dateAdded: '2024-06-12' },
  { id: '7', name: 'Water Bottle', category: 'Fitness', price: 15.99, stock: 0, status: 'Out of Stock', sku: 'FIT-002', dateAdded: '2024-06-13' },
  { id: '8', name: 'Smart Watch', category: 'Electronics', price: 249.99, stock: 5, status: 'Active', sku: 'ELEC-005', dateAdded: '2024-06-15' },
  { id: '9', name: 'Desk Lamp', category: 'Home', price: 39.99, stock: 18, status: 'Active', sku: 'HOME-001', dateAdded: '2024-06-16' },
  { id: '10', name: 'Office Chair', category: 'Home', price: 159.99, stock: 2, status: 'Active', sku: 'HOME-002', dateAdded: '2024-06-17' },
  { id: '11', name: 'Bluetooth Speaker', category: 'Electronics', price: 79.99, stock: 0, status: 'Out of Stock', sku: 'ELEC-006', dateAdded: '2024-06-18' },
  { id: '12', name: 'T-shirt', category: 'Apparel', price: 19.99, stock: 100, status: 'Active', sku: 'APP-001', dateAdded: '2024-06-19' },
  { id: '13', name: 'Jeans', category: 'Apparel', price: 49.99, stock: 60, status: 'Active', sku: 'APP-002', dateAdded: '2024-06-20' },
  { id: '14', name: 'Sneakers', category: 'Footwear', price: 120.0, stock: 15, status: 'Active', sku: 'FTWR-002', dateAdded: '2024-06-21' },
  { id: '15', name: 'Sunglasses', category: 'Accessories', price: 59.99, stock: 25, status: 'Active', sku: 'ACC-001', dateAdded: '2024-06-22' },
  { id: '16', name: 'Backpack', category: 'Accessories', price: 69.99, stock: 10, status: 'Active', sku: 'ACC-002', dateAdded: '2024-06-23' },
  { id: '17', name: 'Notebook', category: 'Stationery', price: 9.99, stock: 200, status: 'Active', sku: 'STAT-001', dateAdded: '2024-06-24' },
  { id: '18', name: 'Pen Set', category: 'Stationery', price: 12.99, stock: 150, status: 'Active', sku: 'STAT-002', dateAdded: '2024-06-25' },
  { id: '19', name: 'Coffee Mug', category: 'Home', price: 14.99, stock: 40, status: 'Active', sku: 'HOME-003', dateAdded: '2024-06-26' },
  { id: '20', name: 'Desk Organizer', category: 'Home', price: 24.99, stock: 35, status: 'Active', sku: 'HOME-004', dateAdded: '2024-06-27' },
];

const ROWS_OPTIONS = [5, 10, 20];

// Product Suggestions Data
const productSuggestions = [
  {
    id: 1,
    name: 'Handmade Ceramic Plant Pots',
    reason: 'Similar vendors are selling this product with 85% success rate',
    category: 'Home & Garden',
    estimatedRevenue: 2400,
    demand: 'High',
  },
  {
    id: 2,
    name: 'Natural Beeswax Candles',
    reason: 'Trending in your category with 120% growth this month',
    category: 'Home & Garden',
    estimatedRevenue: 1800,
    demand: 'Medium',
  },
  {
    id: 3,
    name: 'Bamboo Kitchen Utensils Set',
    reason: 'High conversion rate among your target audience',
    category: 'Kitchen',
    estimatedRevenue: 3200,
    demand: 'High',
  },
];

// Low Performing Products Data
const lowPerformingProducts = [
  {
    id: 1,
    name: 'Vintage Style Notebook',
    category: 'Stationery',
    daysWithoutSales: 75,
    lastView: '2 weeks ago',
    price: 450,
  },
  {
    id: 2,
    name: 'Handmade Beaded Bracelet',
    category: 'Jewelry',
    daysWithoutSales: 68,
    lastView: '1 week ago',
    price: 280,
  },
  {
    id: 3,
    name: 'Organic Cotton Towel Set',
    category: 'Home & Garden',
    daysWithoutSales: 72,
    lastView: '3 weeks ago',
    price: 1200,
  },
  {
    id: 4,
    name: 'Bamboo Toothbrush Holder',
    category: 'Bathroom',
    daysWithoutSales: 65,
    lastView: '1 month ago',
    price: 350,
  },
  {
    id: 5,
    name: 'Natural Wood Coaster Set',
    category: 'Kitchen',
    daysWithoutSales: 70,
    lastView: '2 weeks ago',
    price: 580,
  },
];

type SortField = 'name' | 'category' | 'price' | 'stock' | 'status' | 'sku' | 'dateAdded';
type SortDirection = 'asc' | 'desc';

export default function ProductListings() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('dateAdded');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const filteredProducts = MOCK_PRODUCTS.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.category.toLowerCase().includes(search.toLowerCase())
  );

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

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / rowsPerPage);
  const paginatedProducts = sortedProducts.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const getStatusColor = (status: Product['status']) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'High':
        return 'text-green-600 bg-green-100';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'Low':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Product Suggestions and Low Performing Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Suggestions */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Product Suggestions</h2>
            <FontAwesomeIcon icon={faLightbulb} className="text-yellow-500 w-5 h-5" />
          </div>
          
          <div className="space-y-4 flex-1">
            {productSuggestions.map((suggestion) => (
              <div key={suggestion.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 text-sm">{suggestion.name}</h3>
                    <p className="text-xs text-gray-600 mt-1">{suggestion.reason}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDemandColor(suggestion.demand)}`}>{suggestion.demand}</span>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span className="bg-gray-100 px-2 py-0.5 rounded">{suggestion.category}</span>
                  <span className="font-medium text-green-600">₱{suggestion.estimatedRevenue.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-xs font-medium transition-colors">
                    <FontAwesomeIcon icon={faPlus} className="w-3 h-3" />
                    Add Product
                  </button>
                  <span className="text-gray-300">•</span>
                  <button className="flex items-center gap-1 text-gray-600 hover:text-gray-800 text-xs transition-colors">
                    <FontAwesomeIcon icon={faChartLine} className="w-3 h-3" />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <FontAwesomeIcon icon={faLightbulb} className="text-yellow-500 w-4 h-4" />
                <h4 className="text-sm font-medium text-yellow-900">Tip</h4>
              </div>
              <p className="text-xs text-yellow-800">
                Explore these suggestions to expand your product catalog and boost your sales potential!
              </p>
            </div>
            <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 mt-auto">
              <FontAwesomeIcon icon={faLightbulb} className="w-4 h-4" />
              Get More Suggestions
            </button>
          </div>
        </div>

        {/* Low Performing Products */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Low Performing Products</h2>
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {lowPerformingProducts.length} Products
            </span>
          </div>
          
          <div className="space-y-3 flex-1">
            {lowPerformingProducts.map((product) => (
              <div key={product.id} className="border border-orange-200 bg-orange-50 rounded-lg p-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <FontAwesomeIcon icon={faExclamationTriangle} className="text-orange-500 w-3 h-3" />
                      <h3 className="font-medium text-gray-900 text-sm">{product.name}</h3>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span>No sales in {product.daysWithoutSales} days</span>
                      <span>Last view: {product.lastView}</span>
                      <span className="bg-gray-100 px-2 py-0.5 rounded">{product.category}</span>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Price: ₱{product.price.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-xs font-medium transition-colors">
                      <FontAwesomeIcon icon={faEye} className="w-3 h-3" />
                      View
                    </button>
                    <button className="flex items-center gap-1 text-gray-600 hover:text-gray-800 text-xs transition-colors">
                      <FontAwesomeIcon icon={faEdit} className="w-3 h-3" />
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <FontAwesomeIcon icon={faExclamationTriangle} className="text-orange-500 w-4 h-4" />
                <h4 className="text-sm font-medium text-orange-900">Recommendation</h4>
              </div>
              <p className="text-xs text-orange-800">
                Consider updating product descriptions, adjusting prices, or running promotions to boost visibility.
              </p>
            </div>
            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors mt-auto">
              Review All Low Performers
            </button>
          </div>
        </div>
      </div>

      {/* Product Listings Table */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 px-2 pb-2">
        <h2 className="text-lg font-bold text-gray-900">Product Listings</h2>
        <input
          type="text"
          placeholder="Search products or categories..."
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>
      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-full divide-y divide-gray-200 rounded-xl overflow-hidden">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-1">
                Product
                  <FontAwesomeIcon icon={getSortIcon('name')} className="w-3 h-3" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('category')}
              >
                <div className="flex items-center gap-1">
                Category
                  <FontAwesomeIcon icon={getSortIcon('category')} className="w-3 h-3" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('price')}
              >
                <div className="flex items-center gap-1">
                Price
                  <FontAwesomeIcon icon={getSortIcon('price')} className="w-3 h-3" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('stock')}
              >
                <div className="flex items-center gap-1">
                Stock
                  <FontAwesomeIcon icon={getSortIcon('stock')} className="w-3 h-3" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center gap-1">
                Status
                  <FontAwesomeIcon icon={getSortIcon('status')} className="w-3 h-3" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('sku')}
              >
                <div className="flex items-center gap-1">
                  SKU
                  <FontAwesomeIcon icon={getSortIcon('sku')} className="w-3 h-3" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('dateAdded')}
              >
                <div className="flex items-center gap-1">
                  Date Added
                  <FontAwesomeIcon icon={getSortIcon('dateAdded')} className="w-3 h-3" />
                </div>
              </th>
              <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedProducts.map((product, idx) => (
              <tr
                key={product.id}
                className={
                  idx % 2 === 0
                    ? 'bg-white hover:bg-blue-50/60 shadow-sm hover:shadow-md transition-shadow duration-200'
                    : 'bg-gray-50 hover:bg-blue-50/60 shadow-sm hover:shadow-md transition-shadow duration-200'
                }
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-gray-900">{product.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{product.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.stock}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                      product.status
                    )}`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-xs text-gray-700 font-mono">{product.sku}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-xs text-gray-500">{product.dateAdded}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button className="px-3 py-1 rounded-full bg-blue-500 text-white text-xs font-semibold hover:bg-blue-600 transition">View</button>
                </td>
              </tr>
            ))}
            {paginatedProducts.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-8 text-gray-400 text-sm">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination and Rows Dropdown */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 px-2 py-4 bg-gray-50 border-t border-gray-200 rounded-b-2xl">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-black">Rows per page:</span>
          <div className="relative">
            <select
              className="appearance-none border border-gray-300 bg-white text-black font-semibold rounded-md px-4 py-1.5 text-xs pr-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black hover:border-gray-500 transition"
              value={rowsPerPage}
              onChange={e => {
                setRowsPerPage(Number(e.target.value));
                setPage(1);
              }}
            >
              {ROWS_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
              ▼
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 rounded-full border border-gray-300 text-xs text-gray-600 hover:bg-blue-100 hover:text-blue-700 transition disabled:opacity-50"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Prev
          </button>
          <span className="text-xs text-gray-700 font-semibold">
            Page {page} of {totalPages}
          </span>
          <button
            className="px-3 py-1 rounded-full border border-gray-300 text-xs text-gray-600 hover:bg-blue-100 hover:text-blue-700 transition disabled:opacity-50"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      </div>
    </div>
  );
} 