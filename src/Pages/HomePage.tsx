import CTA from "../components/CTA";
import Features from "../components/Features";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import InvestmentOptions from "../components/InvestmentOptions";
import InvestmentPlans from "../components/InvestmentPlans";
import Testimonials from "../components/Testimonials";


const HomePage = () => {
  return (
    <div>
      <Hero />
      <Features />
      <HowItWorks />
      <InvestmentOptions />
      <InvestmentPlans/>
      <Testimonials />
      <CTA />
    </div>
  );
};

export default HomePage;
