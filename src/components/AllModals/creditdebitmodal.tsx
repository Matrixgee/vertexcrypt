/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import axios from "../../config/axiosconfig";
import { toast } from "react-hot-toast";

interface CreditDebitModalProps {
  isOpen: boolean;
  onClose: () => void;
  uid: string | undefined;
}

const CreditDebitModal: React.FC<CreditDebitModalProps> = ({
  isOpen,
  onClose,
  uid,
}) => {
  const [amount, setAmount] = useState<number | string>("");
  const [wallet, setWallet] = useState<string>("");
  const [action, setAction] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!uid || !wallet || !action || Number(amount) <= 0) {
      toast.error("All fields are required");
      return;
    }

    const adminToken = localStorage.getItem("token");

    if (!adminToken) {
      toast.error("Admin not authenticated");
      return;
    }

    const toastId = toast.loading("Processing...");
    setLoading(true);

    try {
      const res = await axios.put(
        `/admin/credit/${uid}`,
        {
          wallet,
          amount,
          action,
        },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        },
      );

      toast.success(res.data.message || "Balance updated successfully");
      onClose();
    } catch (error: any) {
      console.error("Credit/Debit error:", error);
      toast.error(error?.response?.data?.message || "Failed to update balance");
    } finally {
      toast.dismiss(toastId);
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white w-[400px] p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Credit / Debit User</h2>

        {/* Amount */}
        <div className="mb-3">
          <label className="block mb-1 font-medium">Amount</label>
          <input
            // type="number"
            className="w-full border rounded-md p-2"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>

        {/* Wallet */}
        <div className="mb-3">
          <label className="block mb-1 font-medium">Wallet</label>
          <select
            className="w-full border rounded-md p-2"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
          >
            <option value="">Select Wallet</option>
            <option value="balance">Main Balance</option>
            <option value="bitcoin">Bitcoin</option>
            <option value="ethereum">Ethereum</option>
            <option value="sol">Solana</option>
          </select>
        </div>

        {/* Action */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Action</label>
          <select
            className="w-full border rounded-md p-2"
            value={action}
            onChange={(e) => setAction(e.target.value)}
          >
            <option value="">Select Action</option>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
          >
            {loading ? "Processing..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreditDebitModal;
