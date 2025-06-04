import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-green-300">
      <motion.div
        className="w-full max-w-md p-8 bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-green-100"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">
          Forgot Password
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Enter your email to receive a password reset link.
        </p>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/90"
          />
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition-all"
          >
            Send Reset Link
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Remembered your password?{" "}
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

export default ForgotPassword;
