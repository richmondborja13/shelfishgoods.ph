'use client';

import SalesChart from '@/components/dashboard/SalesChart';
import Sidebar from '@/components/dashboard/Sidebar';

export default function SalesPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8 overflow-x-hidden max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Sales</h1>
        <SalesChart />
      </main>
    </div>
  );
} 