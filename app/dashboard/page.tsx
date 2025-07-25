'use client';

import DashboardStats from '@/components/dashboard/DashboardStats';
import Sidebar from '@/components/dashboard/Sidebar';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard</h1>
        <DashboardStats />
      </main>
    </div>
  );
} 