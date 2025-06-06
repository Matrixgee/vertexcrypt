import { motion } from "framer-motion";
import logo from '../assets/vertextone.png'
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <section className="min-h-screen py-4 flex items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-green-300">
      <motion.div
        className="w-full max-w-md p-8 bg-white/70 flex flex-col items-center backdrop-blur-md rounded-2xl shadow-xl border border-green-100"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <motion.div
          className="flex items-center mb-[23px] gap-2 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src={logo} alt="" className="h-[55px] w-[70px]" />
        </motion.div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-green-700 text-center mb-6">
          Create Your Account
        </h2>

        {/* Form */}
        <form className="w-full space-y-4">
          <div className="md:flex gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/90 text-gray-800"
                placeholder="John"
              />
            </div>
            <div className="w-full mt-4 md:mt-0">
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/90 text-gray-800"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/90 text-gray-800"
              placeholder="johndoe123"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/90 text-gray-800"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/90 text-gray-800"
              placeholder="+123 800 000 0000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/90 text-gray-800"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/90 text-gray-800"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg shadow-lg hover:from-green-600 hover:to-green-700 transition-all"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-600 font-medium hover:underline"
          >
            Log in
          </Link>
        </p>
      </motion.div>
    </section>
  );
};

export default Register;
