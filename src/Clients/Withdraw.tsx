import { useState } from "react";
import { 
  ArrowDownLeft,
  Clock,
  CheckCircle,
  Eye,
  EyeOff,
} from 'lucide-react';

const Withdraw = () => {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('bank');
  const [showBalance, setShowBalance] = useState(true);

  const handleWithdrawal = () => {
    if (amount.trim()) {
      alert(`Withdrawal request submitted!\nAmount: $${amount}\nMethod: ${method}`);
      setAmount('');
    }
  };

  return (
    <div className="min-h-screen text-white relative">
      {/* Fixed background layers - matching Overview */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900/95 via-green-900/30 to-slate-900/95"></div>
      <div className="fixed inset-0 bg-gradient-to-b from-green-400/5 to-green-500/5"></div>

      {/* Fixed animated particles - matching Overview */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-4 w-20 h-20 bg-green-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-4 w-16 h-16 bg-green-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl animate-pulse delay-500"></div>
        <div className="absolute top-20 right-1/4 w-12 h-12 bg-green-400/8 rounded-full blur-lg animate-pulse delay-300"></div>
        <div className="absolute bottom-1/3 left-1/4 w-18 h-18 bg-emerald-400/6 rounded-full blur-xl animate-pulse delay-700"></div>
      </div>

      {/* Scrollable content */}
      <div className="relative overflow-y-auto h-screen">
        <div className="p-6 pb-20">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
              <ArrowDownLeft className="w-8 h-8 mr-3 text-green-400" />
              Withdrawal
            </h1>
            <p className="text-slate-300 text-lg">Withdraw your earnings securely</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-slate-900/40 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:bg-slate-900/60 transition-all duration-300 hover:scale-105 hover:border-green-400/40 hover:shadow-lg hover:shadow-green-500/10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                Withdraw Funds
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">Available Balance</label>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-white">
                      {showBalance ? '$12,450.00' : '****'}
                    </span>
                    <button
                      onClick={() => setShowBalance(!showBalance)}
                      className="text-slate-400 hover:text-green-400 transition-colors"
                    >
                      {showBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">Withdrawal Amount</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-green-500/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-green-400/50 focus:ring-2 focus:ring-green-400/20 transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">Withdrawal Method</label>
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-green-500/20 rounded-lg text-white focus:outline-none focus:border-green-400/50 focus:ring-2 focus:ring-green-400/20 transition-all"
                  >
                    <option value="bank">Bank Transfer</option>
                    <option value="paypal">PayPal</option>
                    <option value="btc">Bitcoin (BTC)</option>
                    <option value="eth">Ethereum (ETH)</option>
                    <option value="usdt">Tether (USDT)</option>
                  </select>
                </div>
                
                <button 
                  onClick={handleWithdrawal}
                  className={`w-full py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-lg hover:from-green-500 hover:to-green-700 transition-all flex items-center justify-center space-x-2 shadow-lg ${
                    !amount.trim() ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={!amount.trim()}
                >
                  <ArrowDownLeft className="w-5 h-5" />
                  <span>Request Withdrawal</span>
                </button>
              </div>

              <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-sm text-slate-300">
                  <span className="text-green-400 font-medium">Processing Time:</span> 
                  <br />
                  Withdrawals are typically processed within 24-48 hours during business days.
                </p>
              </div>
            </div>
            
            <div className="bg-slate-900/40 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:bg-slate-900/60 transition-all duration-300 hover:scale-105 hover:border-green-400/40 hover:shadow-lg hover:shadow-green-500/10">
              <h2 className="text-xl font-bold text-white mb-6">Recent Withdrawals</h2>
              
              <div className="space-y-4">
                {[
                  { amount: '$1,250.00', date: '2025-06-01', status: 'completed', method: 'Bank Transfer' },
                  { amount: '0.025 BTC', date: '2025-05-30', status: 'completed', method: 'Bitcoin' },
                  { amount: '$750.00', date: '2025-05-28', status: 'pending', method: 'PayPal' },
                  { amount: '500 USDT', date: '2025-05-26', status: 'completed', method: 'Tether' },
                  { amount: '1.2 ETH', date: '2025-05-25', status: 'completed', method: 'Ethereum' },
                ].map((withdrawal, index) => (
                  <div key={index} className="border border-green-500/10 rounded-lg bg-slate-900/60 hover:bg-slate-900/80 transition-all duration-300">
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-white">{withdrawal.amount}</p>
                          <p className="text-sm text-slate-400">{withdrawal.method} • {withdrawal.date}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {withdrawal.status === 'completed' ? (
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          ) : (
                            <Clock className="w-5 h-5 text-yellow-400" />
                          )}
                          <span className={`text-sm font-medium px-2 py-1 rounded-lg border ${
                            withdrawal.status === 'completed' 
                              ? 'text-green-400 bg-green-500/10 border-green-500/20' 
                              : 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
                          }`}>
                            {withdrawal.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-sm text-slate-300">
                  <span className="text-green-400 font-medium">Need help with withdrawals?</span> 
                  <br />
                  Contact our support team for assistance with your withdrawal requests.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Custom scrollbar styling - matching Overview */
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

export default Withdraw