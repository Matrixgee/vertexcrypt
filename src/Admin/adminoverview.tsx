/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { ArrowDownLeft, CreditCard, DollarSign, Users } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "../config/axiosconfig";
import { setAllUsers } from "../Global/AdminSlice"; // adjust imports as needed

const AdminOverview = () => {
  const dispatch = useDispatch();
  const userToken = useSelector((state: any) => state.admin.token);

  type Transaction = { amount?: number; [key: string]: any };
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [users, setUsers] = useState([]);
  type Withdrawal = { status: string; [key: string]: any };
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [loading, setLoading] = useState(false);

  console.log(loading);

  useEffect(() => {
    getAllTransactions();
    getAllUsers();
    fetchWithdrawals();
  }, []);

  const getAllTransactions = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/admin/allTransactions", {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      const data = response.data.data || response.data;
      setTransactions(data);
    } catch (error: any) {
      const msg =
        error.response?.data?.message ||
        "Failed to fetch transactions. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const getAllUsers = async () => {
    const toastId = toast.loading("Loading users...");
    try {
      const response = await axios.get("/admin/getAllUser", {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setUsers(response.data.data);
      dispatch(setAllUsers(response.data.data));
    } catch (error: any) {
      const msg = error.response?.data?.message || "Failed to fetch users.";
      toast.error(msg);
    } finally {
      toast.dismiss(toastId);
    }
  };

  const fetchWithdrawals = async () => {
    try {
      const response = await axios.get("/admin/getWithdrawals", {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setWithdrawals(response.data.data);
    } catch (error) {
      console.log(error);

      toast.error("Failed to fetch withdrawals.");
    }
  };

  // Count only pending withdrawals
  const pendingWithdrawalsCount = withdrawals.filter(
    (w) => w.status === "pending"
  ).length;

  return (
    <div className="p-6 overflow-y-auto h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Dashboard Overview
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
            <Users className="h-8 w-8 text-green-400" />
          </div>
          {/* <p className="text-xs text-green-600 mt-2">↗ 12% from last month</p> */}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Transactions
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {transactions.length}
              </p>
            </div>
            <CreditCard className="h-8 w-8 text-blue-400" />
          </div>
          {/* <p className="text-xs text-blue-600 mt-2">↗ 8% from last month</p> */}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                $
                {transactions
                  .reduce((sum, t) => sum + (t.amount || 0), 0)
                  .toLocaleString()}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-purple-400" />
          </div>
          {/* <p className="text-xs text-purple-600 mt-2">↗ 15% from last month</p> */}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Pending Withdrawals
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {pendingWithdrawalsCount}
              </p>
            </div>
            <ArrowDownLeft className="h-8 w-8 text-orange-400" />
          </div>
          {/* <p className="text-xs text-orange-600 mt-2">↗ 3% from last month</p> */}
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
