import { TrendingUp, Star, Crown } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const InvestmentPlans = () => {
  const plans = [
    {
      name: "Starter Plan",
      icon: TrendingUp,
      price: "$100 - $1k",
      description: "Perfect for beginners starting their investment journey",
      popular: false,
      gradient: "from-green-400 to-green-500",
    },
    {
      name: "Growth Plan",
      icon: Star,
      price: "$1k - $10k",
      description: "Advanced features for serious investors",
      popular: true,
      gradient: "from-green-500 to-green-600",
    },
    {
      name: "Professional",
      icon: Crown,
      price: "$10k - $50k",
      description: "Comprehensive wealth management solution",
      popular: false,
      gradient: "from-green-600 to-green-700",
    },
    {
      name: "Premium",
      icon: Crown,
      price: "$50k - $100k",
      description: "Elite solutions for high-value portfolios",
      popular: false,
      gradient: "from-green-700 to-green-800",
    },
    {
      name: "Golden",
      icon: Crown,
      price: "$100k+",
      description: "Tailored services for ultra-high-net-worth individuals",
      popular: false,
      gradient: "from-yellow-500 to-yellow-600",
    },
  ];

  const nav = useNavigate();

  const handleToLogin = () => {
    nav("/register");
  };

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
            Choose Your Investment Plan
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Select the perfect plan that matches your investment goals and
            experience level. All plans include our core security features and
            professional portfolio management.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border-2 group ${
                plan.popular
                  ? "border-green-400 ring-4 ring-green-100"
                  : "border-green-100 hover:border-green-200"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              <div
                className={`w-16 h-16 bg-gradient-to-br ${plan.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <plan.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {plan.name}
              </h3>
              <p className="text-gray-600 mb-6">{plan.description}</p>

              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-gray-800">
                    {plan.price}
                  </span>
                  {/* <span className="text-gray-600 ml-1">{plan.period}</span> */}
                </div>
              </div>

              <motion.button
                onClick={handleToLogin}
                className={`w-full py-4 px-6 rounded-xl font-semibold transition-all ${
                  plan.popular
                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg"
                    : "bg-white border-2 border-green-500 text-green-600 hover:bg-green-50"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="text-gray-600 mb-4">
            All plans include bank-level security, FDIC insurance protection,
            and 24/7 monitoring
          </p>
          <p className="text-sm text-gray-500">
            Need a custom solution?{" "}
            <span className="text-green-600 font-semibold cursor-pointer hover:underline">
              Contact our team
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default InvestmentPlans;
