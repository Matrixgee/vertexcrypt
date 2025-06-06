import { motion } from "framer-motion";
import { Star } from "lucide-react";
import one from '../assets/one.jpg'
import two from '../assets/two.jpg'
import three from '../assets/three.jpg'


const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Martinez',
      role: 'Small Business Owner',
      content: 'VertexCrypt helped me grow my retirement savings by 40% in just two years. The AI recommendations are spot-on!',
      rating: 5,
      image: one
    },
    {
      name: 'James Thompson',
      role: 'Software Engineer',
      content: 'Love the mobile app! I can track my investments anywhere and the automated rebalancing saves me so much time.',
      rating: 5,
      image: two
    },
    {
      name: 'Emily Chen',
      role: 'Medical Professional',
      content: 'Finally, an investment platform that makes sense. The educational resources helped me understand my portfolio better.',
      rating: 5,
      image: three
    }
  ];

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
            What Our Clients Say
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied investors who trust VertexCrypt with their financial future.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 shadow-lg border border-green-100"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                  <img style={{objectFit:"cover"}} src={testimonial.image} alt="" className="rounded-full w-[100%] h-[100%]" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials
