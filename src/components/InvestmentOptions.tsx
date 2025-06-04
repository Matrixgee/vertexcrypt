import { CheckCircle, Globe, Lock, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const InvestmentOptions = () => {
  const options = [
    {
      icon: Globe,
      title: "Global Diversification",
      description:
        "Invest in markets worldwide with our international portfolio options.",
      features: [
        "US & International Markets",
        "Currency Hedging",
        "Emerging Markets Access",
      ],
      color: "from-blue-500 to-green-500",
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description:
        "Manage your investments on-the-go with our award-winning mobile app.",
      features: [
        "Real-time Tracking",
        "Push Notifications",
        "Biometric Security",
      ],
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Lock,
      title: "Retirement Planning",
      description:
        "Secure your future with tax-advantaged retirement investment accounts.",
      features: [
        "IRA & 401(k) Rollovers",
        "Tax Optimization",
        "Retirement Calculators",
      ],
      color: "from-emerald-500 to-teal-500",
    },
  ];

  const navigate = useNavigate();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
            Investment Options
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Choose from a variety of investment strategies tailored to your
            goals and risk tolerance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {options.map((option, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-white to-green-50 rounded-2xl p-8 shadow-lg border border-green-100 group overflow-hidden relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              ></div>

              <div
                className={`w-16 h-16 bg-gradient-to-br ${option.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <option.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {option.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {option.description}
              </p>

              <ul className="space-y-3">
                {option.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                className="mt-6 w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/register")}
              >
                Learn More
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default InvestmentOptions;
