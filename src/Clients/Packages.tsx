import { CheckCircle, ArrowUpRight, Star, Crown, Zap, Shield } from 'lucide-react';

const Packages = () => {
    const packages = [
        {
            name: 'Starter',
            minInvestment: '$100',
            maxInvestment: '$999',
            roi: '10-15%',
            duration: '30 days',
            features: ['Daily Returns', 'Email Support', 'Basic Analytics'],
            icon: <Zap className="w-6 h-6" />,
            color: 'from-green-400 to-green-600',
            popular: false
        },
        {
            name: 'Premium',
            minInvestment: '$1,000',
            maxInvestment: '$9,999',
            roi: '20-25%',
            duration: '60 days',
            features: ['Twice Daily Returns', 'Priority Support', 'Advanced Analytics', 'Risk Management'],
            icon: <Star className="w-6 h-6" />,
            color: 'from-emerald-400 to-emerald-600',
            popular: true
        },
        {
            name: 'VIP',
            minInvestment: '$10,000',
            maxInvestment: '$49,999',
            roi: '30-35%',
            duration: '90 days',
            features: ['Hourly Returns', '24/7 Support', 'Premium Analytics', 'Personal Account Manager', 'Custom Strategies'],
            icon: <Shield className="w-6 h-6" />,
            color: 'from-green-300 to-green-500',
            popular: false
        },
        {
            name: 'Elite',
            minInvestment: '$50,000',
            maxInvestment: 'Unlimited',
            roi: '40-50%',
            duration: '120 days',
            features: ['Real-time Returns', 'Dedicated Support Team', 'Elite Analytics', 'Multiple Account Managers', 'Exclusive Strategies', 'Private Trading Signals'],
            icon: <Crown className="w-6 h-6" />,
            color: 'from-green-400 to-emerald-500',
            popular: false
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
                        <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                            Investment Packages
                        </h1>
                        <p className="text-slate-300 text-lg">Choose the perfect investment plan for your goals</p>
                    </div>

                    {/* Packages Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {packages.map((pkg, index) => (
                            <div 
                                key={index} 
                                className={`relative bg-slate-900/40 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:bg-slate-900/60 transition-all duration-300 hover:scale-105 hover:border-green-400/40 hover:shadow-lg hover:shadow-green-500/10 ${
                                    pkg.popular ? 'ring-2 ring-green-400/30' : ''
                                }`}
                            >
                                {/* Popular Badge */}
                                {pkg.popular && (
                                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-gradient-to-r from-green-400 to-green-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                                            MOST POPULAR
                                        </span>
                                    </div>
                                )}

                                {/* Package Header */}
                                <div className="text-center mb-6">
                                    <div className="flex items-center justify-center mb-4">
                                        <div className={`p-3 rounded-xl bg-gradient-to-br ${pkg.color} shadow-lg`}>
                                            {pkg.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                                    <div className="text-slate-300">
                                        <p className="text-sm bg-slate-800/50 rounded-lg px-3 py-1 inline-block border border-green-500/20">
                                            {pkg.minInvestment} - {pkg.maxInvestment}
                                        </p>
                                        <div className="flex items-center justify-center mt-3">
                                            <p className="text-2xl font-bold text-green-400">{pkg.roi}</p>
                                            <span className="text-green-400 ml-2 flex items-center bg-green-500/10 px-2 py-1 rounded-lg border border-green-500/20">
                                                <ArrowUpRight className="w-4 h-4 mr-1" />
                                                ROI
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-400 mt-2 bg-slate-800/30 rounded-lg px-3 py-1 inline-block">
                                            Duration: {pkg.duration}
                                        </p>
                                    </div>
                                </div>

                                {/* Features List */}
                                <div className="space-y-3 mb-6">
                                    {pkg.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center space-x-3 bg-slate-800/30 rounded-lg p-3 border border-green-500/10 hover:border-green-500/20 transition-colors duration-200">
                                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                                            <span className="text-slate-300">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Invest Button */}
                                <button className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-green-500/20 hover:scale-105 border border-green-500/20">
                                    <span className="flex items-center justify-center">
                                        Invest Now
                                        <ArrowUpRight className="w-4 h-4 ml-2" />
                                    </span>
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Additional Info Section */}
                    <div className="mt-8 bg-slate-900/40 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:border-green-400/30 transition-all duration-300">
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-white mb-3 flex items-center justify-center">
                                <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                                Why Choose Our Investment Plans?
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                                <div className="bg-slate-800/30 rounded-lg p-4 border border-green-500/10">
                                    <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
                                    <h4 className="text-white font-semibold mb-1">Secure & Protected</h4>
                                    <p className="text-slate-300 text-sm">Your investments are protected with advanced security measures</p>
                                </div>
                                <div className="bg-slate-800/30 rounded-lg p-4 border border-green-500/10">
                                    <Zap className="w-8 h-8 text-green-400 mx-auto mb-2" />
                                    <h4 className="text-white font-semibold mb-1">Fast Returns</h4>
                                    <p className="text-slate-300 text-sm">Quick and reliable returns on your investment</p>
                                </div>
                                <div className="bg-slate-800/30 rounded-lg p-4 border border-green-500/10">
                                    <Star className="w-8 h-8 text-green-400 mx-auto mb-2" />
                                    <h4 className="text-white font-semibold mb-1">Expert Support</h4>
                                    <p className="text-slate-300 text-sm">Professional guidance from our investment experts</p>
                                </div>
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

export default Packages;