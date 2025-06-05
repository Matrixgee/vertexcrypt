import { useState } from 'react';
import type { JSX } from 'react';
import {
  CreditCard,
  Wallet,
  Copy,
  CheckCircle,
  AlertCircle,
  Bitcoin,
  DollarSign,
  ArrowRight,
  Shield,
  Clock
} from 'lucide-react';

const Deposit = () => {
  const cryptoAddresses = {
    bitcoin: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    ethereum: '0x742d35Cc6634C0532925a3b8D429d3e61d8ed1a4',
    usdt: 'TPYuqJ8RzFv3qXJVGbhQ8YzyJW6xSoNmqZ'
  } as const;

  type PaymentMethodId = keyof typeof cryptoAddresses;

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodId>('bitcoin');
  const [amount, setAmount] = useState('');
  const [copied, setCopied] = useState(false);

  const paymentMethods: {
    id: PaymentMethodId;
    name: string;
    icon: JSX.Element;
    fee: string;
    minDeposit: string;
    processingTime: string;
    color: string;
  }[] = [
      {
        id: 'bitcoin',
        name: 'Bitcoin',
        icon: <Bitcoin className="w-6 h-6" />,
        fee: '0%',
        minDeposit: '$10',
        processingTime: 'Instant',
        color: 'from-orange-400 to-orange-600'
      },
      {
        id: 'ethereum',
        name: 'Ethereum',
        icon: <Wallet className="w-6 h-6" />,
        fee: '0%',
        minDeposit: '$10',
        processingTime: 'Instant',
        color: 'from-blue-400 to-blue-600'
      },
      {
        id: 'usdt',
        name: 'USDT (TRC20)',
        icon: <DollarSign className="w-6 h-6" />,
        fee: '0%',
        minDeposit: '$10',
        processingTime: 'Instant',
        color: 'from-green-400 to-green-600'
      }
    ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
    </div>

    {/* Scrollable content */}
    <div className="relative overflow-y-auto h-screen">
      <div className="p-6 pb-20">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
            <Wallet className="w-8 h-8 mr-3 text-green-400" />
            Make a Deposit
          </h1>
          <p className="text-slate-300 text-lg">Fund your account securely with cryptocurrency</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left column: Payment Methods, Amount Input, Wallet Address */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Methods */}
            <div className="bg-slate-900/40 backdrop-blur-sm border border-green-500/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-green-400" />
                Select Payment Method
              </h2>

              <div className="grid md:grid-cols-3 gap-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                      selectedMethod === method.id
                        ? 'border-green-400/50 bg-green-500/10 shadow-lg shadow-green-500/10'
                        : 'border-green-500/20 bg-slate-900/30 hover:border-green-400/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${method.color} shadow-lg`}>
                        {method.icon}
                      </div>
                      {selectedMethod === method.id && (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      )}
                    </div>
                    <h3 className="font-semibold text-white mb-1">{method.name}</h3>
                    <div className="space-y-1 text-sm">
                      <p className="text-slate-300">
                        Fee: <span className="text-green-400">{method.fee}</span>
                      </p>
                      <p className="text-slate-300">
                        Min: <span className="text-white">{method.minDeposit}</span>
                      </p>
                      <p className="text-slate-300">
                        Time: <span className="text-green-400">{method.processingTime}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Amount Input */}
            <div className="bg-slate-900/40 backdrop-blur-sm border border-green-500/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Enter Amount</h2>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <DollarSign className="w-5 h-5 text-green-400" />
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter deposit amount"
                  className="w-full pl-10 pr-4 py-4 bg-slate-900/50 border border-green-500/20 rounded-lg text-white placeholder-slate-400 focus:border-green-400/50 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all"
                />
              </div>
            </div>

            {/* Wallet Address */}
            <div className="bg-slate-900/40 backdrop-blur-sm border border-green-500/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Payment Address</h2>
              <div className="bg-slate-900/60 border border-green-500/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-300 text-sm">
                    {paymentMethods.find((m) => m.id === selectedMethod)?.name} Address
                  </span>
                  <button
                    onClick={() => copyToClipboard(cryptoAddresses[selectedMethod])}
                    className="flex items-center space-x-1 text-green-400 hover:text-green-300 transition-colors"
                  >
                    {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <div className="break-all text-white font-mono text-sm bg-slate-900/80 p-3 rounded border border-green-500/10">
                  {cryptoAddresses[selectedMethod]}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Deposit Summary */}
            <div className="bg-slate-900/40 backdrop-blur-sm border border-green-500/20 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Deposit Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Method:</span>
                  <span className="text-white">
                    {paymentMethods.find((m) => m.id === selectedMethod)?.name}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Amount:</span>
                  <span className="text-white">${amount || '0.00'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Fee:</span>
                  <span className="text-green-400">$0.00</span>
                </div>
                <div className="border-t border-green-500/20 pt-3">
                  <div className="flex justify-between font-semibold">
                    <span className="text-white">Total:</span>
                    <span className="text-green-400">${amount || '0.00'}</span>
                  </div>
                </div>
              </div>

              <button
                disabled={!amount || parseFloat(amount) < 10}
                className="w-full mt-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-lg hover:from-green-500 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <span>Proceed to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Important Notes */}
            <div className="bg-slate-900/40 backdrop-blur-sm border border-green-500/20 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-green-400" />
                Important Notes
              </h3>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-start space-x-2">
                  <Shield className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Minimum deposit amount is $10</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Clock className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Deposits are processed instantly after network confirmation</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>All deposits are secured with advanced encryption</span>
                </div>
              </div>
            </div>

            {/* Recent Deposits */}
            <div className="bg-slate-900/40 backdrop-blur-sm border border-green-500/20 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Recent Deposits</h3>
              <div className="space-y-3">
                <div className="text-center text-slate-400 py-8">
                  <Wallet className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No recent deposits</p>
                </div>
              </div>
            </div>
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
}

export default Deposit;