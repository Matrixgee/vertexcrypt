/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "../config/axiosconfig";
import { Search, User } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { setAllUsers } from "../Global/AdminSlice";

type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  createdAt: string;
  accountBalance: number;
};

const Allusers = () => {
  const [users, setusers] = useState<UserType[]>([]);

  const token = useSelector((state: any) => state.admin.token);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const dispatch = useDispatch();

  const getAllusers = async () => {
    const toastloadingId = toast.loading("loading users...");
    try {
      const res = await axios.get("/admin/getAllUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setusers(res.data.data);
      dispatch(setAllUsers(res.data.data));
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const errorMsg =
          error.response?.data?.message || "An unexpected error occurred";
        toast.error(errorMsg);
      } else {
        toast.error("Error occurred");
      }
    } finally {
      toast.dismiss(toastloadingId);
    }
  };

  const navigate = useNavigate();

  const handleManage = (_id: string) => {
    navigate(`/admin/userdetails/${_id}`);
  };

  useEffect(() => {
    getAllusers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className=" h-screen flex flex-col p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">All Users</h2>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg flex-1 shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Join Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Balance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <User className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {`${user.firstName} ${user.lastName}`}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      user.status.charAt(0).toUpperCase() + user.status.slice(1)
                    )}`}
                  >
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${user.accountBalance}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => handleManage(user._id)}
                    className="px-3 py-2 bg-green-400 rounded-md font-semibold"
                  >
                    Manage
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

export default Allusers;
