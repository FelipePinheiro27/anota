import React, { useRef } from "react";
import SystemAbout from "../../Components/plans/SystemAbout";
import Resources from "../../Components/plans/Resources";
import Pricing from "../../Components/plans/Pricing";
import NeedHelp from "../../Components/plans/NeedHelp";
import Footer from "../../Components/plans/Footer";
import Trail from "../../Components/plans/Trail";

const Plans = () => {
  const pricingRef = useRef<HTMLDivElement | null>(null);

  const scrollToPricing = () => {
    if (pricingRef.current) {
      pricingRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <>
      <SystemAbout scrollToPricing={scrollToPricing} />
      <Trail />
      <Resources />
      <Pricing ref={pricingRef} />
      <NeedHelp />
      <Footer />
    </>
  );
};

export default Plans;
