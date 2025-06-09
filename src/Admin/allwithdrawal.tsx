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
    <div className="w-full h-full scrollbar overflow-y-scroll">
      <div className="w-full px-5 pt-5">
        <p className="text-3xl font-bold text-gray-500 max-md:text-xl">
          Manage Client Withdrawals
        </p>
      </div>

      <div className="w-full px-5 mt-4 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Client Name</th>
              <th className="p-3 border">Amount</th>
              <th className="p-3 border">Method</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {withdrawals.map((withdrawal) => (
              <tr key={withdrawal._id}>
                <td className="p-3 border">{withdrawal._id.slice(0, 6)}</td>
                <td className="p-3 border">
                  {withdrawal.userId?.userName || "N/A"}
                </td>
                <td className="p-3 border">${withdrawal.amount}</td>
                <td className="p-3 border">{withdrawal.mode}</td>
                <td className="p-3 border">
                  <span
                    className={`px-2 py-1 rounded capitalize ${
                      withdrawal.status === "pending"
                        ? "bg-yellow-500 text-white"
                        : withdrawal.status === "approved"
                        ? "bg-green-500 text-white"
                        : withdrawal.status === "processing"
                        ? "bg-blue-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {withdrawal.status}
                  </span>
                </td>
                <td className="p-3 border">{withdrawal.date}</td>
                <td className="p-3 border flex flex-wrap gap-2">
                  <button
                    onClick={() => updateStatus(withdrawal._id, "approved")}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(withdrawal._id, "processing")}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Processing
                  </button>
                  <button
                    onClick={() => updateStatus(withdrawal._id, "rejected")}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Decline
                  </button>
                  <button className="text-blue-500">
                    <FaEye />
                  </button>
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
