
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Eye, MoreVertical, Download, Search, RefreshCw } from "lucide-react";

interface Transaction {
  _id: string;
  mode: string;
  firstName: string;
  lastName?: string;
  amount: number;
  status: "approved" | "pending" | "rejected";
  createdAt: string;
  image: string;
  description?: string;
}

const mockTransactions: Transaction[] = [
  {
    _id: "tx123abc1",
    mode: "Bank Transfer",
    firstName: "Alice",
    lastName: "Johnson",
    amount: 1500.5,
    status: "pending",
    createdAt: "2025-06-01T10:00:00Z",
    image:
      "https://via.placeholder.com/600x400/4f46e5/ffffff?text=Payment+Receipt",
    description: "Monthly subscription payment",
  },
  {
    _id: "tx123abc2",
    mode: "Crypto",
    firstName: "Bob",
    lastName: "Smith",
    amount: 2000.0,
    status: "approved",
    createdAt: "2025-06-02T11:00:00Z",
    image:
      "https://via.placeholder.com/600x400/059669/ffffff?text=Crypto+Receipt",
    description: "Bitcoin payment for services",
  },
  {
    _id: "tx123abc3",
    mode: "PayPal",
    firstName: "Carol",
    lastName: "Davis",
    amount: 300.25,
    status: "rejected",
    createdAt: "2025-06-03T12:00:00Z",
    image:
      "https://via.placeholder.com/600x400/dc2626/ffffff?text=PayPal+Receipt",
    description: "Refund request",
  },
  {
    _id: "tx123abc4",
    mode: "Credit Card",
    firstName: "David",
    lastName: "Wilson",
    amount: 750.0,
    status: "pending",
    createdAt: "2025-06-04T14:30:00Z",
    image:
      "https://via.placeholder.com/600x400/7c3aed/ffffff?text=Card+Receipt",
    description: "Product purchase",
  },
  {
    _id: "tx123abc5",
    mode: "Wire Transfer",
    firstName: "Emma",
    lastName: "Brown",
    amount: 5000.0,
    status: "approved",
    createdAt: "2025-06-05T09:15:00Z",
    image:
      "https://via.placeholder.com/600x400/ea580c/ffffff?text=Wire+Receipt",
    description: "Large transaction approval",
  },
];

const AllTransactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean;
    action: "confirm" | "decline" | null;
    transactionId: string;
  }>({ open: false, action: null, transactionId: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "amount" | "name">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({ show: false, message: "", type: "success" });

  const menuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    setTransactions(mockTransactions);
  }, []);

  // Filter and sort transactions
  useEffect(() => {
    const filtered = transactions.filter((tx) => {
      const matchesSearch =
        searchTerm === "" ||
        tx.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.mode.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || tx.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    // Sort transactions
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "date":
          comparison =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case "amount":
          comparison = a.amount - b.amount;
          break;
        case "name":
          comparison = a.firstName.localeCompare(b.firstName);
          break;
      }

      return sortOrder === "desc" ? -comparison : comparison;
    });

    setFilteredTransactions(filtered);
  }, [transactions, searchTerm, statusFilter, sortBy, sortOrder]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as Node;
    const isOutside = Object.values(menuRefs.current).every(
      (ref) => ref && !ref.contains(target)
    );

    if (isOutside) {
      setActiveMenu(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  const openProofOfPayment = (url: string) => {
    window.open(url, "_blank");
  };

  const toggleMenu = (transactionId: string) => {
    setActiveMenu(activeMenu === transactionId ? null : transactionId);
  };

  const openConfirmModal = (
    action: "confirm" | "decline",
    transactionId: string
  ) => {
    setConfirmModal({ open: true, action, transactionId });
    setActiveMenu(null);
  };

  const handleConfirmAction = async () => {
    if (!confirmModal.action || !confirmModal.transactionId) return;

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newStatus =
        confirmModal.action === "confirm" ? "approved" : "rejected";
      const actionText =
        confirmModal.action === "confirm" ? "confirmed" : "declined";

      setTransactions((prev) =>
        prev.map((tx) =>
          tx._id === confirmModal.transactionId
            ? { ...tx, status: newStatus as Transaction["status"] }
            : tx
        )
      );

      showNotification(`Payment ${actionText} successfully!`, "success");
      setLoading(false);
      setConfirmModal({ open: false, action: null, transactionId: "" });
    }, 1000);
  };

  const exportTransactions = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Reference,Mode,User,Amount,Status,Date,Description\n" +
      filteredTransactions
        .map(
          (tx) =>
            `${tx._id},${tx.mode},"${tx.firstName} ${tx.lastName || ""}",${
              tx.amount
            },${tx.status},${new Date(tx.createdAt).toLocaleDateString()},"${
              tx.description || ""
            }"`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification("Transactions exported successfully!", "success");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500 text-white";
      case "pending":
        return "bg-yellow-500 text-white";
      case "rejected":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="w-full h-screen bg-green-200 p-6 overflow-y-auto">
      {/* Notification */}
      {notification.show && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg ${
            notification.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {notification.message}
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Transactions
          </h1>
          <p className="text-gray-600">
            Manage and review all payment transactions
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4 items-center">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>

              {/* Sort Options */}
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split("-");
                  setSortBy(field as "date" | "amount" | "name");
                  setSortOrder(order as "asc" | "desc");
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="amount-desc">Highest Amount</option>
                <option value="amount-asc">Lowest Amount</option>
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
              </select>
            </div>

            {/* Export Button */}
            <button
              onClick={exportTransactions}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">
              Total Transactions
            </h3>
            <p className="text-2xl font-bold text-gray-800">
              {filteredTransactions.length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">Pending</h3>
            <p className="text-2xl font-bold text-yellow-600">
              {
                filteredTransactions.filter((tx) => tx.status === "pending")
                  .length
              }
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">Approved</h3>
            <p className="text-2xl font-bold text-green-600">
              {
                filteredTransactions.filter((tx) => tx.status === "approved")
                  .length
              }
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">Total Value</h3>
            <p className="text-2xl font-bold text-gray-800">
              {formatCurrency(
                filteredTransactions.reduce((sum, tx) => sum + tx.amount, 0)
              )}
            </p>
          </div>
        </div>

        {/* Table */}
        {filteredTransactions.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reference
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mode
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTransactions.map((transaction) => (
                    <tr
                      key={transaction._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {transaction._id.slice(-8).toUpperCase()}
                        </div>
                        {transaction.description && (
                          <div className="text-xs text-gray-500">
                            {transaction.description}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {transaction.mode}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {transaction.firstName} {transaction.lastName || ""}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          {formatCurrency(transaction.amount)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            transaction.status
                          )}`}
                        >
                          {transaction.status.charAt(0).toUpperCase() +
                            transaction.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(transaction.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              openProofOfPayment(transaction.image)
                            }
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                            title="View proof of payment"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {transaction.status === "pending" && (
                            <div className="relative">
                              <button
                                onClick={() => toggleMenu(transaction._id)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>

                              {activeMenu === transaction._id && (
                                <div
                                  ref={(el) => {
                                    menuRefs.current[transaction._id] = el;
                                  }}
                                  className="absolute right-0 z-10 mt-2 w-32 bg-white shadow-lg rounded-md border border-gray-100 py-1"
                                >
                                  <button
                                    onClick={() =>
                                      openConfirmModal(
                                        "confirm",
                                        transaction._id
                                      )
                                    }
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-800 transition-colors"
                                  >
                                    Approve
                                  </button>
                                  <button
                                    onClick={() =>
                                      openConfirmModal(
                                        "decline",
                                        transaction._id
                                      )
                                    }
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-800 transition-colors"
                                  >
                                    Decline
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <RefreshCw className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No transactions found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {confirmModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {confirmModal.action === "confirm"
                  ? "Approve Payment"
                  : "Decline Payment"}
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to{" "}
                {confirmModal.action === "confirm" ? "approve" : "decline"} this
                payment? This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() =>
                    setConfirmModal({
                      open: false,
                      action: null,
                      transactionId: "",
                    })
                  }
                  disabled={loading}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmAction}
                  disabled={loading}
                  className={`px-4 py-2 text-white rounded-lg transition-colors disabled:opacity-50 ${
                    confirmModal.action === "confirm"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {loading
                    ? "Processing..."
                    : confirmModal.action === "confirm"
                    ? "Approve"
                    : "Decline"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

};

export default AllTransactions;
