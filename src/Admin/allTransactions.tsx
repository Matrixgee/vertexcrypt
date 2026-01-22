/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";
import toast from "react-hot-toast";
import axios from "../config/axiosconfig";
import { BiLoaderCircle } from "react-icons/bi";

interface Transaction {
  id: string;
  uid: string;
  amount: number;
  from: string;
  to: string;
  method: string;
  status: "approved" | "pending" | "rejected";
  createdAt: number;
  updatedAt: number;
  user: {
    name: string;
    email: string;
  };
}

const AllTransactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token") || "";

  /* ---------------- FETCH ---------------- */

  const getAllTransactions = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get("/admin/deposits/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const rawData = res.data?.data || [];

      const normalized: Transaction[] = rawData.map((tx: any) => ({
        id: tx.id,
        uid: tx.uid,
        amount: tx.amount,
        from: tx.from,
        to: tx.to,
        method: tx.method,
        status: tx.status,
        createdAt: tx.createdAt,
        updatedAt: tx.updatedAt,
        user: tx.user,
      }));

      setTransactions(normalized);
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        "Failed to fetch transactions. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) getAllTransactions();
    else {
      setError("No authentication token found");
      setLoading(false);
    }
  }, [token]);

  /* ---------------- ACTIONS ---------------- */

  const updateStatus = async (
    transactionId: string,
    status: "approved" | "rejected",
  ) => {
    setActionLoading(transactionId);

    try {
      await axios.patch(
        `/admin/deposits/${transactionId}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setTransactions((prev) =>
        prev.map((tx) => (tx.id === transactionId ? { ...tx, status } : tx)),
      );

      toast.success(`Transaction ${status}`);
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Failed to update transaction",
      );
    } finally {
      setActionLoading(null);
    }
  };

  /* ---------------- HELPERS ---------------- */

  const getStatusColor = (status: string) => {
    if (status === "approved") return "bg-green-500 text-white";
    if (status === "pending") return "bg-yellow-500 text-white";
    if (status === "rejected") return "bg-red-500 text-white";
    return "bg-gray-500 text-white";
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  /* ---------------- EXPORT ---------------- */

  const exportTransactions = () => {
    if (!transactions.length) return toast.error("No data to export");

    const csv =
      "data:text/csv;charset=utf-8," +
      "Ref,Method,User,Amount,Status,Date\n" +
      transactions
        .map(
          (t) =>
            `${t.id},${t.method},"${t.user.name}",${t.amount},${
              t.status
            },${new Date(t.createdAt).toLocaleDateString()}`,
        )
        .join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* ---------------- UI STATES ---------------- */

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <BiLoaderCircle className="animate-spin" size={40} />
      </div>
    );

  if (error)
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-500">{error}</p>
        <button
          onClick={getAllTransactions}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Retry
        </button>
      </div>
    );

  /* ---------------- RENDER ---------------- */

  return (
    <div className="p-6 bg-green-200 min-h-screen">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <button
          onClick={exportTransactions}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          <Download size={16} /> Export
        </button>
      </div>

      <div className="bg-white rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Ref</th>
              <th className="px-4 py-2 text-left">Method</th>
              <th className="px-4 py-2 text-left">User</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-t">
                <td className="px-4 py-2 font-mono">
                  {tx.id.slice(-8).toUpperCase()}
                </td>
                <td className="px-4 py-2">{tx.method}</td>
                <td className="px-4 py-2">{tx.from}</td>
                <td className="px-4 py-2 font-semibold">
                  {formatCurrency(tx.amount)}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs ${getStatusColor(
                      tx.status,
                    )}`}
                  >
                    {tx.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {new Date(tx.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  {tx.status === "pending" ? (
                    <div className="flex gap-2">
                      <button
                        disabled={actionLoading === tx.id}
                        onClick={() => updateStatus(tx.id, "approved")}
                        className="px-3 py-1 text-xs bg-green-600 text-white rounded disabled:opacity-50"
                      >
                        Approve
                      </button>
                      <button
                        disabled={actionLoading === tx.id}
                        onClick={() => updateStatus(tx.id, "rejected")}
                        className="px-3 py-1 text-xs bg-red-600 text-white rounded disabled:opacity-50"
                      >
                        Decline
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-400 text-xs">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTransactions;
