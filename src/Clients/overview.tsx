
import { 
  DollarSign, 
  TrendingUp, 
  Gift, 
  Users, 
  Activity, 
  Target, 
  Wallet, 
  ArrowUpRight,

} from 'lucide-react';
import TradinfviewWidgetone from '../components/tradinfviewWidgetone';

const Overview = () => {

  const statsCards = [
    {
      title: 'Account Balance',
      value: '$0',
      percentage: '+12.5%',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-slate-800'
    },
    {
      title: 'Total Profit',
      value: '$0',
      percentage: '+8.2%',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-emerald-400 to-emerald-600',
      bgColor: 'bg-slate-800'
    },
    // {
    //   title: 'Total Bonus',
    //   value: '$50',
    //   percentage: '+5.1%',
    //   icon: <Gift className="w-6 h-6" />,
    //   color: 'from-green-300 to-green-500',
    //   bgColor: 'bg-slate-800'
    // },
    {
      title: 'Investment Plan',
      value: '0',
      status: 'Active',
      icon: <Activity className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-slate-800'
    },
    {
      title: 'Active Plan',
      value: '0',
      status: 'Running',
      icon: <Target className="w-6 h-6" />,
      color: 'from-emerald-400 to-green-600',
      bgColor: 'bg-slate-800'
    },
    {
      title: 'Total Deposit',
      value: '$0',
      percentage: '+22.7%',
      icon: <Wallet className="w-6 h-6" />,
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-slate-800'
    },
    {
      title: 'Withdrawals',
      value: '$0',
      status: 'Complete',
      icon: <ArrowUpRight className="w-6 h-6" />,
      color: 'from-slate-400 to-slate-600',
      bgColor: 'bg-slate-800'
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
      <div className="relative  overflow-y-auto h-screen">
        <div className="p-6 pb-20">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Mike James!</h1>
            <p className="text-slate-300 text-lg">Here's an overview of your investment portfolio</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {statsCards.map((card, index) => (
              <div 
                key={index}
                className="bg-slate-900/40 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:bg-slate-900/60 transition-all duration-300 hover:scale-105 hover:border-green-400/40 hover:shadow-lg hover:shadow-green-500/10"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color} shadow-lg`}>
                    {card.icon}
                  </div>
                  {card.percentage && (
                    <span className="text-green-400 text-sm font-medium flex items-center bg-green-500/10 px-2 py-1 rounded-lg border border-green-500/20">
                      <ArrowUpRight className="w-4 h-4 mr-1" />
                      {card.percentage}
                    </span>
                  )}
                  {card.status && (
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      card.status === 'Active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                      card.status === 'Running' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      'bg-slate-500/20 text-slate-300 border border-slate-500/30'
                    }`}>
                      {card.status}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{card.value}</h3>
                <p className="text-slate-300 text-sm">{card.title}</p>
              </div>
            ))}
          </div>

          {/* Trading Chart Section */}
          <div className="bg-slate-900/40 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:border-green-400/30 transition-all duration-300">
            <div className="flex flex-col items-center justify-between gap-5">
              <div className="w-full">
                <h2 className="text-xl font-bold text-white mb-1 flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                  Personal Trading Chart
                </h2>
                <p className="text-slate-300">Real-time market data and trends</p>
              </div>
              <div className="w-full h-[550px] flex items-center">
                <TradinfviewWidgetone/>
              </div>
            </div>

           

          

         
          </div>
        </div>
      </div>

      <style>{`
        /* Custom scrollbar styling */
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

export default Overview;