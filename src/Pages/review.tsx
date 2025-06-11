import {
  FiCheckCircle,
  FiMail,
  FiMessageCircle,
  FiArrowLeft,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Review = () => {
  const navigate = useNavigate();
  const handleBackToLogin = () => {
    navigate("/login");
    console.log("Navigate back to login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4 ">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center mt-4">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <FiCheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Congratulations! 🎉
          </h1>
        </div>

        {/* Success Message */}
        <div className="mb-8">
          <p className="text-gray-600 leading-relaxed mb-6">
            Your account has been successfully registered! Please await admin
            approval to complete the process.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800 text-sm font-medium mb-2">
              Need assistance?
            </p>
            <p className="text-green-700 text-sm">
              Reach out to us via our live chat or email address for any
              questions or support you may need.
            </p>
          </div>
        </div>

        {/* Contact Options */}
        <div className="flex justify-center space-x-4 mb-8">
          <div className="flex items-center text-green-600 text-sm">
            <FiMessageCircle className="w-4 h-4 mr-2" />
            <span>Live Chat</span>
          </div>
          <div className="flex items-center text-green-600 text-sm">
            <FiMail className="w-4 h-4 mr-2" />
            <span>Email Support</span>
          </div>
        </div>

        {/* Back to Login Button */}
        <button
          onClick={handleBackToLogin}
          className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-green-600 
                   text-white font-semibold rounded-lg shadow-lg 
                   hover:from-green-600 hover:to-green-700 hover:shadow-xl
                   transform hover:scale-[1.02] active:scale-[0.98]
                   transition-all duration-300 ease-in-out
                   focus:outline-none focus:ring-4 focus:ring-green-300
                   flex items-center justify-center"
        >
          <FiArrowLeft className="w-5 h-5 mr-2" />
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default Review;
