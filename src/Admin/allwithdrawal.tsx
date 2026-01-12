/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { toast } from "react-hot-toast";
import axios from "../config/axiosconfig";

// Status color mapping
const statusColors = {
  approved: "bg-green-100 text-green-700",
  processing: "bg-blue-100 text-blue-700",
  rejected: "bg-red-100 text-red-700",
  pending: "bg-yellow-100 text-yellow-700",
};

type Withdrawal = {
  _id: string;
  userId?: {
    userName?: string;
  };
  amount: number;
  mode: string;
  status: string;
  date: string;
};

const AllWithdrawal = () => {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const userToken = localStorage.getItem("token");

  // Fetch all withdrawals
  const fetchWithdrawals = async () => {
    try {
      const response = await axios.get("/admin/withdrawals/all", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setWithdrawals(response.data.data);
    } catch (error) {
      console.log(error);

      toast.error("Failed to fetch withdrawals.");
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  // Unified status update function
  const updateStatus = async (_id: string, status: string) => {
    const toastId = toast.loading(
      `${status[0].toUpperCase() + status.slice(1)}...`
    );

    // API endpoint mapping
    const endpoints: any = {
      approved: `/admin/approveWithdrawal/${_id}`,
      rejected: `/admin/declineWithdrawal/${_id}`,
      processing: `/admin/pendingWithdrawal/${_id}`,
    };

    try {
      const response = await axios.put(
        endpoints[status],
        { status },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      toast.dismiss(toastId);
      toast.success(response.data.message || `Marked as ${status}`);
      fetchWithdrawals();
    } catch (error: any) {
      toast.dismiss(toastId);
      toast.error(
        error.response?.data?.error || `Failed to mark as ${status}.`
      );
    }
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
                <td className="px-4 py-3">
                  {withdrawal.userId?.userName || "N/A"}
                </td>
                <td className="px-4 py-3 font-semibold text-gray-800">
                  ${withdrawal.amount}
                </td>
                <td className="px-4 py-3 capitalize">{withdrawal.mode}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                      statusColors[
                        withdrawal.status as keyof typeof statusColors
                      ] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {withdrawal.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {new Date(withdrawal.date).toLocaleDateString()}
                </td>
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
