import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Calendar,
  Shield,
  CheckCircle,
  AlertCircle,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    investmentAmount: "",
    inquiryType: "general",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);

  const handleInputChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const toggleFAQ = (index: any) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-br from-green-50 via-white to-green-100 min-h-screen mt-12">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-96 h-96 bg-gradient-to-r from-green-200/20 to-green-300/20 rounded-full blur-3xl"
              animate={{
                x: [0, 30, 0],
                y: [0, -20, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                left: `${15 + i * 30}%`,
                top: `${10 + i * 20}%`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 via-green-700 to-green-800 bg-clip-text text-transparent">
              Contact VertexCrypt
            </h1>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
              Ready to start your investment journey? Our expert team is here to
              help you achieve your financial goals with personalized guidance
              and support.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-green-700">
              <span className="bg-green-100 px-4 py-2 rounded-full flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                SIPC Protected
              </span>
              <span className="bg-green-100 px-4 py-2 rounded-full flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                SEC Registered
              </span>
              <span className="bg-green-100 px-4 py-2 rounded-full flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                24/7 Support
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              className="bg-white rounded-3xl p-8 shadow-lg border border-green-100"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Get Started Today
              </h2>

              {isSubmitted && (
                <motion.div
                  className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-green-800">
                    Thank you! We'll contact you within 24 hours.
                  </span>
                </motion.div>
              )}

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Amount
                    </label>
                    <select
                      name="investmentAmount"
                      value={formData.investmentAmount}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select Range</option>
                      <option value="under-10k">Under $10,000</option>
                      <option value="10k-50k">$10,000 - $50,000</option>
                      <option value="50k-100k">$50,000 - $100,000</option>
                      <option value="100k-500k">$100,000 - $500,000</option>
                      <option value="over-500k">Over $500,000</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Inquiry Type
                  </label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  >
                    <option value="general">General Information</option>
                    <option value="new-account">Open New Account</option>
                    <option value="portfolio-review">Portfolio Review</option>
                    <option value="investment-advice">Investment Advice</option>
                    <option value="technical-support">Technical Support</option>
                    <option value="partnership">Partnership Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your investment goals and any specific questions you have..."
                    required
                  />
                </div>

                <motion.button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-4 px-6 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </motion.button>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Direct Contact */}
              <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Call Us</h4>
                      <p className="text-green-100">+1 (800) 555-INVEST</p>
                      <p className="text-green-100">+1 (800) 555-4688</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Email Us</h4>
                      <p className="text-green-100">contact@VertexCrypt.com</p>
                      <p className="text-green-100">support@VertexCrypt.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Visit Us</h4>
                      <p className="text-green-100">
                        200 Park Avenue
                        <br />
                        New York, NY 10166
                        <br />
                        United States
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Business Hours</h4>
                      <p className="text-green-100">
                        Mon - Fri: 8:00 AM - 8:00 PM EST
                        <br />
                        Sat - Sun: 9:00 AM - 5:00 PM EST
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 gap-4">
                <motion.div
                  className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 flex items-center space-x-4 cursor-pointer group"
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Live Chat</h4>
                    <p className="text-sm text-gray-600">
                      Get instant answers from our team
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 flex items-center space-x-4 cursor-pointer group"
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Schedule Consultation
                    </h4>
                    <p className="text-sm text-gray-600">
                      Book a free 30-minute session
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Security Notice */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-2">
                      Security Notice
                    </h4>
                    <p className="text-sm text-yellow-700 leading-relaxed">
                      VertexCrypt will never ask for your passwords, Social
                      Security number, or account details via email or phone.
                      Always verify our identity before sharing sensitive
                      information.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Quick answers to common questions about getting started with
              VertexCrypt
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 gap-8">
            {[
              {
                question: "What's the minimum investment?",
                answer:
                  "You can start investing with as little as $1,000. Our platform is designed to serve investors at all levels.",
              },
              {
                question: "How long does account setup take?",
                answer:
                  "Most accounts are approved within 24-48 hours. You can start the process online and begin investing immediately after approval.",
              },
              {
                question: "What fees do you charge?",
                answer:
                  "Our transparent fee structure starts at 0.25% annually with no hidden costs, trading fees, or account minimums.",
              },
              {
                question: "Is my money protected?",
                answer:
                  "Yes, all client accounts are SIPC protected up to $500,000, plus additional Lloyd's of London coverage for complete security.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg border border-green-100 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div
                  className="p-6 cursor-pointer flex items-center justify-between hover:bg-green-50 transition-colors"
                  onClick={() => toggleFAQ(index)}
                >
                  <h4 className="font-semibold text-gray-800">
                    {faq.question}
                  </h4>
                  <motion.div
                    animate={{ rotate: openFAQ === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {openFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-green-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-green-600" />
                    )}
                  </motion.div>
                </div>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFAQ === index ? "auto" : 0,
                    opacity: openFAQ === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
