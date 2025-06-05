import { useState } from 'react';
import { Send, MessageCircle, Clock, HelpCircle } from 'lucide-react';

// Support Component
const Support = () => {
  const [message, setMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      question: 'How long does it take to process withdrawals?',
      answer: 'Withdrawals are typically processed within 24-48 hours during business days.'
    },
    {
      question: 'What is the minimum investment amount?',
      answer: 'The minimum investment amount is $100 for our Starter package.'
    },
    {
      question: 'Are there any fees for deposits or withdrawals?',
      answer: 'We do not charge fees for deposits. Withdrawal fees may apply depending on the method chosen.'
    },
    {
      question: 'How are profits calculated and distributed?',
      answer: 'Profits are calculated based on your investment package and distributed according to the schedule specified in your plan.'
    }
  ];

  const handleSubmit = () => {
    if (message.trim()) {
      // In a real app, this would send the support request
      alert(`Support request submitted!\nCategory: ${selectedCategory}\nMessage: ${message}`);
      setMessage('');
    }
  };

  const toggleFaq = (index:any) => {
    setExpandedFaq(expandedFaq === index ? null : index);
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
              <MessageCircle className="w-8 h-8 mr-3 text-green-400" />
              Support Center
            </h1>
            <p className="text-slate-300 text-lg">Get help and find answers to your questions</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-slate-900/40 backdrop-blur-sm border border-green-500/20 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                  Contact Support
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-green-500/20 rounded-lg text-white focus:outline-none focus:border-green-400/50 focus:ring-2 focus:ring-green-400/20 transition-all"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="technical">Technical Issue</option>
                      <option value="account">Account Problem</option>
                      <option value="withdrawal">Withdrawal Issue</option>
                      <option value="investment">Investment Question</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">Message</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your issue or question..."
                      rows={6}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-green-500/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-green-400/50 focus:ring-2 focus:ring-green-400/20 transition-all resize-none"
                    />
                  </div>
                  
                  <button 
                    onClick={handleSubmit}
                    className="w-full py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-lg hover:from-green-500 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
                    disabled={!message.trim()}
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </button>
                </div>
              </div>
              
              <div className="bg-slate-900/40 backdrop-blur-sm border border-green-500/20 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Contact Information</h2>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="w-5 h-5 text-green-400" />
                    <span className="text-slate-300">support@tradepro.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-green-400" />
                    <span className="text-slate-300">24/7 Support Available</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-900/40 backdrop-blur-sm border border-green-500/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <HelpCircle className="w-5 h-5 text-green-400 mr-2" />
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-green-500/10 rounded-lg bg-slate-900/60 overflow-hidden">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full p-4 text-left hover:bg-slate-900/80 transition-colors focus:outline-none focus:bg-slate-900/80"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-white pr-4">{faq.question}</h3>
                        <div className={`transform transition-transform duration-200 ${expandedFaq === index ? 'rotate-180' : ''}`}>
                          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </button>
                    
                    {expandedFaq === index && (
                      <div className="px-4 pb-4">
                        <div className="border-t border-green-500/10 pt-3">
                          <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-sm text-slate-300">
                  <span className="text-green-400 font-medium">Can't find what you're looking for?</span> 
                  <br />
                  Use the contact form to get personalized assistance from our support team.
                </p>
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
};

export default Support;