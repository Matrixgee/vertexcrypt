
import { 
  ArrowDownLeft,
  ArrowUpRight,
  TrendingUp,
  CheckCircle,
  Download,
} from 'lucide-react';

const History = () => {
  const transactions = [
    {
      type: 'deposit',
      amount: '$5,000',
      date: '2025-06-03',
      time: '14:30',
      status: 'completed',
      description: 'Investment Deposit - Premium Plan'
    },
    {
      type: 'profit',
      amount: '+$125',
      date: '2025-06-02',
      time: '09:15',
      status: 'completed',
      description: 'Daily Profit - Starter Plan'
    },
    {
      type: 'withdrawal',
      amount: '-$1,250',
      date: '2025-06-01',
      time: '16:45',
      status: 'completed',
      description: 'Withdrawal to Bank Account'
    },
    {
      type: 'deposit',
      amount: '$10,000',
      date: '2025-05-28',
      time: '11:20',
      status: 'completed',
      description: 'Investment Deposit - VIP Plan'
    },
    {
      type: 'profit',
      amount: '+$350',
      date: '2025-05-27',
      time: '08:30',
      status: 'completed',
      description: 'Weekly Profit - VIP Plan'
    }
  ];

  return (
    <div className="min-h-screen text-white relative">
      {/* Fixed background layers */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900/95 via-green-900/30 to-slate-900/95"></div>
      <div className="fixed inset-0 bg-gradient-to-b from-green-400/5 to-green-500/5"></div>

      {/* Fixed animated particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-4 w-20 h-20 bg-green-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-4 w-16 h-16 bg-green-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl animate-pulse delay-500"></div>
        <div className="absolute top-20 right-1/4 w-12 h-12 bg-green-400/8 rounded-full blur-lg animate-pulse delay-300"></div>
        <div className="absolute bottom-1/3 left-1/4 w-18 h-18 bg-emerald-400/6 rounded-full blur-xl animate-pulse delay-700"></div>
      </div>

      {/* Scrollable content wrapper */}
      <div className="relative overflow-y-auto h-screen">
        <div className="p-6 pb-20">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Transaction History</h1>
            <p className="text-slate-300 text-lg">View all your account transactions</p>
          </div>
          
          <div className="bg-slate-900/40 backdrop-blur-sm border border-green-500/20 rounded-xl overflow-hidden hover:border-green-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
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
              {transactions.map((transaction, index) => (
                <div key={index} className="p-6 hover:bg-slate-800/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl shadow-lg ${
                        transaction.type === 'deposit' ? 'bg-gradient-to-br from-green-400 to-green-600' :
                        transaction.type === 'profit' ? 'bg-gradient-to-br from-emerald-400 to-emerald-600' :
                        'bg-gradient-to-br from-blue-400 to-blue-600'
                      }`}>
                        {transaction.type === 'deposit' ? (
                          <ArrowUpRight className="w-5 h-5 text-white" />
                        ) : transaction.type === 'profit' ? (
                          <TrendingUp className="w-5 h-5 text-white" />
                        ) : (
                          <ArrowDownLeft className="w-5 h-5 text-white" />
                        )}
                      </div>
                      
                      <div>
                        <p className="font-semibold text-white">{transaction.description}</p>
                        <p className="text-sm text-slate-400">{transaction.date} at {transaction.time}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className={`font-semibold text-lg ${
                        transaction.type === 'profit' ? 'text-green-400' :
                        transaction.type === 'withdrawal' ? 'text-red-400' :
                        'text-white'
                      }`}>
                        {transaction.amount}
                      </p>
                      <div className="flex items-center justify-end space-x-1">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-green-400 bg-green-500/10 px-2 py-1 rounded-lg border border-green-500/20">
                          {transaction.status}
                        </span>
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