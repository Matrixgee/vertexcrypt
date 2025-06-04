import { motion } from "framer-motion";
import {
  Shield,
  Target,
  Award,
  Users,
  TrendingUp,
  Globe,
  CheckCircle,
  Zap,
} from "lucide-react";

const AboutPage = () => {
  return (
    <div className="bg-gradient-to-br from-green-50 via-white to-green-100 min-h-screen mt-12">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-96 h-96 bg-gradient-to-r from-green-200/20 to-green-300/20 rounded-full blur-3xl"
              animate={{
                x: [0, 50, 0],
                y: [0, -30, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 10 + i * 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                left: `${10 + i * 25}%`,
                top: `${5 + i * 15}%`,
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
              About VertexCrypt
            </h1>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
              Transforming the investment landscape through cutting-edge
              technology, expert guidance, and unwavering commitment to your
              financial success.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-green-700">
              <span className="bg-green-100 px-4 py-2 rounded-full">
                Founded 2020
              </span>
              <span className="bg-green-100 px-4 py-2 rounded-full">
                SEC Registered
              </span>
              <span className="bg-green-100 px-4 py-2 rounded-full">
                SIPC Protected
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Our Mission
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We believe that sophisticated investment strategies shouldn't be
                reserved for the ultra-wealthy. Our mission is to democratize
                access to professional-grade investment tools and insights,
                empowering every individual to build lasting wealth regardless
                of their starting point.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Through innovative technology, transparent practices, and
                personalized guidance, we're breaking down the barriers that
                have traditionally kept advanced investment strategies out of
                reach for everyday investors.
              </p>
              <div className="space-y-4">
                {[
                  "AI-powered portfolio optimization",
                  "Transparent fee structure with no hidden costs",
                  "Bank-level security and regulatory compliance",
                  "Educational resources and expert insights",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-green-500 to-green-700 rounded-3xl p-8 text-white"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.02, rotate: 1 }}
            >
              <h3 className="text-2xl font-bold mb-6">Our Impact by Numbers</h3>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: "$2.5B+", label: "Assets Under Management" },
                  { number: "50,000+", label: "Happy Investors" },
                  { number: "12.5%", label: "Avg Annual Returns" },
                  { number: "99.9%", label: "Platform Uptime" },
                  { number: "4.9/5", label: "Customer Rating" },
                  { number: "180+", label: "Countries Served" },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-green-100 mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-green-200">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide every decision we make and every innovation
              we pursue
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Security First",
                description:
                  "Bank-level encryption and multi-layered security protocols protect your investments and personal data.",
              },
              {
                icon: Target,
                title: "Precision Focus",
                description:
                  "Data-driven strategies and algorithmic precision ensure optimal portfolio performance and risk management.",
              },
              {
                icon: Zap,
                title: "Innovation",
                description:
                  "Cutting-edge AI technology and continuous platform improvements keep you ahead of market trends.",
              },
              {
                icon: Users,
                title: "Client-Centric",
                description:
                  "Your financial goals are our priority, with personalized service and dedicated support teams.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 text-center group"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      {/* <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Leadership</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experienced professionals from top financial institutions and technology companies
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'CEO & Co-Founder',
                experience: 'Former VP at JPMorgan Chase',
                bio: 'Harvard MBA with 15+ years in fintech. Led digital transformation initiatives at major financial institutions.',
                expertise: ['Strategic Leadership', 'Financial Innovation', 'Regulatory Compliance']
              },
              {
                name: 'Michael Chen',
                role: 'CTO & Co-Founder',
                experience: 'Former Senior Engineer at Google',
                bio: 'PhD in Computer Science from Stanford. Expert in AI/ML applications for financial services and scalable systems.',
                expertise: ['AI/ML Engineering', 'Financial Technology', 'System Architecture']
              },
              {
                name: 'David Rodriguez',
                role: 'Chief Investment Officer',
                experience: 'Ex-Goldman Sachs VP',
                bio: 'CFA charterholder with 20+ years managing institutional portfolios. Specializes in quantitative investment strategies.',
                expertise: ['Portfolio Management', 'Risk Analysis', 'Quantitative Finance']
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-green-100"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-green-600 font-semibold mb-2">{member.role}</p>
                <p className="text-sm text-gray-500 mb-3">{member.experience}</p>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {member.expertise.map((skill, i) => (
                    <span key={i} className="bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Why Choose Us */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-gradient-to-br from-gray-50 to-green-50 rounded-3xl p-8 md:p-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Why Choose VertexCrypt?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                    <Award className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                    Advanced Technology
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Our proprietary algorithms analyze over 10,000 data points
                    daily, providing real-time portfolio optimization and risk
                    management that adapts to changing market conditions.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                    <Globe className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                    Global Reach, Local Service
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Serving investors across 180+ countries with localized
                    support, currency options, and compliance with regional
                    financial regulations.
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                    <TrendingUp className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                    Proven Performance
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Track record of consistent returns with our diversified
                    portfolios averaging 12.5% annual growth while maintaining
                    optimal risk-adjusted performance.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                    <Shield className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                    Regulatory Excellence
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Fully registered with SEC and FINRA, SIPC protection up to
                    $500,000, plus additional Lloyd's of London coverage for
                    complete peace of mind.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
