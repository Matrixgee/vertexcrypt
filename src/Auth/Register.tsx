import { motion } from "framer-motion";
import logo from "../assets/vertextone.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "../config/axiosconfig";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FiCheck } from "react-icons/fi";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  // console.log(`VITE_DEVE_URL = ${import.meta.env.VITE_DEVE_URL}`);

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const toastLoadingId = toast.loading("Registering...");

    if (
      !formData.firstName ||
      !formData.userName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Please fill all fields");
      toast.dismiss(toastLoadingId);
      return;
    }

    if (formData.confirmPassword !== formData.password) {
      toast.error("Passwords do not match");
      toast.dismiss(toastLoadingId);
      return;
    }

    try {
      const res = await axios.post("user/signup", formData);
      toast.success(res.data.message);
      setFormData({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
      });
      setTimeout(() => {
        window.location.href = "/review";
      });
    } catch (error: any) {
      if (isAxiosError(error)) {
        const errorMsg = error.response?.data?.message || "An error occurred";
        toast.error(errorMsg);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setLoading(false);
      toast.dismiss(toastLoadingId);
    }
  };

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
          <img src={logo} alt="" className="h-[50px] w-[95px]" />
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
                name="firstName"
                value={formData.firstName}
                className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/90 text-gray-800"
                placeholder="John"
                onChange={handleChange}
              />
            </div>
            <div className="w-full mt-4 md:mt-0">
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/90 text-gray-800"
                placeholder="Doe"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/90 text-gray-800"
              placeholder="johndoe123"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/90 text-gray-800"
              placeholder="you@example.com"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/90 text-gray-800"
              placeholder="+123 800 000 0000"
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full mt-1 px-4 py-3 pr-12 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white/90 text-gray-800 transition-all duration-200"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
              aria-describedby="password-requirements"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-green-600 transition-colors duration-200 p-1"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              tabIndex={0}
            >
              {showPassword ? (
                <BsEyeSlash className="w-5 h-5" />
              ) : (
                <BsEye className="w-5 h-5" />
              )}
            </button>
          </div>

          <div className="relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full mt-1 px-4 py-3 pr-12 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white/90 text-gray-800 transition-all duration-200"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength={8}
              aria-describedby="password-requirements"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-green-600 transition-colors duration-200 p-1"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
              tabIndex={0}
            >
              {showConfirmPassword ? (
                <BsEyeSlash className="w-5 h-5" />
              ) : (
                <BsEye className="w-5 h-5" />
              )}
            </button>
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            disabled={loading}
            className={`
    w-full py-3.5 px-6 
    bg-gradient-to-r from-green-500 to-green-600 
    text-white font-semibold rounded-lg 
    shadow-lg hover:shadow-xl 
    transition-all duration-300 ease-in-out
    transform hover:scale-[1.02] active:scale-[0.98]
    disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100
    focus:outline-none focus:ring-4 focus:ring-green-300
    relative overflow-hidden
    ${
      loading
        ? "hover:from-green-500 hover:to-green-600"
        : "hover:from-green-600 hover:to-green-700"
    }
  `}
          >
            <div className="flex items-center justify-center">
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <FiCheck className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                </>
              )}
            </div>

            {/* Shimmer effect for loading state */}
            {loading && (
              <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            )}
          </button>

          <style>{`
            @keyframes shimmer {
              0% {
                transform: translateX(-100%) skewX(-12deg);
              }
              100% {
                transform: translateX(200%) skewX(-12deg);
              }
            }
            .animate-shimmer {
              animation: shimmer 2s infinite;
            }
          `}</style>
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
