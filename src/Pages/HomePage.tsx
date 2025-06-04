import CTA from "./CTA";
import Features from "./Features";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import InvestmentOptions from "./InvestmentOptions";
import Testimonials from "./Testimonials";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Features />
      <HowItWorks />
      <InvestmentOptions />
      <Testimonials />
      <CTA />
    </div>
  );
};

export default HomePage;
