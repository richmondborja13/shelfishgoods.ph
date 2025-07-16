'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faBullhorn, faRocket } from '@fortawesome/free-solid-svg-icons';

export default function AdminShortcuts() {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Quick Add Product */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faPlus} className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Quick Add Product</h3>
              <p className="text-sm text-gray-600">Add a new product listing</p>
            </div>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
            Add Product
          </button>
        </div>
        
        {/* Promote Product */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faBullhorn} className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Promote Product</h3>
              <p className="text-sm text-gray-600">Boost visibility with ads</p>
            </div>
          </div>
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
            Start Promotion
          </button>
        </div>
        
        {/* Featured Listing */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faRocket} className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Featured Listing</h3>
              <p className="text-sm text-gray-600">Get premium placement</p>
            </div>
          </div>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
            Upgrade to Featured
          </button>
        </div>
      </div>
      
      {/* Additional Quick Actions */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-3">
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-3 px-4 rounded-lg transition-colors">
          View Analytics
        </button>
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-3 px-4 rounded-lg transition-colors">
          Manage Orders
        </button>
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-3 px-4 rounded-lg transition-colors">
          Customer Support
        </button>
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-3 px-4 rounded-lg transition-colors">
          Settings
        </button>
      </div>
    </div>
  );
} 