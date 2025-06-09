import { ArrowDownLeft, CreditCard, DollarSign, Users } from "lucide-react";

const AdminOverview = () => (
  <div className="p-6  overflow-y-auto h-screen">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">
      Dashboard Overview
    </h2>

    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-400">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Users</p>
            <p className="text-2xl font-bold text-gray-900">1,234</p>
          </div>
          <Users className="h-8 w-8 text-green-400" />
        </div>
        <p className="text-xs text-green-600 mt-2">↗ 12% from last month</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-400">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              Total Transactions
            </p>
            <p className="text-2xl font-bold text-gray-900">5,678</p>
          </div>
          <CreditCard className="h-8 w-8 text-blue-400" />
        </div>
        <p className="text-xs text-blue-600 mt-2">↗ 8% from last month</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-400">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Revenue</p>
            <p className="text-2xl font-bold text-gray-900">$45,234</p>
          </div>
          <DollarSign className="h-8 w-8 text-purple-400" />
        </div>
        <p className="text-xs text-purple-600 mt-2">↗ 15% from last month</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-400">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              Pending Withdrawals
            </p>
            <p className="text-2xl font-bold text-gray-900">23</p>
          </div>
          <ArrowDownLeft className="h-8 w-8 text-orange-400" />
        </div>
        <p className="text-xs text-orange-600 mt-2">↗ 3% from last month</p>
      </div>
    </div>
  </div>
);
export default AdminOverview;
