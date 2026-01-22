/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ArrowDownLeft,
  ArrowUpRight,
  TrendingUp,
  CheckCircle,
  Download,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../config/axiosconfig";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

interface Transaction {
  _id: string;
  amount: string;
  mode: string;
  status: string;
  createdAt: string;
  transationType: string;
  description: string;
  type: string;
  date: string;
  time: string;
}

const History = () => {
  const [transactions, settransactions] = useState<Transaction[]>([]);

  const nav = useNavigate();

  const handleBack = () => {
    nav(-1);
  };

  const userToken = useSelector((state: any) => state.user.Token);
  useEffect(() => {
    const getHistory = async () => {
      try {
        const response = await axios.get("/deposit/all", {
          headers: { Authorization: `Bearer ${userToken}` },
        });

        const rawData = response.data.data;

        if (Array.isArray(rawData)) {
          const mapped = rawData.map((tx: any) => {
            const createdAt = new Date(tx.createdAt);
            const date = createdAt.toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
            const time = createdAt.toLocaleTimeString(undefined, {
              hour: "2-digit",
              minute: "2-digit",
            });

            return {
              _id: tx._id,
              amount: `$${tx.amount.toFixed(2)}`,
              mode: tx.mode,

              createdAt: tx.createdAt,
              status: tx.status.toUpperCase(),
              type:
                tx.status.toLowerCase() === "approved"
                  ? "deposit"
                  : tx.status.toLowerCase() === "failed"
                    ? "withdrawal"
                    : "pending",

              transationType: tx.mode,
              description: `Crypto deposit via ${tx.mode.toUpperCase()}`,
              date,
              time,
            };
          });

          settransactions(mapped);
        } else {
          console.error("Unexpected data format:", rawData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (userToken) getHistory();
  }, [userToken]);

  return (
    <div className="w-full scrollbar-thin overflow-y-scroll h-full bg-green-50 text-white relative">
      {/* Scrollable content wrapper */}
      <div className="relative overflow-y-auto h-full">
        <div className="p-6 pb-20">
          {/* Header */}
          <div className="mb-8">
            <div className="w-full h-12 bg-white shadow-md mb-6 rounded-xl flex  items-center px-4 sm:px-2 gap-4">
              <div
                className="flex items-center gap-2  text-green-600 font-semibold cursor-pointer transition hover:text-green-800"
                onClick={handleBack}
              >
                <MdArrowBack size={20} />
                <span className="text-sm sm:text-base font-semibold">Back</span>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-700 mb-2">
                Transaction History
              </h1>
              <p className="text-slate-300 text-lg">
                View all your account transactions
              </p>
            </div>
          </div>

          <div className="bg-slate-900 backdrop-blur-sm border border-green-500/20 rounded-xl overflow-hidden hover:border-green-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
            <div className="p-6 border-b border-green-500/20">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                  Recent Transactions
                </h2>
                <button className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-all duration-300 bg-green-500/10 px-3 py-2 rounded-lg border border-green-500/20 hover:bg-green-500/20 hover:border-green-400/40 hover:scale-105">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="divide-y divide-green-500/10">
              {transactions.map((transaction: Transaction, index: number) => (
                <div
                  key={index}
                  className="p-6 hover:bg-slate-800/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-3 rounded-xl shadow-lg ${
                          transaction.type === "deposit"
                            ? "bg-gradient-to-br from-green-400 to-green-600"
                            : transaction.type === "profit"
                              ? "bg-gradient-to-br from-emerald-400 to-emerald-600"
                              : "bg-gradient-to-br from-blue-400 to-blue-600"
                        }`}
                      >
                        {transaction.type === "deposit" ? (
                          <ArrowUpRight className="w-5 h-5 text-white" />
                        ) : transaction.type === "profit" ? (
                          <TrendingUp className="w-5 h-5 text-white" />
                        ) : (
                          <ArrowDownLeft className="w-5 h-5 text-white" />
                        )}
                      </div>

                      <div>
                        <p className="font-semibold text-white">
                          {transaction.description}
                        </p>
                        <p className="text-sm text-slate-400">
                          {transaction.date} at {transaction.time}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p
                        className={`font-semibold text-lg ${
                          transaction.type === "profit"
                            ? "text-green-400"
                            : transaction.type === "withdrawal"
                              ? "text-red-400"
                              : "text-white"
                        }`}
                      >
                        {transaction.amount}
                      </p>
                      <div className="flex items-center justify-end space-x-1">
                        {transaction.status.toLowerCase() === "approved" && (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-sm uppercase text-green-400 bg-green-500/10 px-2 py-1 rounded-lg border border-green-500/20">
                              {transaction.status}
                            </span>
                          </>
                        )}

                        {transaction.status.toLowerCase() === "pending" && (
                          <>
                            <ArrowUpRight className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm uppercase text-yellow-400 bg-yellow-500/10 px-2 py-1 rounded-lg border border-yellow-500/20">
                              {transaction.status}
                            </span>
                          </>
                        )}

                        {transaction.status.toLowerCase() === "failed" && (
                          <>
                            <ArrowDownLeft className="w-4 h-4 text-red-400" />
                            <span className="text-sm uppercase text-red-400 bg-red-500/10 px-2 py-1 rounded-lg border border-red-500/20">
                              {transaction.status}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.3);
          border-radius: 3px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(34, 197, 94, 0.3);
          border-radius: 3px;
          border: 1px solid rgba(34, 197, 94, 0.1);
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 197, 94, 0.5);
        }
      `}</style>
    </div>
  );
};

export default History;
