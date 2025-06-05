import { TrendingUp, Clock, DollarSign, Target, CheckCircle, Activity, Calendar } from 'lucide-react';

const Plans = () => {
  const plans = [
    {
      name: 'Starter Plan',
      investment: '$1,000',
      profit: '$150',
      roi: '15%',
      duration: '30 days',
      status: 'Active',
      daysLeft: 12,
      progress: 60,
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-green-400 to-green-600'
    },
    {
      name: 'Premium Plan',
      investment: '$5,000',
      profit: '$1,250',
      roi: '25%',
      duration: '60 days',
      status: 'Active',
      daysLeft: 45,
      progress: 25,
      icon: <Target className="w-6 h-6" />,
      color: 'from-emerald-400 to-emerald-600'
    },
    {
      name: 'VIP Plan',
      investment: '$10,000',
      profit: '$3,500',
      roi: '35%',
      duration: '90 days',
      status: 'Complete',
      daysLeft: 0,
      progress: 100,
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'from-green-300 to-green-500'
    }
  ];

  const getStatusColor = (status:any) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500/20 text-green-400 border border-green-500/30';
      case 'Complete':
        return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
      default:
        return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
    }
  };

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
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
              My Investment Plans
            </h1>
            <p className="text-slate-300 text-lg">Track your active and completed investment plans</p>
          </div>
          
          {/* Plans Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className="bg-slate-900/40 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:bg-slate-900/60 transition-all duration-300 hover:scale-105 hover:border-green-400/40 hover:shadow-lg hover:shadow-green-500/10"
              >
                {/* Plan Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${plan.color} shadow-lg`}>
                      {plan.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(plan.status)}`}>
                    {plan.status}
                  </span>
                </div>
                
                {/* Plan Details */}
                <div className="space-y-4">
                  <div className="bg-slate-800/30 rounded-lg p-4 border border-green-500/10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-green-400" />
                        <span className="text-slate-400">Investment:</span>
                      </div>
                      <span className="text-white font-semibold">{plan.investment}</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span className="text-slate-400">Current Profit:</span>
                      </div>
                      <span className="text-green-400 font-semibold">{plan.profit}</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-emerald-400" />
                        <span className="text-slate-400">ROI:</span>
                      </div>
                      <span className="text-emerald-400 font-semibold">{plan.roi}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-400">Duration:</span>
                      </div>
                      <span className="text-white">{plan.duration}</span>
                    </div>
                  </div>
                  
                  {plan.status === 'Active' && (
                    <div className="bg-slate-800/30 rounded-lg p-4 border border-green-500/10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-yellow-400" />
                          <span className="text-slate-400">Days Left:</span>
                        </div>
                        <span className="text-yellow-400 font-semibold">{plan.daysLeft} days</span>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex justify-between text-sm text-slate-400 mb-2">
                          <div className="flex items-center space-x-2">
                            <Activity className="w-4 h-4" />
                            <span>Progress</span>
                          </div>
                          <span className="text-green-400 font-medium">{plan.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-3 border border-green-500/20">
                          <div 
                            className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500 shadow-sm"
                            style={{ width: `${plan.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {plan.status === 'Complete' && (
                    <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/20">
                      <div className="flex items-center justify-center space-x-2 text-emerald-400">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-semibold">Investment Completed Successfully</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="mt-8 bg-slate-900/40 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:border-green-400/30 transition-all duration-300">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
              Investment Summary
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800/30 rounded-lg p-4 border border-green-500/10">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-green-400 to-green-600">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <span className="text-slate-400">Total Invested</span>
                </div>
                <p className="text-2xl font-bold text-white">$16,000</p>
              </div>
              
              <div className="bg-slate-800/30 rounded-lg p-4 border border-green-500/10">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <span className="text-slate-400">Total Profit</span>
                </div>
                <p className="text-2xl font-bold text-green-400">$4,900</p>
              </div>
              
              <div className="bg-slate-800/30 rounded-lg p-4 border border-green-500/10">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-green-300 to-green-500">
                    <Activity className="w-4 h-4" />
                  </div>
                  <span className="text-slate-400">Active Plans</span>
                </div>
                <p className="text-2xl font-bold text-white">2</p>
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

export default Plans;