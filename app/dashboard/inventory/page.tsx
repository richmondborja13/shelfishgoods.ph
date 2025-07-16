import Sidebar from '@/components/dashboard/Sidebar';
import InventoryOverview from '@/components/dashboard/InventoryOverview';

export default function InventoryPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Inventory Management</h1>
          
          <InventoryOverview />
        </div>
      </main>
    </div>
  );
} 