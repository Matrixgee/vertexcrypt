import { BarChart3, PieChart, Shield, Wallet } from "lucide-react";
import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      icon: BarChart3,
      title: 'AI-Powered Analytics',
      description: 'Advanced algorithms analyze market trends to optimize your portfolio performance.'
    },
    {
      icon: Shield,
      title: 'Bank-Level Security',
      description: 'Your investments are protected with enterprise-grade security and insurance.'
    },
    {
      icon: PieChart,
      title: 'Diversified Portfolios',
      description: 'Professionally managed portfolios across stocks, bonds, and alternative investments.'
    },
    {
      icon: Wallet,
      title: 'Low Fees',
      description: 'Transparent pricing with no hidden fees. More of your money working for you.'
    }
  ];
  
  return (
    <section className="py-20 bg-gradient-to-br from-white via-green-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
            Why Choose VertexCrypt?
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            We combine cutting-edge technology with proven investment strategies to help you achieve your financial goals.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-green-100 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features
