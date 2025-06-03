import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <motion.section
      className="z-10  bg-gradient-to-br from-green-100/40 to-white/40 backdrop-blur-md rounded-3xl shadow-xl mx-4 md:mx-auto max-w-6xl px-6 md:px-16 py-16 mb-20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        {/* Text Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-green-800">
            Ready to take your investing to the next level?
          </h2>
          <p className="mt-4 text-gray-700 text-lg md:text-xl">
            Join VertexCrypt and gain access to intelligent insights, real-time tracking, and more.
          </p>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center justify-center mt-6 md:mt-0 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:from-green-600 hover:to-green-700 transition-all"
        >
          Get Started
          <ArrowRight className="ml-2 w-5 h-5" />
        </motion.button>
      </div>

      {/* Decorative Blur Circles */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-green-300/20 rounded-full blur-3xl -z-10 animate-pulse-slow" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl -z-10 animate-pulse-slow" />
    </motion.section>
  );
};

export default CTA;
