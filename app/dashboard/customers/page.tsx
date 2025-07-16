import Sidebar from '@/components/dashboard/Sidebar';
import CustomerInteraction from '@/components/dashboard/CustomerInteraction';

export default function CustomersPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Customer Interaction</h1>
          
          <CustomerInteraction />
        </div>
      </main>
    </div>
  );
} 