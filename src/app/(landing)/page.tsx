import Header from "./components/Header";
import Hero from "./components/Hero";
import Testimonial from "./components/Testimonial";
import Footer from "./components/Footer";
import Body from "./components/Body";
import Customize from "./components/Customize";
import Transactions from "./components/Transactions";

export default function LandingPage() {
  return (
    <>
      <Header />

      <div className="pt-24">
        <div className="relative flex flex-col gap-20 -mt-20 overflow-hidden">
          <Hero />
          <Body />
          <Customize />
          <Transactions />
          <Testimonial />
          <Footer />
        </div>
      </div>
    </>
  );
}
