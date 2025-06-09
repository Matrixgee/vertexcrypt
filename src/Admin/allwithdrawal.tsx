import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { toast } from "react-hot-toast";

const mockWithdrawals = [
  {
    _id: "wd123456",
    userId: { userName: "johndoe" },
    amount: 500,
    mode: "Bank Transfer",
    status: "pending",
    date: "2025-06-01",
  },
  {
    _id: "wd123457",
    userId: { userName: "janedoe" },
    amount: 300,
    mode: "Crypto",
    status: "processing",
    date: "2025-06-03",
  },
  {
    _id: "wd123458",
    userId: { userName: "richinvestor" },
    amount: 1200,
    mode: "PayPal",
    status: "approved",
    date: "2025-06-05",
  },
];

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const AllWithdrawal = () => {
  const [withdrawals, setWithdrawals] = useState(mockWithdrawals);

  const updateStatus = (_id: string, newStatus: string) => {
    setWithdrawals((prev) =>
      prev.map((item) =>
        item._id === _id ? { ...item, status: newStatus } : item
      )
    );
    toast.success(`Withdrawal marked as ${newStatus}`);
  };

  return (
    <div className="h-full w-full p-6 bg-green-50">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Manage Client Withdrawals
      </h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-[900px] w-full text-sm text-left">
          <thead className="bg-green-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Method</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {withdrawals.map((withdrawal) => (
              <tr
                key={withdrawal._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 font-mono text-gray-700">
                  {withdrawal._id.slice(0, 6)}
                </td>
                <td className="px-4 py-3">{withdrawal.userId?.userName}</td>
                <td className="px-4 py-3 font-semibold text-gray-800">
                  ${withdrawal.amount}
                </td>
                <td className="px-4 py-3">{withdrawal.mode}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                      statusColors[
                        withdrawal.status as keyof typeof statusColors
                      ]
                    }`}
                  >
                    {withdrawal.status}
                  </span>
                </td>
                <td className="px-4 py-3">{withdrawal.date}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => updateStatus(withdrawal._id, "approved")}
                      className="text-green-600 border border-green-200 bg-green-50 hover:bg-green-100 px-3 py-1 rounded text-xs font-medium"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(withdrawal._id, "processing")}
                      className="text-blue-600 border border-blue-200 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded text-xs font-medium"
                    >
                      Process
                    </button>
                    <button
                      onClick={() => updateStatus(withdrawal._id, "rejected")}
                      className="text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 px-3 py-1 rounded text-xs font-medium"
                    >
                      Decline
                    </button>
                    <button className="text-gray-500 hover:text-blue-600 p-2">
                      <FaEye className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllWithdrawal;
