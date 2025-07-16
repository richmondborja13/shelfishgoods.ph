import Sidebar from '@/components/dashboard/Sidebar';
import FinancialOverview from '@/components/dashboard/FinancialOverview';

export default function FinancialPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Financial Overview</h1>
          
          <FinancialOverview />
        </div>
      </main>
    </div>
  );
} 