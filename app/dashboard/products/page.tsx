'use client';

import ProductListings from '@/components/dashboard/ProductListings';
import Sidebar from '@/components/dashboard/Sidebar';

export default function ProductsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Products</h1>
        <ProductListings />
      </main>
    </div>
  );
} 