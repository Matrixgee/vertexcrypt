import { ArrowRight, Eye, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    {
      step: '01',
      title: 'Create Your Account',
      description: 'Sign up in minutes with bank-level security. No minimum deposit required to get started.',
      icon: Users
    },
    {
      step: '02',
      title: 'Set Your Goals',
      description: 'Tell us your financial goals and risk tolerance. Our AI will create a personalized strategy.',
      icon: Eye
    },
    {
      step: '03',
      title: 'Start Investing',
      description: 'Fund your account and watch your money grow with our automated investment strategies.',
      icon: TrendingUp
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-white to-green-100">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Getting started with VertexCrypt is simple. Follow these three easy steps to begin your investment journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative bg-white rounded-2xl p-8 shadow-lg border border-green-100 group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-6xl font-bold text-green-100 group-hover:text-green-200 transition-colors">
                  {step.step}
                </span>
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                  <ArrowRight className="w-8 h-8 text-green-400" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks
