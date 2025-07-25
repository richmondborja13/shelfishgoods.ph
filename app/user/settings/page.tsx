'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import Settings from '@/components/dashboard/user/Settings';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8">
        <Settings />
      </div>
    </div>
  );
}