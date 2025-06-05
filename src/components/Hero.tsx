import { motion } from "framer-motion";
import { ArrowRight, DollarSign, TrendingUp, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/bg.jpg"

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section style={{background:`url(${bg})`}} className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-green-600/10" />
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 bg-gradient-to-r from-green-200/30 to-green-300/30 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 10}%`,
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 py-16 md:py-23 relative z-10 mt-12">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 via-green-700 to-green-800 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Invest Smarter, <br />
            <span className="bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
              Grow Faster
            </span>
          </motion.h1>

          <motion.p
            className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Build your wealth with our AI-powered investment platform. Get
            personalized portfolios and expert insights to maximize your
            returns.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              onClick={() => navigate("/register")}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-bold text-base hover:from-green-600 hover:to-green-700 transition-all shadow-xl hover:shadow-2xl flex items-center space-x-2"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Start Investing</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              {
                icon: DollarSign,
                title: "$2.5B+",
                desc: "Assets Under Management",
              },
              { icon: Users, title: "50K+", desc: "Active Investors" },
              {
                icon: TrendingUp,
                title: "12.5%",
                desc: "Average Annual Return",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-green-100"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <stat.icon className="w-7 h-7 text-green-600 mx-auto mb-3" />
                <h3 className="text-xl font-semibold text-gray-800">
                  {stat.title}
                </h3>
                <p className="text-gray-600 text-sm">{stat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
